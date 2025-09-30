#!/bin/bash

echo "🗄️ MongoDB Installation Script for Ubuntu WSL2"
echo "=============================================="

# Step 1: Import MongoDB GPG key
echo "Step 1: Importing MongoDB GPG key..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

if [ $? -eq 0 ]; then
    echo "✅ GPG key imported successfully"
else
    echo "❌ Failed to import GPG key"
    exit 1
fi

# Step 2: Add MongoDB repository
echo "Step 2: Adding MongoDB repository..."
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

if [ $? -eq 0 ]; then
    echo "✅ Repository added successfully"
else
    echo "❌ Failed to add repository"
    exit 1
fi

# Step 3: Update package database
echo "Step 3: Updating package database..."
sudo apt-get update

if [ $? -eq 0 ]; then
    echo "✅ Package database updated"
else
    echo "❌ Failed to update package database"
    exit 1
fi

# Step 4: Install MongoDB
echo "Step 4: Installing MongoDB..."
sudo apt-get install -y mongodb-org

if [ $? -eq 0 ]; then
    echo "✅ MongoDB installed successfully"
else
    echo "❌ Failed to install MongoDB"
    exit 1
fi

# Step 5: Create data directory (if needed)
echo "Step 5: Creating MongoDB data directory..."
sudo mkdir -p /data/db
sudo chown -R mongodb:mongodb /data/db

# Step 6: Start MongoDB
echo "Step 6: Starting MongoDB service..."
sudo systemctl start mongod

if [ $? -eq 0 ]; then
    echo "✅ MongoDB service started"
else
    echo "⚠️  systemctl failed, trying manual start..."
    sudo mongod --config /etc/mongod.conf --fork
fi

# Step 7: Enable MongoDB to start on boot
echo "Step 7: Enabling MongoDB to start on boot..."
sudo systemctl enable mongod

# Step 8: Check MongoDB status
echo "Step 8: Checking MongoDB status..."
sudo systemctl status mongod --no-pager

echo ""
echo "🎉 MongoDB installation completed!"
echo ""
echo "Next steps:"
echo "1. Test connection: mongosh"
echo "2. Update your .env file with: MONGODB_URI=mongodb://localhost:27017/tempotype"
echo "3. Restart your TempoType server: npm run server"