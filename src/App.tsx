import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FirebaseAuthProvider } from "@/contexts/FirebaseAuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
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

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.3
};

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isLoadingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";
  const showSpline = isLoadingPage || isAuthPage;

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      {/* Spline preloads during loading page (hidden behind) and shows on auth page */}
      {showSpline && (
        <div 
          className="fixed inset-0 transition-opacity duration-700"
          style={{ 
            opacity: isLoadingPage ? 0 : 1,
            pointerEvents: isLoadingPage ? 'none' : 'auto',
            zIndex: isLoadingPage ? -1 : 0
          }}
        >
          <SplineBackground />
        </div>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Routes without layout */}
          <Route path="/" element={<Loading />} />
          <Route path="/auth" element={<LandingAuth />} />
          
          {/* Routes with persistent layout */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Index />
              </motion.div>
            } />
            <Route path="/dashboard" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            } />
            <Route path="/symptoms" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Symptoms />
              </motion.div>
            } />
            <Route path="/doctors" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Doctors />
              </motion.div>
            } />
            <Route path="/appointments" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Appointments />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <About />
              </motion.div>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FirebaseAuthProvider>
            <AppContent />
          </FirebaseAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
