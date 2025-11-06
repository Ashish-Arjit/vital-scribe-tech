import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  X, 
  AlertCircle, 
  User, 
  Calendar, 
  Users,
  Loader2
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useMedicine } from "@/contexts/MedicineContext";
import { toast } from "sonner";

const commonSymptoms = [
  "Fever", "Headache", "Cough", "Sore Throat", "Runny Nose",
  "Fatigue", "Body Aches", "Nausea", "Diarrhea", "Vomiting",
  "Dizziness", "Chest Pain", "Shortness of Breath", "Abdominal Pain"
];

export const SymptomChecker = () => {
  const { getRecommendations, isLoading } = useMedicine();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [isNursing, setIsNursing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.includes(symptom)
  );

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleGetRecommendations = () => {
    if (!isFormValid) return;
    
    setIsProcessing(true);
    
    // Small delay for better UX
    setTimeout(() => {
      getRecommendations({
        symptoms: selectedSymptoms,
        age: parseInt(age),
        gender,
        duration,
        isPregnant,
        isNursing
      });
      
      setIsProcessing(false);
      
      toast.success("Recommendations generated!", {
        description: "Scroll down to view your personalized medicine recommendations."
      });
      
      // Scroll to recommendations section
      setTimeout(() => {
        document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }, 800);
  };

  const isFormValid = selectedSymptoms.length > 0 && age && gender && duration;

  return (
    <section id="symptom-checker" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Tell Us How You Feel
            </h2>
            <p className="text-lg text-muted-foreground">
              Select your symptoms and provide some basic information for personalized recommendations
            </p>
          </div>

          <Card className="p-8 shadow-medium bg-gradient-card">
            <div className="space-y-8">
              {/* Symptom Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Select Your Symptoms
                </Label>
                
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search symptoms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-4 bg-primary/5 rounded-lg">
                    {selectedSymptoms.map(symptom => (
                      <Badge
                        key={symptom}
                        variant="default"
                        className="gap-1 cursor-pointer hover:bg-primary/80"
                        onClick={() => toggleSymptom(symptom)}
                      >
                        {symptom}
                        <X className="w-3 h-3" />
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredSymptoms.map(symptom => (
                    <Button
                      key={symptom}
                      variant="outline"
                      className="justify-start hover:bg-primary/10 hover:border-primary"
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Patient Information */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border">
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    max="120"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Gender
                  </Label>
                  <RadioGroup value={gender} onValueChange={setGender}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Symptom Duration
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 2 days"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Additional Information
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pregnant"
                        checked={isPregnant}
                        onCheckedChange={(checked) => setIsPregnant(checked as boolean)}
                      />
                      <Label htmlFor="pregnant" className="cursor-pointer">
                        Currently pregnant
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nursing"
                        checked={isNursing}
                        onCheckedChange={(checked) => setIsNursing(checked as boolean)}
                      />
                      <Label htmlFor="nursing" className="cursor-pointer">
                        Currently nursing
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                size="lg"
                className="w-full shadow-medium hover:shadow-strong"
                onClick={handleGetRecommendations}
                disabled={!isFormValid || isLoading || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  "Get Medicine Recommendations"
                )}
              </Button>

              {!isFormValid && (
                <p className="text-sm text-muted-foreground text-center">
                  Please select at least one symptom and fill in all required fields
                </p>
              )}
              
              {isLoading && (
                <p className="text-sm text-muted-foreground text-center">
                  Loading medicine database...
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
