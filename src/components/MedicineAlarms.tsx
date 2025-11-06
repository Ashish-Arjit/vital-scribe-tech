import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Plus, 
  Trash2, 
  Edit2, 
  Camera,
  Clock,
  Pill
} from "lucide-react";

interface MedicineAlarm {
  id: number;
  name: string;
  dosage: string;
  time: string;
  image?: string;
  isActive: boolean;
}

export const MedicineAlarms = () => {
  const [alarms, setAlarms] = useState<MedicineAlarm[]>([
    {
      id: 1,
      name: "Acetaminophen",
      dosage: "500mg",
      time: "08:00",
      isActive: true
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "400mg",
      time: "14:00",
      isActive: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    time: ""
  });

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.time) {
      setAlarms([...alarms, {
        id: Date.now(),
        ...newMedicine,
        isActive: true
      }]);
      setNewMedicine({ name: "", dosage: "", time: "" });
      setShowAddForm(false);
    }
  };

  const handleDeleteAlarm = (id: number) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const handleToggleAlarm = (id: number) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
    ));
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Medicine Reminders
            </h2>
            <p className="text-lg text-muted-foreground">
              Never miss a dose with smart medication reminders
            </p>
          </div>

          {/* Add New Medicine Button */}
          {!showAddForm && (
            <Button
              size="lg"
              className="w-full shadow-medium hover:shadow-strong"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Medicine Reminder
            </Button>
          )}

          {/* Add Medicine Form */}
          {showAddForm && (
            <Card className="p-6 shadow-medium bg-gradient-card">
              <h3 className="text-xl font-semibold mb-4">Add New Medicine</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicine-name">Medicine Name</Label>
                  <Input
                    id="medicine-name"
                    placeholder="e.g., Acetaminophen"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    placeholder="e.g., 500mg"
                    value={newMedicine.dosage}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Reminder Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMedicine.time}
                    onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Medicine Photo (Optional)</Label>
                  <Button variant="outline" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload or Take Photo
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddMedicine} className="flex-1">
                    Add Reminder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewMedicine({ name: "", dosage: "", time: "" });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Alarms List */}
          <div className="space-y-4">
            {alarms.length === 0 ? (
              <Card className="p-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No medicine reminders set yet. Add one to get started!
                </p>
              </Card>
            ) : (
              alarms.map((alarm) => (
                <Card
                  key={alarm.id}
                  className={`p-6 shadow-soft hover:shadow-medium transition-all ${
                    !alarm.isActive ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {alarm.image ? (
                        <img
                          src={alarm.image}
                          alt={alarm.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <Pill className="w-8 h-8 text-primary" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{alarm.name}</h3>
                        <Badge variant={alarm.isActive ? "default" : "outline"}>
                          {alarm.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alarm.dosage}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">{alarm.time}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleAlarm(alarm.id)}
                      >
                        <Bell className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAlarm(alarm.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
