import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import SplineBackground from "@/components/SplineBackground";
import Loading from "./pages/Loading";
import Index from "./pages/Index";
import LandingAuth from "./pages/LandingAuth";
import Dashboard from "./pages/Dashboard";
import Symptoms from "./pages/Symptoms";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
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
        <Route path="/" element={<Loading />} />
        <Route path="/auth" element={<LandingAuth />} />
        <Route path="/home" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
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
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
