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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {error && (
            <Card className="p-6 border-border/50">
              <p className="text-sm text-status-critical">{error}</p>
            </Card>
          )}
          {loading && (
            <Card className="p-6 border-border/50">
              <p className="text-sm text-muted-foreground">Cargando vehículos...</p>
            </Card>
          )}
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      {vehicle.name ?? (typeof vehicle.id_type === 'object' ? vehicle.id_type.name : 'Vehicle')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Type: {typeof vehicle.id_type === 'object' ? vehicle.id_type.name : vehicle.id_type}
                    </p>
                    <p className="text-sm text-muted-foreground">Capacity: {vehicle.capacidad} units</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{vehicle.id}</p>
                  </div>
                  {vehicle.status && (
                    <Badge
                      variant={vehicle.status === 'active' ? 'default' : vehicle.status === 'maintenance' ? 'destructive' : 'secondary'}
                      className={
                        vehicle.status === 'active' ? 'bg-status-green hover:bg-status-green' :
                        vehicle.status === 'maintenance' ? 'bg-status-yellow hover:bg-status-yellow' :
                        'bg-muted hover:bg-muted'
                      }
                    >
                      {vehicle.status.toUpperCase()}
                    </Badge>
                  )}
                </div>

                <div className="pt-4 border-t border-border/30 space-y-2">
                  {typeof vehicle.id_type === 'object' && vehicle.id_type.description && (
                    <div className="text-sm text-muted-foreground">
                      <p>{vehicle.id_type.description}</p>
                    </div>
                  )}
                  {vehicle.id_user && typeof vehicle.id_user === 'object' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Assigned to</span>
                      <span className="font-medium">{vehicle.id_user.name}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className="border-status-green text-status-green">
                      OPERATIONAL
                    </Badge>
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
