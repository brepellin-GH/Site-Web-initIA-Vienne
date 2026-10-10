import { usePageMeta } from "@/hooks/use-page-meta";

export default function MentionsLegales() {
  usePageMeta({
    title: "Mentions légales | initIA Vienne",
    description: "Mentions légales du site initIA Vienne, organisme d'initiation à l'intelligence artificielle basé à Vienne, Isère.",
  });
  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-12 pt-12 lg:pt-16 pb-24">
      <h1 className="text-[36px] lg:text-[44px] font-extrabold leading-[1.1] mb-10">Mentions légales</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">1. Éditeur du site</h2>
        <p className="text-iv-text leading-relaxed">
          Le présent site est édité par :<br />
          Bruno Repellin<br />
          Auto-entrepreneur — initIA Vienne<br />
          17 bis rue des Célestes<br />
          38200 Vienne, France<br /><br />
          Téléphone : <a href="tel:0673984285" className="font-semibold text-iv-green underline underline-offset-4 hover:text-iv-green-dark">06 73 98 42 85</a><br />
          Email : <a href="mailto:initia.vienne@gmail.com" className="font-semibold text-iv-green underline underline-offset-4 hover:text-iv-green-dark">initia.vienne@gmail.com</a><br />
          SIRET : 900 346 271 00035
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">2. Directeur de la publication</h2>
        <p className="text-iv-text leading-relaxed">
          Bruno Repellin<br />
          Contact : <a href="mailto:initia.vienne@gmail.com" className="font-semibold text-iv-green underline underline-offset-4 hover:text-iv-green-dark">initia.vienne@gmail.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">3. Hébergement</h2>
        <p className="text-iv-text leading-relaxed">
          Ce site est hébergé par :<br />
          Netlify Inc., 101 2nd Street San Francisco, CA 94105<br />
          <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-iv-green underline underline-offset-4 hover:text-iv-green-dark">https://www.netlify.com/</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">4. Propriété intellectuelle</h2>
        <p className="text-iv-text leading-relaxed">
          L'ensemble des contenus présents sur ce site (textes, images, logo) est la propriété exclusive de Bruno Repellin, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">5. Responsabilité</h2>
        <p className="text-iv-text leading-relaxed">
          Les informations fournies sur ce site le sont à titre indicatif. Bruno Repellin s'efforce d'en assurer l'exactitude mais ne peut garantir l'exhaustivité ni l'absence d'erreur. L'éditeur se réserve le droit de modifier les contenus à tout moment et sans préavis.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">6. Cookies</h2>
        <p className="text-iv-text leading-relaxed">
          Ce site est susceptible d'utiliser des cookies afin d'améliorer l'expérience utilisateur. Conformément à la réglementation en vigueur, vous êtes informé de leur présence et pouvez vous y opposer via les paramètres de votre navigateur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">7. Droit applicable</h2>
        <p className="text-iv-text leading-relaxed">
          Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <p className="text-iv-text mt-12">Dernière mise à jour : avril 2026</p>
    </div>
  );
}
