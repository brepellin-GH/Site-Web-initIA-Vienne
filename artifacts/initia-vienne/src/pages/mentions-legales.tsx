export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
      <h1 className="text-3xl font-display font-bold text-primary mb-10">Mentions légales</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">1. Éditeur du site</h2>
        <p className="text-muted-foreground leading-relaxed">
          Le présent site est édité par :<br />
          Bruno Repellin<br />
          Auto-entrepreneur — initIA Vienne<br />
          17 bis rue des Célestes<br />
          38200 Vienne, France<br /><br />
          Téléphone : <a href="tel:0673984285" className="text-brand-green hover:underline">06 73 98 42 85</a><br />
          Email : <a href="mailto:initia.vienne@gmail.com" className="text-brand-green hover:underline">initia.vienne@gmail.com</a><br />
          SIRET : 900 346 271 00035
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">2. Directeur de la publication</h2>
        <p className="text-muted-foreground leading-relaxed">
          Bruno Repellin<br />
          Contact : <a href="mailto:initia.vienne@gmail.com" className="text-brand-green hover:underline">initia.vienne@gmail.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">3. Hébergement</h2>
        <p className="text-muted-foreground leading-relaxed">
          Ce site est hébergé par :<br />
          Netlify Inc., 101 2nd Street San Francisco, CA 94105<br />
          <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">https://www.netlify.com/</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">4. Propriété intellectuelle</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'ensemble des contenus présents sur ce site (textes, images, logo) est la propriété exclusive de Bruno Repellin, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">5. Responsabilité</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les informations fournies sur ce site le sont à titre indicatif. Bruno Repellin s'efforce d'en assurer l'exactitude mais ne peut garantir l'exhaustivité ni l'absence d'erreur. L'éditeur se réserve le droit de modifier les contenus à tout moment et sans préavis.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">6. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          Ce site est susceptible d'utiliser des cookies afin d'améliorer l'expérience utilisateur. Conformément à la réglementation en vigueur, vous êtes informé de leur présence et pouvez vous y opposer via les paramètres de votre navigateur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">7. Droit applicable</h2>
        <p className="text-muted-foreground leading-relaxed">
          Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <p className="text-sm text-muted-foreground/60 mt-12">Dernière mise à jour : avril 2026</p>
    </div>
  );
}
