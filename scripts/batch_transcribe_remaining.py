#!/usr/bin/env python3
"""
Batch transcribe remaining fateoffenella files using standard Whisper
"""

import os
import subprocess
import sys
from pathlib import Path

def transcribe_with_whisper(audio_file, output_dir="transcriptions"):
    """Transcribe a single file using standard whisper command"""
    try:
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
        
        # Run whisper command
        cmd = [
            "whisper",
            str(audio_file),
            "--model", "medium",
            "--output_format", "txt",
            "--output_dir", output_dir,
            "--device", "cpu"
        ]
        
        print(f"Transcribing: {audio_file.name}")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            output_file = Path(output_dir) / f"{audio_file.stem}.txt"
            print(f"✅ Completed: {output_file}")
            return True
        else:
            print(f"❌ Error: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

def main():
    """Main function to transcribe audio files from multiple WPM directories"""
    print("🎙️  Batch Transcriber for Audio Files (20wpm, 40wpm, 50wpm, 120wpm)")
    print("=" * 70)
    
    audio_dir = Path("audio-source-files")
    transcriptions_dir = Path("transcriptions")
    
    if not audio_dir.exists():
        print(f"❌ Audio directory not found: {audio_dir}")
        return
    
    # Define WPM directories to process
    wpm_directories = ["20wpm", "40wpm", "50wpm", "60wpm", "80wpm", "100wpm", "120wpm"]
    
    # Collect all audio files from different sources
    all_audio_files = []
    
    # Add fateoffenella files (120wpm) from root directory
    fateoffenella_files = list(audio_dir.glob("fateoffenella_*.mp3"))
    all_audio_files.extend(fateoffenella_files)
    print(f"📁 Found {len(fateoffenella_files)} fateoffenella files (120wpm)")
    
    # Add files from WPM directories
    for wpm_dir in wpm_directories:
        wpm_path = audio_dir / wpm_dir
        if wpm_path.exists():
            wpm_files = list(wpm_path.glob("*.mp3"))
            all_audio_files.extend(wpm_files)
            print(f"📁 Found {len(wpm_files)} files in {wpm_dir}/")
        else:
            print(f"⚠️  Directory not found: {wpm_dir}/")
    
    if not all_audio_files:
        print("❌ No audio files found")
        return
    
    # Sort files for consistent processing order
    all_audio_files.sort(key=lambda x: str(x))
    
    # Check which files are already transcribed
    existing_transcripts = set()
    if transcriptions_dir.exists():
        for txt_file in transcriptions_dir.glob("*.txt"):
            existing_transcripts.add(txt_file.stem)
    
    # Filter out already transcribed files
    remaining_files = []
    for audio_file in all_audio_files:
        if audio_file.stem not in existing_transcripts:
            remaining_files.append(audio_file)
    
    if not remaining_files:
        print("✅ All audio files are already transcribed!")
        return
    
    print(f"📁 Found {len(all_audio_files)} total audio files")
    print(f"✅ Already transcribed: {len(existing_transcripts)}")
    print(f"🎵 Remaining to transcribe: {len(remaining_files)}")
    print("-" * 70)
    
    successful = 0
    failed = 0
    
    for i, audio_file in enumerate(remaining_files, 1):
        # Show which directory the file is from
        if audio_file.parent.name in wpm_directories:
            file_info = f"{audio_file.parent.name}/{audio_file.name}"
        else:
            file_info = f"{audio_file.name} (120wpm)"
        
        print(f"\n[{i}/{len(remaining_files)}] Processing: {file_info}")
        
        if transcribe_with_whisper(audio_file):
            successful += 1
        else:
            failed += 1
    
    print("\n" + "=" * 70)
    print(f"🎉 Batch transcription complete!")
    print(f"✅ Successful: {successful}")
    print(f"❌ Failed: {failed}")
    print(f"📁 Results saved in: {transcriptions_dir}/")

if __name__ == "__main__":
    main()