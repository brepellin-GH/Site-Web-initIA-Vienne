import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Send, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  type: z.string().min(1, "Veuillez sélectionner un type"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  consent: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter pour envoyer votre message." }) }),
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

  const [submitError, setSubmitError] = useState(false);

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(false);
    const { error } = await supabase.from("contacts").insert({
      name: data.name,
      email: data.email,
      type: data.type,
      message: data.message,
    });
    if (!error) {
      setIsSubmitted(true);
    } else {
      setSubmitError(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn("bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-brand-green/5 border border-brand-green/10 text-center space-y-4", className)}>
        <div className="mx-auto w-16 h-16 bg-brand-green-light text-brand-green rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-bold text-primary">Message envoyé !</h3>
        <p className="text-muted-foreground">
          Merci pour votre message. Je vous recontacte très prochainement.
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
        <h3 className="text-2xl font-display font-bold text-primary mb-2">Envoyez-moi un message</h3>
        <p className="text-muted-foreground">Remplissez le formulaire ci-dessous ou contactez-moi directement.</p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <a
            href="tel:0673984285"
            className="inline-flex items-center gap-2 text-brand-orange font-bold hover:text-brand-orange/80 transition-colors"
          >
            <PhoneCall className="w-5 h-5" />
            06 73 98 42 85
          </a>
          <a
            href="https://wa.me/33673984285"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] font-bold hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
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
            placeholder="Comment puis-je vous aider ?"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              {...register("consent")}
              type="checkbox"
              id="consent"
              className="mt-1 w-4 h-4 shrink-0 accent-brand-green cursor-pointer"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
              <a href="/politique-de-confidentialite" className="underline hover:text-primary transition-colors">politique de confidentialité</a>.
            </span>
          </label>
          {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}
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

        {submitError && (
          <p className="text-red-500 text-sm text-center">
            Une erreur est survenue. Merci de me contacter directement à{" "}
            <a href="mailto:initia.vienne@gmail.com" className="underline">initia.vienne@gmail.com</a>.
          </p>
        )}
      </form>
    </div>
  );
}
