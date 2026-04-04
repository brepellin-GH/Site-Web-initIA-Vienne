import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Users,
  HeartHandshake,
  Target,
  Building2,
  ArrowRight,
  ShieldCheck,
  Check,
  MapPin,
  Clock,
  BookOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { AnimatedCounter } from "@/components/animated-counter";
import { Faq } from "@/components/faq";

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

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FAQ_B2B = [
  {
    q: "Quels publics peuvent bénéficier de ces ateliers ?",
    a: "Mes ateliers sont adaptés à tout adulte, quelle que soit son aisance numérique. J'interviens régulièrement auprès de seniors, de personnes éloignées de l'emploi, d'adhérents d'associations, de familles, et de tout public bénéficiaire de structures sociales.",
  },
  {
    q: "Combien de temps à l'avance faut-il planifier ?",
    a: "Idéalement 2 à 4 semaines à l'avance pour caler les disponibilités et préparer un contenu adapté à votre public. Je peux parfois intervenir plus rapidement selon mes disponibilités.",
  },
  {
    q: "Quel équipement faut-il prévoir dans vos locaux ?",
    a: "Une salle avec des tables et idéalement un vidéoprojecteur ou grand écran. Je peux apporter un vidéo-projecteur si nécessaire. Les participants viennent équipés d'un smartphone, tablette ou ordinateur portable avec connexion autonome 4G ou 5G.",
  },
  {
    q: "Comment se calcule le tarif ?",
    a: "Le devis est établi selon la durée de l'atelier, le nombre de participants, le lieu et la fréquence des interventions. Des tarifs préférentiels sont appliqués pour les structures à but non lucratif et les collectivités. Contactez-moi pour un devis gratuit.",
  },
  {
    q: "Peut-on organiser plusieurs sessions pour le même groupe ?",
    a: "Absolument ! Je propose des cycles d'ateliers progressifs pour accompagner vos publics dans la durée. C'est même recommandé pour un ancrage durable des apprentissages.",
  },
];

