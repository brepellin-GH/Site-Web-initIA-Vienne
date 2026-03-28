import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-brand-cream px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-brand-orange/10 text-brand-orange rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Page introuvable</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button size="lg">
            <ArrowLeft className="w-5 h-5 ml-[-4px] mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
