import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTA } from "@/components/home/CTA";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

const Index = () => {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </motion.main>
  );
};

export default Index;
