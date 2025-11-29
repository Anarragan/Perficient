import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Gauge, MapPin, Wrench } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { apiGet } from "@/lib/api";

type VehicleType = {
  id: string;
  name: string;
  description?: string;
};

type User = {
  id: string;
  name: string;
};

type Vehicle = {
  id: string;
  capacidad: number;
  id_type: VehicleType | string;
  id_user?: User | string | null;
  // optionally enriched fields if backend provides
  name?: string;
  status?: string;
  battery?: number;
  location?: string;
  distance?: string;
  health?: number;
  lastMaintenance?: string;
};

export default function Garage() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    
    // Decode token to get user ID
    let currentUserId = '1';
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        currentUserId = payload.sub || payload.userId || '1';
      } catch {}
    }

    // Load initial vehicles
    apiGet('/vehicles', token)
      .then((resp: any) => {
        const data = resp.success ? resp.data : resp;
        setVehicles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || 'Error cargando vehículos');
        setLoading(false);
      });

    // Consume vehicle stream for real-time updates
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
    const apiKey = import.meta.env.VITE_API_KEY || '111';
    const controller = new AbortController();
    
    (async () => {
      try {
        const res = await fetch(`${apiBase}/vehicles/user/${currentUserId}/stream`, {
          headers: {
            'X-API-Key': apiKey,
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        });
        if (!res.body) return;
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop() || '';
          for (const part of parts) {
            const line = part.split('\n').find(l => l.startsWith('data:'));
            if (line) {
              try {
                const json = JSON.parse(line.replace('data:','').trim());
                if (Array.isArray(json)) {
                  setVehicles(json);
                  console.log('Vehicles stream update:', json.length, 'items');
                }
              } catch (e) {
                console.error('Vehicle stream parse error:', e);
              }
            }
          }
        }
      } catch (err) {
        console.error('Vehicle stream connection error:', err);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep to-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Vehicle Garage</h1>
              <p className="text-sm text-muted-foreground">Fleet Management & Status</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-status-green text-status-green">
              {vehicles.length} Units
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {error && (
          <Card className="p-6 border-border/50 mb-6">
            <p className="text-sm text-status-critical">{error}</p>
          </Card>
        )}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Card className="p-8 border-border/50">
              <p className="text-lg text-muted-foreground">Cargando vehículos...</p>
            </Card>
          </div>
        )}
        {!loading && vehicles.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <Card className="p-8 border-border/50 text-center">
              <Wrench className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg text-muted-foreground">No vehicles assigned</p>
              <p className="text-sm text-muted-foreground mt-2">Check back later for available vehicles</p>
            </Card>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-mars-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6 space-y-4">
                {/* Header with icon */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-mars-orange/20 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                      <Wrench className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {vehicle.name ?? (typeof vehicle.id_type === 'object' ? vehicle.id_type.name : 'Vehicle')}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {typeof vehicle.id_type === 'object' ? vehicle.id_type.name : vehicle.id_type}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-status-green text-status-green bg-status-green/10">
                    ACTIVE
                  </Badge>
                </div>

                {/* Description */}
                {typeof vehicle.id_type === 'object' && vehicle.id_type.description && (
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                    <p className="text-sm text-muted-foreground italic">{vehicle.id_type.description}</p>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Capacity</span>
                    </div>
                    <p className="text-2xl font-bold font-mono text-primary">{vehicle.capacidad}</p>
                    <p className="text-xs text-muted-foreground">units</p>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-br from-mission-blue/10 to-mission-blue/5 border border-mission-blue/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Battery className="w-4 h-4 text-mission-blue" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
                    </div>
                    <p className="text-lg font-bold text-mission-blue">Ready</p>
                    <p className="text-xs text-muted-foreground">operational</p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-border/30 space-y-2">
                  {vehicle.id_user && typeof vehicle.id_user === 'object' && (
                    <div className="flex items-center justify-between text-sm p-2 rounded bg-secondary/20">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        Pilot
                      </span>
                      <span className="font-medium text-foreground">{vehicle.id_user.name}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-secondary/20">
                    <span className="text-muted-foreground">Vehicle ID</span>
                    <span className="font-mono text-muted-foreground">{vehicle.id.slice(0, 8)}...</span>
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
