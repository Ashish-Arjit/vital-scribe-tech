import { Heart, Mail, Shield, FileText } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">MediCare AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in personalized healthcare guidance, powered by advanced AI technology.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Symptom Checker
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Medicine Database
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Resources
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Medical Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                support@medicare-ai.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 MediCare AI. All rights reserved.</p>
          <p className="mt-2">
            <strong>Medical Disclaimer:</strong> This tool provides general information only and is not a substitute for professional medical advice.
            Always consult with a qualified healthcare provider for medical guidance.
          </p>
        </div>
      </div>
    </footer>
  );
};
