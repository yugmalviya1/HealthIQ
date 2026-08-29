# 🩺 HealthIQ AI

### Your intelligent healthcare companion.

**HealthIQ AI** is a modern AI-powered healthcare platform designed to simplify the way people understand symptoms, find the right doctors, manage appointments, and organize their medical records — all from one place.

Instead of jumping between search engines, doctor directories, appointment platforms, and scattered medical documents, HealthIQ brings the entire healthcare journey into a single, intuitive platform.

> **Understand your symptoms. Find the right specialist. Manage your healthcare.**

---

## ✨ Why HealthIQ?

Healthcare information is often fragmented.

People commonly struggle with:

* Understanding whether their symptoms require medical attention
* Knowing which specialist they should consult
* Finding relevant doctors
* Managing appointments
* Keeping medical reports and prescriptions organized
* Getting quick, structured health information
* Accessing healthcare information through an easy-to-use interface

**HealthIQ AI aims to solve these problems through a unified digital healthcare experience.**

---

## 🚀 Core Features

### 🤖 AI Symptom Analysis

Describe your symptoms and receive structured insights including:

* Possible health conditions
* Symptom severity / urgency
* Recommended medical specialists
* Suggested checkups or tests
* Actionable next steps

> HealthIQ is designed to assist users with health information, not replace professional medical diagnosis.

---

### 🩺 Doctor Discovery

Find suitable healthcare professionals based on:

* Medical specialization
* Condition
* Location
* Availability
* Doctor profiles

The goal is to reduce the gap between **"I have these symptoms"** and **"I know which specialist I should see."**

---

### 📅 Appointment Management

Manage your healthcare appointments digitally.

Users can:

* View appointments
* Schedule appointments
* Track appointment details
* Manage upcoming consultations

---

### 💬 AI Health Assistant

Ask health-related questions through a conversational interface and receive structured, easy-to-understand responses.

The assistant is designed to turn complicated healthcare information into simpler, actionable explanations.

---

### 📁 Medical Records

Keep important healthcare documents organized in one place.

Store:

* 🧾 Medical reports
* 💊 Prescriptions
* 📄 Healthcare documents
* 🗂️ Other medical files

Firebase Cloud Storage is used for document storage.

---

### 🧠 Personalized Health Guidance

HealthIQ can provide recommendations based on the information users provide, helping them understand potential next steps and when professional medical attention may be appropriate.

---

### 🎨 Modern User Experience

Built with a modern, responsive interface featuring:

* Responsive design
* Dark / light mode
* Smooth page transitions
* Micro-interactions
* Framer Motion animations
* Interactive 3D elements
* Accessible UI components
* Mobile-friendly layouts

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      HealthIQ       │
                    │     Web Client      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │ AI Health   │  │   Doctors   │  │Appointments │
       │  Assistant  │  │  Discovery  │  │ Management  │
       └─────────────┘  └─────────────┘  └─────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Authentication &   │
                    │      Storage        │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
               Firebase               Supabase
             Auth + Storage         Data / Services
```

---

# 🧩 Application Structure

```text
src/
│
├── components/
│   ├── appointments/
│   ├── chat/
│   ├── doctors/
│   ├── home/
│   ├── layout/
│   └── ui/
│
├── contexts/
│   ├── AuthContext.tsx
│   ├── FirebaseAuthContext.tsx
│   └── ThemeContext.tsx
│
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useSmoothScroll.ts
│   ├── use-toast.ts
│   └── use-mobile.tsx
│
├── integrations/
│   └── supabase/
│
├── lib/
│   ├── animations.ts
│   ├── firebase.ts
│   └── utils.ts
│
├── pages/
│   ├── LandingAuth.tsx
│   ├── Dashboard.tsx
│   ├── Symptoms.tsx
│   ├── Doctors.tsx
│   ├── Appointments.tsx
│   ├── About.tsx
│   └── NotFound.tsx
│
├── services/
│   └── appointmentService.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 🛠️ Tech Stack

## Frontend

