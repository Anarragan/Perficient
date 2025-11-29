import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, Apple, Pill, Wrench, Fuel, AlertCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const supplies = [
  {
    category: "Food",
    icon: Apple,
    items: [
      { name: "Freeze-dried meals", quantity: 847, unit: "portions", capacity: 1200, status: "good" },
      { name: "Fresh produce", quantity: 142, unit: "kg", capacity: 200, status: "good" },
      { name: "Emergency rations", quantity: 320, unit: "packs", capacity: 400, status: "good" },
    ],
  },
  {
    category: "Medical",
    icon: Pill,
    items: [
      { name: "First aid supplies", quantity: 67, unit: "kits", capacity: 100, status: "low" },
      { name: "Medications", quantity: 892, unit: "doses", capacity: 1000, status: "good" },
      { name: "Surgical equipment", quantity: 15, unit: "sets", capacity: 20, status: "good" },
    ],
  },
  {
    category: "Tools & Parts",
    icon: Wrench,
    items: [
      { name: "Repair kits", quantity: 45, unit: "kits", capacity: 80, status: "good" },
      { name: "Replacement parts", quantity: 234, unit: "units", capacity: 300, status: "good" },
      { name: "Power cells", quantity: 89, unit: "cells", capacity: 150, status: "good" },
    ],
  },
  {
    category: "Fuel & Energy",
    icon: Fuel,
    items: [
      { name: "Hydrogen fuel", quantity: 2847, unit: "L", capacity: 4000, status: "good" },
      { name: "RTG units", quantity: 8, unit: "units", capacity: 10, status: "good" },
      { name: "Battery reserves", quantity: 124, unit: "units", capacity: 200, status: "low" },
    ],
  },
];

export default function Storage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep to-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Storage & Inventory</h1>
              <p className="text-sm text-muted-foreground">Supply Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-status-critical text-status-critical">
              2 Low Stock Alerts
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold font-mono">5,605</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-green/10 text-status-green">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Well Stocked</p>
                <p className="text-2xl font-bold font-mono">10</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-yellow/10 text-status-yellow">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold font-mono">2</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-mission-blue/10 text-mission-blue">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity Used</p>
                <p className="text-2xl font-bold font-mono">74%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Supply Categories */}
        {supplies.map((category) => (
          <Card key={category.category} className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{category.category}</h3>
            </div>

            <div className="space-y-4">
              {category.items.map((item, index) => {
                const percentage = (item.quantity / item.capacity) * 100;
                const isLow = item.status === 'low';
                
                return (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{item.name}</span>
                        {isLow && (
                          <Badge variant="destructive" className="bg-status-yellow hover:bg-status-yellow">
                            LOW STOCK
                          </Badge>
                        )}
                      </div>
                      <span className="font-mono text-sm">
                        {item.quantity} / {item.capacity} {item.unit}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${isLow ? '[&>div]:bg-status-yellow' : ''}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(1)}% capacity</span>
                        <span>Est. {Math.floor((item.quantity / item.capacity) * 180)} days remaining</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
