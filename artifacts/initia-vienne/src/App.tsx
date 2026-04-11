import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress, FloatingCta } from "@/components/scroll-progress";
import Home from "@/pages/home";
import Collectivites from "@/pages/collectivites";
import MentionsLegales from "@/pages/mentions-legales";
import PolitiqueConfidentialite from "@/pages/politique-confidentialite";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route>
        <div className="flex flex-col min-h-screen bg-brand-cream">
          <ScrollToTop />
          <ScrollProgress />
          <FloatingCta />
          <Navbar />
          <div className="flex-1 w-full">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/collectivites" component={Collectivites} />
              <Route path="/mentions-legales" component={MentionsLegales} />
              <Route path="/politique-de-confidentialite" component={PolitiqueConfidentialite} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
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
