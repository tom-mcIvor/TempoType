import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { AudioFile } from './models/AudioFile';
import { TypingText } from './models/TypingText';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

// WPM directory mapping
const WPM_DIRECTORIES = [
  { dir: '20wpm', wpm: 20, difficulty: 'easy' },
  { dir: '40wpm', wpm: 40, difficulty: 'medium' },
  { dir: '50wpm', wpm: 50, difficulty: 'medium' },
  { dir: '60wpm', wpm: 60, difficulty: 'medium' },
  { dir: '80wpm', wpm: 80, difficulty: 'medium' },
  { dir: '100wpm', wpm: 100, difficulty: 'hard' },
  { dir: '120wpm', wpm: 120, difficulty: 'hard' },
];

function getDifficultyFromWPM(wpm: number): 'easy' | 'medium' | 'hard' {
  if (wpm <= 30) return 'easy';
  if (wpm <= 80) return 'medium';
  return 'hard';
}

function generateTitle(filename: string, wpm: number): string {
  // Remove .mp3 extension and clean up filename
  let title = filename.replace('.mp3', '');

  // Special handling for Fenella chapters
  const fenellaMatch = title.match(/fateoffenella_(\d+)_/);
  if (fenellaMatch) {
    const chapter = parseInt(fenellaMatch[1], 10);
    return `The Fate of Fenella - Chapter ${chapter}`;
  }

  // Clean up common patterns
  title = title
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^\d{3}\s*/, '') // Remove leading numbers like "020 "
    .trim();

  return title;
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    console.log('📡 Connecting to MongoDB Atlas...');

    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await AudioFile.deleteMany({});
    await TypingText.deleteMany({});
    console.log('✅ Existing data cleared');

    const audioFilesCreated = [];
    const typingTextsCreated = [];
    const audioSourceDir = path.join(__dirname, '../../audio-source-files');
    const transcriptionsDir = path.join(__dirname, '../../transcriptions');

    // Process each WPM directory
    for (const wpmConfig of WPM_DIRECTORIES) {
      const wpmDir = path.join(audioSourceDir, wpmConfig.dir);

      if (!fs.existsSync(wpmDir)) {
        console.log(`⚠️  Directory not found: ${wpmDir}`);
        continue;
      }

      console.log(`\n📁 Processing ${wpmConfig.wpm} WPM directory...`);
      const files = fs.readdirSync(wpmDir).filter(f => f.endsWith('.mp3'));

      console.log(`   Found ${files.length} audio files`);

      for (const filename of files) {
        console.log(`\n📝 Processing: ${filename}`);

        const audioPath = path.join(wpmDir, filename);
        const stats = fs.statSync(audioPath);
        const title = generateTitle(filename, wpmConfig.wpm);

        // Create AudioFile record
        const audioFile = new AudioFile({
          filename: filename,
          originalName: filename,
          mimetype: 'audio/mpeg',
          size: stats.size,
          title: title,
          genre: 'Typing Practice',
          isActive: true,
          uploadedAt: new Date(),
        });

        await audioFile.save();
        audioFilesCreated.push(audioFile);
        console.log(`  ✅ Created AudioFile: ${audioFile.title} (${wpmConfig.wpm} WPM)`);

        // Look for transcription file
        const transcriptionFilename = filename.replace('.mp3', '.txt');
        const transcriptionPath = path.join(transcriptionsDir, transcriptionFilename);

        if (fs.existsSync(transcriptionPath)) {
          const transcription = fs.readFileSync(transcriptionPath, 'utf-8');
          const wordCount = transcription.trim().split(/\s+/).filter(w => w.length > 0).length;

          // Create TypingText record
          const typingText = new TypingText({
            title: title,
            content: transcription,
            difficulty: wpmConfig.difficulty,
            category: 'Typing Practice',
            wordCount: wordCount,
            isActive: true,
          });

          await typingText.save();
          typingTextsCreated.push(typingText);
          console.log(`  ✅ Created TypingText: ${typingText.title} (${typingText.wordCount} words)`);
        } else {
          console.log(`  ℹ️  No transcription found for: ${transcriptionFilename}`);
        }
      }
    }

    console.log('\n\n✨ Database seeding completed!');
    console.log(`📊 Summary:`);
    console.log(`   - AudioFiles created: ${audioFilesCreated.length}`);
    console.log(`   - TypingTexts created: ${typingTextsCreated.length}`);
    console.log(`\n📈 Breakdown by WPM:`);

    for (const wpmConfig of WPM_DIRECTORIES) {
      const count = audioFilesCreated.filter(a =>
        a.filename && fs.existsSync(path.join(audioSourceDir, wpmConfig.dir, a.filename))
      ).length;
      if (count > 0) {
        console.log(`   - ${wpmConfig.wpm} WPM: ${count} files`);
      }
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('🎉 Seed process completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed process failed:', error);
    process.exit(1);
  });
