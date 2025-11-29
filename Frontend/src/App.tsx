import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MarsLayout } from "./components/MarsLayout";
import Dashboard from "./pages/Dashboard";
import Garage from "./pages/Garage";
import Storage from "./pages/Storage";
import Maps from "./pages/Maps";
import Crew from "./pages/Crew";
import NotFound from "./pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          {/* Default to login/register */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected app routes */}
          <Route element={<RequireAuth><MarsLayout /></RequireAuth>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/crew" element={<Crew />} />
          </Route>
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
