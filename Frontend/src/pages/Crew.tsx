import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Briefcase, MapPin } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { apiGet } from "@/lib/api";

type CrewMember = {
  id: string;
  name: string;
  role?: string;
  specialty?: string;
  status?: string;
  health?: number;
  location?: string;
  tasksCompleted?: number;
  initials?: string;
};

export default function Crew() {
  const [crew, setCrew] = React.useState<CrewMember[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const [stats, setStats] = React.useState<{ vehicles: number; storage: number }>({ vehicles: 0, storage: 0 });

  React.useEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    
    // Load crew stats
    Promise.all([
      apiGet('/vehicles', token).catch(() => ({ success: true, data: [] })),
      apiGet('/storage', token).catch(() => []),
    ]).then(([vehiclesResp, storage]) => {
      const vehicleData = vehiclesResp.success ? vehiclesResp.data : vehiclesResp;
      setStats({
        vehicles: Array.isArray(vehicleData) ? vehicleData.length : 0,
        storage: Array.isArray(storage) ? storage.length : 0,
      });
    });

    apiGet('/users', token)
      .then((resp: any) => {
        console.log('Users API response:', resp);
        const data = Array.isArray(resp) ? resp : (resp.success && resp.data ? resp.data : []);
        const mapped: CrewMember[] = data.map((u: any) => ({
          id: u.id ?? u.user_id ?? String(u.email ?? u.name ?? Math.random()),
          name: (u.name ?? `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim()) || u.email,
          role: u.role ?? 'Crew Member',
          specialty: u.specialty ?? 'General',
          status: u.status ?? 'on-duty',
          health: typeof u.health === 'number' ? u.health : 100,
          location: u.location ?? 'Habitat',
          tasksCompleted: typeof u.tasksCompleted === 'number' ? u.tasksCompleted : undefined,
          initials: (u.name ?? u.email ?? 'UN')
            .split(' ')
            .map((p: string) => p[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
        }));
        setCrew(mapped);
      })
      .catch((e) => setError(e.message || 'Error cargando usuarios'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep to-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Crew Management</h1>
              <p className="text-sm text-muted-foreground">Personnel Status & Assignments</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-status-green text-status-green">
              {crew.length} Total Users
            </Badge>
            <Badge variant="outline" className="border-mission-blue text-mission-blue">
              {stats.vehicles} Vehicles
            </Badge>
            <Badge variant="outline" className="border-mars-orange text-mars-orange">
              {stats.storage} Storage Items
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {error && (
          <Card className="p-6 border-border/50">
            <p className="text-sm text-status-critical">{error}</p>
          </Card>
        )}
        {loading && (
          <Card className="p-6 border-border/50">
            <p className="text-sm text-muted-foreground">Cargando tripulación...</p>
          </Card>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crew.map((member) => (
            <Card key={member.id} className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarFallback className="bg-gradient-to-br from-mars-red to-mars-orange text-white font-bold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{member.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{member.id}</p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={
                    member.status === 'on-duty' ? 'border-status-green text-status-green w-full justify-center' :
                    member.status === 'on-mission' ? 'border-mission-blue text-mission-blue w-full justify-center' :
                    'border-muted text-muted-foreground w-full justify-center'
                  }
                >
                  {member.status?.toUpperCase().replace('-', ' ')}
                </Badge>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Activity className="w-3 h-3" />
                        Health
                      </span>
                      <span className="font-mono font-medium">{member.health ?? 100}%</span>
                    </div>
                    <Progress value={member.health ?? 100} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground truncate">{member.specialty ?? 'General'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground truncate">{member.location ?? 'Habitat'}</span>
                    </div>
                    {typeof member.tasksCompleted === 'number' && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tasks Completed</span>
                        <span className="font-mono font-medium text-foreground">{member.tasksCompleted}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
