import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Briefcase, MapPin } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";

const crew = [
  {
    id: "CR-001",
    name: "Commander Sarah Chen",
    role: "Mission Commander",
    specialty: "Aerospace Engineering",
    status: "on-duty",
    health: 98,
    location: "Command Center",
    tasksCompleted: 156,
    initials: "SC",
  },
  {
    id: "CR-002",
    name: "Dr. Marcus Rodriguez",
    role: "Chief Medical Officer",
    specialty: "Emergency Medicine",
    status: "on-duty",
    health: 95,
    location: "Medical Bay",
    tasksCompleted: 142,
    initials: "MR",
  },
  {
    id: "CR-003",
    name: "Engineer Yuki Tanaka",
    role: "Systems Engineer",
    specialty: "Mechanical Systems",
    status: "off-duty",
    health: 100,
    location: "Habitat Module B",
    tasksCompleted: 189,
    initials: "YT",
  },
  {
    id: "CR-004",
    name: "Dr. Amara Okafor",
    role: "Research Scientist",
    specialty: "Geology & Mineralogy",
    status: "on-mission",
    health: 97,
    location: "Sector B-4",
    tasksCompleted: 178,
    initials: "AO",
  },
  {
    id: "CR-005",
    name: "Lt. Pavel Volkov",
    role: "Pilot & Navigation",
    specialty: "Flight Operations",
    status: "on-duty",
    health: 96,
    location: "Flight Control",
    tasksCompleted: 134,
    initials: "PV",
  },
  {
    id: "CR-006",
    name: "Dr. Zara Patel",
    role: "Botanist",
    specialty: "Agriculture & Life Support",
    status: "on-duty",
    health: 99,
    location: "Greenhouse",
    tasksCompleted: 167,
    initials: "ZP",
  },
  {
    id: "CR-007",
    name: "Engineer Alex Kim",
    role: "Electronics Specialist",
    specialty: "Communications",
    status: "on-mission",
    health: 94,
    location: "Sector C-2",
    tasksCompleted: 145,
    initials: "AK",
  },
  {
    id: "CR-008",
    name: "Dr. Elena Kovač",
    role: "Chemist",
    specialty: "Resource Processing",
    status: "off-duty",
    health: 100,
    location: "Habitat Module A",
    tasksCompleted: 123,
    initials: "EK",
  },
];

export default function Crew() {
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
              6 On Duty
            </Badge>
            <Badge variant="outline" className="border-mission-blue text-mission-blue">
              2 On Mission
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
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
                  {member.status.toUpperCase().replace('-', ' ')}
                </Badge>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Activity className="w-3 h-3" />
                        Health
                      </span>
                      <span className="font-mono font-medium">{member.health}%</span>
                    </div>
                    <Progress value={member.health} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground truncate">{member.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground truncate">{member.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tasks Completed</span>
                      <span className="font-mono font-medium text-foreground">{member.tasksCompleted}</span>
                    </div>
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
