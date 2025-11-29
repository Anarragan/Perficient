import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, AlertCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { apiGet } from "@/lib/api";

type Resource = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  idUser?: string;
};

type ResourceGroup = {
  category: string;
  items: Resource[];
};

export default function Storage() {
  const [groups, setGroups] = React.useState<ResourceGroup[]>([]);
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    // Decode token to get user ID
    let currentUserId = '1';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentUserId = payload.sub || payload.userId || '1';
    } catch (e) {
      console.error('Error decoding token:', e);
    }

    // Load initial resources for this user
    apiGet('/resources', token)
      .then((resp: any) => {
        const data = resp.success && resp.data ? resp.data : (Array.isArray(resp) ? resp : []);
        // Filter by current user
        const userResources = data.filter((r: Resource) => r.idUser === currentUserId);
        setResources(userResources);
        groupResources(userResources);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || 'Error cargando recursos');
        setLoading(false);
      });

    // Consume resources stream for real-time updates
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
    const apiKey = import.meta.env.VITE_API_KEY || '111';
    const controller = new AbortController();
    
    (async () => {
      try {
        const res = await fetch(`${apiBase}/resources/user/${currentUserId}/stream`, {
          headers: {
            'X-API-Key': apiKey,
            'Authorization': `Bearer ${token}`,
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
                  setResources(json);
                  groupResources(json);
                  console.log('Resources stream update:', json.length, 'items');
                }
              } catch (e) {
                console.error('Resource stream parse error:', e);
              }
            }
          }
        }
      } catch (err) {
        console.error('Resource stream connection error:', err);
      }
    })();

    return () => controller.abort();
  }, []);

  function groupResources(items: Resource[]) {
    const grouped = Object.values(
      items.reduce<Record<string, Resource[]>>((acc, item) => {
        const key = item.name.split(' ')[0] || 'General';
        acc[key] = acc[key] ?? [];
        acc[key].push(item);
        return acc;
      }, {})
    ).map(items => ({ category: items[0].name.split(' ')[0] || 'General', items }));
    setGroups(grouped);
  }
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
        {error && (
          <Card className="p-4 border-border/50">
            <p className="text-sm text-status-critical">{error}</p>
          </Card>
        )}
        {loading && (
          <Card className="p-4 border-border/50">
            <p className="text-sm text-muted-foreground">Cargando inventario...</p>
          </Card>
        )}
        {/* Overview Cards - Dynamic from backend data */}
        {!loading && resources.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Resources</p>
                  <p className="text-2xl font-bold font-mono">
                    {resources.length}
                  </p>
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
                  <p className="text-2xl font-bold font-mono">
                    {resources.filter(r => r.quantity < 500).length}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-mission-blue/10 text-mission-blue">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Quantity</p>
                  <p className="text-2xl font-bold font-mono">{resources.reduce((sum, r) => sum + r.quantity, 0)}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* User Resources from backend */}
        {groups.map((category) => (
          <Card key={category.category} className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold">{category.category} Resources</h3>
            </div>

            <div className="space-y-4">
              {category.items.map((item) => {
                const isLow = item.quantity < 500;
                const maxCapacity = 5000; // Define max capacity for visualization
                const percentage = Math.min(100, (item.quantity / maxCapacity) * 100);
                
                return (
                  <div key={item.id} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
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
                        {item.quantity} units
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                    )}
                    <div className="space-y-2">
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${isLow ? '[&>div]:bg-status-yellow' : ''}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(1)}% of max capacity</span>
                        <span className="font-mono">{item.id}</span>
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
