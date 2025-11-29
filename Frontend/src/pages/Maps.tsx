import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Compass, Mountain } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const sectors = [
  { id: "A-1", name: "Olympus Mons Base", type: "habitat", status: "active", coords: "18.65°N, 226.2°W" },
  { id: "B-4", name: "Valles Marineris Station", type: "research", status: "active", coords: "14.0°S, 302.5°W" },
  { id: "C-2", name: "Hellas Basin Outpost", type: "mining", status: "active", coords: "42.4°S, 70.5°E" },
  { id: "D-7", name: "Polar Research Camp", type: "research", status: "maintenance", coords: "84.3°N, 0°E" },
];

const missions = [
  { id: "M-001", name: "Geological Survey", location: "Sector B-4", status: "in-progress", crew: 3 },
  { id: "M-002", name: "Ice Core Sampling", location: "Sector D-7", status: "planned", crew: 2 },
  { id: "M-003", name: "Equipment Delivery", location: "Sector C-2", status: "in-progress", crew: 4 },
];

export default function Maps() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep to-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Mars Surface Maps</h1>
              <p className="text-sm text-muted-foreground">Navigation & Territory Control</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-primary text-primary">
              4 Active Locations
            </Badge>
            <Badge variant="outline" className="border-mission-blue text-mission-blue">
              2 Missions Active
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Map Placeholder */}
        <Card className="p-6 border-border/50 overflow-hidden">
          <div className="relative bg-gradient-to-br from-mars-red/20 to-mars-orange/20 rounded-lg aspect-video flex items-center justify-center border border-primary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
            <div className="relative text-center space-y-4">
              <Compass className="w-16 h-16 mx-auto text-primary animate-pulse" />
              <div>
                <p className="text-2xl font-bold mb-2">Interactive Mars Surface Map</p>
                <p className="text-muted-foreground">Real-time positioning and terrain data</p>
                <p className="text-sm text-muted-foreground mt-2 font-mono">
                  Base Coordinates: 18.65°N, 226.2°W
                </p>
              </div>
            </div>
            
            {/* Position markers */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-status-green shadow-lg shadow-status-green animate-pulse" />
            <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full bg-mission-blue shadow-lg shadow-mission-blue animate-pulse" />
            <div className="absolute top-1/2 left-2/3 w-3 h-3 rounded-full bg-mars-orange shadow-lg shadow-mars-orange animate-pulse" />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sectors */}
          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Active Sectors</h3>
                <p className="text-sm text-muted-foreground">Established locations</p>
              </div>
            </div>

            <div className="space-y-3">
              {sectors.map((sector) => (
                <div key={sector.id} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{sector.id}</span>
                        <Badge variant="outline" className="text-xs">
                          {sector.type}
                        </Badge>
                      </div>
                      <p className="font-medium">{sector.name}</p>
                    </div>
                    <Badge
                      variant={sector.status === 'active' ? 'default' : 'secondary'}
                      className={sector.status === 'active' ? 'bg-status-green hover:bg-status-green' : ''}
                    >
                      {sector.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Navigation className="w-3 h-3" />
                    <span className="font-mono">{sector.coords}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Missions */}
          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-mission-blue/10 text-mission-blue">
                <Mountain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Active Missions</h3>
                <p className="text-sm text-muted-foreground">Field operations</p>
              </div>
            </div>

            <div className="space-y-3">
              {missions.map((mission) => (
                <div key={mission.id} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{mission.id}</span>
                      </div>
                      <p className="font-medium">{mission.name}</p>
                    </div>
                    <Badge
                      variant={mission.status === 'in-progress' ? 'default' : 'secondary'}
                      className={mission.status === 'in-progress' ? 'bg-mission-blue hover:bg-mission-blue' : ''}
                    >
                      {mission.status.toUpperCase().replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{mission.location}</span>
                    </div>
                    <span>{mission.crew} crew members</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
