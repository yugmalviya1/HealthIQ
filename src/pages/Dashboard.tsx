import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, loading, signOut } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8 glow-primary">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gradient font-display">HealthIQ Dashboard</h1>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="gap-2 bg-secondary/50 border-border hover:bg-secondary hover:border-primary/50"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary/30 rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-2">Welcome back!</h2>
              <p className="text-muted-foreground">
                Signed in as: <span className="text-primary">{user.email}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Health Score", "Activity", "Sleep"].map((title) => (
                <div
                  key={title}
                  className="bg-secondary/30 rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-muted-foreground text-sm mb-2">{title}</h3>
                  <p className="text-2xl font-bold text-foreground">--</p>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Your health dashboard is ready. Start tracking your wellness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