export default function Collectivites() {
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="flex-1 w-full">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green opacity-40 skew-x-12 translate-x-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-2xl"
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-brand-orange font-semibold text-sm mb-6 border border-white/20">
                <Building2 className="w-4 h-4" />
                Offre Collectivités & Associations
              </motion.div>

              <motion.h1 variants={FADE_UP} className="text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white leading-[1.1] mb-6">
                Formations IA pour les{" "}
                <span className="text-brand-orange">organisations, associations et collectivités</span>
              </motion.h1>

              <motion.p variants={FADE_UP} className="text-lg lg:text-xl text-primary-foreground/85 mb-8 leading-relaxed">
                Des ateliers sur mesure pour les collectivités, centres sociaux et associations qui souhaitent lutter contre la fracture numérique.
              </motion.p>

              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="accent" onClick={scrollToContact} className="group text-lg px-8">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <a
                  href="tel:0673984285"
                  className="inline-flex items-center justify-center h-14 px-8 text-lg rounded-xl font-semibold border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  06 73 98 42 85
                </a>
              </motion.div>
            </motion.div>

            {/* Floating stats cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4 relative">
              {[
                { value: 50, suffix: "+", label: "Ateliers réalisés", color: "bg-white" },
                { value: 8, suffix: " à 12", label: "Participants/groupe", color: "bg-brand-orange" },
                { value: 98, suffix: "%", label: "Taux de satisfaction", color: "bg-white" },
                { value: 0, suffix: " €", label: "Devis sans engagement", color: "bg-brand-green-light" },
              ].map(({ value, suffix, label, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`${color} p-6 rounded-2xl shadow-xl flex flex-col justify-center ${i % 2 === 1 ? "mt-8" : ""}`}
                >
                  <p className={`text-3xl font-display font-extrabold mb-1 ${color === "bg-brand-orange" ? "text-white" : "text-brand-orange"}`}>
                    <AnimatedCounter target={value} suffix={suffix} />
                  </p>
                  <p className={`text-sm font-medium ${color === "bg-brand-orange" ? "text-white/80" : "text-muted-foreground"}`}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── ENJEUX ────────────────────────────── */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/50">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-display font-bold mb-4">Les enjeux de l'inclusion numérique</h2>
                <p className="text-lg text-muted-foreground">
                  De plus en plus de démarches se font en ligne. L'IA accélère cette transformation.{" "}
                  <strong className="text-primary font-semibold">
                    Les aînés et publics fragilisés risquent d'être exclus si nous n'agissons pas.
                  </strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: ShieldCheck, color: "bg-brand-green/10 text-brand-green", title: "Autonomie", desc: "Permettre à chacun de comprendre et d'utiliser ces nouveaux outils de manière indépendante." },
                  { icon: Target, color: "bg-brand-orange/10 text-brand-orange", title: "Confiance en soi", desc: "Démystifier la technologie pour réduire l'anxiété face au numérique et rendre confiance." },
                  { icon: HeartHandshake, color: "bg-brand-green/10 text-brand-green", title: "Lien social", desc: "Créer des moments de partage et d'entraide autour d'un sujet de société essentiel." },
                ].map(({ icon: Icon, color, title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="text-center p-6 rounded-2xl border border-transparent hover:border-brand-green/10 hover:bg-brand-cream transition-all cursor-default"
                  >
                    <div className={`w-16 h-16 mx-auto ${color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-muted-foreground">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── OBJECTIFS PÉDAGOGIQUES ────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Mes objectifs pédagogiques</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Chaque atelier est conçu avec une approche adaptée aux adultes et seniors, favorisant la pratique immédiate.
              </p>
              <ul className="space-y-3">
                {[
                  "Comprendre ce qu'est l'IA et comment elle fonctionne",
                  "Utiliser des outils d'IA simples en autonomie totale",
                  "Démystifier les idées reçues et les peurs sur la technologie",
                  "Renforcer la confiance numérique globale des participants",
                  "Repartir avec des exercices pratiques à refaire chez soi",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-cream transition-colors border border-transparent hover:border-brand-green/10 group"
                  >
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-primary">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "100%", label: "Adapté aux débutants", bg: "bg-brand-cream border border-brand-green/10", textColor: "text-brand-orange" },
                  { value: "0", label: "Jargon technique", bg: "bg-primary text-white", textColor: "text-brand-orange" },
                  { value: "1h–2h", label: "Durée optimale", bg: "bg-brand-orange text-white", textColor: "text-white" },
                  { value: "Sur site", label: "Dans vos locaux", bg: "bg-brand-green-light border border-brand-green/10", textColor: "text-brand-green" },
                ].map(({ value, label, bg, textColor }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                    className={`${bg} p-6 rounded-3xl aspect-square flex flex-col justify-center cursor-default ${i % 2 === 1 ? "mt-8" : ""}`}
                  >
                    <h4 className={`text-3xl font-black mb-2 ${textColor}`}>{value}</h4>
                    <p className="font-medium text-sm opacity-80">{label}</p>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── MODALITÉS ─────────────────────────── */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Modalités pratiques</h2>
            <p className="text-lg text-muted-foreground">Une organisation simple pour faciliter la mise en place de vos ateliers.</p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Durée", desc: "Formats modulables de 1h à 2h par atelier selon votre public et vos contraintes." },
              { icon: Users, title: "Groupes", desc: "Petits groupes de 8 à 12 personnes pour un suivi personnalisé et des échanges riches." },
              { icon: MapPin, title: "Lieu", desc: "Interventions en présentiel directement dans vos locaux — Vienne et communes environnantes." },
              { icon: BookOpen, title: "Matériel", desc: "Possibilité de fourniture d'un vidéo-projecteur. Participants équipés d'un smartphone, tablette ou ordinateur portable avec connexion autonome 4G ou 5G." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center hover:shadow-lg hover:border-brand-green/20 transition-all cursor-default"
              >
                <div className="w-14 h-14 mx-auto bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉFÉRENCES ────────────────────────── */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Ils me font déjà confiance</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              "Centre social d'Estressin",
              "Club Léo Lagrange Vienne",
              "MJC de Vienne",
            ].map((ref) => (
              <motion.div
                key={ref}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                className="px-6 py-3 rounded-full bg-brand-cream border border-brand-green/20 font-semibold text-primary cursor-default shadow-sm hover:shadow-md hover:border-brand-green/40 transition-shadow"
              >
                {ref}
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <SectionReveal className="mt-12 max-w-2xl mx-auto bg-brand-cream rounded-3xl p-8 border border-brand-green/10">
            <div className="flex justify-center mb-3">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 text-brand-orange fill-brand-orange" />)}
            </div>
            <p className="text-primary italic text-lg leading-relaxed mb-4">
              "Mes adhérents étaient sceptiques au départ. Après l'atelier, ils posaient des questions, voulaient réessayer chez eux et demandaient une suite. Une vraie réussite."
            </p>
            <p className="font-bold text-primary">Responsable associatif</p>
            <p className="text-sm text-muted-foreground">Centre social d'Estressin</p>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────── */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Vos questions, mes réponses</h2>
            <p className="text-lg text-muted-foreground">Tout ce que les structures me demandent habituellement.</p>
          </SectionReveal>
          <SectionReveal>
            <Faq items={FAQ_B2B} />
          </SectionReveal>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────── */}
      <section id="contact" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Construisons votre projet ensemble</h2>
            <p className="text-lg text-white/70 mb-6">
              Devis gratuit. J'adapte le contenu et la durée à vos contraintes et à vos publics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:initia.vienne@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                initia.vienne@gmail.com
              </a>
              <a
                href="https://wa.me/33673984285"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Me contacter sur WhatsApp
              </a>
            </div>
          </SectionReveal>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm className="max-w-2xl mx-auto" />
          </motion.div>
        </div>
      </section>

    </main>
  );
}
