import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Clock, Heart } from "lucide-react";
import heroImage from "@/assets/hero-medicine.jpg";

export const Hero = () => {
  const scrollToChecker = () => {
    document.getElementById("symptom-checker")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Healthcare</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Personal
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Medicine Guide
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Get personalized medicine recommendations powered by advanced machine learning. 
              Safe, accurate, and tailored to your unique health needs.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={scrollToChecker}
                className="group shadow-medium hover:shadow-strong transition-all"
              >
                Start Symptom Check
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[
                { icon: Heart, label: "Safe & Verified", value: "100%" },
                { icon: Clock, label: "Quick Results", value: "<2 min" },
                { icon: ShieldCheck, label: "Privacy First", value: "Secure" }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-primary">
                    <stat.icon className="w-5 h-5" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:h-[600px] animate-in fade-in slide-in-from-right duration-700">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-20 blur-3xl" />
            <img 
              src={heroImage}
              alt="Healthcare professionals providing personalized medical care"
              className="relative w-full h-full object-cover rounded-3xl shadow-strong"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
