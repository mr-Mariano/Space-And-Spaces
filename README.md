# Eden Tree - Mars Habitat Design

> Interactive 3D Mars habitat designer for professional space missions

Eden Tree is a modular space habitat visualization tool designed for Mars missions. Users can explore, customize, and configure living spaces optimized for 4-astronaut crews in the Gale Crater location.

## ⚠️ Performance Notice

**If images load slowly on the live demo**, this is due to the high-resolution assets used for the 3D visualization. For the best experience, we recommend running the project locally following the instructions below.

## 📄 Documentation

**📋 [NASA Space Apps Challenge Documentation](./docs/Space%20&%20Spaces%202025%20NASA%20Space%20Apps%20Challenge%20Info.pdf)


Complete project documentation including technical specifications, design rationale, and NASA Space Apps Challenge submission details.

## ✨ Features

- **3D Interactive Visualization** - Explore the habitat with orbital controls
- **Material Selection** - Choose from Mars-optimized construction materials
- **Modular Design** - 1 TRUNK + 5 ROOT specialized modules
- **Multilingual Support** - English, Spanish, French, German
- **PDF Export** - Generate detailed habitat specifications
- **Social Sharing** - Share configurations across platforms

## 🚀 Tech Stack

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server

### 3D Visualization
- **Three.js** - 3D Rendering Engine
- **React Three Fiber** - React-Three.js Integration
- **React Three Drei** - 3D Helpers & Controls

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Component Library
- **Radix UI** - Headless Components
- **Lucide React** - Icon System

### Utilities
- **React Router** - Navigation
- **jsPDF** - PDF Generation
- **React Hook Form** - Form Management
- **Context API** - State Management

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/eden-tree-planner.git
cd eden-tree-planner

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint
```

### Why Run Locally?

- **Faster Image Loading** - Assets served from local filesystem
- **Better 3D Performance** - No network latency for 3D models
- **Development Features** - Hot reload, debugging tools
- **Offline Access** - Work without internet connection

## 🌍 Mission Focus

Designed specifically for Mars missions with:
- **Gale Crater** location optimization
- **4-astronaut crew** capacity
- **NASA-compliant** functional separation
- **Mars-specific materials** (Sulfur-Regolith, Geopolímero, Kevlar)

## 📱 Responsive Design

Fully responsive interface optimized for:
- Desktop (3D visualization)
- Tablet (touch controls)
- Mobile (simplified navigation)

## 🚀 Deployment

The application is built as a static site and can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

---

**Built with ❤️ for the future of Mars colonization**
