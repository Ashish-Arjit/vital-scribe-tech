import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  MedicineRecord, 
  PatientInfo, 
  Recommendation,
  loadMedicineData,
  findMedicineRecommendations 
} from '@/utils/medicineRecommendation';

interface MedicineContextType {
  medicineData: MedicineRecord[];
  isLoading: boolean;
  recommendations: Recommendation[];
  patientInfo: PatientInfo | null;
  getRecommendations: (info: PatientInfo) => void;
  clearRecommendations: () => void;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export const MedicineProvider = ({ children }: { children: ReactNode }) => {
  const [medicineData, setMedicineData] = useState<MedicineRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadMedicineData();
      setMedicineData(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const getRecommendations = (info: PatientInfo) => {
    setPatientInfo(info);
    const results = findMedicineRecommendations(medicineData, info);
    setRecommendations(results);
  };

  const clearRecommendations = () => {
    setRecommendations([]);
    setPatientInfo(null);
  };

  return (
    <MedicineContext.Provider
      value={{
        medicineData,
        isLoading,
        recommendations,
        patientInfo,
        getRecommendations,
        clearRecommendations,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicine = () => {
  const context = useContext(MedicineContext);
  if (context === undefined) {
    throw new Error('useMedicine must be used within a MedicineProvider');
  }
  return context;
};
