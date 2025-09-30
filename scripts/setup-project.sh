#!/bin/bash

echo "🚀 TempoType Project Setup"
echo "========================="

# Create necessary directories
echo "Creating project directories..."
mkdir -p server/uploads/audio
mkdir -p server/logs
mkdir -p docs/api

echo "✅ Directories created"

# Set proper permissions
chmod 755 server/uploads
chmod 755 server/uploads/audio

echo "✅ Permissions set"

echo ""
echo "📋 Next Steps:"
echo "1. Install MongoDB: ./scripts/install-mongodb.sh"
echo "2. Start your server: npm run server"
echo "3. Test the API: curl http://localhost:3001/api/health"
echo ""
echo "🔧 Alternative MongoDB Options:"
echo "- Local installation: Follow the script above"
echo "- Cloud MongoDB Atlas: See docs/MONGODB_SETUP.md"
echo ""
echo "📚 Documentation:"
echo "- MongoDB Setup: docs/MONGODB_SETUP.md"
echo "- Tech Stack: docs/TECH_STACK.md"