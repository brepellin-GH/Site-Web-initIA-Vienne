import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import {
  CopyEmailButton,
  EMAIL,
  Kicker,
  PHONE_DISPLAY,
  PHONE_HREF,
  PhoneIcon,
  WHATSAPP_HREF,
  greenButtonClass,
  inputClass,
} from "@/components/site/ui";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  type: z.string().min(1, "Veuillez sélectionner un type"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  consent: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter pour envoyer votre message." }) }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Les valeurs enregistrées restent celles déjà présentes en base
// (Association, Collectivite, Particulier), plus Reseau_pro.
const TYPE_OPTIONS = [
  { value: "Association", label: "Association ou centre social" },
  { value: "Collectivite", label: "Collectivité" },
  { value: "Reseau_pro", label: "Réseau professionnel" },
  { value: "Particulier", label: "Particulier" },
];

const errorCls = "m-0 text-[#B42318] text-lg";
const labelCls = "font-semibold text-iv-ink";

function Check() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F07E01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ContactForm({ label, title, intro }: { label: string; title: string; intro: string }) {
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

  const heading = (
    <div className="flex flex-col gap-2.5">
      <Kicker>{label}</Kicker>
      <h2 className="m-0 text-[32px] lg:text-[44px] leading-[1.08] text-balance">{title}</h2>
      <p className="m-0 max-w-[640px]">{intro}</p>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="flex flex-col gap-6 px-5 py-10 lg:px-12 lg:py-16" role="status">
        {heading}
        <div className="flex flex-col gap-3 p-6 border-2 border-iv-green bg-iv-paper">
          <h3 className="m-0 text-2xl text-iv-green">Message envoyé !</h3>
          <p className="m-0">Merci pour votre message. Je vous recontacte très prochainement.</p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="self-start mt-2 font-bold text-iv-green underline underline-offset-4 hover:text-iv-green-dark"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[22px] m-0 px-5 py-10 lg:px-12 lg:py-16">
      {heading}

      <label className="flex flex-col gap-2" htmlFor="name">
        <span className={labelCls}>Nom / Prénom</span>
        <input
          {...register("name")}
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          className={cn(inputClass, errors.name && "border-[#B42318]")}
          placeholder="Jean Dupont"
        />
        {errors.name && <span className={cn(errorCls, "block")}>{errors.name.message}</span>}
      </label>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[22px]">
        <label className="flex flex-col gap-2" htmlFor="email">
          <span className={labelCls}>E-mail</span>
          <input
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={cn(inputClass, errors.email && "border-[#B42318]")}
            placeholder="jean@exemple.com"
          />
          {errors.email && <span className={cn(errorCls, "block")}>{errors.email.message}</span>}
        </label>

        <label className="flex flex-col gap-2" htmlFor="type">
          <span className={labelCls}>Vous êtes…</span>
          <span className="relative block">
            <select
              {...register("type")}
              id="type"
              aria-invalid={!!errors.type}
              className={cn(inputClass, "appearance-none pr-11", errors.type && "border-[#B42318]")}
            >
              <option value="">Sélectionnez…</option>
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-iv-ink" />
          </span>
          {errors.type && <span className={cn(errorCls, "block")}>{errors.type.message}</span>}
        </label>
      </div>

      <label className="flex flex-col gap-2" htmlFor="message">
        <span className={labelCls}>Votre message</span>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          className={cn(inputClass, "h-auto py-3.5 leading-normal resize-y", errors.message && "border-[#B42318]")}
          placeholder="Comment puis-je vous aider ?"
        />
        {errors.message && <span className={cn(errorCls, "block")}>{errors.message.message}</span>}
      </label>

      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-[24px_1fr] gap-3 items-start">
          <input
            {...register("consent")}
            type="checkbox"
            id="consent"
            className="w-[22px] h-[22px] mt-[3px] accent-iv-green cursor-pointer"
          />
          <label htmlFor="consent" className="cursor-pointer">
            J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
            <Link href="/politique-de-confidentialite" className="font-semibold text-iv-green underline underline-offset-4 hover:text-iv-green-dark">
              politique de confidentialité
            </Link>
            .
          </label>
        </div>
        {errors.consent && <p className={errorCls}>{errors.consent.message}</p>}
      </div>

      <div className="flex">
        <button type="submit" disabled={isSubmitting} className={cn(greenButtonClass, "w-full lg:w-auto lg:min-w-[300px]")}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {submitError && (
        <p className={errorCls} role="alert">
          Une erreur est survenue. Merci de me contacter directement à{" "}
          <a href={`mailto:${EMAIL}`} className="underline">
            {EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}

/** Bloc contact de la maquette : formulaire à gauche, coordonnées sur fond vert à droite. */
export function ContactBlock({ label, title, intro }: { label: string; title: string; intro: string }) {
  const sideLink = "flex items-center gap-3 min-h-12 text-iv-paper font-semibold underline underline-offset-4 hover:text-iv-orange";
  return (
    <div className="iv-band grid grid-cols-1 lg:grid-cols-[7fr_5fr] border-t-2 border-iv-ink min-[1280px]:bg-[linear-gradient(to_right,transparent_50%,#006D29_50%)]">
      <div className="bg-iv-cream">
        <ContactForm label={label} title={title} intro={intro} />
      </div>
      <div className="iv-dark flex flex-col gap-7 px-5 py-9 lg:px-12 lg:py-16 bg-iv-green text-iv-paper border-t-2 lg:border-t-0 lg:border-l-2 border-iv-ink">
        <Kicker className="text-iv-paper">Contactez-moi directement</Kicker>
        <div className="flex flex-col gap-1.5">
          <a href={PHONE_HREF} className="flex items-center gap-3 min-h-12 text-iv-paper text-[28px] lg:text-[34px] font-extrabold leading-[1.1] no-underline hover:text-iv-orange">
            <PhoneIcon size={28} className="flex-none text-iv-orange" />
            {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={sideLink}>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F07E01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            Écrire sur WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className={cn(sideLink, "break-all")}>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F07E01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {EMAIL}
          </a>
          <CopyEmailButton className="ml-9 text-iv-paper" />
        </div>
        <ul className="flex flex-col m-0 p-0 list-none">
          {[
            ["Réponse sous 24 à 48 h", "Je vous recontacte sous 24 à 48 heures."],
            ["Devis gratuit, sans engagement", "Proposition sur mesure."],
            ["Dans vos locaux ou en salle partenaire", "Selon vos besoins."],
          ].map(([t, d], i) => (
            <li key={t} className={cn("grid grid-cols-[24px_1fr] gap-3 py-[18px] border-t border-iv-hair-light", i === 2 && "border-b")}>
              <Check />
              <span className="flex flex-col gap-0.5">
                <span className="text-[19px] font-bold">{t}</span>
                <span className="leading-[1.45]">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
