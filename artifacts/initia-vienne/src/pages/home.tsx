import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "wouter";
import {
  Lightbulb,
  FileText,
  Clock,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { AnimatedCounter } from "@/components/animated-counter";
import { Faq } from "@/components/faq";
import { cn } from "@/lib/utils";

// ── Animation variants ──────────────────────────
const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const STAGGER = { visible: { transition: { staggerChildren: 0.12 } } };

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Testimonials carousel ────────────────────────
const TESTIMONIALS = [
  {
    quote: "Excellente initiation à l'intelligence artificielle. Bruno est très pédagogue. Avec des termes simples, il a su nous en expliquer les bases. Je lui souhaite bonne continuation.",
    name: "Chérif H.",
    date: "Mars 2026",
    stars: 5,
  },
  {
    quote: "Très bonne intervention accessible à tous, y compris les personnes qui ne pratiquent pas régulièrement les outils informatiques.",
    name: "Daniel B.",
    date: "Mars 2026",
    stars: 5,
  },
  {
    quote: "Très bonne intervention sur l'intelligence artificielle auprès des jeunes. Le contenu était clair et accessible, avec une approche ludique qui a su capter leur attention. Merci pour ce moment de qualité !",
    name: "Laura M.",
    date: "Mars 2026",
    stars: 4,
  },
  {
    quote: "Bruno est très clair et j'ai hâte de faire un autre atelier ensemble.",
    name: "Monique M.",
    date: "Mars 2026",
    stars: 5,
  },
  {
    quote: "Bien qu'ayant déjà quelques connaissances sur l'IA, nous avons appris d'autres utilisations très intéressantes — une présentation très positive.",
    name: "Christiane P.",
    date: "Mars 2026",
    stars: 5,
  },
  {
    quote: "Formation au top et adaptée au public — merci Bruno !",
    name: "Denis G.",
    date: "Mars 2026",
    stars: 4,
  },
  {
    quote: "Atelier très intéressant et très bien fait. On apprend beaucoup et c'est très accessible.",
    name: "Guy B.",
    date: "Mars 2026",
    stars: 5,
  },
  {
    quote: "Formation de qualité avec un support très adapté.",
    name: "Sandrine P.",
    date: "Mars 2026",
    stars: 5,
  },
  {
    quote: "Explications claires. Exemples bien choisis.",
    name: "Patrick D.",
    date: "Avril 2026",
    stars: 5,
  },
  {
    quote: "Très bon atelier d'initiation à l'IA. Merci Bruno",
    name: "Michel D.",
    date: "Avril 2026",
    stars: 5,
  },
  {
    quote: "Merci pour cet atelier avec des informations et des explications claires et pertinentes !",
    name: "Christian R.",
    date: "Avril 2026",
    stars: 5,
  },
  {
    quote: "Tout à fait clair pour des profanes.",
    name: "Ivana G.",
    date: "Mars 2026",
    stars: 5,
  },
];

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  const t = TESTIMONIALS[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute -top-6 -left-4 text-brand-green/10">
        <Quote className="w-24 h-24 fill-current" />
      </div>

      <motion.div
        key={current}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-green/5 border border-brand-green/10 relative z-10"
      >
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-brand-orange fill-brand-orange" />
          ))}
        </div>

        <p className="text-xl md:text-2xl font-medium text-primary leading-relaxed mb-8 italic">
          "{t.quote}"
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-lg">
              {t.name[0]}
            </div>
            <div>
              <p className="font-bold text-primary">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Avis Google
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current ? "w-8 bg-brand-orange" : "w-2 bg-brand-orange/30"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── FAQ data ─────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Faut-il avoir des compétences en informatique ?",
    a: "Absolument pas. Mes ateliers sont conçus pour les débutants. Je pars de zéro et avance à votre rythme. Si vous savez utiliser un smartphone ou envoyer un e-mail, vous avez déjà tout ce qu'il faut.",
  },
  {
    q: "Quel matériel dois-je apporter ?",
    a: "Un smartphone suffit pour participer. Vous pouvez aussi venir avec une tablette ou un ordinateur portable si vous le préférez. Pensez à prévoir votre connexion 4G ou 5G : toutes les salles ne disposent pas d'un accès Wi-Fi fiable.",
  },
  {
    q: "Combien coûte un atelier ?",
    a: "Le tarif varie selon le format et votre situation (particulier, association, collectivité). Contactez-moi pour obtenir un devis personnalisé et sans engagement.",
  },
  {
    q: "L'IA va-t-elle me faire perdre mon emploi ?",
    a: "C'est une crainte légitime que j'aborde en atelier. L'IA est avant tout un outil d'assistance. Ceux qui savent l'utiliser auront un avantage. Mes ateliers vous aident justement à maîtriser cet outil plutôt qu'en subir les effets.",
  },
  {
    q: "Puis-je organiser un atelier dans mes locaux ?",
    a: "Oui, c'est même mon mode de fonctionnement principal pour les collectivités et associations. Je me déplace dans toute la zone Viennoise et les environs. Contactez-moi pour vérifier votre secteur.",
  },
];

