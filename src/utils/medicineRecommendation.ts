export interface MedicineRecord {
  symptom: string;
  ageGroup: string;
  medicine: string;
  dosage: string;
}

export interface PatientInfo {
  symptoms: string[];
  age: number;
  gender: string;
  duration: string;
  isPregnant: boolean;
  isNursing: boolean;
}

export interface Recommendation {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  confidence: number;
  description: string;
  warnings: string[];
  symptom: string;
  ageGroup: string;
}

// Parse CSV data
export const parseCSV = (csvText: string): MedicineRecord[] => {
  const lines = csvText.trim().split('\n');
  const records: MedicineRecord[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(',');
    
    if (parts.length >= 4) {
      records.push({
        symptom: parts[0].trim(),
        ageGroup: parts[1].trim(),
        medicine: parts[2].trim(),
        dosage: parts.slice(3).join(',').trim()
      });
    }
  }
  
  return records;
};

// Determine age group from age
export const getAgeGroup = (age: number): string => {
  if (age < 1) return "Below 1 year";
  if (age <= 3) return "1-3 years";
  if (age <= 6) return "3-6 years";
  if (age <= 15) return "6-15 years";
  return "Above 15 years";
};

// Normalize symptom for matching
const normalizeSymptom = (symptom: string): string => {
  return symptom.toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, '') // Remove anything in parentheses
    .trim();
};

// Calculate confidence score based on multiple factors
const calculateConfidence = (
  record: MedicineRecord,
  symptom: string,
  patientInfo: PatientInfo,
  matchIndex: number
): number => {
  let confidence = 85; // Base confidence
  
  // Exact symptom match increases confidence
  const recordSymptom = normalizeSymptom(record.symptom);
  const searchSymptom = normalizeSymptom(symptom);
  
  if (recordSymptom === searchSymptom) {
    confidence += 10;
  }
  
  // Reduce confidence for later matches
  confidence -= matchIndex * 3;
  
  // Adjust for special conditions
  if (patientInfo.isPregnant || patientInfo.isNursing) {
    confidence -= 5;
  }
  
  return Math.max(60, Math.min(98, confidence));
};

// Extract medicine name and frequency from the medicine field
const parseMedicineInfo = (medicineText: string, dosage: string) => {
  // Medicine name is typically before "+" or "±" or first word
  let name = medicineText.split(/[+±]/)[0].trim();
  
  // Extract frequency from dosage
  let frequency = "As directed";
  if (dosage.includes("every")) {
    const match = dosage.match(/every\s+[\d-]+\s+(?:hrs?|hours?)/i);
    if (match) {
      frequency = match[0];
    }
  }
  
  return { name, frequency };
};

// Generate warnings based on medicine and patient info
const generateWarnings = (
  medicine: string,
  dosage: string,
  patientInfo: PatientInfo
): string[] => {
  const warnings: string[] = [];
  
  const medicineLower = medicine.toLowerCase();
  const dosageLower = dosage.toLowerCase();
  
  // Paracetamol warnings
  if (medicineLower.includes("paracetamol") || medicineLower.includes("acetaminophen")) {
    warnings.push("Do not exceed 4000mg per day");
    warnings.push("Avoid if you have liver disease");
  }
  
  // Ibuprofen warnings
  if (medicineLower.includes("ibuprofen")) {
    warnings.push("Take with food to avoid stomach upset");
    warnings.push("Avoid if you have stomach ulcers or kidney disease");
  }
  
  // Antibiotic warnings
  if (medicineLower.includes("amoxicillin") || medicineLower.includes("antibiotic")) {
    warnings.push("Complete the full course even if symptoms improve");
    warnings.push("May cause diarrhea or upset stomach");
  }
  
  // Antihistamine warnings
  if (medicineLower.includes("cetirizine") || medicineLower.includes("diphenhydramine") || 
      medicineLower.includes("antihistamine")) {
    warnings.push("May cause drowsiness - avoid driving");
    warnings.push("Avoid alcohol while taking this medication");
  }
  
  // Steroid warnings
  if (medicineLower.includes("steroid") || medicineLower.includes("cortisone") || 
      medicineLower.includes("hydrocortisone")) {
    warnings.push("Do not use for extended periods without medical supervision");
    warnings.push("May thin skin with prolonged use");
  }
  
  // Pregnancy warnings
  if (patientInfo.isPregnant) {
    warnings.push("⚠️ You indicated pregnancy - consult your doctor before taking any medication");
  }
  
  // Nursing warnings
  if (patientInfo.isNursing) {
    warnings.push("⚠️ You indicated nursing - consult your doctor as medication may pass to baby");
  }
  
  // Age-specific warnings
  if (patientInfo.age < 1) {
    warnings.push("⚠️ For infants, always consult a pediatrician before administering any medication");
  }
  
  // Duration warnings
  if (dosageLower.includes("pediatrician") || dosageLower.includes("clinician")) {
    warnings.push("Consult a healthcare professional for proper dosing");
  }
  
  return warnings;
};

