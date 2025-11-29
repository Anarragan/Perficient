import { SidebarProvider } from "@/components/ui/sidebar";
import { MarsSidebar } from "./MarsSidebar";
import { Outlet } from "react-router-dom";

export function MarsLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-space-deep">
        <MarsSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
