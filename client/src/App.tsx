import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CursorEffect from "./components/CursorEffect";
import PageTransition from "./components/sections/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/servicios"} component={Services} />
      <Route path={"/industrias"} component={Industries} />
      <Route path={"/empresa"} component={About} />
      <Route path={"/contacto"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollProgress />
          <CursorEffect />
          <PageTransition />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
