#!/bin/bash

# Azure VM Deployment Script for TempoType
# This script creates a VM and deploys your containerized application

set -e

# Configuration
RESOURCE_GROUP="tempotype-rg"
LOCATION="eastus"  # US East (Virginia) - B1s available
VM_NAME="tempotype-vm"
VM_SIZE="Standard_B1s"  # Cheapest: ~$7.59/month (1 vCPU, 1GB RAM)
# VM_SIZE="Standard_B2s"  # Better: ~$30/month (2 vCPUs, 4GB RAM)
VM_IMAGE="Ubuntu2204"
ADMIN_USERNAME="azureuser"
NSG_NAME="tempotype-nsg"
PUBLIC_IP_NAME="tempotype-ip"

echo "🚀 Starting Azure VM deployment for TempoType..."

# Create resource group
echo "📦 Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Network Security Group (Firewall rules)
echo "🔒 Creating Network Security Group..."
az network nsg create \
  --resource-group $RESOURCE_GROUP \
  --name $NSG_NAME \
  --location $LOCATION

# Allow SSH (port 22)
echo "🔓 Opening SSH port..."
az network nsg rule create \
  --resource-group $RESOURCE_GROUP \
  --nsg-name $NSG_NAME \
  --name AllowSSH \
  --priority 1000 \
  --source-address-prefixes '*' \
  --destination-port-ranges 22 \
  --protocol Tcp \
  --access Allow

# Allow HTTP (port 80)
echo "🔓 Opening HTTP port..."
az network nsg rule create \
  --resource-group $RESOURCE_GROUP \
  --nsg-name $NSG_NAME \
  --name AllowHTTP \
  --priority 1001 \
  --source-address-prefixes '*' \
  --destination-port-ranges 80 \
  --protocol Tcp \
  --access Allow

# Allow HTTPS (port 443)
echo "🔓 Opening HTTPS port..."
az network nsg rule create \
  --resource-group $RESOURCE_GROUP \
  --nsg-name $NSG_NAME \
  --name AllowHTTPS \
  --priority 1002 \
  --source-address-prefixes '*' \
  --destination-port-ranges 443 \
  --protocol Tcp \
  --access Allow

# Allow Backend API (port 3001)
echo "🔓 Opening Backend API port..."
az network nsg rule create \
  --resource-group $RESOURCE_GROUP \
  --nsg-name $NSG_NAME \
  --name AllowBackend \
  --priority 1003 \
  --source-address-prefixes '*' \
  --destination-port-ranges 3001 \
  --protocol Tcp \
  --access Allow

# Create public IP
echo "🌐 Creating public IP address..."
az network public-ip create \
  --resource-group $RESOURCE_GROUP \
  --name $PUBLIC_IP_NAME \
  --location $LOCATION \
  --allocation-method Static \
  --sku Standard

# Create VM
echo "💻 Creating Virtual Machine ($VM_SIZE)..."
az vm create \
  --resource-group $RESOURCE_GROUP \
  --name $VM_NAME \
  --image $VM_IMAGE \
  --size $VM_SIZE \
  --admin-username $ADMIN_USERNAME \
  --generate-ssh-keys \
  --public-ip-address $PUBLIC_IP_NAME \
  --nsg $NSG_NAME \
  --storage-sku Standard_LRS

# Get public IP
PUBLIC_IP=$(az network public-ip show \
  --resource-group $RESOURCE_GROUP \
  --name $PUBLIC_IP_NAME \
  --query ipAddress \
  --output tsv)

echo ""
echo "✅ Azure VM created successfully!"
echo ""
echo "📝 VM Details:"
echo "   Name: $VM_NAME"
echo "   Size: $VM_SIZE"
echo "   Public IP: $PUBLIC_IP"
echo "   Username: $ADMIN_USERNAME"
echo ""
echo "🔑 SSH Connection:"
echo "   ssh $ADMIN_USERNAME@$PUBLIC_IP"
echo ""
echo "📝 Next steps:"
echo "1. SSH into the VM and set up Docker:"
echo "   ssh $ADMIN_USERNAME@$PUBLIC_IP"
echo ""
echo "2. Or run the automated setup script:"
echo "   ./setup-vm.sh $PUBLIC_IP"
echo ""
echo "🌐 Once deployed, your app will be at:"
echo "   http://$PUBLIC_IP"
echo ""
