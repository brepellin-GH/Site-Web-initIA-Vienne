import { Link } from "wouter";
import { useState } from "react";
import {
  CheckCircle2,
  Users,
  Heart,
  Shield,
  TrendingUp,
  Clock,
  MapPin,
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  Building2,
  BookOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ────────────────────────────────────────────────
// DEVIS FORM
// ────────────────────────────────────────────────
function DevisForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    structure: "",
    type: "",
    participants: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Demande envoyée !</h3>
        <p className="text-muted-foreground">Je vous recontacte avec un devis personnalisé sous 48h.</p>
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
            placeholder="Jean Martin"
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
            placeholder="jean@mairie-vienne.fr"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          />
        </div>
      </div>
      <div>
        <label htmlFor="structure" className="block text-sm font-medium text-foreground mb-1">
          Nom de votre structure *
        </label>
        <input
          id="structure"
          type="text"
          required
          value={form.structure}
          onChange={(e) => setForm({ ...form, structure: e.target.value })}
          placeholder="Mairie de Vienne, Association XYZ..."
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1">
            Type de structure
          </label>
          <select
            id="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          >
            <option value="">Choisir...</option>
            <option value="mairie">Mairie / Collectivité</option>
            <option value="ccas">CCAS</option>
            <option value="association">Association</option>
            <option value="ehpad">EHPAD / Résidence seniors</option>
            <option value="centre-social">Centre social</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-foreground mb-1">
            Nombre de participants estimé
          </label>
          <select
            id="participants"
            value={form.participants}
            onChange={(e) => setForm({ ...form, participants: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          >
            <option value="">Choisir...</option>
            <option value="8-12">8 à 12 personnes</option>
            <option value="13-25">13 à 25 personnes</option>
            <option value="25+">Plus de 25 personnes</option>
            <option value="nc">Non défini</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
          Votre projet ou vos besoins
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Décrivez votre projet, le public concerné, vos dates souhaitées..."
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
        <Mail className="mr-2 h-4 w-4" />
        Demander un devis gratuit
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
// COLLECTIVITÉS PAGE
// ────────────────────────────────────────────────
export default function Collectivites() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(142,55%,15%)] to-primary text-primary-foreground">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/3 w-60 h-60 rounded-full bg-primary-foreground/5 blur-2xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-accent/20 text-accent-foreground border-accent/30 text-sm font-medium px-3 py-1">
              <Building2 className="h-3.5 w-3.5 mr-1.5" />
              Offre structures — Collectivités & Associations
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              Initiez vos publics à l'IA.{" "}
              <span className="text-accent">Combattez la fracture numérique.</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl">
              Des ateliers clé en main pour accompagner seniors, personnes éloignées du numérique et tous vos publics vers l'autonomie dans un monde dominé par l'intelligence artificielle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-semibold text-base px-8"
              >
                <a href="#devis">
                  Demander un devis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold"
              >
                <a href="tel:+33756958511">
                  <Phone className="mr-2 h-4 w-4" />
                  07 56 95 85 11
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENJEUX ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Pourquoi agir maintenant</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              La fracture numérique s'accélère
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              L'IA transforme profondément notre société. Sans accompagnement, certains publics risquent d'être laissés encore davantage à l'écart — avec des conséquences concrètes sur leur vie quotidienne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                color: "text-primary",
                bg: "bg-primary/10",
                title: "Inclusion numérique",
                desc: "L'IA est de plus en plus présente dans les services publics, la santé et le quotidien. Savoir l'utiliser devient une compétence essentielle pour tous.",
              },
              {
                icon: TrendingUp,
                color: "text-accent",
                bg: "bg-accent/10",
                title: "Autonomie renforcée",
                desc: "Vos publics gagnent en indépendance : rédiger, chercher, comprendre, s'exprimer — sans avoir besoin de demander de l'aide à chaque étape.",
              },
              {
                icon: Heart,
                color: "text-primary",
                bg: "bg-primary/10",
                title: "Confiance en soi",
                desc: "Face à une technologie souvent anxiogène, nos ateliers redonnent confiance. Les participants repartent avec un sentiment de capacité, pas de dépassement.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <Card key={title} className="p-6 border-border text-center">
                <div className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJECTIFS PÉDAGOGIQUES ─────────────── */}
      <section className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent/15 text-accent border-accent/20">Objectifs pédagogiques</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-snug">
                Ce que vos publics apprennent
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Chaque atelier est conçu avec des objectifs clairs et mesurables, adaptés aux besoins de vos bénéficiaires.
              </p>
              <div className="space-y-4">
                {[
                  { icon: BookOpen, text: "Comprendre ce qu'est (et ce que n'est pas) l'intelligence artificielle" },
                  { icon: CheckCircle2, text: "Utiliser un outil d'IA conversationnelle (type ChatGPT) en autonomie" },
                  { icon: Shield, text: "Identifier les usages bénéfiques et les limites de l'IA" },
                  { icon: Users, text: "Développer un regard critique sur les contenus générés par l'IA" },
                  { icon: TrendingUp, text: "Repartir avec des exercices pratiques à refaire chez soi" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Format card */}
              <Card className="p-6 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground text-lg">Formats disponibles</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Atelier découverte", detail: "1h — Introduction, démo et premiers essais guidés" },
                    { label: "Atelier approfondi", detail: "2h — Pratique intensive et cas d'usage personnalisés" },
                    { label: "Cycle d'ateliers", detail: "Sur-mesure — Programme multi-séances adapté à vos publics" },
                  ].map(({ label, detail }) => (
                    <div key={label} className="flex gap-3 p-3 bg-white rounded-lg border border-border">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Logistics card */}
              <Card className="p-6 border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-foreground text-lg">Logistique</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground">
                  <p>✅ Groupes de <strong>8 à 12 personnes</strong> maximum</p>
                  <p>✅ Intervention <strong>dans vos locaux</strong> (ou en salle partenaire)</p>
                  <p>✅ Matériel et supports <strong>fournis</strong></p>
                  <p>✅ Zone d'intervention : <strong>Vienne et agglomération</strong></p>
                  <p>✅ Tarification <strong>adaptée aux structures</strong> (devis gratuit)</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── RÉFÉRENCES ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Expérience terrain</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              initIA Vienne intervient auprès de structures engagées dans l'inclusion numérique de leurs publics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              {
                name: "Centre social d'Estressin",
                type: "Centre social",
                desc: "Ateliers réguliers pour les adhérents seniors souhaitant s'initier aux outils numériques et à l'IA.",
              },
              {
                name: "Club Léo Lagrange",
                type: "Association",
                desc: "Séances d'initiation pour les membres du club, avec un accent sur les usages pratiques du quotidien.",
              },
              {
                name: "Structures partenaires",
                type: "CCAS & collectivités",
                desc: "Interventions auprès de publics fragilisés dans le cadre de programmes d'inclusion numérique.",
              },
            ].map(({ name, type, desc }) => (
              <Card key={name} className="p-5 border-border hover:border-primary/30 hover:shadow-sm transition-all">
                <Badge className="mb-3 bg-secondary text-secondary-foreground border-0 text-xs">{type}</Badge>
                <h3 className="font-semibold text-foreground mb-2">{name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>

          {/* Testimonial */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-primary/5 border-primary/15 text-center">
              <div className="flex justify-center mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground text-base italic leading-relaxed mb-5">
                "Nos adhérents avaient des a priori importants sur l'IA. Après l'atelier initIA Vienne, ils étaient enthousiastes, posaient des questions, et demandaient une suite. Une intervention que nous recommandons vivement à toutes les structures similaires."
              </p>
              <p className="font-semibold text-foreground">Responsable associatif</p>
              <p className="text-sm text-muted-foreground">Centre social d'Estressin</p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── CTA PARTICULIERS ─────────────────────── */}
      <section className="py-10 bg-muted/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Vous êtes un particulier ?</p>
              <p className="text-sm text-muted-foreground">Découvrez nos ateliers ouverts au grand public.</p>
            </div>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <Link href="/">
                Voir la page Grand Public
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── DEVIS ─────────────────────────────── */}
      <section id="devis" className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Devis gratuit</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">
                Parlons de votre projet
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Chaque structure a ses propres publics et ses propres enjeux. Contactez-moi pour un échange personnalisé et un devis adapté à vos besoins.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">Devis gratuit et sans engagement</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">Programme adapté à vos publics et vos objectifs</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">Intervention flexible : vos locaux ou salle partenaire</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">Réponse sous 48h</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href="tel:+33756958511"
                  className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">07 56 95 85 11</p>
                    <p className="text-xs text-muted-foreground">Appel direct — Lun–Sam, 9h–19h</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@initia-vienne.fr"
                  className="flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/15 hover:bg-accent/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">contact@initia-vienne.fr</p>
                    <p className="text-xs text-muted-foreground">Email — Réponse sous 48h</p>
                  </div>
                </a>
              </div>
            </div>

            <Card className="p-6 md:p-8 border-border shadow-sm">
              <h3 className="font-semibold text-xl text-foreground mb-2">Demande de devis</h3>
              <p className="text-sm text-muted-foreground mb-6">Gratuit et sans engagement</p>
              <DevisForm />
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
