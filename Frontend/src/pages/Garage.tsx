import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Gauge, MapPin, Wrench } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";

const vehicles = [
  {
    id: "ROVER-01",
    name: "Perseverance",
    type: "Exploration Rover",
    status: "active",
    battery: 92,
    location: "Sector B-4",
    distance: "12.4 km",
    health: 98,
    lastMaintenance: "Sol 1240",
  },
  {
    id: "ROVER-02",
    name: "Curiosity II",
    type: "Heavy Cargo",
    status: "maintenance",
    battery: 45,
    location: "Base Hangar",
    distance: "0 km",
    health: 85,
    lastMaintenance: "Sol 1247",
  },
  {
    id: "DRONE-01",
    name: "Scout Alpha",
    type: "Aerial Drone",
    status: "active",
    battery: 78,
    location: "Sector C-2",
    distance: "8.7 km",
    health: 94,
    lastMaintenance: "Sol 1245",
  },
  {
    id: "ROVER-03",
    name: "Endurance",
    type: "Sample Collection",
    status: "standby",
    battery: 100,
    location: "Base Hangar",
    distance: "0 km",
    health: 100,
    lastMaintenance: "Sol 1235",
  },
];

export default function Garage() {
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
              3 Active
            </Badge>
            <Badge variant="outline" className="border-status-yellow text-status-yellow">
              1 Maintenance
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{vehicle.name}</h3>
                    <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{vehicle.id}</p>
                  </div>
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Battery className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Battery</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg font-bold font-mono">{vehicle.battery}%</span>
                      </div>
                      <Progress value={vehicle.battery} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Health</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg font-bold font-mono">{vehicle.health}%</span>
                      </div>
                      <Progress value={vehicle.health} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      Location
                    </span>
                    <span className="font-medium">{vehicle.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Distance from Base</span>
                    <span className="font-mono">{vehicle.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Wrench className="w-4 h-4" />
                      Last Maintenance
                    </span>
                    <span className="font-mono">{vehicle.lastMaintenance}</span>
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
