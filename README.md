# Simple Node.js + MongoDB App

A minimal Node.js application with Express and MongoDB for user CRUD operations.

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or remote) - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas cloud

## Installation

1. **Clone or navigate to the project folder:**
   ```bash
   cd nodejs-newApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your MongoDB connection string and desired port.

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

**Open the GUI:** Go to `http://localhost:5000` in your browser to see the dashboard!

## GUI Features

- 📊 **Dashboard** - Beautiful user management interface
- ✅ **Create Users** - Add new users with form validation
- 👥 **View Users** - List all users with details
- 🗑️ **Delete Users** - Remove users with confirmation
- 🟢 **Health Status** - Real-time API connection indicator
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## API Endpoints

### Health Check
```bash
GET http://localhost:5000/health
```

### Get All Users
```bash
GET http://localhost:5000/users
```

### Get User by ID
```bash
GET http://localhost:5000/users/:id
```

### Create User
```bash
POST http://localhost:5000/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

### Update User
```bash
PUT http://localhost:5000/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 26
}
```

### Delete User
```bash
DELETE http://localhost:5000/users/:id
```

## Testing with cURL

```bash
# Get all users
curl http://localhost:5000/users

# Create a user
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":25}'

# Update a user (replace USER_ID with actual ID)
curl -X PUT http://localhost:5000/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","age":26}'

# Delete a user
curl -X DELETE http://localhost:5000/users/USER_ID
```

## Manual Deployment Steps

### On Your Server:

1. **SSH into your server:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js and npm (if not already installed):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install MongoDB (if not already installed):**
   ```bash
   sudo apt-get install -y mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

4. **Clone or copy your project:**
   ```bash
   git clone <your-repo-url>
   cd nodejs-newApp
   ```

5. **Install dependencies:**
   ```bash
   npm install
   ```

6. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   nano .env
   ```

7. **Start the server (using PM2 for production):**
   ```bash
   # Install PM2 globally
   sudo npm install -g pm2
   
   # Start app with PM2
   pm2 start server.js --name "nodejs-app"
   pm2 startup
   pm2 save
   ```

8. **Verify it's running:**
   ```bash
   curl http://localhost:5000/health
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/nodejs_app` |

## Project Structure

```
nodejs-newApp/
├── server.js              # Main application file
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
├── .env                   # Local environment variables (not in git)
├── public/                # Frontend files
│   ├── index.html         # Dashboard GUI
│   ├── styles.css         # Dashboard styling
│   └── app.js             # Dashboard JavaScript logic
└── README.md              # This file
```

## Features

- ✓ Express.js for routing
- ✓ MongoDB for data persistence
- ✓ CORS enabled for cross-origin requests
- ✓ Mongoose for schema validation
- ✓ Error handling middleware
- ✓ Health check endpoint
- ✓ Full CRUD operations for users

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `sudo systemctl status mongodb`
- Check MongoDB URI in `.env`
- If using MongoDB Atlas, whitelist your IP

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Dependencies Installation Failed
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## License

ISC
# Nodejs-Mongodb-Project
