# Docker Guide for TempoType

## What Was Created

- `Dockerfile.backend` - Backend API container (Node.js 22 + Express)
- `Dockerfile.frontend` - Frontend container (React + Vite + Nginx)
- `docker-compose.yml` - Run everything together (Frontend + Backend + MongoDB)
- `.dockerignore` - Keeps Docker images small
- `.env.docker` - Environment variables template

## Quick Start

### 1. Install Docker
If you don't have Docker installed:
- **Windows/Mac**: Download Docker Desktop from https://www.docker.com/products/docker-desktop
- **Linux**: `sudo apt-get install docker.io docker-compose`

### 2. Build and Run Everything

```bash
# Build and start all containers
docker-compose up --build

# Or run in background (detached mode)
docker-compose up -d --build
```

This will start:
- MongoDB on `localhost:27017`
- Backend API on `http://localhost:3001`
- Frontend on `http://localhost` (port 80)

### 3. Access Your App

Open your browser to: **http://localhost**

## Common Commands

```bash
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild after code changes
docker-compose up --build

# Remove everything (including volumes)
docker-compose down -v
```

## Using Your MongoDB Atlas Instead of Local MongoDB

Edit `docker-compose.yml` and update the backend environment:

```yaml
backend:
  environment:
    MONGODB_URI: mongodb+srv://your-username:password@cluster.mongodb.net/tempotype
```

Then remove the `mongodb` service from docker-compose.yml if not needed.

## Building Individual Containers

```bash
# Build backend only
docker build -f Dockerfile.backend -t tempotype-backend .

# Build frontend only
docker build -f Dockerfile.frontend -t tempotype-frontend .

# Run backend manually
docker run -p 3001:3001 \
  -e MONGODB_URI="your-connection-string" \
  -e JWT_SECRET="your-secret" \
  tempotype-backend

# Run frontend manually
docker run -p 80:80 tempotype-frontend
```

## Deployment Options

### Deploy to Azure Container Instances

```bash
# Login to Azure
az login

# Create container registry
az acr create --resource-group tempotype-rg \
  --name tempotyperegistry --sku Basic

# Build and push to registry
az acr build --registry tempotyperegistry \
  --image tempotype-backend:latest \
  --file Dockerfile.backend .

az acr build --registry tempotyperegistry \
  --image tempotype-frontend:latest \
  --file Dockerfile.frontend .

# Deploy containers
az container create \
  --resource-group tempotype-rg \
  --name tempotype-backend \
  --image tempotyperegistry.azurecr.io/tempotype-backend:latest \
  --dns-name-label tempotype-api \
  --ports 3001
```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and initialize
railway login
railway init

# Deploy
railway up
```

### Deploy to Render

1. Connect your GitHub repo to Render
2. Create "Web Service" for backend (use Dockerfile.backend)
3. Create "Static Site" for frontend (use Dockerfile.frontend)
4. Set environment variables in Render dashboard

### Deploy to DigitalOcean App Platform

```bash
# Install doctl
# Connect to DigitalOcean
doctl apps create --spec .do/app.yaml
```

## Troubleshooting

### Port already in use
```bash
# Find process using port 80
sudo lsof -i :80

# Or change port in docker-compose.yml
ports:
  - "8080:80"  # Access at localhost:8080
```

### Permission denied
```bash
# Add your user to docker group (Linux)
sudo usermod -aG docker $USER
# Then logout and login again
```

### Containers won't start
```bash
# Check logs
docker-compose logs

# Remove old containers and volumes
docker-compose down -v
docker system prune -a
```

### MongoDB connection issues
```bash
# Check if MongoDB is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec -it tempotype-mongodb mongosh -u admin -p password123
```

## Production Considerations

1. **Change default passwords** in docker-compose.yml
2. **Use secrets management** (Azure Key Vault, AWS Secrets Manager)
3. **Set up reverse proxy** (Nginx, Traefik) with SSL
4. **Use multi-stage builds** (already implemented)
5. **Scan for vulnerabilities**: `docker scan tempotype-backend`
6. **Set resource limits** in docker-compose.yml:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```

## Next Steps

1. Test locally with `docker-compose up`
2. Choose deployment platform (Azure, Railway, Render, etc.)
3. Set up CI/CD pipeline
4. Configure monitoring and logging
