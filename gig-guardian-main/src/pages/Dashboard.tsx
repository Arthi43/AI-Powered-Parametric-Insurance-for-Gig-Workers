import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import WorkerDashboard from "./WorkerDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return user?.role === "admin" ? <AdminDashboard /> : <WorkerDashboard />;
};

export default Dashboard;
