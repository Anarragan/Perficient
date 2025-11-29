import { StatCard } from "@/components/StatCard";
import { Battery, Droplets, Thermometer, Radio, Zap, Users, Package, AlertTriangle, Heart, Wind, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep to-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Mission Control</h1>
              <p className="text-sm text-muted-foreground">Real-time Mars Base Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Earth Time:</span>
              <span className="font-mono text-foreground">15:47:23 UTC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Mars Sol:</span>
              <span className="font-mono text-primary">1247</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Critical Alerts */}
        <Card className="p-4 bg-status-critical/10 border-status-critical/30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-status-critical" />
            <div>
              <p className="font-medium text-status-critical">Weather Alert</p>
              <p className="text-sm text-muted-foreground">Dust storm approaching from sector C-7. ETA: 6 hours</p>
            </div>
          </div>
        </Card>

        {/* User Center with Vital Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Stats */}
          <div className="space-y-6">
            <StatCard
              title="Heart Rate"
              value="72"
              unit="BPM"
              icon={Heart}
              status="nominal"
            >
              <Progress value={72} className="h-2" />
            </StatCard>

            <StatCard
              title="Oxygen Saturation"
              value="98"
              unit="%"
              icon={Wind}
              status="nominal"
              trend={{ value: "0.5%", isPositive: true }}
            >
              <Progress value={98} className="h-2" />
            </StatCard>

            <StatCard
              title="Body Temp"
              value="36.8"
              unit="°C"
              icon={Thermometer}
              status="nominal"
            />
          </div>

          {/* Center - User */}
          <div className="flex flex-col items-center justify-center">
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm w-full">
              <div className="flex flex-col items-center gap-6">
                <Avatar className="w-32 h-32 border-4 border-primary/30">
                  <AvatarImage src="/placeholder.svg" alt="Commander" />
                  <AvatarFallback className="text-3xl bg-primary/20 text-primary">CM</AvatarFallback>
                </Avatar>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Commander Marcus</h2>
                  <p className="text-muted-foreground">Mission Commander</p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="w-3 h-3 rounded-full bg-status-green animate-pulse"></span>
                    <span className="text-sm text-status-green font-medium">ACTIVE</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-border/30">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono">1247</p>
                    <p className="text-xs text-muted-foreground">SOLS ON MARS</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono">18</p>
                    <p className="text-xs text-muted-foreground">MISSIONS</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Stats */}
          <div className="space-y-6">
            <StatCard
              title="Hydration Level"
              value="92"
              unit="%"
              icon={Droplets}
              status="nominal"
            >
              <Progress value={92} className="h-2" />
            </StatCard>

            <StatCard
              title="Activity Level"
              value="68"
              unit="%"
              icon={Activity}
              status="nominal"
              trend={{ value: "3.2%", isPositive: true }}
            >
              <Progress value={68} className="h-2" />
            </StatCard>

            <StatCard
              title="Sleep Quality"
              value="8.2"
              unit="/10"
              icon={Zap}
              status="nominal"
            />
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Power Reserves"
            value="87"
            unit="%"
            icon={Battery}
            status="nominal"
            trend={{ value: "2.3%", isPositive: true }}
          >
            <div className="space-y-2">
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground">Solar: 72% | Nuclear: 15%</p>
            </div>
          </StatCard>

          <StatCard
            title="Water Supply"
            value="2,847"
            unit="L"
            icon={Droplets}
            status="nominal"
            trend={{ value: "1.2%", isPositive: false }}
          >
            <div className="space-y-2">
              <Progress value={64} className="h-2" />
              <p className="text-xs text-muted-foreground">Recycling efficiency: 94%</p>
            </div>
          </StatCard>

          <StatCard
            title="Habitat Temp"
            value="21.5"
            unit="°C"
            icon={Thermometer}
            status="nominal"
          >
            <p className="text-xs text-muted-foreground">External: -63°C</p>
          </StatCard>

          <StatCard
            title="O₂ Levels"
            value="98.2"
            unit="%"
            icon={Zap}
            status="nominal"
            trend={{ value: "0.5%", isPositive: true }}
          >
            <div className="space-y-2">
              <Progress value={98} className="h-2" />
              <p className="text-xs text-muted-foreground">Life support: Optimal</p>
            </div>
          </StatCard>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-mission-blue/10 text-mission-blue">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Crew</p>
                <p className="text-2xl font-bold font-mono">12/12</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">On Mission</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Habitat</span>
                <span className="font-medium">8</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-mars-orange/10 text-mars-orange">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Supply Status</p>
                <p className="text-2xl font-bold font-mono">78%</p>
              </div>
            </div>
            <Progress value={78} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">Next resupply: Sol 1289</p>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comms Status</p>
                <p className="text-2xl font-bold font-mono flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-status-green animate-pulse"></span>
                  Active
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Signal delay: 13m 42s</p>
          </Card>
        </div>

        {/* Mission Timeline */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-bold mb-4">Today's Mission Schedule</h3>
          <div className="space-y-4">
            {[
              { time: "08:00", task: "Atmospheric sampling", status: "completed" },
              { time: "11:30", task: "Solar panel maintenance", status: "in-progress" },
              { time: "14:00", task: "Geological survey - Sector B-4", status: "scheduled" },
              { time: "17:30", task: "Equipment check & inventory", status: "scheduled" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                <span className="font-mono text-sm text-muted-foreground min-w-[60px]">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.task}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === 'completed' ? 'bg-status-green/20 text-status-green' :
                  item.status === 'in-progress' ? 'bg-mission-blue/20 text-mission-blue' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {item.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
