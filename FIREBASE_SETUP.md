# Firebase Setup Guide

## Firebase Configuration

The app is now configured to use Firebase for:
- **Authentication** (Email/Password and Google OAuth)
- **Firestore Database** (Appointments storage)

## Firebase Console Setup - REQUIRED STEPS

### 1. Enable Authentication Methods

Go to [Firebase Console](https://console.firebase.google.com/) → Your Project → Authentication → Sign-in method:

1. **Email/Password**: Click "Add new provider" → Select "Email/Password" → Enable → Save
2. **Google**: Click "Add new provider" → Select "Google" → Enable → Save

### 2. Create Firestore Database

Go to Firebase Console → Firestore Database:

1. Click "Create database"
2. Choose **"Start in test mode"** (for development)
3. Select your preferred location (e.g., us-central)
4. Click "Enable"

### 3. Firestore Security Rules

Go to Firestore → Rules tab and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Appointments collection
    match /appointments/{appointmentId} {
      // Users can only read their own appointments
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      
      // Users can create appointments for themselves
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      
      // Users can delete their own appointments
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

Click "Publish" to save the rules.

### 4. Create Firestore Index (IMPORTANT!)

The app uses a compound query that requires an index. You have two options:

**Option A: Automatic (Recommended)**
1. Try to book an appointment in the app
2. Check the browser console for an error with a link
3. Click the link to automatically create the index

**Option B: Manual**
1. Go to Firestore → Indexes tab
2. Click "Create Index"
3. Collection ID: `appointments`
4. Add fields:
   - Field: `userId`, Order: Ascending
   - Field: `createdAt`, Order: Descending
5. Click "Create"
6. Wait for index to build (usually 1-2 minutes)

## Using Firebase in the App

### Authentication

The app uses `FirebaseAuthContext` for authentication:

```typescript
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";

const { user, loading, signIn, signUp, signInWithGoogle, signOut } = useFirebaseAuth();
```

### Appointments

Use the `appointmentService` to manage appointments:

```typescript
import { appointmentService } from "@/services/appointmentService";

// Create appointment
const { id, error } = await appointmentService.createAppointment({
  userId: user.uid,
  doctorId: "doctor123",
  doctorName: "Dr. Smith",
  specialty: "Cardiology",
  date: "2024-12-15",
  time: "10:00 AM",
  status: "scheduled"
});

// Get user appointments
const { appointments, error } = await appointmentService.getUserAppointments(user.uid);

// Cancel appointment
const { error } = await appointmentService.cancelAppointment(appointmentId);
```

## Migration from Supabase

The app has been migrated from Supabase to Firebase. All authentication and data storage now uses Firebase services.

## Environment Variables

No environment variables needed - Firebase config is in `src/lib/firebase.ts`
