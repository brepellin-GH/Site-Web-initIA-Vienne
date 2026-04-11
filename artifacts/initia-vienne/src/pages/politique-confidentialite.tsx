export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-display font-bold text-primary mb-10">Politique de confidentialité</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">1. Responsable du traitement</h2>
        <p className="text-muted-foreground leading-relaxed">
          Le responsable du traitement de vos données personnelles est :<br />
          Bruno Repellin<br />
          initIA Vienne — Auto-entrepreneur<br />
          17 bis rue des Célestes, 38200 Vienne<br />
          Email : <a href="mailto:initia.vienne@gmail.com" className="text-brand-green hover:underline">initia.vienne@gmail.com</a><br />
          Téléphone : <a href="tel:0673984285" className="text-brand-green hover:underline">06 73 98 42 85</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">2. Données collectées</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Dans le cadre de l'utilisation du formulaire de contact de ce site, les données suivantes sont collectées :
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Profil (particulier, association ou collectivité)</li>
          <li>Message libre</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Aucune autre donnée n'est collectée sans votre consentement explicite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">3. Finalité du traitement</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Les données collectées via le formulaire de contact sont utilisées exclusivement pour :
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Répondre à votre demande de renseignements</li>
          <li>Organiser votre participation à un atelier initIA Vienne</li>
          <li>Vous recontacter dans le cadre d'une demande d'intervention (associations, collectivités)</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Elles ne sont utilisées à aucune autre fin commerciale ou publicitaire.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">4. Base légale</h2>
        <p className="text-muted-foreground leading-relaxed">
          Le traitement de vos données repose sur votre consentement explicite, recueilli via la case à cocher présente dans le formulaire de contact, conformément à l'article 6(1)(a) du RGPD.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">5. Durée de conservation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Vos données sont conservées pendant une durée maximale de 12 mois à compter de votre dernier contact. Au-delà de cette période, elles sont supprimées.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">6. Partage des données</h2>
        <p className="text-muted-foreground leading-relaxed">
          Vos données personnelles ne sont jamais vendues, louées ni transmises à des tiers à des fins commerciales.
          Elles peuvent être transmises uniquement à l'hébergeur du site dans le cadre technique du traitement du formulaire, celui-ci étant soumis à des obligations de confidentialité.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">7. Vos droits</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Conformément au RGPD, vous disposez des droits suivants sur vos données :
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li><span className="font-medium">Droit d'accès</span> : connaître les données que nous détenons sur vous</li>
          <li><span className="font-medium">Droit de rectification</span> : corriger des données inexactes</li>
          <li><span className="font-medium">Droit à l'effacement</span> : demander la suppression de vos données</li>
          <li><span className="font-medium">Droit d'opposition</span> : vous opposer à un traitement</li>
          <li><span className="font-medium">Droit à la portabilité</span> : recevoir vos données dans un format lisible</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Pour exercer ces droits, contactez-nous à : <a href="mailto:initia.vienne@gmail.com" className="text-brand-green hover:underline">initia.vienne@gmail.com</a><br />
          Nous nous engageons à répondre dans un délai de 30 jours.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">8. Cookies</h2>
        <p className="text-muted-foreground leading-relaxed">
          Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de tracking n'est utilisé.
          Vous pouvez désactiver les cookies à tout moment via les paramètres de votre navigateur, sans que cela affecte l'accès au contenu du site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">9. Réclamation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) :<br />
          Site : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">www.cnil.fr</a><br />
          Adresse : 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-3">10. Mise à jour</h2>
        <p className="text-muted-foreground leading-relaxed">
          La présente politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour sera indiquée en bas de page.
        </p>
      </section>

      <p className="text-sm text-muted-foreground/60 mt-12">Dernière mise à jour : avril 2026</p>
    </div>
  );
}
