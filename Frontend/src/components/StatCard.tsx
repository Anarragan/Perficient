import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  unit?: string;
  status?: 'nominal' | 'warning' | 'critical';
  children?: ReactNode;
}

export function StatCard({ title, value, icon: Icon, trend, unit, status = 'nominal', children }: StatCardProps) {
  const statusColors = {
    nominal: 'text-status-green',
    warning: 'text-status-yellow',
    critical: 'text-status-critical',
  };

  return (
    <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{title}</p>
            </div>
          </div>
          {trend && (
            <div className={`text-xs font-medium ${trend.isPositive ? 'text-status-green' : 'text-status-critical'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          <span className={`ml-auto text-xs font-medium ${statusColors[status]}`}>
            ● {status.toUpperCase()}
          </span>
        </div>

        {children && (
          <div className="mt-4 pt-4 border-t border-border/30">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}
