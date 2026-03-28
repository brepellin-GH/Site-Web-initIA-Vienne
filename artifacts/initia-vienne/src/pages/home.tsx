import { Link } from "wouter";
import { useState } from "react";
import {
  Lightbulb,
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
  Mail,
  MessageSquare,
  Smile,
  BookOpen,
  Zap,
  Building2,
  ChevronDown,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ────────────────────────────────────────────────
// CONTACT FORM
// ────────────────────────────────────────────────
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", structure: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to backend or Google Sheets webhook
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Message envoyé !</h3>
        <p className="text-muted-foreground">Je vous recontacte sous 48h. À très bientôt !</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Votre nom *
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Marie Dupont"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="marie@exemple.fr"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          />
        </div>
      </div>
      <div>
        <label htmlFor="structure" className="block text-sm font-medium text-foreground mb-1">
          Vous êtes…
        </label>
        <select
          id="structure"
          value={form.structure}
          onChange={(e) => setForm({ ...form, structure: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
        >
          <option value="">Choisir...</option>
          <option value="particulier">Un particulier</option>
          <option value="senior">Un senior / retraité</option>
          <option value="association">Une association</option>
          <option value="collectivite">Une collectivité</option>
          <option value="entreprise">Une entreprise</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
          Votre message
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Dites-moi ce qui vous intéresse ou posez vos questions..."
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
        <Mail className="mr-2 h-4 w-4" />
        Envoyer ma demande
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Ou appelez directement :{" "}
        <a href="tel:+33756958511" className="text-primary font-medium hover:underline">
          07 56 95 85 11
        </a>
      </p>
    </form>
  );
}

// ────────────────────────────────────────────────
// HOME PAGE
// ────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[hsl(142,50%,18%)] text-primary-foreground">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-primary-foreground/5 blur-2xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-accent/20 text-accent-foreground border-accent/30 text-sm font-medium px-3 py-1">
              <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
              Ateliers d'initiation — Vienne, Isère
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              L'intelligence artificielle devient enfin{" "}
              <span className="text-accent">accessible à tous</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl">
              Des ateliers concrets, bienveillants et sans jargon technique. Découvrez comment l'IA peut simplifier votre quotidien — que vous soyez débutant, senior ou curieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-semibold text-base px-8"
              >
                <a href="#contact">
                  Me contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-base"
              >
                <a href="tel:+33756958511">
                  <Phone className="mr-2 h-4 w-4" />
                  07 56 95 85 11
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce text-primary-foreground/50">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ── POURQUOI ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Le constat</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-snug">
                L'IA semble compliquée ?<br />
                <span className="text-primary">C'est une idée reçue.</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                Entre les robots des films de science-fiction et les discours techniques des experts, l'intelligence artificielle effraie. Beaucoup pensent que c'est réservé aux ingénieurs, aux jeunes, aux "geeks".
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                <strong className="text-foreground">En réalité, les outils d'IA disponibles aujourd'hui sont aussi simples à utiliser que Google.</strong> Avec un peu de méthode et de pratique, tout le monde peut en bénéficier.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Pas besoin de compétences techniques",
                  "Pas besoin d'être jeune ou diplômé",
                  "Pas besoin d'un équipement particulier",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Smile, title: "Bienveillant", desc: "Un cadre rassurant, sans jugement, à votre rythme." },
                { icon: Zap, title: "Concret", desc: "Des exercices pratiques sur des cas du quotidien." },
                { icon: Users, title: "En groupe", desc: "Petits groupes de 8 à 12 personnes pour un suivi personnalisé." },
                { icon: BookOpen, title: "Pédagogique", desc: "Un langage clair, sans jargon ni termes techniques." },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="p-5 border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <Icon className="h-7 w-7 text-accent mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BÉNÉFICES ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/20">Ce que vous allez gagner</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Des tâches du quotidien simplifiées
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Voici ce que vous saurez faire après un atelier initIA Vienne.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "✉️", title: "Écrire des mails", desc: "Rédiger une lettre de réclamation, un email professionnel ou un message délicat en quelques secondes." },
              { emoji: "📋", title: "Résumer des textes", desc: "Comprendre rapidement un contrat, une notice ou un article de presse en demandant un résumé." },
              { emoji: "💡", title: "Trouver des idées", desc: "Préparer un anniversaire, un voyage, un discours ou un cadeau grâce à l'IA comme assistant créatif." },
              { emoji: "🔍", title: "Mieux chercher", desc: "Obtenir des réponses claires et précises plutôt que de se perdre dans des pages de résultats." },
              { emoji: "📸", title: "Créer des images", desc: "Générer des visuels originaux pour illustrer un projet, une affiche ou simplement pour s'amuser." },
              { emoji: "🗣️", title: "Traduire & paraphraser", desc: "Traduire un document en langue étrangère ou reformuler un texte compliqué en langage simple." },
            ].map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 bg-white rounded-xl p-5 border border-border hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <span className="text-3xl shrink-0">{emoji}</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DÉROULEMENT ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Programme</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Comment se déroule un atelier ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Chaque atelier suit 4 étapes claires, pensées pour que vous repartiez avec des compétences réelles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30" />

            {[
              {
                step: "01",
                color: "bg-primary",
                title: "Découverte",
                desc: "Qu'est-ce que l'IA ? Démystification des idées reçues et panorama des outils accessibles aujourd'hui.",
              },
              {
                step: "02",
                color: "bg-primary/80",
                title: "Démonstration",
                desc: "Observation de cas réels et concrets : comment l'IA répond, rédige, résume et aide au quotidien.",
              },
              {
                step: "03",
                color: "bg-accent",
                title: "Pratique",
                desc: "Vous prenez en main les outils vous-même, avec des exercices guidés adaptés à vos besoins.",
              },
              {
                step: "04",
                color: "bg-accent/80",
                title: "Échanges",
                desc: "Questions, astuces partagées, et conseils personnalisés pour continuer à apprendre chez vous.",
              },
            ].map(({ step, color, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className={`relative z-10 w-16 h-16 ${color} text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md mb-4`}>
                  {step}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Durée : <strong className="text-foreground">1h à 2h</strong> · Groupes de{" "}
              <strong className="text-foreground">8 à 12 personnes</strong> · Matériel fourni
            </p>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/20">Témoignages</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ils ont participé, ils témoignent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Martine L.",
                role: "Retraitée, 68 ans",
                text: "J'avais très peur de l'informatique. Après l'atelier, j'ai rédigé ma première lettre de résiliation toute seule avec l'IA. Incroyable !",
                stars: 5,
              },
              {
                name: "Patrick D.",
                role: "Membre du Club Léo Lagrange",
                text: "La formatrice explique vraiment bien, sans se moquer. On repart avec des choses qu'on peut utiliser le soir même chez soi.",
                stars: 5,
              },
              {
                name: "Responsable associatif",
                role: "Centre social d'Estressin",
                text: "Nos adhérents avaient des a priori sur l'IA. Après l'atelier, ils étaient enthousiastes et demandaient une suite. On recommande vivement.",
                stars: 5,
              },
            ].map(({ name, role, text, stars }) => (
              <Card key={name} className="p-6 bg-white border-border">
                <div className="flex mb-3">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4 italic">"{text}"</p>
                <div>
                  <p className="font-semibold text-sm text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TUNNEL COLLECTIVITÉS ─────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent to-[hsl(25,100%,42%)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Building2 className="h-12 w-12 mx-auto mb-5 text-white/80" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Vous représentez une structure ?
            </h2>
            <p className="text-white/85 text-lg mb-8 leading-relaxed">
              Collectivités, associations, CCAS, EHPAD — initIA Vienne propose des ateliers clé en main pour lutter contre la fracture numérique et accompagner vos publics vers l'autonomie digitale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-accent hover:bg-white/90 font-semibold text-base"
              >
                <Link href="/collectivites">
                  Découvrir l'offre structures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20 font-semibold"
              >
                <a href="#contact">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Demander un devis
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────── */}
      <section id="contact" className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Contact</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">
                Prêt à franchir le pas ?
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Une question, une envie de participer à un atelier, ou un projet pour votre structure ? Contactez-moi — je vous réponds sous 48h.
              </p>

              <div className="space-y-5">
                <a
                  href="tel:+33756958511"
                  className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">07 56 95 85 11</p>
                    <p className="text-xs text-muted-foreground">Appel / SMS — Lun–Sam, 9h–19h</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@initia-vienne.fr"
                  className="flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/15 hover:bg-accent/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">contact@initia-vienne.fr</p>
                    <p className="text-xs text-muted-foreground">Réponse sous 48h</p>
                  </div>
                </a>
              </div>
            </div>

            <Card className="p-6 md:p-8 border-border shadow-sm">
              <h3 className="font-semibold text-xl text-foreground mb-6">Envoyez-moi un message</h3>
              <ContactForm />
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
