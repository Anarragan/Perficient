import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MarsLayout } from "./components/MarsLayout";
import Dashboard from "./pages/Dashboard";
import Garage from "./pages/Garage";
import Storage from "./pages/Storage";
import Maps from "./pages/Maps";
import Crew from "./pages/Crew";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MarsLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/crew" element={<Crew />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
