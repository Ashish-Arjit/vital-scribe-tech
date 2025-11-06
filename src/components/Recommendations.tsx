import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Download,
  Plus
} from "lucide-react";

// Mock data - will be replaced with actual ML predictions
const mockRecommendations = [
  {
    id: 1,
    name: "Acetaminophen",
    dosage: "500mg",
    frequency: "Every 6 hours",
    confidence: 92,
    description: "Pain reliever and fever reducer",
    warnings: ["Do not exceed 4000mg per day", "Avoid if liver disease"]
  },
  {
    id: 2,
    name: "Ibuprofen",
    dosage: "400mg",
    frequency: "Every 8 hours",
    confidence: 88,
    description: "Anti-inflammatory and pain reliever",
    warnings: ["Take with food", "Avoid if stomach ulcers"]
  },
  {
    id: 3,
    name: "Diphenhydramine",
    dosage: "25mg",
    frequency: "Every 4-6 hours",
    confidence: 85,
    description: "Antihistamine for allergy symptoms",
    warnings: ["May cause drowsiness", "Avoid driving"]
  }
];

export const Recommendations = () => {
  const handleAddToAlarms = (medicineId: number) => {
    console.log("Adding medicine to alarms:", medicineId);
    // This will integrate with the alarm system
  };

  return (
    <section id="recommendations" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Your Personalized Recommendations
            </h2>
            <p className="text-lg text-muted-foreground">
              Based on your symptoms and health profile
            </p>
          </div>

          {/* Safety Alert */}
          <Card className="p-6 border-warning bg-warning/5">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Important Safety Information</h3>
                <p className="text-sm text-muted-foreground">
                  These recommendations are based on AI analysis and should not replace professional medical advice. 
                  Please consult a healthcare provider before taking any medication, especially if symptoms persist 
                  for more than a few days or worsen.
                </p>
              </div>
            </div>
          </Card>

          {/* Recommendations List */}
          <div className="space-y-6">
            {mockRecommendations.map((medicine, index) => (
              <Card 
                key={medicine.id}
                className="p-6 shadow-medium hover:shadow-strong transition-all bg-gradient-card"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold">{medicine.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              Rank #{index + 1}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{medicine.description}</p>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="text-sm font-semibold text-success">
                            {medicine.confidence}% Match
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Pill className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Dosage</p>
                            <p className="font-semibold">{medicine.dosage}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Frequency</p>
                            <p className="font-semibold">{medicine.frequency}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          Warnings & Precautions
                        </h4>
                        <ul className="space-y-1">
                          {medicine.warnings.map((warning, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-warning">•</span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button 
                      size="sm"
                      className="flex-1 md:flex-none"
                      onClick={() => handleAddToAlarms(medicine.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Alarms
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                      <Download className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Export Options */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download as PDF
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Export to CSV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
