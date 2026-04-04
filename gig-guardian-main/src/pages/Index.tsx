import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CloudRain, Zap, Brain, CreditCard, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const HOW_IT_WORKS = [
  { step: "1", title: "Register", desc: "Quick onboarding with your city and delivery platform.", icon: CheckCircle2 },
  { step: "2", title: "Get Covered", desc: "AI calculates a dynamic weekly premium based on your risk.", icon: Shield },
  { step: "3", title: "Auto Trigger", desc: "Claims trigger automatically when weather/pollution spikes.", icon: Zap },
  { step: "4", title: "Instant Payout", desc: "Compensation credited to your UPI within minutes.", icon: CreditCard },
];

const FEATURES = [
  { title: "AI Risk Assessment", desc: "Weather, AQI, and historical data power dynamic pricing.", icon: Brain },
  { title: "Parametric Triggers", desc: "Heavy rain, extreme heat, high pollution — covered automatically.", icon: CloudRain },
  { title: "Zero-Touch Claims", desc: "No paperwork. No waiting. Claims process themselves.", icon: Zap },
  { title: "Fraud Detection", desc: "GPS verification, anomaly detection, and activity validation.", icon: ShieldCheck },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-accent" />
            <span className="text-xl font-bold text-primary">GigShield</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link to="/signup"><Button size="sm" className="gradient-accent text-accent-foreground border-0">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-primary-foreground/90">AI-Powered Parametric Insurance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-4">
            Income Protection for <br className="hidden md:block" />
            <span className="text-accent">Gig Workers</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Automatic compensation when rain, heat, or pollution stops you from earning. No claims. No paperwork. Just payouts.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" className="gradient-accent text-accent-foreground border-0 gap-2">
                Start for ₹49/week <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Demo Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <Card key={f.title} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-foreground mb-3">Protect Your Income Today</h2>
          <p className="text-primary-foreground/70 mb-6">Join thousands of delivery partners who never worry about bad weather again.</p>
          <Link to="/signup">
            <Button size="lg" className="gradient-accent text-accent-foreground border-0 gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent" />
            <span>GigShield © 2026</span>
          </div>
          <span>AI-Powered Parametric Insurance</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
