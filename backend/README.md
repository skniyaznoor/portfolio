# Portfolio Contact System

A complete contact form system with NestJS backend and PostgreSQL database.

## 🚀 Features

- **Contact Form**: Beautiful contact form in the frontend (Direct Line to Niyaz)
- **Database Storage**: All messages are stored in PostgreSQL
- **Admin Interface**: Simple web interface to view and reply to messages
- **Reply System**: Track which messages have been replied to

## 📋 Setup

### Prerequisites
- Node.js installed
- PostgreSQL database running
- Database credentials in `.env` file

### Database Configuration

The `.env` file contains:
```env
DATABASE_URL="postgresql://laraveluser:secret123@127.0.0.1:5432/portfolio?schema=public"
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run Prisma migrations:
```bash
npx prisma migrate dev
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. Start the development server:
```bash
npm run start:dev
```

The backend will run on `http://localhost:3002`

## 📬 Using the System

### Frontend Contact Form
Users can submit messages through the "Direct Line to Niyaz" form at `/create` in your frontend.

### Admin Interface
Access the admin panel at: **http://localhost:3002/admin/admin.html**

Features:
- View all contact messages
- See message status (Pending/Replied)
- Reply to messages directly from the interface
- Auto-refresh every 30 seconds

## 🔌 API Endpoints

### Get All Messages
```
GET /contacts
```

### Get Single Message
```
GET /contacts/:id
```

### Create Message (from frontend)
```
POST /contacts
Body: { name, email, message }
```

### Reply to Message
```
PATCH /contacts/:id/reply
Body: { reply: "your reply text" }
```

### Delete Message
```
DELETE /contacts/:id
```

## 📊 Database Schema

```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String
  reply     String?
  isReplied Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠 Tech Stack

- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Admin UI**: Vanilla HTML/CSS/JavaScript

## 📝 Notes

- Messages are stored permanently in the database
- The admin interface is a simple static HTML page
- CORS is enabled for frontend communication
- The system uses Prisma 7's new adapter pattern for PostgreSQL

## 🔐 Security Recommendations

For production:
1. Add authentication to the admin interface
2. Use environment variables for sensitive data
3. Implement rate limiting on the contact endpoint
4. Add email notifications for new messages
5. Sanitize all user inputs