| Technology        | Purpose                     |
| ----------------- | --------------------------- |
| **React**         | Component-based UI          |
| **TypeScript**    | Type-safe development       |
| **Vite**          | Development & build tooling |
| **React Router**  | Application routing         |
| **Tailwind CSS**  | Styling                     |
| **shadcn/ui**     | UI components               |
| **Radix UI**      | Accessible primitives       |
| **Framer Motion** | Animations                  |
| **Lucide React**  | Icons                       |

## Backend & Cloud

| Technology                  | Purpose                     |
| --------------------------- | --------------------------- |
| **Firebase Authentication** | User authentication         |
| **Firebase Cloud Storage**  | Medical document storage    |
| **Supabase**                | Database / backend services |
| **Spline**                  | Interactive 3D experiences  |

## State & Forms

| Technology            | Purpose                  |
| --------------------- | ------------------------ |
| **TanStack Query**    | Server-state management  |
| **React Context API** | Global application state |
| **React Hook Form**   | Form management          |
| **Zod**               | Schema validation        |

---

# ⚡ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm
* Firebase project
* Supabase project

---

## 1. Clone the repository

```bash
git clone https://github.com/yugmalviya1/HealthIQ.git
cd HealthIQ
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure Firebase

Create a Firebase project and configure authentication and Cloud Storage.

Follow the detailed setup instructions:

```text
FIREBASE_SETUP.md
```

Add your Firebase configuration according to the project's configuration files.

---

## 4. Configure Supabase

Create a Supabase project and configure the required environment variables.

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Never commit API keys, service-role keys, or other secrets to GitHub.

---

## 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# 🔐 Security & Privacy

Health-related information can be highly sensitive, so security is an important part of HealthIQ's architecture.

The project uses:

* Authentication for protected user experiences
* Firebase Cloud Storage for medical documents
* Supabase security controls
* Environment variables for configuration
* Client-side validation
* Structured data access patterns

### ⚠️ Important

HealthIQ is a software project and should **not be considered a medical diagnostic system**.

AI-generated health information may be inaccurate. Users should consult qualified healthcare professionals for diagnosis, treatment, emergencies, or medical decisions.

---

# 🗺️ Roadmap

HealthIQ can be expanded into a much more comprehensive healthcare ecosystem.

### AI & Intelligence

* [ ] Advanced symptom triage
* [ ] Medical report summarization
* [ ] Prescription understanding
* [ ] Personalized health insights
* [ ] Medical-history-aware AI assistant
* [ ] Multilingual healthcare assistant
* [ ] Voice-based health assistant

### Healthcare

* [ ] Doctor verification
* [ ] Real-time doctor availability
* [ ] Telemedicine integration
* [ ] Prescription management
* [ ] Lab-test discovery
* [ ] Health reminders

### Data & Analytics

* [ ] Personal health dashboard
* [ ] Health trend visualization
* [ ] Medical history timeline
* [ ] Exportable health reports

### Platform

* [ ] Progressive Web App
* [ ] Mobile application
* [ ] Notifications
* [ ] Role-based doctor accounts
* [ ] Admin dashboard

---

# 📸 Screenshots

Add screenshots or a short demo GIF here to showcase the application.

Recommended screenshots:

```text
Landing Page
Dashboard
AI Symptom Checker
Doctor Discovery
Appointment Management
AI Chat
Medical Records
```

Example:

```md
![HealthIQ Dashboard](./public/screenshots/dashboard.png)
```

---

# 🎯 Project Goals

HealthIQ was built around a simple idea:

> **Healthcare technology should reduce complexity, not add to it.**

The long-term vision is to create an intelligent healthcare layer that connects:

**Symptoms → AI Insights → Specialist → Appointment → Medical Records → Personalized Health**

into one seamless experience.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 📄 License

This project is open-source and available under the **MIT License**.

---

# 👨‍💻 Author

**Yug Malviya**

Full Stack Developer • AI/ML Enthusiast

GitHub: [@yugmalviya1](https://github.com/yugmalviya1)

---

<div align="center">

### 🩺 HealthIQ AI

**Making healthcare smarter, simpler, and more accessible.**

⭐ Star the repository if you found it interesting.

</div>
