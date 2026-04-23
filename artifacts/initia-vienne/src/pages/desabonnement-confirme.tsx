import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function DesabonnementConfirme() {
  return (
    <div className="max-w-lg mx-auto px-4 pt-36 pb-16 text-center">
      <div className="mx-auto w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-display font-bold text-primary mb-3">
        Désabonnement confirmé
      </h1>
      <p className="text-muted-foreground mb-8">
        Vous avez bien été désabonné de la newsletter initIA Vienne.
        Vous ne recevrez plus d'emails de notre part.
      </p>
      <Link href="/">
        <Button variant="outline">Retour à l'accueil</Button>
      </Link>
    </div>
  );
}