// Get medicine description
const getMedicineDescription = (medicine: string): string => {
  const medicineLower = medicine.toLowerCase();
  
  if (medicineLower.includes("paracetamol") || medicineLower.includes("acetaminophen")) {
    return "Pain reliever and fever reducer (analgesic and antipyretic)";
  }
  if (medicineLower.includes("ibuprofen")) {
    return "Anti-inflammatory, pain reliever, and fever reducer (NSAID)";
  }
  if (medicineLower.includes("amoxicillin")) {
    return "Antibiotic used to treat bacterial infections";
  }
  if (medicineLower.includes("cetirizine")) {
    return "Antihistamine for allergy symptoms";
  }
  if (medicineLower.includes("diphenhydramine")) {
    return "Antihistamine for allergies and sleep aid";
  }
  if (medicineLower.includes("saline")) {
    return "Sterile salt water solution for cleansing and moisturizing";
  }
  if (medicineLower.includes("steroid") || medicineLower.includes("hydrocortisone")) {
    return "Anti-inflammatory steroid to reduce swelling and redness";
  }
  
  return "Medication for symptom relief";
};

// Find matching medicines for patient symptoms
export const findMedicineRecommendations = (
  medicineData: MedicineRecord[],
  patientInfo: PatientInfo
): Recommendation[] => {
  const ageGroup = getAgeGroup(patientInfo.age);
  const recommendations: Recommendation[] = [];
  const seenMedicines = new Set<string>();
  
  // For each symptom, find matching records
  patientInfo.symptoms.forEach((symptom) => {
    const normalizedSymptom = normalizeSymptom(symptom);
    
    // Find all matching records for this symptom and age group
    const matches = medicineData.filter(record => {
      const recordSymptom = normalizeSymptom(record.symptom);
      const matchesSymptom = recordSymptom.includes(normalizedSymptom) || 
                            normalizedSymptom.includes(recordSymptom);
      const matchesAge = record.ageGroup === ageGroup;
      
      return matchesSymptom && matchesAge;
    });
    
    // Process matches
    matches.forEach((record, index) => {
      const { name, frequency } = parseMedicineInfo(record.medicine, record.dosage);
      const medicineKey = `${name}-${record.ageGroup}`;
      
      // Avoid duplicates
      if (seenMedicines.has(medicineKey)) {
        return;
      }
      seenMedicines.add(medicineKey);
      
      const confidence = calculateConfidence(record, symptom, patientInfo, index);
      
      recommendations.push({
        id: recommendations.length + 1,
        name: name,
        dosage: record.dosage,
        frequency: frequency,
        confidence: confidence,
        description: getMedicineDescription(record.medicine),
        warnings: generateWarnings(record.medicine, record.dosage, patientInfo),
        symptom: record.symptom,
        ageGroup: record.ageGroup
      });
    });
  });
  
  // Sort by confidence score (highest first)
  recommendations.sort((a, b) => b.confidence - a.confidence);
  
  // Return top 5 recommendations
  return recommendations.slice(0, 5);
};

// Load and parse CSV from public folder
export const loadMedicineData = async (): Promise<MedicineRecord[]> => {
  try {
    const response = await fetch('/data/medicine-dataset.csv');
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error loading medicine data:', error);
    return [];
  }
};
