# 📘 HealthIQ AI – Your Intelligent Healthcare Companion

HealthIQ AI is a unified and intelligent healthcare platform designed to make healthcare simple, organized, and accessible for everyone. It brings together symptom analysis, doctor discovery, appointment booking, and secure medical storage—all powered by modern web technologies and clean architecture.

## 🚑 What Problem Does HealthIQ AI Solve?

Navigating healthcare is often confusing and time-consuming. Users face:

- Difficulty understanding symptoms
- Uncertainty about which specialist to visit
- Inconsistent appointment systems
- Scattered medical reports
- Lack of instant, trusted medical guidance
- Accessibility barriers for rural & elderly individuals

HealthIQ AI solves this by giving users one smart platform for everything—from symptoms to specialists.

## ✨ Features

### 🔍 1. Smart Symptom Checker
Enter your symptoms and receive:
- Possible conditions
- Urgency level
- Recommended specialists
- Suggested tests/checkups

### 🩺 2. Doctor Discovery
Find specialists by:
- Condition
- City/state/country
- Specialization
- Availability

### 📅 3. Appointment Booking
Book appointments directly through the platform—simple, fast, and fully digital.

### 🤖 4. AI-Assisted Health Queries
Ask health-related questions and get structured, safe, actionable guidance.

### 📁 5. Secure Report & Prescription Storage (Firebase)
Upload, manage, and access medical files anytime:
- Reports
- Prescriptions
- Documents

### 🧭 6. Personalized Health Recommendations
Users receive intelligent checkup suggestions based on symptoms and patterns.

### 🎨 7. Modern UI/UX
- Smooth animations with Framer Motion
- Interactive 3D elements with Spline
- Dark mode support
- Responsive design for all devices
- Accessible components

## 🏗️ Project Structure

```
healthwise-ai-95-main/
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── appointments/        # Appointment-related components
│   │   ├── chat/                # Chat interface components
│   │   ├── doctors/             # Doctor cards, profiles, sheets
│   │   ├── home/                # Landing page sections (Hero, Features, CTA)
│   │   ├── layout/              # Navbar, Footer, Layout wrappers
│   │   ├── ui/                  # shadcn-ui components
│   │   ├── AuthCard.tsx         # Authentication card component
│   │   ├── SplineBackground.tsx # 3D background animations
│   │   └── PageTransition.tsx   # Page transition animations
│   │
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Supabase authentication
│   │   ├── FirebaseAuthContext.tsx  # Firebase authentication
│   │   └── ThemeContext.tsx     # Dark/Light mode management
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useScrollAnimation.ts    # Scroll-based animations
│   │   ├── useSmoothScroll.ts       # Smooth scrolling behavior
│   │   ├── use-toast.ts             # Toast notifications
│   │   └── use-mobile.tsx           # Mobile detection
│   │
│   ├── integrations/            # Third-party integrations
│   │   └── supabase/            # Supabase client & queries
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── animations.ts        # Framer Motion animation variants
│   │   ├── firebase.ts          # Firebase configuration
│   │   └── utils.ts             # Helper functions
│   │
│   ├── pages/                   # Application pages/routes
│   │   ├── LandingAuth.tsx      # Authentication page (login/signup)
│   │   ├── Loading.tsx          # Loading screen with Spline
│   │   ├── Index.tsx            # Main landing page
│   │   ├── Dashboard.tsx        # User dashboard
│   │   ├── Symptoms.tsx         # Symptom checker
│   │   ├── Doctors.tsx          # Doctor discovery
│   │   ├── Appointments.tsx     # Appointment management
│   │   ├── About.tsx            # About page
│   │   └── NotFound.tsx         # 404 page
│   │
│   ├── services/                # API services
│   │   └── appointmentService.ts    # Appointment CRUD operations
│   │
│   ├── App.tsx                  # Main app component with routing
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles & Tailwind imports
│
├── public/                      # Static assets
├── FIREBASE_SETUP.md            # Firebase setup instructions
└── README.md                    # This file
```

## ⚙️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn-ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend & Services
- **Firebase** - Authentication & Cloud Storage
  - Firebase Auth for user management
  - Cloud Storage for medical documents
- **Supabase** - Alternative authentication option
- **Spline** - 3D interactive animations

### State Management & Data Fetching
- **React Context API** - Global state management
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### UI Components & Styling
- **next-themes** - Dark mode support
- **class-variance-authority** - Component variants
- **tailwind-merge** - Tailwind class merging
- **tailwindcss-animate** - Animation utilities
- **Sonner** - Toast notifications

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for authentication & storage)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yugmalviya1/healthiq.git
cd healthiq
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration (Optional)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Firebase Configuration (Required)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4️⃣ Firebase Setup

Follow the instructions in `FIREBASE_SETUP.md` to:
- Create a Firebase project
- Enable Authentication
- Set up Cloud Storage
- Configure security rules

### 5️⃣ Run the Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 6️⃣ Build for Production
```bash
npm run build
```

### 7️⃣ Preview Production Build
```bash
npm run preview
```

## 🚀 Available Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Authentication page (login/signup) | No |
| `/loading` | Loading screen with 3D animation | No |
| `/home` | Main landing page | No |
| `/about` | About HealthIQ AI | No |
| `/dashboard` | User dashboard | Yes |
| `/symptoms` | Symptom checker | Yes |
| `/doctors` | Find doctors | Yes |
| `/appointments` | Manage appointments | Yes |

## 🎨 Key Features Implementation

### Smooth Animations
- Custom scroll animations with Framer Motion
- 3.3-second loading spinner with smooth fade-out
- Page transitions for seamless navigation
- Interactive 3D Spline animations

### Dark Mode
- System preference detection
- Manual toggle support
- Optimized spinner and UI for both themes
- Persistent theme selection

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🤝 Contributing

Contributions are welcome! You can:
- Report bugs
- Suggest features
- Submit pull requests
- Improve UI/UX
- Help expand doctor datasets
- Write documentation

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is released under the **MIT License**, allowing open, free use.

## 🔗 Links

- **Repository**: [https://github.com/yugmalviya1/healthiq](https://github.com/yugmalviya1/healthiq)
- **Live Demo**: Coming soon
- **Documentation**: See `FIREBASE_SETUP.md` for Firebase configuration

## 👨‍💻 Developer

Built with ❤️ by the HealthIQ AI team

---

**Note**: This is a frontend-focused application. Backend API integration for symptom analysis and doctor recommendations can be added as needed.
