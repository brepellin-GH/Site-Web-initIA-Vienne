import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { HeroBadge, Kicker, OrangeRule } from "@/components/site/ui";
import {
  SubscribeForm,
  formatDateCourte,
  newsletterHref,
  titreCourt,
  useNewsletterArchives,
} from "@/components/site/newsletter";

export default function Newsletter() {
  usePageMeta({
    title: "L'IA en clair, la newsletter gratuite | initIA Vienne",
    description:
      "L'IA en clair, la newsletter gratuite d'initIA Vienne : comprendre l'intelligence artificielle sans jargon, avec des conseils pratiques et des exemples concrets.",
  });
  const { envois, loading } = useNewsletterArchives();

  return (
    <main>
      <section>
        <div className="iv-band lg:grid lg:grid-cols-[7fr_5fr] min-[1280px]:bg-[linear-gradient(to_right,#006D29_50%,#FAF3E8_50%)]">
        <div className="iv-dark bg-iv-green text-iv-paper flex flex-col">
          <div className="flex flex-col gap-5 lg:gap-7 px-5 pt-10 pb-8 lg:px-12 lg:pt-[72px] lg:pb-16">
            <HeroBadge>Newsletter gratuite</HeroBadge>
            <h1 className="m-0 text-iv-paper text-[52px] md:text-[72px] xl:text-[92px] font-extrabold leading-[0.98] xl:leading-[0.95] tracking-[-0.02em] xl:tracking-[-0.03em]">
              L'IA en clair
            </h1>
            <p className="m-0 max-w-[620px] lg:text-[21px] leading-normal">
              Une newsletter simple et accessible pour comprendre l'intelligence artificielle sans jargon, en complément de mes{" "}
              <Link href="/ateliers" className="font-bold text-iv-paper underline underline-offset-4 hover:text-iv-orange">
                ateliers à Vienne
              </Link>
              . Des conseils pratiques, des outils utiles, des exemples concrets.
            </p>
          </div>
          <div className="lg:hidden">
            <OrangeRule />
          </div>
        </div>
        <div className="px-5 py-8 lg:px-12 lg:py-14 bg-iv-cream border-b-2 lg:border-b-0 lg:border-l-2 border-iv-ink">
          <SubscribeForm />
        </div>
        </div>
        <div className="hidden lg:block">
          <OrangeRule />
        </div>
      </section>

      <section aria-labelledby="archives-titre" className="iv-band">
        <div className="flex flex-col gap-2 lg:gap-2.5 px-5 pt-9 pb-5 lg:px-12 lg:pt-14 lg:pb-7">
          <Kicker>Archives</Kicker>
          <h2 id="archives-titre" className="m-0 text-[28px] lg:text-[40px]">
            Numéros précédents
          </h2>
        </div>
        <ul className="flex flex-col m-0 p-0 list-none border-t-2 border-iv-ink">
          {loading && <li className="px-5 py-4 lg:px-12">Chargement des archives…</li>}
          {!loading && envois.length === 0 && (
            <li className="px-5 py-4 lg:px-12">Les premiers numéros arrivent bientôt.</li>
          )}
          {envois.map((envoi) => {
            const href = newsletterHref(envoi);
            const content = (
              <>
                <span className="text-2xl lg:text-[28px] font-extrabold text-iv-green">{envoi.numero}</span>
                <span className="flex flex-col gap-1 lg:contents">
                  <span>{formatDateCourte(envoi.date_envoi)}</span>
                  <span className="text-[19px] lg:text-xl font-bold leading-[1.3]">
                    <span className="hidden lg:inline">{envoi.sujet || "Sans titre"}</span>
                    <span className="lg:hidden">{titreCourt(envoi.sujet)}</span>
                  </span>
                  {href && <span className="font-bold text-iv-green">Lire →</span>}
                </span>
              </>
            );
            const rowCls =
              "grid grid-cols-[48px_1fr] gap-3 px-5 py-4 lg:grid-cols-[80px_240px_1fr_auto] lg:gap-6 lg:items-center lg:min-h-[72px] lg:px-12 lg:py-3 border-b border-iv-hair text-iv-ink no-underline";
            return (
              <li key={envoi.id}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`${rowCls} hover:bg-iv-sand`}>
                    {content}
                  </a>
                ) : (
                  <div className={rowCls}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="h-10 lg:h-14" />
      </section>
    </main>
  );
}
