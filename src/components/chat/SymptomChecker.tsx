import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface SymptomData {
  mainSymptom: string;
  duration: string;
  severity: string;
  additionalSymptoms: string[];
  medicalHistory: string;
}

interface SymptomCheckerProps {
  onComplete: (summary: string) => void;
  onSkip: () => void;
}

const SYMPTOMS_LIST = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest pain",
  "Shortness of breath",
  "Back pain",
  "Stomach ache",
  "Sore throat",
  "Other",
];

const DURATIONS = [
  "Less than 24 hours",
  "1-3 days",
  "4-7 days",
  "1-2 weeks",
  "More than 2 weeks",
];

const SEVERITIES = [
  { value: "mild", label: "Mild", description: "Noticeable but not interfering with daily activities" },
  { value: "moderate", label: "Moderate", description: "Affecting some daily activities" },
  { value: "severe", label: "Severe", description: "Significantly limiting daily activities" },
];

export function SymptomChecker({ onComplete, onSkip }: SymptomCheckerProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SymptomData>({
    mainSymptom: "",
    duration: "",
    severity: "",
    additionalSymptoms: [],
    medicalHistory: "",
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const summary = generateSummary();
      onComplete(summary);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateSummary = (): string => {
    const parts = [
      `I'm experiencing ${data.mainSymptom.toLowerCase()}`,
      `for ${data.duration.toLowerCase()}`,
      `with ${data.severity} severity.`,
    ];

    if (data.additionalSymptoms.length > 0) {
      parts.push(`I also have: ${data.additionalSymptoms.join(", ").toLowerCase()}.`);
    }

    if (data.medicalHistory.trim()) {
      parts.push(`Additional info: ${data.medicalHistory}`);
    }

    return parts.join(" ");
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return data.mainSymptom !== "";
      case 2:
        return data.duration !== "";
      case 3:
        return data.severity !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  const toggleAdditionalSymptom = (symptom: string) => {
    setData((prev) => ({
      ...prev,
      additionalSymptoms: prev.additionalSymptoms.includes(symptom)
        ? prev.additionalSymptoms.filter((s) => s !== symptom)
        : [...prev.additionalSymptoms, symptom],
    }));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-gradient-hero mx-auto flex items-center justify-center">
          <Stethoscope className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="font-display font-semibold text-foreground">Symptom Checker</h3>
        <p className="text-xs text-muted-foreground">
          Answer a few questions to help our AI understand your symptoms better
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < step ? "bg-primary" : "bg-border"
            )}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[200px]">
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">What is your main symptom?</p>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOMS_LIST.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => setData({ ...data, mainSymptom: symptom })}
                  className={cn(
                    "px-3 py-2 text-xs rounded-lg border transition-all text-left",
                    data.mainSymptom === symptom
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">How long have you had this symptom?</p>
            <div className="space-y-2">
              {DURATIONS.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setData({ ...data, duration })}
                  className={cn(
                    "w-full px-4 py-3 text-sm rounded-lg border transition-all text-left",
                    data.duration === duration
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">How severe is your symptom?</p>
            <div className="space-y-2">
              {SEVERITIES.map((severity) => (
                <button
                  key={severity.value}
                  onClick={() => setData({ ...data, severity: severity.value })}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border transition-all text-left",
                    data.severity === severity.value
                      ? "border-primary bg-accent"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <p className={cn(
                    "text-sm font-medium",
                    data.severity === severity.value ? "text-accent-foreground" : "text-foreground"
                  )}>
                    {severity.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{severity.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">Any additional symptoms? (Optional)</p>
              <p className="text-xs text-muted-foreground">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOMS_LIST.filter((s) => s !== data.mainSymptom && s !== "Other").map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleAdditionalSymptom(symptom)}
                  className={cn(
                    "px-3 py-2 text-xs rounded-lg border transition-all text-left",
                    data.additionalSymptoms.includes(symptom)
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  {symptom}
                </button>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-1">Anything else to mention? (Optional)</p>
              <textarea
                value={data.medicalHistory}
                onChange={(e) => setData({ ...data, medicalHistory: e.target.value })}
                placeholder="E.g., allergies, medications, recent travel..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-card resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={2}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={step === 1 ? onSkip : handleBack}
          className="text-muted-foreground"
        >
          {step === 1 ? (
            "Skip"
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </>
          )}
        </Button>
        <Button
          variant="hero"
          size="sm"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {step === totalSteps ? "Get Analysis" : "Next"}
          {step < totalSteps && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}
