import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Welcome back!");
          navigate("/home");
        }
      } else {
        const { error } = await signUp(email, password);
        
        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("An account with this email already exists");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Account created successfully!");
          navigate("/home");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 w-full max-w-md animate-slide-up shadow-2xl" style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      {/* Logo & Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient font-display tracking-tight">HealthIQ</h1>
      </div>

      {/* Google Auth Button */}
      <Button
        variant="outline"
        className="w-full mb-6 h-12 bg-secondary/50 border-border hover:bg-secondary hover:border-primary/50 transition-all duration-300"
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        <GoogleIcon />
        <span className="ml-3">Continue with Google</span>
      </Button>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 text-white/70" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>or continue with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-primary focus:bg-white/15 transition-all duration-300"
            required
            disabled={isLoading}
            autoComplete="email"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-primary focus:bg-white/15 transition-all duration-300"
            required
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary text-primary-foreground font-semibold liquid-glass-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
              Signing in...
            </>
          ) : isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>

      {/* Toggle Login/Signup */}
      <p className="text-center mt-6 text-muted-foreground">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline font-medium transition-colors"
          disabled={isLoading}
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
};

export default AuthCard;
