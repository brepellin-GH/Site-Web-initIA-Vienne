import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { outlineButtonClass } from "@/components/site/ui";

export default function DesabonnementConfirme() {
  return (
    <div className="max-w-lg mx-auto px-5 pt-16 pb-24 text-center">
      <div className="mx-auto w-16 h-16 border-2 border-iv-green text-iv-green flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
      </div>
      <h1 className="text-[32px] font-extrabold leading-[1.1] mb-3">
        Désabonnement confirmé
      </h1>
      <p className="mb-8">
        Vous avez bien été désabonné de la newsletter initIA Vienne.
        Vous ne recevrez plus d'emails de notre part.
      </p>
      <Link href="/" className={outlineButtonClass}>
        Retour à l'accueil
      </Link>
    </div>
  );
}
