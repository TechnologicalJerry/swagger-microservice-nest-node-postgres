# Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5 or higher) - Make sure MongoDB is running
- npm or yarn

### 2. Installation

```bash
# Install dependencies
npm install
```

### 3. Environment Setup

Copy the example environment file:
```bash
# For development
cp development.env .env

# Or use the example
cp example.env .env
```

Edit `.env` file and update:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A strong secret key (minimum 32 characters)

### 4. Start MongoDB

Make sure MongoDB is running:
```bash
# On Windows (if installed as service, it should auto-start)
# Or start manually:
mongod

# On Linux/Mac
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 5. Run the Application

#### Option 1: Run All Services (Recommended for Development)
```bash
# Start API Gateway (this will be the main entry point)
npm run start:dev api-gateway
```

Then in separate terminals, start each service:
```bash
npm run start:dev users-service
npm run start:dev auth-service
npm run start:dev products-service
npm run start:dev inventory-service
npm run start:dev orders-service
npm run start:dev payments-service
npm run start:dev notifications-service
npm run start:dev reports-service
npm run start:dev audit-service
```

#### Option 2: Run Individual Services
Each service can run independently on its default port:
- API Gateway: http://localhost:3000
- Users Service: http://localhost:3001
- Auth Service: http://localhost:3002
- Products Service: http://localhost:3003
- Inventory Service: http://localhost:3004
- Orders Service: http://localhost:3005
- Payments Service: http://localhost:3006
- Notifications Service: http://localhost:3007
- Reports Service: http://localhost:3008
- Audit Service: http://localhost:3009

### 6. Access Swagger Documentation

- **API Gateway Swagger**: http://localhost:3000/swagger
- **Individual Service Swagger**: Each service has Swagger at `http://localhost:PORT/api`

### 7. Test with Postman

1. Import the Postman collection: `Warehouse-Management-API.postman_collection.json`
2. Set the `base_url` variable to `http://localhost:3000`
3. Start with the "Login" request to get an access token
4. The token will be automatically saved to the `access_token` variable
5. Use other endpoints with the token

## Environment Files

- **example.env** - Template with default values
- **development.env** - Development environment configuration
- **production.env** - Production environment configuration (update with your production values)

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the `MONGODB_URI` in your `.env` file
- Verify MongoDB is accessible on the specified host and port

### Port Already in Use
- Change the `PORT` in `.env` file
- Or stop the service using that port

### JWT Authentication Fails
- Ensure `JWT_SECRET` is set in `.env`
- Use the same `JWT_SECRET` across all services
- Token expires after 24 hours (default)

### Service Not Found Error
- Ensure all services are running
- Check service URLs in `.env` file
- Verify API Gateway can reach the services

## Production Deployment

1. Use `production.env` as a template
2. Update all service URLs to your production domains
3. Use a strong, randomly generated `JWT_SECRET`
4. Configure MongoDB connection with authentication
5. Enable HTTPS
6. Set up proper CORS origins
7. Configure rate limiting
8. Set up monitoring and logging

## Next Steps

1. Create your first user via `/auth/register`
2. Login to get an access token
3. Create products via `/products`
4. Add inventory via `/inventory/stock-in`
5. Create orders via `/orders`
6. Process payments via `/payments`

Enjoy building with the Warehouse Management API! 🚀