// ── Home Page ────────────────────────────────────
export default function Home() {
  usePageMeta({
    title: "initIA Vienne | Ateliers d'initiation à l'IA à Vienne et en Isère",
    description: "Ateliers d'initiation à l'intelligence artificielle pour seniors, associations et commerçants à Vienne (Isère). Formations accessibles, sans jargon technique.",
  });
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToWorkshops = () => document.getElementById("workshops")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="flex-1 w-full overflow-hidden">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-cream">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="max-w-2xl">
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm mb-6 border border-brand-orange/20">
                <Sparkles className="w-4 h-4" />
                Ateliers d'initiation à l'IA, Vienne (38)
              </motion.div>

              <motion.h1 variants={FADE_UP} className="text-5xl lg:text-6xl font-display font-extrabold text-primary leading-[1.1] text-balance mb-6">
                L'intelligence artificielle devient{" "}
                <span className="text-brand-orange relative whitespace-nowrap">
                  enfin accessible
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>{" "}
                à tous, à Vienne
              </motion.h1>

              <motion.p variants={FADE_UP} className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed text-balance">
                Des ateliers concrets, simples et bienveillants pour découvrir l'IA sans prise de tête. Spécialement conçus pour les débutants, les seniors, les associations et les collectivités.
              </motion.p>

              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={scrollToWorkshops} className="group">
                  Découvrir les ateliers
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToContact}>
                  Me contacter
                </Button>
              </motion.div>

              <motion.p variants={FADE_UP} className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                Ou appelez directement le{" "}
                <a href="tel:0673984285" className="font-bold text-primary hover:text-brand-orange transition-colors">
                  06 73 98 42 85
                </a>
              </motion.p>
            </motion.div>

            {/* Hero photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-green to-brand-orange rounded-[2.5rem] transform rotate-3 scale-[1.02] opacity-20 blur-lg" />
              <div className="relative rounded-[2.5rem] shadow-2xl aspect-[4/3] w-full border-4 border-white overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/atelier-hero.png`}
                  alt="Atelier d'initiation à l'IA animé par Bruno, Léo Lagrange Vienne"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-primary">100% Pratique</p>
                  <p className="text-sm text-muted-foreground">Sans jargon technique</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────── */}
      <section className="py-10 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: 100, suffix: "%", label: "Participants satisfaits" },
              { value: 0, suffix: "", label: "Prérequis technique" },
              { value: 12, suffix: " max", label: "Par groupe" },
            ].map(({ value, suffix, label }, i) => (
              <SectionReveal key={i}>
                <div className="py-2">
                  <p className="text-4xl font-display font-extrabold text-brand-orange mb-1">
                    <AnimatedCounter target={value} suffix={suffix} />
                  </p>
                  <p className="text-white/70 text-sm font-medium">{label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ───────────────────────────────── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Pourquoi se former à l'IA ?</h2>
            <p className="text-lg text-muted-foreground">
              L'IA évolue vite et peut sembler intimidante,{" "}
              <span className="font-semibold text-primary">c'est normal</span>. Mes{" "}
              <Link href="/ateliers" className="text-brand-orange font-semibold underline hover:no-underline">
                ateliers d'initiation à l'IA à Vienne
              </Link>{" "}
              vous accompagnent pas à pas, avec des exemples du quotidien.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Rédiger en quelques secondes",
                desc: "E-mails, courriers administratifs, lettres de motivation, avec l'IA vous n'êtes plus jamais à court de mots.",
                color: "bg-brand-green-light",
                iconColor: "text-brand-green",
              },
              {
                icon: Clock,
                title: "Gagner un temps précieux",
                desc: "Résumez des documents longs, trouvez une information précise, organisez votre agenda, tout cela en quelques secondes.",
                color: "bg-brand-orange-light",
                iconColor: "text-brand-orange",
              },
              {
                icon: Lightbulb,
                title: "Trouver des idées",
                desc: "Utilisez l'IA comme un assistant créatif pour organiser vos voyages, planifier vos repas, préparer un discours.",
                color: "bg-brand-green-light",
                iconColor: "text-brand-green",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-brand-cream p-8 rounded-3xl border border-border hover:shadow-xl hover:border-brand-green/30 transition-shadow duration-300 group cursor-default"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300", feature.color)}>
                  <feature.icon className={cn("w-7 h-7", feature.iconColor)} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKSHOP STEPS ────────────────────── */}
      <section id="workshops" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Comment se déroule un atelier ?</h2>
            <p className="text-white/70 text-lg">Une méthode éprouvée, basée sur l'échange et la pratique.</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Découverte", desc: "Comprendre ce qu'est vraiment l'IA, sans les clichés de la science-fiction.", emoji: "🧠" },
              { num: "2", title: "Démonstration", desc: "Voir des outils concrets en action : ChatGPT, Claude, Gemini, Le Chat...", emoji: "🎬" },
              { num: "3", title: "Pratique", desc: "Essayer par vous-même avec des exercices guidés adaptés à votre niveau.", emoji: "⌨️" },
              { num: "4", title: "Échanges", desc: "Poser toutes vos questions librement, partager vos découvertes.", emoji: "💬" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl cursor-default hover:bg-white/15 transition-colors"
              >
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 left-full w-6 z-10">
                    <ArrowRight className="w-5 h-5 text-white/30" />
                  </div>
                )}
                <div className="text-3xl mb-4">{step.emoji}</div>
                <div className="w-10 h-10 bg-brand-orange text-white text-lg font-bold font-display rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-brand-orange/30">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-white/75 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <SectionReveal className="mt-10 text-center text-white/60 text-sm">
            Durée : <strong className="text-white/90">1h à 2h</strong> · Groupes de <strong className="text-white/90">8 à 12 personnes max</strong>
          </SectionReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────── */}
      <section className="py-24 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ils ont participé à mes ateliers</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={cn("w-5 h-5", i <= 4 ? "text-brand-orange fill-brand-orange" : "text-brand-orange fill-brand-orange/50")} />
              ))}
              <span className="font-bold text-primary ml-1">4,8 / 5</span>
              <span className="text-muted-foreground text-sm">· 10 avis Google</span>
            </div>
          </SectionReveal>
          <TestimonialsCarousel />
          <SectionReveal className="mt-10 text-center">
            <a
              href="https://www.google.com/search?q=initia+vienne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-orange text-brand-orange font-semibold hover:bg-brand-orange hover:text-white transition-all duration-300"
            >
              <Star className="w-4 h-4 fill-current" />
              Voir tous les avis Google
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground">Tout ce que vous vouliez savoir sans oser demander.</p>
          </SectionReveal>
          <SectionReveal>
            <Faq items={FAQ_ITEMS} />
          </SectionReveal>
        </div>
      </section>

      {/* ── B2B CALLOUT ───────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-orange to-[#ff9100] rounded-[2.5rem] p-8 md:p-12 text-center text-white shadow-2xl shadow-brand-orange/20 relative overflow-hidden"
          >
            <ShieldCheck className="absolute top-0 right-0 w-64 h-64 text-white opacity-10 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                Vous représentez une collectivité ou une association ?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Des formats sur mesure pour lutter contre la fracture numérique, en groupes de 8 à 12 personnes.
              </p>
              <Link href="/collectivites">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 hover:scale-105 border-0 shadow-xl group">
                  Voir l'offre dédiée
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────── */}
      <section id="contact" className="py-24 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-semibold text-sm mb-6">
                <MessageCircle className="w-4 h-4" />
                Parlons de votre projet
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Prêt à faire le premier pas ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Que vous soyez un particulier curieux, une association ou une collectivité, je suis là pour répondre à vos questions.
              </p>
              <div className="space-y-5">
                {[
                  { title: "Réponse rapide", desc: "Je vous recontacte sous 24 à 48 heures." },
                  { title: "Devis gratuit", desc: "Proposition sur-mesure, sans engagement." },
                  { title: "Flexibilité", desc: "Dans vos locaux ou en salle partenaire, selon vos besoins." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-border/50">
                      <CheckCircle2 className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{title}</h4>
                      <p className="text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
