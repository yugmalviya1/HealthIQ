import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FirebaseAuthProvider } from "@/contexts/FirebaseAuthContext";
import SplineBackground from "@/components/SplineBackground";
import { MainLayout } from "@/components/layout/MainLayout";
import Loading from "./pages/Loading";
import Index from "./pages/Index";
import LandingAuth from "./pages/LandingAuth";
import Dashboard from "./pages/Dashboard";
import Symptoms from "./pages/Symptoms";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isLoadingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";
  const showSpline = isLoadingPage || isAuthPage;

  return (
    <>
      {/* Spline preloads during loading page (hidden) and shows on auth page */}
      {showSpline && (
        <div className={isLoadingPage ? "opacity-0 pointer-events-none" : ""}>
          <SplineBackground />
        </div>
      )}
      <Routes>
        {/* Routes without layout */}
        <Route path="/" element={<Loading />} />
        <Route path="/auth" element={<LandingAuth />} />
        
        {/* Routes with persistent layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FirebaseAuthProvider>
          <AppContent />
        </FirebaseAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
