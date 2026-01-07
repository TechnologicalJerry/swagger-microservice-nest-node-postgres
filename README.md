# Warehouse Management Microservices

A comprehensive warehouse management and wholesale application backend built with NestJS and MongoDB, following microservices architecture.

## Architecture

This application consists of multiple microservices:

1. **API Gateway** (Port 3000) - Main entry point for all requests
2. **Users Service** (Port 3001) - User management
3. **Auth Service** (Port 3002) - Authentication and authorization
4. **Products Service** (Port 3003) - Product catalog management
5. **Inventory Service** (Port 3004) - Stock management and inventory tracking
6. **Orders Service** (Port 3005) - Order processing and management
7. **Payments Service** (Port 3006) - Payment processing
8. **Notifications Service** (Port 3007) - Email and SMS notifications
9. **Reports Service** (Port 3008) - Business intelligence and reporting
10. **Audit Service** (Port 3009) - Audit logging and tracking

## Features

- **User Management**: Complete user CRUD operations with role-based access control
- **Authentication**: JWT-based authentication with role-based authorization
- **Product Management**: Full product catalog with categories, SKU management, and pricing
- **Inventory Management**: Real-time stock tracking, stock in/out operations, reservations
- **Order Management**: Complete order lifecycle from creation to delivery
- **Payment Processing**: Payment handling with multiple payment methods and refund support
- **Notifications**: Email and SMS notification system
- **Reporting**: Comprehensive business reports (sales, inventory, payments, user activity)
- **Audit Logging**: Complete audit trail for all system activities
- **API Gateway**: Centralized API gateway with request routing and Swagger documentation

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd swagger-microservice-nest-node-mongo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure MongoDB connection in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/warehouse-management
JWT_SECRET=your-secret-key-here
```

## Running the Application

### Development Mode

Run all services in development mode:
```bash
npm run start:dev
```

### Individual Services

Each service can be run individually:

```bash
# API Gateway
npm run start:dev api-gateway

# Users Service
npm run start:dev users-service

# Auth Service
npm run start:dev auth-service

# Products Service
npm run start:dev products-service

# Inventory Service
npm run start:dev inventory-service

# Orders Service
npm run start:dev orders-service

# Payments Service
npm run start:dev payments-service

# Notifications Service
npm run start:dev notifications-service

# Reports Service
npm run start:dev reports-service

# Audit Service
npm run start:dev audit-service
```

## API Documentation

Once the services are running, access the Swagger documentation:

- **API Gateway**: http://localhost:3000/swagger
- **Individual Services**: Each service has its own Swagger docs at `http://localhost:PORT/api`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/warehouse-management

# JWT
JWT_SECRET=your-secret-key-change-in-production

# Service URLs (optional, defaults to localhost)
USERS_SERVICE_URL=http://localhost:3001
AUTH_SERVICE_URL=http://localhost:3002
PRODUCTS_SERVICE_URL=http://localhost:3003
INVENTORY_SERVICE_URL=http://localhost:3004
ORDERS_SERVICE_URL=http://localhost:3005
PAYMENTS_SERVICE_URL=http://localhost:3006
NOTIFICATIONS_SERVICE_URL=http://localhost:3007
REPORTS_SERVICE_URL=http://localhost:3008
AUDIT_SERVICE_URL=http://localhost:3009

# Ports (optional, defaults shown)
PORT=3000
```

## User Roles

The system supports the following user roles:

- `admin` - Full system access
- `manager` - Management access
- `warehouse_staff` - Warehouse operations
- `sales` - Sales operations
- `customer` - Customer access

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Inventory
- `POST /inventory/stock-in` - Add stock
- `POST /inventory/stock-out` - Remove stock
- `GET /inventory/stock-level/:productId` - Get stock level
- `GET /inventory/stock-levels` - Get all stock levels
- `GET /inventory/history/:productId` - Get inventory history

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order
- `PATCH /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

### Payments
- `GET /payments` - Get all payments
- `GET /payments/:id` - Get payment by ID
- `POST /payments` - Create payment
- `POST /payments/refund` - Refund payment
- `PATCH /payments/:id/status` - Update payment status

### Notifications
- `POST /notifications/email` - Send email
- `POST /notifications/sms` - Send SMS
- `GET /notifications` - Get all notifications
- `GET /notifications/:id` - Get notification by ID

### Reports
- `GET /reports/sales` - Sales report
- `GET /reports/product-sales` - Product sales report
- `GET /reports/inventory` - Inventory report
- `GET /reports/payments` - Payment report
- `GET /reports/user-activity` - User activity report

### Audit
- `GET /audit` - Get all audit logs
- `GET /audit/user/:userId` - Get user audit logs
- `GET /audit/entity/:entityType/:entityId` - Get entity audit logs
- `POST /audit` - Create audit log

## Testing

Run tests:
```bash
npm test
```

Run e2e tests:
```bash
npm run test:e2e
```

## Project Structure

```
├── apps/
│   ├── api-gateway/          # API Gateway service
│   ├── auth-service/          # Authentication service
│   ├── users-service/         # Users management service
│   ├── products-service/      # Products management service
│   ├── inventory-service/    # Inventory management service
│   ├── orders-service/       # Orders management service
│   ├── payments-service/     # Payments processing service
│   ├── notifications-service/# Notifications service
│   ├── reports-service/      # Reports service
│   └── audit-service/        # Audit logging service
├── libs/
│   ├── common/               # Common utilities
│   ├── database/             # Database module
│   ├── messaging/            # Messaging module
│   └── contracts/            # Shared contracts
└── package.json
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Swagger** - API documentation
- **TypeScript** - Type-safe JavaScript
- **Class Validator** - Validation decorators
- **Passport** - Authentication middleware

## License

MIT

## Author

technojerry
