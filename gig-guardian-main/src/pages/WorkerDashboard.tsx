import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CloudRain, Thermometer, Wind, MapPin, IndianRupee, Clock, CheckCircle2, AlertTriangle, LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const MOCK_POLICY = {
  id: "POL-2024-7821",
  plan: "Weekly Shield",
  premium: 49,
  coverage: 1500,
  status: "Active",
  startDate: "Mar 28, 2026",
  endDate: "Apr 4, 2026",
};

const MOCK_WEATHER = [
  { label: "Rain", value: "Heavy", icon: CloudRain, risk: "high" },
  { label: "Temp", value: "38°C", icon: Thermometer, risk: "medium" },
  { label: "AQI", value: "186", icon: Wind, risk: "high" },
  { label: "Zone", value: "Open", icon: MapPin, risk: "low" },
];

const MOCK_CLAIMS = [
  { id: "CLM-4421", trigger: "Heavy Rain", date: "Apr 1, 2026", amount: 320, status: "Paid" },
  { id: "CLM-4398", trigger: "High AQI", date: "Mar 30, 2026", amount: 210, status: "Paid" },
  { id: "CLM-4355", trigger: "Extreme Heat", date: "Mar 26, 2026", amount: 180, status: "Paid" },
  { id: "CLM-4310", trigger: "Heavy Rain", date: "Mar 22, 2026", amount: 350, status: "Paid" },
];

const riskColor = (risk: string) => {
  if (risk === "high") return "text-destructive";
  if (risk === "medium") return "text-warning";
  return "text-success";
};

const WorkerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="gradient-hero">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            <span className="text-lg font-bold text-primary-foreground">GigShield</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-primary-foreground/80">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6 max-w-5xl">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hey, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground text-sm">{user?.platform} · {user?.location}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Earnings Protected", value: "₹12,400", icon: IndianRupee, color: "text-success" },
            { label: "Claims This Month", value: "4", icon: CheckCircle2, color: "text-accent" },
            { label: "Total Paid Out", value: "₹1,060", icon: IndianRupee, color: "text-accent" },
            { label: "Next Premium", value: "₹49", icon: Clock, color: "text-foreground" },
          ].map((s) => (
            <Card key={s.label} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Policy */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" /> Active Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{MOCK_POLICY.id}</span>
                <Badge className="bg-success text-success-foreground">{MOCK_POLICY.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">Plan</p><p className="font-medium text-foreground">{MOCK_POLICY.plan}</p></div>
                <div><p className="text-muted-foreground">Premium</p><p className="font-medium text-foreground">₹{MOCK_POLICY.premium}/week</p></div>
                <div><p className="text-muted-foreground">Coverage</p><p className="font-medium text-foreground">Up to ₹{MOCK_POLICY.coverage}</p></div>
                <div><p className="text-muted-foreground">Period</p><p className="font-medium text-foreground">{MOCK_POLICY.startDate} – {MOCK_POLICY.endDate}</p></div>
              </div>
              <Button className="w-full gradient-accent text-accent-foreground border-0">Renew Policy</Button>
            </CardContent>
          </Card>

          {/* Live Risk Monitor */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" /> Live Risk Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_WEATHER.map((w) => (
                <div key={w.label} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <w.icon className={`h-5 w-5 ${riskColor(w.risk)}`} />
                    <span className="text-sm font-medium text-foreground">{w.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${riskColor(w.risk)}`}>{w.value}</span>
                    <Badge variant={w.risk === "low" ? "secondary" : "destructive"} className={w.risk === "medium" ? "bg-warning text-warning-foreground" : ""}>
                      {w.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Claims History */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Claim History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">ID</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Trigger</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Date</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Amount</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CLAIMS.map((c) => (
                    <tr key={c.id} className="border-b border-border/50">
                      <td className="py-3 font-mono text-xs text-foreground">{c.id}</td>
                      <td className="py-3 text-foreground">{c.trigger}</td>
                      <td className="py-3 text-muted-foreground">{c.date}</td>
                      <td className="py-3 text-right font-medium text-foreground">₹{c.amount}</td>
                      <td className="py-3 text-right"><Badge className="bg-success/10 text-success border-0">{c.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboard;
