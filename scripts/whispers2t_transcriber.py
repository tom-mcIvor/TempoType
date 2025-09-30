#!/usr/bin/env python3
"""
WhisperS2T Transcriber for TempoType
Fast and efficient audio transcription using WhisperS2T + CTranslate2
"""

import os
import sys
import time
from pathlib import Path

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import whisper_s2t
        import ctranslate2
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Install with: pip install whisper-s2t ctranslate2")
        return False

def transcribe_file(audio_path, model_size="medium", output_dir="transcriptions"):
    """Transcribe a single audio file using WhisperS2T"""
    try:
        import whisper_s2t
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
        
        # Load model
        print(f"Loading {model_size} model...")
        model = whisper_s2t.load_model(model_size)
        
        # Transcribe
        print(f"Transcribing: {audio_path}")
        start_time = time.time()
        
        result = model.transcribe(audio_path)
        
        end_time = time.time()
        duration = end_time - start_time
        
        # Save transcript
        audio_name = Path(audio_path).stem
        output_path = Path(output_dir) / f"{audio_name}.txt"
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(result['text'].strip())
        
        print(f"✅ Completed in {duration:.1f}s: {output_path}")
        return str(output_path)
        
    except Exception as e:
        print(f"❌ Error transcribing {audio_path}: {e}")
        return None

def batch_transcribe(audio_dir="audio-source-files", model_size="medium", output_dir="transcriptions"):
    """Batch transcribe all MP3 files in a directory"""
    audio_path = Path(audio_dir)
    
    if not audio_path.exists():
        print(f"❌ Audio directory not found: {audio_dir}")
        return
    
    # Find all MP3 files
    mp3_files = list(audio_path.glob("*.mp3"))
    
    if not mp3_files:
        print(f"❌ No MP3 files found in {audio_dir}")
        return
    
    print(f"🎵 Found {len(mp3_files)} audio files")
    print(f"📝 Using {model_size} model")
    print(f"💾 Output directory: {output_dir}")
    print("-" * 50)
    
    successful = 0
    total_time = 0
    
    for i, audio_file in enumerate(mp3_files, 1):
        print(f"\n[{i}/{len(mp3_files)}] Processing: {audio_file.name}")
        
        start_time = time.time()
        result = transcribe_file(str(audio_file), model_size, output_dir)
        end_time = time.time()
        
        if result:
            successful += 1
            file_time = end_time - start_time
            total_time += file_time
            
            # Show progress
            avg_time = total_time / successful
            remaining = len(mp3_files) - i
            eta = remaining * avg_time
            
            print(f"⏱️  Time: {file_time:.1f}s | ETA: {eta/60:.1f}m")
    
    print("\n" + "=" * 50)
    print(f"🎉 Batch transcription complete!")
    print(f"✅ Successful: {successful}/{len(mp3_files)}")
    print(f"⏱️  Total time: {total_time/60:.1f} minutes")
    print(f"📁 Results saved in: {output_dir}/")

def main():
    """Main function"""
    print("🎙️  WhisperS2T Transcriber for TempoType")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        print("\n💡 Alternative: Use standard Whisper (already installed)")
        print("   whisper audio-source-files/fateoffenella_01_various_64kb.mp3")
        return
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        if sys.argv[1] == "--single":
            if len(sys.argv) > 2:
                audio_file = sys.argv[2]
                model = sys.argv[3] if len(sys.argv) > 3 else "medium"
                transcribe_file(audio_file, model)
            else:
                print("Usage: python whispers2t_transcriber.py --single <audio_file> [model_size]")
        elif sys.argv[1] == "--batch":
            model = sys.argv[2] if len(sys.argv) > 2 else "medium"
            batch_transcribe(model_size=model)
        else:
            print("Usage:")
            print("  python whispers2t_transcriber.py --single <file> [model]")
            print("  python whispers2t_transcriber.py --batch [model]")
    else:
        # Default: batch process all files
        batch_transcribe()

if __name__ == "__main__":
    main()