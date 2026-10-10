import { usePageMeta } from "@/hooks/use-page-meta";
import { ContactBlock } from "@/components/contact-form";
import { HeroBadge, OrangeRule } from "@/components/site/ui";

export default function Contact() {
  usePageMeta({
    title: "Contact et devis gratuit | initIA Vienne",
    description:
      "Contactez Bruno Repellin pour organiser un atelier d'initiation à l'IA à Vienne (Isère). Réponse sous 24 à 48 h, devis gratuit et sans engagement.",
  });

  return (
    <main>
      <section className="iv-dark bg-iv-green text-iv-paper">
        <div className="iv-band [--pad:48px] flex flex-col gap-5 lg:gap-6 px-5 pt-10 pb-8 lg:px-12 lg:pt-[72px] lg:pb-14">
          <HeroBadge>Parlons de votre projet</HeroBadge>
          <h1 className="m-0 text-iv-paper text-[42px] md:text-[60px] xl:text-[80px] font-extrabold leading-none xl:leading-[0.98] tracking-[-0.02em] xl:tracking-[-0.03em]">
            Prêt à faire le premier pas ?
          </h1>
          <p className="m-0 max-w-[720px] lg:text-[21px] leading-normal">
            Association, collectivité, réseau professionnel ou simple curieux : je suis là pour répondre à vos questions et construire avec vous l'atelier qui vous ressemble.
          </p>
        </div>
        <OrangeRule />
      </section>

      <ContactBlock
        label="Formulaire"
        title="Envoyez-moi un message"
        intro="Remplissez le formulaire ci-dessous ou contactez-moi directement."
      />
    </main>
  );
}
