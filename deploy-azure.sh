#!/bin/bash

# Azure Deployment Script for TempoType
# This script creates all necessary Azure resources and deploys the application

set -e

# Configuration
RESOURCE_GROUP="tempotype-rg"
LOCATION="eastus"
BACKEND_APP_NAME="tempotype-api"
FRONTEND_APP_NAME="tempotype-frontend"
APP_SERVICE_PLAN="tempotype-plan"

echo "🚀 Starting Azure deployment for TempoType..."

# Create resource group
echo "📦 Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create App Service Plan (Linux, Node 20)
echo "📋 Creating App Service Plan..."
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --is-linux \
  --sku B1

# Create Backend Web App
echo "🔧 Creating Backend API Web App..."
az webapp create \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --name $BACKEND_APP_NAME \
  --runtime "NODE:22-lts"

# Create Frontend Web App
echo "🎨 Creating Frontend Web App..."
az webapp create \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --name $FRONTEND_APP_NAME \
  --runtime "NODE:22-lts"

# Configure Backend App Settings
echo "⚙️  Configuring Backend environment variables..."
az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name $BACKEND_APP_NAME \
  --settings \
    NODE_ENV=production \
    PORT=8080 \
    FRONTEND_URL="https://$FRONTEND_APP_NAME.azurewebsites.net"

# Configure Frontend App Settings
echo "⚙️  Configuring Frontend environment variables..."
az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name $FRONTEND_APP_NAME \
  --settings \
    NODE_ENV=production \
    VITE_API_URL="https://$BACKEND_APP_NAME.azurewebsites.net"

# Enable logging
echo "📊 Enabling application logging..."
az webapp log config \
  --resource-group $RESOURCE_GROUP \
  --name $BACKEND_APP_NAME \
  --application-logging filesystem \
  --level information

az webapp log config \
  --resource-group $RESOURCE_GROUP \
  --name $FRONTEND_APP_NAME \
  --application-logging filesystem \
  --level information

# Set deployment configurations
echo "🔄 Configuring deployment settings..."
az webapp config set \
  --resource-group $RESOURCE_GROUP \
  --name $BACKEND_APP_NAME \
  --startup-file "node server/src/app.js"

echo ""
echo "✅ Azure resources created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Set MongoDB connection string:"
echo "   az webapp config appsettings set -g $RESOURCE_GROUP -n $BACKEND_APP_NAME --settings MONGODB_URI='your-mongodb-uri'"
echo ""
echo "2. Set JWT secret:"
echo "   az webapp config appsettings set -g $RESOURCE_GROUP -n $BACKEND_APP_NAME --settings JWT_SECRET='your-secret-key'"
echo ""
echo "3. Deploy Backend:"
echo "   cd /home/thomas/projects/TempoType"
echo "   npm run build"
echo "   az webapp up --resource-group $RESOURCE_GROUP --name $BACKEND_APP_NAME"
echo ""
echo "4. Deploy Frontend:"
echo "   npm run build"
echo "   az webapp up --resource-group $RESOURCE_GROUP --name $FRONTEND_APP_NAME"
echo ""
echo "🌐 Your app URLs:"
echo "   Backend:  https://$BACKEND_APP_NAME.azurewebsites.net"
echo "   Frontend: https://$FRONTEND_APP_NAME.azurewebsites.net"
