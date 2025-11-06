import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SymptomChecker } from "@/components/SymptomChecker";
import { Recommendations } from "@/components/Recommendations";
import { MedicineAlarms } from "@/components/MedicineAlarms";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <SymptomChecker />
        <Recommendations />
        <MedicineAlarms />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
