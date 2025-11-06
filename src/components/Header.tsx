import { Button } from "@/components/ui/button";
import { Heart, Menu, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">MediCare AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#symptom-checker" className="text-sm font-medium hover:text-primary transition-colors">
              Symptom Checker
            </a>
            <a href="#recommendations" className="text-sm font-medium hover:text-primary transition-colors">
              Recommendations
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              My Reminders
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Sign In</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
