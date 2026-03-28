import { motion } from "framer-motion";
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
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWorkshops = () => {
    document.getElementById("workshops")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex-1 w-full overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-cream">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={STAGGER}
              className="max-w-2xl"
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm mb-6 border border-brand-orange/20">
                <Sparkles className="w-4 h-4" />
                Ateliers d'initiation à l'IA
              </motion.div>
              
              <motion.h1 variants={FADE_UP} className="text-5xl lg:text-6xl font-display font-extrabold text-primary leading-[1.1] text-balance mb-6">
                L'intelligence artificielle devient <span className="text-brand-orange relative whitespace-nowrap">enfin accessible<svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none"/></svg></span> à tous
              </motion.h1>
              
              <motion.p variants={FADE_UP} className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed text-balance">
                Des ateliers concrets, simples et bienveillants pour découvrir l'IA sans prise de tête. Spécialement conçus pour les débutants, les seniors et les professionnels.
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
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                Ou appelez directement le <a href="tel:0756958511" className="font-bold text-primary hover:text-brand-orange transition-colors">07 56 95 85 11</a>
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-green to-brand-orange rounded-[2.5rem] transform rotate-3 scale-[1.02] opacity-20 blur-lg" />
              <img 
                src={`${import.meta.env.BASE_URL}images/hero-home.png`}
                alt="Groupe de personnes souriantes en atelier IA"
                className="relative rounded-[2.5rem] shadow-2xl object-cover aspect-square md:aspect-[4/3] w-full border-4 border-white"
              />
              {/* Floating Badge */}
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

      {/* WHY SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Pourquoi se former à l'IA ?</h2>
            <p className="text-lg text-muted-foreground">
              L'IA évolue vite et peut sembler intimidante — <span className="font-semibold text-primary">c'est normal</span>. 
              Nos ateliers sont conçus pour vous accompagner pas à pas, avec des exemples du quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Rédiger en quelques secondes",
                desc: "Apprenez à rédiger des e-mails, courriers administratifs ou lettres de motivation sans effort."
              },
              {
                icon: Clock,
                title: "Gagner du temps",
                desc: "Résumez de longs documents instantanément et trouvez l'information dont vous avez besoin rapidement."
              },
              {
                icon: Lightbulb,
                title: "Trouver des idées",
                desc: "Utilisez l'IA comme un assistant créatif pour organiser vos voyages, vos repas ou vos projets."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-cream p-8 rounded-3xl border border-border hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-brand-green-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSHOP STEPS */}
      <section id="workshops" className="py-24 bg-brand-green text-white relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Comment se déroule un atelier ?</h2>
            <p className="text-brand-green-light/80 text-lg">Une méthode éprouvée, basée sur l'échange et la pratique.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Découverte", desc: "Comprendre ce qu'est vraiment l'IA (sans les clichés)." },
              { num: "2", title: "Démonstration", desc: "Voir des outils concrets en action (ChatGPT, etc.)." },
              { num: "3", title: "Pratique", desc: "Essayer vous-même avec des exercices guidés." },
              { num: "4", title: "Échanges", desc: "Poser vos questions librement et discuter." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Connecting line for desktop */}
                {i < 3 && <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-white/20 -translate-x-4" />}
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl h-full relative z-10 hover:bg-white/15 transition-colors">
                  <div className="w-16 h-16 bg-brand-orange text-white text-2xl font-bold font-display rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-orange/30">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-white/80 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ils ont participé à nos ateliers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Je pensais que l'IA c'était pour les jeunes. Maintenant j'utilise ChatGPT tous les jours pour écrire mes e-mails !",
                name: "Marie-Claire",
                desc: "68 ans",
                bg: "bg-white"
              },
              {
                quote: "Très concret, sans jargon, et super sympa. J'ai enfin compris comment ça fonctionne.",
                name: "Jean-Pierre",
                desc: "Retraité",
                bg: "bg-brand-green text-white"
              },
              {
                quote: "L'animateur est patient et pédagogue. Je recommande vivement pour tous les niveaux !",
                name: "Sylvie",
                desc: "Membre d'une association",
                bg: "bg-white"
              }
            ].map((t, i) => (
              <div key={i} className={cn("p-8 rounded-3xl shadow-sm border border-border/50 flex flex-col justify-between", t.bg)}>
                <MessageCircle className={cn("w-10 h-10 mb-6 opacity-20", i === 1 ? "text-white" : "text-brand-green")} />
                <p className={cn("text-lg italic mb-8 font-medium leading-relaxed", i === 1 ? "text-white/90" : "text-primary/80")}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg", i === 1 ? "bg-white text-brand-green" : "bg-brand-green text-white")}>
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className={cn("text-sm", i === 1 ? "text-white/70" : "text-muted-foreground")}>{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CALLOUT */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-orange to-[#ff9100] rounded-[2.5rem] p-8 md:p-12 text-center text-white shadow-2xl shadow-brand-orange/20 relative overflow-hidden">
            <ShieldCheck className="absolute top-0 right-0 w-64 h-64 text-white opacity-10 translate-x-1/3 -translate-y-1/4" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Vous représentez une collectivité ou une association ?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Découvrez nos formats adaptés à vos publics spécifiques, en groupes de 8 à 12 personnes, pour lutter contre la fracture numérique.
              </p>
              <Link href="/collectivites">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 hover:scale-105 border-0 shadow-xl">
                  Voir l'offre dédiée
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-semibold text-sm mb-6">
                <MessageCircle className="w-4 h-4" />
                Parlons de votre projet
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Prêt à faire le premier pas ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Que vous soyez un particulier curieux, une association ou une collectivité, nous sommes là pour répondre à vos questions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-border/50">
                    <CheckCircle2 className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Réponse rapide</h4>
                    <p className="text-muted-foreground">Nous vous recontactons sous 24 à 48 heures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-border/50">
                    <CheckCircle2 className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Devis gratuit</h4>
                    <p className="text-muted-foreground">Proposition sur-mesure sans engagement.</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
