import AuthCard from "@/components/AuthCard";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { slideInVariants, staggerContainer } from "@/lib/animations";

const LandingAuth = () => {
  const { user, loading } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  return (
    <motion.div 
      className="relative min-h-screen w-full overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8"
          variants={slideInVariants}
          custom={0}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 max-w-lg mx-auto drop-shadow-lg px-4">
            Your personal health companion powered by artificial intelligence
          </h2>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          variants={slideInVariants}
          custom={1}
        >
          <AuthCard />
        </motion.div>


      </main>
    </motion.div>
  );
};

export default LandingAuth;
