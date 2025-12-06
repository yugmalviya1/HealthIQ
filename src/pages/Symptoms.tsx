import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle, CheckCircle2, ArrowRight, Stethoscope, Brain, Heart, Bone, Eye, Ear } from "lucide-react";
import { cn } from "@/lib/utils";

const bodyAreas = [
  { id: "head", name: "Head & Neurological", icon: Brain, symptoms: ["Headache", "Dizziness", "Migraine", "Memory issues"] },
  { id: "chest", name: "Chest & Heart", icon: Heart, symptoms: ["Chest pain", "Palpitations", "Shortness of breath", "High blood pressure"] },
  { id: "bones", name: "Bones & Joints", icon: Bone, symptoms: ["Joint pain", "Back pain", "Muscle stiffness", "Swelling"] },
  { id: "eyes", name: "Eyes & Vision", icon: Eye, symptoms: ["Blurred vision", "Eye pain", "Redness", "Light sensitivity"] },
  { id: "ears", name: "Ears & Hearing", icon: Ear, symptoms: ["Hearing loss", "Ear pain", "Tinnitus", "Vertigo"] },
  { id: "general", name: "General Symptoms", icon: Stethoscope, symptoms: ["Fatigue", "Fever", "Weight changes", "Sleep issues"] },
];

const Symptoms = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const selectedBodyArea = bodyAreas.find(area => area.id === selectedArea);

  return (
    <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              AI Symptom Analyzer
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Tell Us How You're{" "}
              <span className="text-gradient">Feeling</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Select your symptoms and let our AI analyze potential conditions and recommend the right specialists.
            </p>
          </div>

          {!showResults ? (
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-card"
                />
              </div>

              {/* Body Areas Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {bodyAreas.map((area) => {
                  const Icon = area.icon;
                  const isSelected = selectedArea === area.id;
                  return (
                    <button
                      key={area.id}
                      onClick={() => setSelectedArea(isSelected ? null : area.id)}
                      className={cn(
                        "p-6 rounded-2xl border text-left transition-all duration-300",
                        isSelected
                          ? "bg-accent border-primary shadow-glow"
                          : "bg-card border-border hover:border-primary/30 shadow-card"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                        isSelected ? "bg-primary" : "bg-secondary"
                      )}>
                        <Icon className={cn(
                          "w-6 h-6",
                          isSelected ? "text-primary-foreground" : "text-primary"
                        )} />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{area.name}</h3>
                      <p className="text-sm text-muted-foreground">{area.symptoms.length} symptoms</p>
                    </button>
                  );
                })}
              </div>

              {/* Symptoms List */}
              {selectedBodyArea && (
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card mb-8 animate-fade-in">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Select your symptoms in {selectedBodyArea.name}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedBodyArea.symptoms.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          onClick={() => handleSymptomToggle(symptom)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-glow"
                              : "bg-secondary text-secondary-foreground hover:bg-accent"
                          )}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 inline mr-2" />}
                          {symptom}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selected Symptoms Summary */}
              {selectedSymptoms.length > 0 && (
                <div className="p-6 rounded-2xl bg-accent border border-primary/20 mb-8 animate-fade-in">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        Selected Symptoms ({selectedSymptoms.length})
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Ready to analyze your symptoms
                      </p>
                    </div>
                    <Button onClick={handleAnalyze} variant="hero" disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Symptoms
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Banner */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-health-blue-light border border-health-blue/20">
                <AlertCircle className="w-5 h-5 text-health-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">Important Disclaimer</p>
                  <p className="text-sm text-muted-foreground">
                    This symptom checker is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="p-8 rounded-2xl bg-card border border-border shadow-card mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-health-green/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-health-green" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">Analysis Complete</h2>
                    <p className="text-sm text-muted-foreground">Based on your symptoms: {selectedSymptoms.join(", ")}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl bg-secondary">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">Possible Condition</h3>
                      <span className="px-2 py-1 rounded-full bg-health-orange/10 text-health-orange text-xs font-medium">
                        Moderate Match
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Based on your symptoms, you may be experiencing tension-related issues. This is a common condition that can be managed effectively with proper care.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Recommended specialist: General Physician or Neurologist
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" className="flex-1">
                    Find Recommended Doctors
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowResults(false);
                      setSelectedSymptoms([]);
                      setSelectedArea(null);
                    }}
                  >
                    Start New Analysis
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
  );
};

export default Symptoms;
