import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Appointment {
  id?: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: Date;
}

const APPOINTMENTS_COLLECTION = "appointments";

export const appointmentService = {
  // Create a new appointment
  async createAppointment(appointment: Omit<Appointment, "id" | "createdAt">) {
    try {
      console.log("Creating appointment in Firestore...");
      const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), {
        ...appointment,
        createdAt: Timestamp.now(),
      });
      console.log("Appointment created successfully with ID:", docRef.id);
      return { id: docRef.id, error: null };
    } catch (error: any) {
      console.error("Error creating appointment:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      // Provide helpful error messages
      if (error.code === 'permission-denied') {
        return { id: null, error: new Error("Permission denied. Please check Firestore security rules.") };
      } else if (error.code === 'unavailable') {
        return { id: null, error: new Error("Firestore is not available. Please check your Firebase configuration.") };
      }
      
      return { id: null, error: error as Error };
    }
  },

  // Get all appointments for a user
  async getUserAppointments(userId: string) {
    try {
      console.log("Fetching appointments for user:", userId);
      
      // Simple query without orderBy to avoid index requirement
      const q = query(
        collection(db, APPOINTMENTS_COLLECTION),
        where("userId", "==", userId)
      );
      
      const querySnapshot = await getDocs(q);
      const appointments: Appointment[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Found appointment:", doc.id, data);
        appointments.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        } as Appointment);
      });
      
      // Sort in memory by creation date
      appointments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      console.log("Total appointments found:", appointments.length);
      return { appointments, error: null };
    } catch (error: any) {
      console.error("Error getting appointments:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      if (error.code === 'permission-denied') {
        return { appointments: [], error: new Error("Permission denied. Please enable Firestore and set up security rules.") };
      }
      
      return { appointments: [], error: error as Error };
    }
  },

  // Cancel an appointment
  async cancelAppointment(appointmentId: string) {
    try {
      await deleteDoc(doc(db, APPOINTMENTS_COLLECTION, appointmentId));
      return { error: null };
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      return { error: error as Error };
    }
  },
};
