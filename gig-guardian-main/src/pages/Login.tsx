import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try the demo accounts below.");
    }
  };

  const fillDemo = (type: "worker" | "admin") => {
    if (type === "worker") {
      setEmail("worker@gigshield.in");
      setPassword("worker123");
    } else {
      setEmail("admin@gigshield.in");
      setPassword("admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">GigShield</span>
          </Link>
        </div>

        <Card className="shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>

            <div className="mt-6 space-y-3">
              <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wider">Demo Accounts</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => fillDemo("worker")} className="text-left p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors">
                  <p className="text-xs font-semibold text-foreground">🛵 Worker</p>
                  <p className="text-xs text-muted-foreground mt-1">worker@gigshield.in</p>
                  <p className="text-xs text-muted-foreground">worker123</p>
                </button>
                <button onClick={() => fillDemo("admin")} className="text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                  <p className="text-xs font-semibold text-foreground">🔧 Admin</p>
                  <p className="text-xs text-muted-foreground mt-1">admin@gigshield.in</p>
                  <p className="text-xs text-muted-foreground">admin123</p>
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account? <Link to="/signup" className="text-accent font-medium hover:underline">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
