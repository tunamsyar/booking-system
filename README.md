# Meeting Room Booking System

A full-stack TypeScript application for managing meeting room bookings with real-time availability tracking.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeORM + SQLite
- **Development**: Docker Compose with hot reloading
- **Database**: SQLite with persistent storage

## 📁 Project Structure

## ✨ Features

### 🎯 **Core Functionality**
- **Room Management**: View available meeting rooms with capacity
- **Real-time Booking**: Book time slots with instant availability updates
- **My Bookings**: View personal booking history and upcoming meetings
- **Conflict Prevention**: Automatic detection of booking conflicts

### 🔧 **Technical Features**
- **TypeScript**: Full type safety across frontend and backend
- **Hot Reloading**: Instant development feedback with Docker
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Error Handling**: Comprehensive error handling with user feedback
- **Health Monitoring**: Backend health checks and monitoring

### 🎨 **User Experience**
- **Intuitive Interface**: Clean, modern design with clear visual states
- **Loading States**: Smooth loading indicators for all operations
- **Real-time Updates**: Availability updates without page refresh
- **Booking Feedback**: Clear success/error messages
- **Today's Highlight**: Special highlighting for today's bookings

## 🚀 Quick Start (Docker - Recommended)

### Prerequisites
- Docker Desktop installed and running
- Git for cloning the repository

### 1. Clone the Repository
```bash
git clone git@github.com:tunamsyar/booking-system.git
cd booking-system
```

### 2. Start the Application
```bash
# Build and start all services
docker-compose up --build

# Or start in detached mode (background)
docker-compose up -d --build
```

### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

### 4. Stop the Application
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v
```

## 🛠️ Development Commands

### Using Make (Recommended)
```bash
# Start all services
make up

# Start in background
make up-detached

# View logs
make logs

# Stop services
make down

# Reset database (removes all bookings)
make reset-db

# Rebuild and restart
make restart

# Clean everything (containers, volumes, images)
make clean

# Show help
make help
```

### Using Docker Compose Directly
```bash
# Development workflow
docker-compose up --build          # Start with rebuild
docker-compose up -d               # Start detached
docker-compose logs -f             # Follow logs
docker-compose logs -f frontend    # Frontend logs only
docker-compose logs -f backend     # Backend logs only

# Service management
docker-compose restart frontend    # Restart frontend only
docker-compose restart backend     # Restart backend only
docker-compose build frontend      # Rebuild frontend only
docker-compose build backend       # Rebuild backend only

# Database management
docker-compose down -v             # Remove database
docker volume rm booking-dev-db    # Force remove database volume

# Debugging
docker-compose exec frontend sh    # Access frontend container
docker-compose exec backend sh     # Access backend container
```

## 💻 Local Development (Without Docker)

### Prerequisites
- Node.js 18+ and npm
- Git

### Backend Setup
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

### Frontend Setup
```bash
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
# Runs on http://localhost:5173
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```bash
# Copy example file
cp .env.example .env
```

#### Backend Variables
```env
NODE_ENV=development
PORT=3001
DB_PATH=/app/data/bookings.db
DEBUG=*
LOG_LEVEL=debug
```

#### Frontend Variables
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ENV=development
```

### Database Configuration
- **Development**: SQLite database with persistent Docker volume
- **Location**: `./volumes/booking_db` (mapped to `/app/data` in container)
- **Auto-migration**: Tables created automatically on startup
- **Sample data**: 3 sample rooms inserted on first run

## 📡 API Endpoints

### Room Management
- `GET /api/rooms` - Get all rooms with availability
- `GET /api/rooms/:id` - Get specific room details

### Booking Management
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Cancel booking (if implemented)

### System
- `GET /api/health` - Health check endpoint

### Example API Usage
```bash
# Health check
curl http://localhost:3001/api/health

# Get rooms with availability
curl http://localhost:3001/api/rooms

# Get user bookings
curl -H "x-user-id: user123" http://localhost:3001/api/bookings

# Create booking
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -H "x-user-id: user123" \
  -d '{"roomId": 1, "timeSlot": "09:00-10:00"}'
```

## 🧪 Testing the Application

### Manual Testing Workflow
1. **Start services**: `make up` or `docker-compose up --build`
2. **Open frontend**: Navigate to http://localhost:5173
3. **View rooms**: Should see 3 sample rooms with time slots
4. **Book a slot**: Click an available green time slot
5. **Check booking**: Navigate to "My Bookings" tab
6. **Test conflicts**: Try booking the same slot again (should fail)
7. **View updates**: Room availability should update in real-time
8. **User Switching**: Swap out the `MOCK_USER_ID` in `frontend/src/utils/constants.ts` value to simulate different logged in users

### Expected Behaviors
- ✅ Rooms load with availability data
- ✅ Booking shows loading state ("Booking...")
- ✅ Success updates availability immediately
- ✅ Errors show clear user-friendly messages
- ✅ My Bookings displays created reservations
- ✅ Navigation badge shows booking count
- ✅ Today's bookings are highlighted

### Sample Data
The application starts with 3 pre-configured rooms:
- **Conference Room A** (Capacity: 8 people)
- **Meeting Room B** (Capacity: 4 people)
- **Huddle Space C** (Capacity: 2 people)

Each room has time slots from 9:00 AM to 6:00 PM in 1-hour intervals.

## 🐛 Troubleshooting

### Common Issues

#### Docker Issues
```bash
# Reset everything
make clean

# Check Docker is running
docker --version
docker-compose --version

# View detailed logs
docker-compose logs --no-color > debug.log
```

#### Database Issues
```bash
# Reset database completely
make reset-db

# Check database exists
docker volume ls | grep booking

# Access database container (if needed)
docker-compose exec backend sh
ls -la /app/data/
```

#### Frontend Issues
```bash
# Clear Vite cache
docker-compose exec frontend rm -rf node_modules/.vite
docker-compose restart frontend

# Rebuild frontend only
docker-compose build frontend
docker-compose up -d frontend
```

#### Backend Issues
```bash
# Check backend health
curl http://localhost:3001/api/health

# View backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

### Performance Issues
- **Slow startup**: Normal for first run (building images)
- **Hot reload delay**: Vite should be instant; check file polling
- **Memory usage**: Typical usage ~500MB for both containers

## 🔐 Security Notes

⚠️ **This is a development setup** - not production ready!

- No authentication/authorization
- Uses mock user ID (`user123`)
- CORS enabled for localhost
- Debug logging enabled
- SQLite database (not suitable for production)

For production deployment, consider:
- Authentication system (JWT, OAuth)
- PostgreSQL/MySQL database
- Environment-specific configurations
- HTTPS termination
- Input validation and sanitization
- Rate limiting
- Security headers

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test locally
4. Ensure Docker build works: `make restart`
5. Test all functionality manually
6. Commit changes: `git commit -m "Add feature"`
7. Push to branch: `git push origin feature-name`
8. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help
- **Issues**: Create a GitHub issue with detailed description
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check inline code comments

---

**Happy Coding! 🚀**
