import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Compass, Thermometer, Activity } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getNasaMarsWeather, getNasaRoverPhotos } from "@/lib/api";

export default function Maps() {
  const [nasaWeather, setNasaWeather] = React.useState<any>(null);
  const [nasaPhotos, setNasaPhotos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Load NASA data
    Promise.all([
      getNasaMarsWeather(),
      getNasaRoverPhotos('curiosity')
    ])
      .then(([weatherResp, photosResp]) => {
        if (weatherResp.success && weatherResp.data) setNasaWeather(weatherResp.data);
        if (photosResp.success && Array.isArray(photosResp.data)) setNasaPhotos(photosResp.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep to-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">NASA Mars Data</h1>
              <p className="text-sm text-muted-foreground">Real-time Mars Weather & Surface Images</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-primary text-primary">
              {nasaPhotos.length} Photos Available
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* NASA Weather Data */}
        <Card className="p-6 border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-mars-orange/10 text-mars-orange">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Mars Weather (NASA InSight)</h3>
              <p className="text-sm text-muted-foreground">Latest atmospheric conditions</p>
            </div>
          </div>
          
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading weather data...</p>
          ) : nasaWeather ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground mb-1">Sol (Mars Day)</p>
                <p className="text-3xl font-bold font-mono">{nasaWeather.sol}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground mb-1">Season</p>
                <p className="text-xl font-medium">{nasaWeather.season}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground mb-1">Temperature (avg)</p>
                <p className="text-xl font-bold font-mono">{nasaWeather.temperature?.average?.toFixed(1)}°C</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground mb-1">Pressure (avg)</p>
                <p className="text-xl font-bold font-mono">{nasaWeather.pressure?.average?.toFixed(0)} Pa</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 md:col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Wind Speed (avg)</p>
                <p className="text-xl font-bold font-mono">{nasaWeather.windSpeed?.average?.toFixed(1)} m/s</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 md:col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Wind Direction</p>
                <p className="text-xl font-medium">{nasaWeather.windDirection}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Weather data unavailable</p>
          )}
        </Card>

        {/* NASA Rover Photos */}
        <Card className="p-6 border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-mission-blue/10 text-mission-blue">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Curiosity Rover - Mars Surface Photos</h3>
              <p className="text-sm text-muted-foreground">Latest images from Mars surface</p>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading photos...</p>
          ) : nasaPhotos.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nasaPhotos.slice(0, 12).map((photo: any, i: number) => (
                  <div key={i} className="aspect-square bg-secondary/30 rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-colors group">
                    <img 
                      src={photo.img_src} 
                      alt={`Mars Surface ${i + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground text-center pt-4 border-t border-border/30">
                Showing {Math.min(12, nasaPhotos.length)} of {nasaPhotos.length} available photos
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No photos available</p>
          )}
        </Card>
      </div>
    </div>
  );
}
