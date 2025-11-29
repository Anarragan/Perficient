import React from "react";
import { StatCard } from "@/components/StatCard";
import { Radio, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiGet } from "@/lib/api";
import { useNavigate } from "react-router-dom";

type Resource = { id: string; name: string; description?: string; quantity: number; idUser?: string };
type UserProfile = { id: string; name: string; email: string; url_photo?: string };

export default function Dashboard() {
  const [status, setStatus] = React.useState<string>("");
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [currentTime, setCurrentTime] = React.useState<string>("");
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  React.useEffect(() => {
    // Update current time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const token = localStorage.getItem("token");
    
    if (!token) {
      setStatus('No token found');
      clearInterval(timeInterval);
      return;
    }

    // Decode token to get user ID
    let currentUserId = '1';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentUserId = payload.sub || payload.userId || '1';
    } catch (e) {
      console.error('Error decoding token:', e);
    }

    // Load user profile
    apiGet(`/users/${currentUserId}`, token)
      .then(resp => {
        if (resp.success && resp.data) {
          setUserProfile(resp.data);
        } else if (resp.id) {
          setUserProfile(resp);
        }
      })
      .catch((e) => console.error('Error loading profile:', e));

    // Load all resources from backend
    apiGet('/resources', token)
      .then((resp: any) => {
        console.log('Resources API response:', resp);
        // Backend returns { success: true, data: [...] }
        const data = resp.success && resp.data ? resp.data : (Array.isArray(resp) ? resp : []);
        setResources(data);
        console.log('Resources loaded:', data.length, 'items');
        setStatus('API OK');
      })
      .catch((e) => {
        console.error('Error loading resources:', e);
        setStatus('API Error: ' + e.message);
      });

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep to-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Marficient Control</h1>
              <p className="text-sm text-muted-foreground">Real-time Mars Base Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Earth Time:</span>
              <span className="font-mono text-foreground">{currentTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Mars Sol:</span>
              <span className="font-mono text-primary">1247</span>
            </div>
            {!!token && (
              <button onClick={logout} className="text-sm underline">Logout</button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Resources from Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Resources */}
          <div className="space-y-6 lg:col-span-1">
            {resources.length > 0 ? (
              resources.slice(0, 3).map((res) => (
                <StatCard
                  key={res.id}
                  title={res.name}
                  value={String(res.quantity)}
                  unit="units"
                  icon={Package}
                  status="nominal"
                >
                  {res.description && (
                    <p className="text-xs text-muted-foreground">{res.description}</p>
                  )}
                </StatCard>
              ))
            ) : (
              <Card className="p-6 border-border/50">
                <p className="text-sm text-muted-foreground">Loading resources stream...</p>
              </Card>
            )}
          </div>

          {/* Center - User Profile */}
          <div className="flex flex-col items-center justify-center">
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm w-full">
              {userProfile ? (
                <div className="flex flex-col items-center gap-6">
                  <Avatar className="w-32 h-32 border-4 border-primary/30">
                    {userProfile.url_photo && <AvatarImage src={userProfile.url_photo} alt={userProfile.name} />}
                    <AvatarFallback className="text-3xl bg-primary/20 text-primary">
                      {userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <span className="w-3 h-3 rounded-full bg-status-green animate-pulse"></span>
                      <span className="text-sm text-status-green font-medium">ACTIVE</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-full pt-4 border-t border-border/30">
                    <div className="text-center">
                      <p className="text-2xl font-bold font-mono">{resources.length}</p>
                      <p className="text-xs text-muted-foreground">TOTAL RESOURCES</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <p className="text-sm text-muted-foreground">Loading profile...</p>
                </div>
              )}
            </Card>
          </div>

          {/* Right: More Resources */}
          <div className="space-y-6 lg:col-span-1">
            {resources.length > 3 ? (
              resources.slice(3, 6).map((res) => (
                <StatCard
                  key={res.id}
                  title={res.name}
                  value={String(res.quantity)}
                  unit="units"
                  icon={Package}
                  status="nominal"
                >
                  {res.description && (
                    <p className="text-xs text-muted-foreground">{res.description}</p>
                  )}
                </StatCard>
              ))
            ) : resources.length > 0 ? (
              <Card className="p-6 border-border/50">
                <p className="text-sm text-muted-foreground">Showing all {resources.length} resources</p>
              </Card>
            ) : (
              <Card className="p-6 border-border/50">
                <p className="text-sm text-muted-foreground">No additional resources</p>
              </Card>
            )}
          </div>
        </div>



        {/* System Status */}
        <Card className="p-6 border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">System Status</h3>
              <p className="text-sm text-muted-foreground">Communications & API</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-status-green animate-pulse"></span>
                <span className="text-sm font-medium">Connection Active</span>
              </div>
              {status && <p className="text-xs text-muted-foreground">API Status: {status}</p>}
              <p className="text-xs text-muted-foreground">Signal delay: 13m 42s</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-sm font-medium mb-2">Resource Stream</p>
              {resources.length > 0 && (
                <p className="text-xs text-muted-foreground">{resources.length} resources live</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
