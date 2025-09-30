#!/bin/bash

# Audio Transcription Demo Script for TempoType
# This script demonstrates different methods to transcribe your audio files

echo "=== TempoType Audio Transcription Demo ==="
echo ""

# Check if we have audio files
if [ ! -d "audio-source-files" ] || [ -z "$(ls -A audio-source-files/*.mp3 2>/dev/null)" ]; then
    echo "❌ No audio files found in audio-source-files/"
    exit 1
fi

echo "✅ Found audio files:"
ls audio-source-files/*.mp3 | head -3
echo "... and $(ls audio-source-files/*.mp3 | wc -l) total files"
echo ""

# Method 1: Check if Whisper is available
echo "=== Method 1: OpenAI Whisper (Local) ==="
if command -v whisper &> /dev/null; then
    echo "✅ Whisper is installed"
    echo "Testing with first audio file..."
    
    # Create transcriptions directory
    mkdir -p transcriptions
    
    # Test transcription on first file
    FIRST_FILE=$(ls audio-source-files/*.mp3 | head -1)
    echo "Transcribing: $FIRST_FILE"
    
    # Run whisper with base model for speed
    whisper "$FIRST_FILE" --model base --output_format txt --output_dir transcriptions
    
    # Show result
    TRANSCRIPT_FILE="transcriptions/$(basename "$FIRST_FILE" .mp3).txt"
    if [ -f "$TRANSCRIPT_FILE" ]; then
        echo "✅ Transcription successful!"
        echo "First 200 characters:"
        head -c 200 "$TRANSCRIPT_FILE"
        echo "..."
        echo ""
        echo "Full transcript saved to: $TRANSCRIPT_FILE"
    else
        echo "❌ Transcription failed"
    fi
else
    echo "❌ Whisper not installed"
    echo "To install: pipx install openai-whisper"
    echo "Or use virtual environment:"
    echo "  python3 -m venv whisper-env"
    echo "  source whisper-env/bin/activate"
    echo "  pip install openai-whisper"
fi
echo ""

# Method 2: Web-based alternatives
echo "=== Method 2: Web-Based Services ==="
echo "🌐 Free options (upload your MP3 files):"
echo "  • Otter.ai - 600 minutes/month free"
echo "  • Rev.ai - 5 hours free trial"
echo "  • Happy Scribe - 10 minutes free"
echo "  • Trint - 30 minutes free trial"
echo ""

# Method 3: Cloud APIs
echo "=== Method 3: Cloud APIs ==="
echo "☁️  Paid but very accurate:"
echo "  • Google Cloud Speech-to-Text"
echo "  • Azure Speech Services"
echo "  • AWS Transcribe"
echo ""

# Method 4: Show file info for manual transcription
echo "=== Method 4: Manual Transcription Info ==="
echo "📊 Your audio files info:"
for file in audio-source-files/*.mp3; do
    filename=$(basename "$file")
    size=$(du -h "$file" | cut -f1)
    duration=$(ffprobe -i "$file" -show_entries format=duration -v quiet -of csv="p=0" 2>/dev/null | cut -d. -f1)
    
    if [ -n "$duration" ]; then
        minutes=$((duration / 60))
        seconds=$((duration % 60))
        echo "  $filename - ${size} - ${minutes}m ${seconds}s"
    else
        echo "  $filename - ${size}"
    fi
done | head -5
echo "  ... and more"
echo ""

# Method 5: Batch processing template
echo "=== Method 5: Batch Processing Template ==="
cat > batch_transcribe_template.sh << 'EOF'
#!/bin/bash
# Batch transcription script template

mkdir -p transcriptions

echo "Starting batch transcription..."
for file in audio-source-files/*.mp3; do
    filename=$(basename "$file" .mp3)
    echo "Processing: $filename"
    
    # Option A: Using Whisper
    whisper "$file" --model medium --output_format txt --output_dir transcriptions
    
    # Option B: Using Google Cloud (requires setup)
    # python transcribe_google.py "$file" > "transcriptions/${filename}.txt"
    
    # Option C: Using Azure (requires setup)
    # python transcribe_azure.py "$file" > "transcriptions/${filename}.txt"
    
    echo "Completed: $filename"
done

echo "All transcriptions completed!"
echo "Results in: transcriptions/"
EOF

chmod +x batch_transcribe_template.sh
echo "✅ Created batch_transcribe_template.sh"
echo "   Edit this script to use your preferred transcription method"
echo ""

# Show next steps
echo "=== Next Steps ==="
echo "1. Choose your transcription method:"
echo "   • Whisper (free, local, accurate)"
echo "   • Web services (easy, some free tiers)"
echo "   • Cloud APIs (paid, very accurate)"
echo ""
echo "2. For Whisper installation:"
echo "   pipx install openai-whisper"
echo ""
echo "3. Test with one file first:"
echo "   whisper audio-source-files/fateoffenella_01_various_64kb.mp3 --model base"
echo ""
echo "4. Batch process all files:"
echo "   ./batch_transcribe_template.sh"
echo ""
echo "5. Upload transcripts to your TempoType database"
echo ""

echo "=== Demo Complete ==="