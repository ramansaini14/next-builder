# 🎯 Drag & Drop Tool

A modern, intuitive drag and drop tool built with Next.js that provides seamless file management and organization capabilities.

## ✨ Features

- 🖱️ **Intuitive Drag & Drop Interface** - Effortlessly move files and folders with smooth animations
- 📁 **File Management** - Upload, organize, and manage files with ease
- 🎨 **Modern UI/UX** - Clean, responsive design that works across all devices
- ⚡ **Real-time Updates** - Instant feedback and updates during drag operations
- 🔐 **Secure File Handling** - Safe file upload and management with validation
- 📱 **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎭 **Theme Support** - Light and dark mode compatibility
- 🚀 **Fast Performance** - Optimized with Next.js for lightning-fast loading

## 🛠️ Tech Stack

### Frontend (Client)
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React DnD** - Drag and drop functionality
- **Zustand** - State management

### Backend (Server)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drag-and-drop-tool.git
   cd drag-and-drop-tool
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In the server directory
   cp .env.example .env
   
   # In the client directory
   cd ../client
   cp .env.local.example .env.local
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Start the backend server
   cd server
   npm run dev

   # Terminal 2 - Start the frontend client
   cd client
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
drag-and-drop-tool/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages and layouts
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── stores/        # State management
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express.js backend API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── uploads/           # File upload directory
│   └── package.json
└── README.md
```

## 🎮 Usage

### Basic Drag & Drop Operations

1. **Upload Files**: Drag files from your computer directly into the drop zone
2. **Organize Files**: Drag and drop files between folders to organize them
3. **Create Folders**: Right-click in empty space to create new folders
4. **Rename Items**: Double-click on file/folder names to rename them
5. **Delete Items**: Select items and press Delete key or use context menu

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + A` | Select all items |
| `Ctrl + C` | Copy selected items |
| `Ctrl + V` | Paste items |
| `Delete` | Delete selected items |
| `F2` | Rename selected item |
| `Escape` | Cancel current operation |

## 🔧 Configuration

### Environment Variables

#### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/*,application/pdf,.doc,.docx
```

#### Server (.env)
```env
PORT=5000
NODE_ENV=development
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
CORS_ORIGIN=http://localhost:3000
```

## 📚 API Documentation

### File Upload
```
POST /api/files/upload
Content-Type: multipart/form-data

Body: {
  files: File[],
  folder?: string
}
```

### Get Files
```
GET /api/files
Query: {
  folder?: string,
  page?: number,
  limit?: number
}
```

### Move Files
```
PUT /api/files/move
Body: {
  fileIds: string[],
  targetFolder: string
}
```

### Delete Files
```
DELETE /api/files/:id
```

## 🧪 Testing

```bash
# Run client tests
cd client
npm run test

# Run server tests
cd server
npm run test

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended for Frontend)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment

```bash
# Build client
cd client
npm run build

# Build server
cd ../server
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you encounter any issues or have questions:

- 📧 Email: support@yourdomain.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/drag-and-drop-tool/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/drag-and-drop-tool/discussions)

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [React DnD](https://react-dnd.github.io/react-dnd/) for drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

---

<p align="center">Made with ❤️ Raman</p>
