#!/bin/bash

# VM Setup Script - Run this after VM is created
# Usage: ./setup-vm.sh <PUBLIC_IP>

if [ -z "$1" ]; then
  echo "Usage: ./setup-vm.sh <PUBLIC_IP>"
  exit 1
fi

PUBLIC_IP=$1
SSH_USER="azureuser"

echo "🚀 Setting up TempoType on Azure VM..."
echo "📡 Connecting to $PUBLIC_IP..."

# Create setup script to run on VM
cat > /tmp/vm-setup.sh << 'EOF'
#!/bin/bash
set -e

echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

echo "🐳 Installing Docker..."
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "👤 Adding user to docker group..."
sudo usermod -aG docker $USER

echo "✅ Docker installed successfully!"
docker --version

echo "📥 Installing Git..."
sudo apt-get install -y git

echo "✅ VM setup complete!"
echo "🔄 Please logout and login again for docker group to take effect"
echo "Then run: ./deploy-app.sh"
EOF

# Copy setup script to VM and execute
echo "📤 Uploading setup script..."
scp -o StrictHostKeyChecking=no /tmp/vm-setup.sh $SSH_USER@$PUBLIC_IP:~/
rm /tmp/vm-setup.sh

echo "🔧 Running setup on VM..."
ssh -o StrictHostKeyChecking=no $SSH_USER@$PUBLIC_IP 'bash ~/vm-setup.sh'

# Create deployment script
cat > /tmp/deploy-app.sh << 'EOF'
#!/bin/bash
set -e

echo "📥 Cloning TempoType repository..."
if [ -d "TempoType" ]; then
  cd TempoType
  git pull
else
  git clone https://github.com/tom-mcIvor/TempoType.git
  cd TempoType
fi

echo "🔧 Setting up environment variables..."
cat > .env << 'ENVEOF'
# Generate a secure JWT secret
JWT_SECRET=$(openssl rand -hex 64)
MONGODB_URI=mongodb://admin:$(openssl rand -hex 16)@mongodb:27017/tempotype?authSource=admin
ENVEOF

echo "🐳 Building and starting Docker containers..."
docker compose down -v 2>/dev/null || true
docker compose up -d --build

echo ""
echo "✅ TempoType deployed successfully!"
echo ""
echo "🌐 Your application is now running at:"
echo "   Frontend: http://$(curl -s ifconfig.me)"
echo "   Backend:  http://$(curl -s ifconfig.me):3001"
echo ""
echo "📊 Check logs with:"
echo "   docker compose logs -f"
echo ""
echo "🔄 Restart with:"
echo "   docker compose restart"
echo ""
EOF

echo "📤 Uploading deployment script..."
scp /tmp/deploy-app.sh $SSH_USER@$PUBLIC_IP:~/
rm /tmp/deploy-app.sh

echo ""
echo "✅ VM setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. SSH into your VM:"
echo "   ssh $SSH_USER@$PUBLIC_IP"
echo ""
echo "2. Deploy the application:"
echo "   bash ~/deploy-app.sh"
echo ""
echo "3. Access your app at:"
echo "   http://$PUBLIC_IP"
echo ""
