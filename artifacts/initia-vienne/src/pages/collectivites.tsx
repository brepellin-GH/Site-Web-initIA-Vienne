import { motion } from "framer-motion";
import { 
  Users, 
  HeartHandshake, 
  Target, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Collectivites() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex-1 w-full">
      
      {/* HERO SECTION B2B */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-primary overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green opacity-50 skew-x-12 translate-x-32" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-2xl"
            >
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-brand-orange-light font-semibold text-sm mb-6 border border-white/20">
                <Building2 className="w-4 h-4" />
                Offre B2B & Secteur Public
              </motion.div>
              
              <motion.h1 variants={FADE_UP} className="text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white leading-[1.1] mb-6">
                Initier vos publics à <span className="text-brand-orange">l'intelligence artificielle</span>
              </motion.h1>
              
              <motion.p variants={FADE_UP} className="text-lg lg:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Des ateliers clé en main pour les collectivités, centres sociaux et associations qui souhaitent lutter contre la fracture numérique et accompagner leurs usagers.
              </motion.p>
              
              <motion.div variants={FADE_UP}>
                <Button size="lg" variant="accent" onClick={scrollToContact} className="text-lg px-8">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative lg:ml-auto w-full max-w-lg hidden lg:block"
            >
              <img 
                src={`${import.meta.env.BASE_URL}images/hero-b2b.png`}
                alt="Formation IA pour collectivités"
                className="relative rounded-3xl shadow-2xl object-cover aspect-[4/3] w-full border-4 border-white/10"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-primary text-lg">Groupes de 8 à 12</p>
                  <p className="text-sm text-muted-foreground">Apprentissage convivial</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ENJEUX SECTION */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/50">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Les enjeux de l'inclusion numérique</h2>
              <p className="text-lg text-muted-foreground">
                De plus en plus de démarches se font en ligne. L'IA accélère cette transformation.
                <strong className="text-primary font-semibold"> Nos ainés et publics fragilisés risquent d'être exclus si nous n'agissons pas.</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Autonomie</h3>
                <p className="text-muted-foreground">Permettre à chacun de comprendre et d'utiliser ces nouveaux outils de manière indépendante.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Confiance en soi</h3>
                <p className="text-muted-foreground">Démystifier la technologie pour réduire l'anxiété face au numérique.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mb-4">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lien social</h3>
                <p className="text-muted-foreground">Créer des moments de partage et d'entraide autour d'un sujet d'actualité.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEDAGOGICAL OBJECTIVES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Nos objectifs pédagogiques</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Chaque atelier est conçu avec une approche andragogique adaptée aux adultes et seniors, favorisant la pratique immédiate.
              </p>
              <ul className="space-y-4">
                {[
                  "Comprendre ce qu'est l'IA et comment elle fonctionne",
                  "Utiliser des outils d'IA simples en autonomie totale",
                  "Démystifier les idées reçues et les peurs sur la technologie",
                  "Renforcer la confiance numérique globale des participants"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-cream transition-colors border border-transparent hover:border-brand-green/10">
                    <div className="mt-1 w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-lg text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-brand-cream p-6 rounded-3xl aspect-square flex flex-col justify-center border border-brand-green/10">
                  <h4 className="text-4xl font-black text-brand-orange mb-2">100%</h4>
                  <p className="font-medium">Adapté aux débutants</p>
                </div>
                <div className="bg-primary text-white p-6 rounded-3xl aspect-square flex flex-col justify-center">
                  <h4 className="text-4xl font-black text-brand-orange-light mb-2">0</h4>
                  <p className="font-medium">Jargon technique</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-brand-orange text-white p-6 rounded-3xl aspect-square flex flex-col justify-center">
                  <h4 className="text-4xl font-black mb-2">1h à 2h</h4>
                  <p className="font-medium">Durée optimale d'attention</p>
                </div>
                <div className="bg-brand-green-light p-6 rounded-3xl aspect-square flex flex-col justify-center border border-brand-green/10">
                  <h4 className="text-4xl font-black text-brand-green mb-2">Sur site</h4>
                  <p className="font-medium">Intervention dans vos locaux</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS / LOGISTICS */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Modalités pratiques</h2>
            <p className="text-lg text-muted-foreground">Une organisation simple pour faciliter la mise en place de vos ateliers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Durée", desc: "Formats modulables de 1h à 2h par atelier selon votre public." },
              { title: "Groupes", desc: "Petits groupes de 8 à 12 personnes pour un suivi personnalisé." },
              { title: "Lieu", desc: "Interventions en présentiel directement dans vos locaux (Rhône-Alpes)." },
              { title: "Matériel", desc: "Matériel informatique fourni si vos usagers n'en possèdent pas." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center">
                <h3 className="text-xl font-bold text-primary mb-3">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Ils nous font déjà confiance</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="px-6 py-3 rounded-full bg-brand-cream border border-brand-green/20 font-semibold text-primary">
              Centre social d'Estressin
            </div>
            <div className="px-6 py-3 rounded-full bg-brand-cream border border-brand-green/20 font-semibold text-primary">
              Club Léo Lagrange Vienne
            </div>
            <div className="px-6 py-3 rounded-full bg-brand-cream border border-brand-green/20 font-semibold text-primary">
              Médiathèques de l'agglo
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="py-24 bg-brand-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Construisons votre projet</h2>
            <p className="text-lg text-brand-green-light/80">
              Demandez un devis gratuit. Nous adaptons le contenu et la durée à vos contraintes.
            </p>
          </div>
          
          <ContactForm className="max-w-2xl mx-auto" />
        </div>
      </section>

    </main>
  );
}
