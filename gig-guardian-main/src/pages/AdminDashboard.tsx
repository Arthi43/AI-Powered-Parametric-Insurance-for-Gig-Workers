import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, IndianRupee, AlertTriangle, TrendingUp, ShieldAlert, LogOut, Activity } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const claimTrends = [
  { week: "W1", claims: 42, amount: 18200 },
  { week: "W2", claims: 58, amount: 24600 },
  { week: "W3", claims: 35, amount: 15400 },
  { week: "W4", claims: 71, amount: 31200 },
];

const riskData = [
  { city: "Mumbai", risk: 82 },
  { city: "Delhi", risk: 91 },
  { city: "Bangalore", risk: 45 },
  { city: "Hyderabad", risk: 60 },
  { city: "Chennai", risk: 55 },
];

const fraudAlerts = [
  { id: "FRD-112", type: "GPS Spoofing", worker: "ID-8832", city: "Delhi", severity: "high", time: "2 min ago" },
  { id: "FRD-109", type: "Duplicate Claim", worker: "ID-6541", city: "Mumbai", severity: "medium", time: "18 min ago" },
  { id: "FRD-105", type: "Activity Mismatch", worker: "ID-2210", city: "Bangalore", severity: "low", time: "1 hr ago" },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="gradient-hero">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            <span className="text-lg font-bold text-primary-foreground">GigShield</span>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-xs">Admin</Badge>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-primary-foreground/80">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6 max-w-6xl">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Active Workers", value: "2,847", icon: Users, color: "text-accent" },
            { label: "Total Premiums", value: "₹1.39L", icon: IndianRupee, color: "text-success" },
            { label: "Claims This Week", value: "71", icon: Activity, color: "text-warning" },
            { label: "Fraud Detected", value: "3", icon: ShieldAlert, color: "text-destructive" },
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
          {/* Claim Trends */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" /> Claim Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={claimTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(215 15% 50%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215 15% 50%)" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="claims" stroke="hsl(160 60% 40%)" strokeWidth={2} dot={{ fill: "hsl(160 60% 40%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk by City */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" /> Risk Score by City
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={riskData}>
                  <XAxis dataKey="city" tick={{ fontSize: 12, fill: "hsl(215 15% 50%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215 15% 50%)" }} />
                  <Tooltip />
                  <Bar dataKey="risk" fill="hsl(220 70% 25%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Fraud Alerts */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-destructive" /> Fraud Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fraudAlerts.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className={`h-5 w-5 ${f.severity === "high" ? "text-destructive" : f.severity === "medium" ? "text-warning" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{f.type}</p>
                      <p className="text-xs text-muted-foreground">{f.worker} · {f.city} · {f.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={f.severity === "high" ? "destructive" : "secondary"} className={f.severity === "medium" ? "bg-warning text-warning-foreground" : ""}>
                      {f.severity}
                    </Badge>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
