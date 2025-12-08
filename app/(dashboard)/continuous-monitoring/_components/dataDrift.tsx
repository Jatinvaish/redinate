import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Activity } from "lucide-react";

export default function DataDriftDetection() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg">Data Drift Detection</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Monitoring input distribution changes
            </p>
          </div>
          <Badge className="bg-green-500 w-fit">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Stable
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Age Distribution</p>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">0.02</p>
            <p className="text-xs text-muted-foreground">KL Divergence</p>
            <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: "5%" }} />
            </div>
          </div>

          <div className="rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Gender Distribution</p>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">0.01</p>
            <p className="text-xs text-muted-foreground">KL Divergence</p>
            <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: "3%" }} />
            </div>
          </div>

          <div className="rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Ethnicity Distribution</p>
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">0.08</p>
            <p className="text-xs text-muted-foreground">KL Divergence</p>
            <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: "20%" }} />
            </div>
          </div>

          <div className="rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Study Type Distribution</p>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">0.03</p>
            <p className="text-xs text-muted-foreground">KL Divergence</p>
            <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: "8%" }} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 sm:p-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-xs sm:text-sm">No Significant Drift</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All feature distributions remain within acceptable thresholds (KL &lt; 0.05).
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 sm:p-4">
            <div className="flex items-start gap-2">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-xs sm:text-sm">Continuous Monitoring Active</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Drift metrics updated hourly. Next check: 15:00 UTC
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs sm:text-sm font-medium">Drift Threshold Legend</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">Stable (&lt; 0.05)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500 flex-shrink-0" />
              <span className="text-muted-foreground">Moderate (0.05-0.10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-muted-foreground">Critical (&gt; 0.10)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}