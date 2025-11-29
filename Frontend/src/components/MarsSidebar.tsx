import { Home, Warehouse, PackageSearch, Map, Users, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Mission Control", url: "/", icon: Home },
  { title: "Garage", url: "/garage", icon: Warehouse },
  { title: "Storage", url: "/storage", icon: PackageSearch },
  { title: "Maps", url: "/maps", icon: Map },
  { title: "Crew", url: "/crew", icon: Users },
];

export function MarsSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent>
        <div className="px-6 py-6 border-b border-border/50">
          {!isCollapsed ? (
            <div>
              <h1 className="text-2xl font-bold text-gradient-mars mb-1">MARS</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Mission Control</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-mars-red to-mars-orange flex items-center justify-center">
                <span className="text-xs font-bold">M</span>
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        className={`
                          relative group transition-all duration-200
                          ${isActive 
                            ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        <item.icon className={`${isActive ? 'text-primary' : ''}`} />
                        {!isCollapsed && <span>{item.title}</span>}
                        {isActive && !isCollapsed && (
                          <ChevronRight className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-border/50">
          {!isCollapsed && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Sol</span>
                <span className="font-mono text-primary">1247</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">System Status</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-status-green animate-pulse"></span>
                  <span className="text-status-green">Nominal</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
