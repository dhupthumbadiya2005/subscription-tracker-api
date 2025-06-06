# 📱 Subscription Tracker API

A robust Node.js API for managing subscription renewals with automated email reminders.

## 🚀 Features

- User authentication with JWT
- Subscription management (CRUD operations)
- Automated renewal reminders via email
- Workflow scheduling with Upstash
- Rate limiting with Arcjet
- MongoDB database integration
- Email notifications using Nodemailer

## 📋 Prerequisites

- Node.js v16 or higher
- MongoDB database
- Gmail account for sending emails
- Upstash account for workflows
- Arcjet account for rate limiting

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/subscription-tracker-api.git
cd subscription-tracker-api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file `.env.development.local`:
```env
# Port configuration
PORT=5500
SERVER_URL="http://localhost:5500"

# Database configuration
DATABASE_URL="your-mongodb-url"

# Environment
NODE_ENV="development"

# JWT Configuration
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"

# Arcjet Configuration
ARCJET_KEY="your-arcjet-key"
ARCJET_ENV="development"

# Upstash Configuration
QSTASH_URL="your-qstash-url"
QSTASH_TOKEN="your-qstash-token"

# Email Configuration
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
```

4. Start the server:
```bash
npm run dev
```

## 📚 API Documentation

### Authentication

#### Register User
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

### Subscriptions

#### Create Subscription
```http
POST /api/v1/subscriptions
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
    "name": "Netflix",
    "amount": 199,
    "currency": "INR",
    "frequency": "monthly",
    "category": "entertainment",
    "paymentMethod": "credit_card",
    "status": "active",
    "startDate": "2024-03-15"
}
```

#### Get All Subscriptions
```http
GET /api/v1/subscriptions
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get Single Subscription
```http
GET /api/v1/subscriptions/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update Subscription
```http
PUT /api/v1/subscriptions/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
    "amount": 249,
    "status": "active"
}
```

#### Cancel Subscription
```http
PUT /api/v1/subscriptions/:id/cancel
Authorization: Bearer YOUR_JWT_TOKEN
```

### Workflows

#### Get Upcoming Renewals
```http
GET /api/v1/subscriptions/upcoming-renewals
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🔄 Workflow System

The API uses Upstash for scheduling renewal reminders:
- Reminders are sent at 7, 5, 2, and 1 days before renewal
- Email notifications are sent using Gmail
- Workflows are automatically created when subscriptions are added

## 🔒 Security Features

- JWT authentication
- Rate limiting with Arcjet
- Password hashing with bcrypt
- Input validation
- Error handling middleware

## 📧 Email Templates

The system includes email templates for:
- Subscription creation confirmation
- Renewal reminders
- Cancellation confirmation
- Payment due notifications

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 📱 Environment Support

- Development: `.env.development.local`
- Production: `.env.production.local`
- Testing: `.env.test.local`

## 🛟 Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Authentication failures
- Database errors
- Workflow scheduling issues
- Email sending failures

## 📦 Dependencies

```json
{
  "@upstash/qstash": "latest",
  "@upstash/workflow": "latest",
  "arcjet": "latest",
  "bcryptjs": "latest",
  "cookie-parser": "latest",
  "dayjs": "latest",
  "dotenv": "latest",
  "express": "latest",
  "jsonwebtoken": "latest",
  "mongoose": "latest",
  "nodemailer": "latest"
}
```






