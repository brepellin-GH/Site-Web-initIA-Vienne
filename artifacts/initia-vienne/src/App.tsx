import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingPhone } from "@/components/site/floating-phone";
import Home from "@/pages/home";
import APropos from "@/pages/a-propos";
import Contact from "@/pages/contact";
import MentionsLegales from "@/pages/mentions-legales";
import PolitiqueConfidentialite from "@/pages/politique-confidentialite";
import Ateliers from "@/pages/ateliers";
import Newsletter from "@/pages/newsletter";
import DesabonnementConfirme from "@/pages/desabonnement-confirme";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    // Lien vers une ancre d'une autre page (ex. /ateliers#faq) : on descend à l'ancre.
    const hash = window.location.hash;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [location]);
  return null;
}

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route>
        <div className="site-public flex flex-col min-h-screen">
          <ScrollToTop />
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-iv-paper focus:text-iv-ink"
          >
            Aller au contenu
          </a>
          <SiteHeader />
          <div id="contenu" className="flex-1 w-full">
            <Switch>
              <Route path="/" component={Home} />
              {/* Ancienne page : redirection 301 côté Netlify (_redirects), relais ici en local */}
              <Route path="/collectivites">
                <Redirect to="/ateliers" replace />
              </Route>
              <Route path="/ateliers" component={Ateliers} />
              <Route path="/a-propos" component={APropos} />
              <Route path="/newsletter" component={Newsletter} />
              <Route path="/contact" component={Contact} />
              <Route path="/desabonnement-confirme" component={DesabonnementConfirme} />
              <Route path="/mentions-legales" component={MentionsLegales} />
              <Route path="/politique-de-confidentialite" component={PolitiqueConfidentialite} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <FloatingPhone />
          <SiteFooter />
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
