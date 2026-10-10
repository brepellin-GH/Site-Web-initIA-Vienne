import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { greenButtonClass } from "@/components/site/ui";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-5 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 border-2 border-iv-orange text-iv-orange flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10" aria-hidden="true" />
        </div>
        <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4">Page introuvable</h1>
        <p className="text-lg mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link href="/" className={greenButtonClass}>
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
