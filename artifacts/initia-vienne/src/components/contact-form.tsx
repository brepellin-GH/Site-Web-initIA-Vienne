import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Send, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  type: z.string().min(1, "Veuillez sélectionner un type"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm({ className }: { className?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Form data submitted:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={cn("bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-brand-green/5 border border-brand-green/10 text-center space-y-4", className)}>
        <div className="mx-auto w-16 h-16 bg-brand-green-light text-brand-green rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-bold text-primary">Message envoyé !</h3>
        <p className="text-muted-foreground">
          Merci pour votre message. Nous vous recontacterons très prochainement.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSubmitted(false)}
          className="mt-6"
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-brand-green/5 border border-brand-green/10", className)}>
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-primary mb-2">Envoyez-nous un message</h3>
        <p className="text-muted-foreground">Remplissez le formulaire ci-dessous ou appelez-nous directement.</p>
        
        <a 
          href="tel:0756958511" 
          className="inline-flex items-center gap-2 mt-4 text-brand-orange font-bold hover:text-brand-orange/80 transition-colors"
        >
          <PhoneCall className="w-5 h-5" />
          07 56 95 85 11
        </a>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary" htmlFor="name">Nom / Prénom</label>
          <input
            {...register("name")}
            id="name"
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-background border-2 transition-colors focus:outline-none focus:ring-4 focus:ring-brand-green/10",
              errors.name ? "border-red-500" : "border-border focus:border-brand-green"
            )}
            placeholder="Jean Dupont"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary" htmlFor="email">Email</label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className={cn(
                "w-full px-4 py-3 rounded-xl bg-background border-2 transition-colors focus:outline-none focus:ring-4 focus:ring-brand-green/10",
                errors.email ? "border-red-500" : "border-border focus:border-brand-green"
              )}
              placeholder="jean@exemple.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary" htmlFor="type">Vous êtes...</label>
            <select
              {...register("type")}
              id="type"
              className={cn(
                "w-full px-4 py-3 rounded-xl bg-background border-2 transition-colors focus:outline-none focus:ring-4 focus:ring-brand-green/10 appearance-none",
                errors.type ? "border-red-500" : "border-border focus:border-brand-green"
              )}
            >
              <option value="">Sélectionnez...</option>
              <option value="Particulier">Un particulier</option>
              <option value="Association">Une association</option>
              <option value="Collectivite">Une collectivité</option>
              <option value="Entreprise">Une entreprise</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary" htmlFor="message">Votre message</label>
          <textarea
            {...register("message")}
            id="message"
            rows={4}
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-background border-2 transition-colors focus:outline-none focus:ring-4 focus:ring-brand-green/10 resize-none",
              errors.message ? "border-red-500" : "border-border focus:border-brand-green"
            )}
            placeholder="Comment pouvons-nous vous aider ?"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full text-lg"
        >
          {isSubmitting ? "Envoi en cours..." : (
            <>
              Envoyer ma demande
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
