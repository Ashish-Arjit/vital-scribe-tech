import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Download,
  Plus,
  FileText,
  ChevronDown
} from "lucide-react";
import { useMedicine } from "@/contexts/MedicineContext";
import { toast } from "sonner";
import { useState } from "react";

export const Recommendations = () => {
  const { recommendations, patientInfo } = useMedicine();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const handleAddToAlarms = (medicineId: number, medicineName: string) => {
    console.log("Adding medicine to alarms:", medicineId);
    toast.success(`${medicineName} added to reminders!`, {
      description: "You can manage your medicine reminders in the Medicine Reminders section."
    });
  };

  const handleDownloadPDF = () => {
    toast.info("PDF download feature coming soon!", {
      description: "This will generate a detailed report of your recommendations."
    });
  };

  const handleDownloadCSV = () => {
    toast.info("CSV export feature coming soon!", {
      description: "This will export your recommendations in spreadsheet format."
    });
  };

  // Don't show section if no recommendations
  if (recommendations.length === 0) {
    return null;
  }

  const hasHighRiskWarning = patientInfo && (
    patientInfo.isPregnant || 
    patientInfo.isNursing || 
    patientInfo.age < 1
  );

  return (
    <section id="recommendations" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Your Personalized Recommendations
            </h2>
            <p className="text-lg text-muted-foreground">
              Found {recommendations.length} medicine{recommendations.length !== 1 ? 's' : ''} for your symptoms
            </p>
            {patientInfo && (
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <Badge variant="outline">Age: {patientInfo.age}</Badge>
                <Badge variant="outline">Symptoms: {patientInfo.symptoms.length}</Badge>
                <Badge variant="outline">Duration: {patientInfo.duration}</Badge>
              </div>
            )}
          </div>

          {/* Safety Alert */}
          <Card className={`p-6 ${hasHighRiskWarning ? 'border-destructive bg-destructive/5' : 'border-warning bg-warning/5'}`}>
            <div className="flex gap-4">
              <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${hasHighRiskWarning ? 'text-destructive' : 'text-warning'}`} />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  {hasHighRiskWarning ? '⚠️ IMPORTANT: Special Precautions Required' : 'Important Safety Information'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  These recommendations are based on symptom analysis from a medical dataset and should not replace professional medical advice. 
                  {hasHighRiskWarning && (
                    <strong className="block mt-2 text-destructive">
                      Due to your health profile (pregnancy, nursing, or infant age), it is CRITICAL that you consult 
                      a healthcare provider before taking ANY medication.
                    </strong>
                  )}
                  {!hasHighRiskWarning && (
                    <> Please consult a healthcare provider before taking any medication, especially if symptoms persist 
                    for more than a few days or worsen.</>
                  )}
                </p>
              </div>
            </div>
          </Card>

          {/* Recommendations List */}
          <div className="space-y-6">
            {recommendations.map((medicine, index) => {
              const isExpanded = expandedCards.has(medicine.id);
              
              return (
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

                      {isExpanded && (
                        <div className="space-y-4 pt-4 border-t border-border">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-semibold mb-1">Matched Symptom:</p>
                              <Badge variant="outline">{medicine.symptom}</Badge>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">Age Group:</p>
                              <Badge variant="outline">{medicine.ageGroup}</Badge>
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
                          
                          <div className="p-3 bg-muted/50 rounded-lg text-sm">
                            <p className="font-semibold mb-1">Complete Dosage Instructions:</p>
                            <p className="text-muted-foreground">{medicine.dosage}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button 
                      size="sm"
                      className="flex-1 md:flex-none"
                      onClick={() => handleAddToAlarms(medicine.id, medicine.name)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Alarms
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 md:flex-none"
                      onClick={() => toggleCard(medicine.id)}
                    >
                      <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      {isExpanded ? 'Less' : 'More'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
            })}
          </div>

          {/* Export Options */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Button variant="outline" size="lg" onClick={handleDownloadPDF}>
              <FileText className="w-5 h-5 mr-2" />
              Download as PDF
            </Button>
            <Button variant="outline" size="lg" onClick={handleDownloadCSV}>
              <Download className="w-5 h-5 mr-2" />
              Export to CSV
            </Button>
          </div>
          
          {/* Additional Information */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Need to adjust your symptoms?</h3>
              <p className="text-sm text-muted-foreground">
                Scroll back up to the symptom checker to modify your inputs and get updated recommendations.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById("symptom-checker")?.scrollIntoView({ behavior: "smooth" })}
              >
                Back to Symptom Checker
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
