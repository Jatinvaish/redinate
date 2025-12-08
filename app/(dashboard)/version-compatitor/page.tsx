"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, CheckCircle2, Download } from "lucide-react";

interface VersionComparisonData {
  model_id: string;
  model_name: string;
  from_version: string;
  to_version: string;
  metrics: {
    sensitivity: { from: number; to: number; delta: number };
    specificity: { from: number; to: number; delta: number };
    auc: { from: number; to: number; delta: number };
  };
  pccp_authorized: boolean;
  submission_numbers: string[];
  meets_pccp_acceptance: boolean;
}

// Sample data matching the provided JSON structure
const versionData: VersionComparisonData = {
  model_id: "overjet-charting-assist-k241684",
  model_name: "Overjet Charting Assist",
  from_version: "1.0",
  to_version: "2.0",
  metrics: {
    sensitivity: { from: 0.88, to: 0.91, delta: 0.03 },
    specificity: { from: 0.90, to: 0.92, delta: 0.02 },
    auc: { from: 0.93, to: 0.95, delta: 0.02 }
  },
  pccp_authorized: true,
  submission_numbers: ["K241684"],
  meets_pccp_acceptance: true
};

export default function VersionControl() {
  const formatPercentage = (value: number) => (value * 100).toFixed(1);
  const formatDelta = (delta: number) => {
    const percentage = (delta * 100).toFixed(1);
    return delta >= 0 ? `+${percentage}` : percentage;
  };

  const getDeltaColor = (delta: number) => {
    if (delta > 0) return "text-green-600";
    if (delta < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getDeltaIcon = (delta: number) => {
    if (delta > 0) return <ArrowUpRight className="h-4 w-4" />;
    if (delta < 0) return <ArrowDownRight className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Version Control</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm">
            {versionData.model_name}
          </p>
        </div>
        <Button variant="outline" onClick={() => window.print()} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <CardTitle className="text-base sm:text-lg">Version Comparison</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Performance metrics across versions
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">v{versionData.from_version}</Badge>
                <span className="text-muted-foreground">→</span>
                <Badge className="bg-blue-500">v{versionData.to_version}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Sensitivity</p>
                  <div className={`flex items-center gap-1 ${getDeltaColor(versionData.metrics.sensitivity.delta)}`}>
                    {getDeltaIcon(versionData.metrics.sensitivity.delta)}
                    <span className="text-sm font-semibold">
                      {formatDelta(versionData.metrics.sensitivity.delta)}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">v{versionData.from_version}</p>
                    <p className="text-xl sm:text-2xl font-bold">{formatPercentage(versionData.metrics.sensitivity.from)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">v{versionData.to_version}</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{formatPercentage(versionData.metrics.sensitivity.to)}%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Specificity</p>
                  <div className={`flex items-center gap-1 ${getDeltaColor(versionData.metrics.specificity.delta)}`}>
                    {getDeltaIcon(versionData.metrics.specificity.delta)}
                    <span className="text-sm font-semibold">
                      {formatDelta(versionData.metrics.specificity.delta)}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">v{versionData.from_version}</p>
                    <p className="text-xl sm:text-2xl font-bold">{formatPercentage(versionData.metrics.specificity.from)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">v{versionData.to_version}</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{formatPercentage(versionData.metrics.specificity.to)}%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">AUC</p>
                  <div className={`flex items-center gap-1 ${getDeltaColor(versionData.metrics.auc.delta)}`}>
                    {getDeltaIcon(versionData.metrics.auc.delta)}
                    <span className="text-sm font-semibold">
                      {formatDelta(versionData.metrics.auc.delta)}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">v{versionData.from_version}</p>
                    <p className="text-xl sm:text-2xl font-bold">{formatPercentage(versionData.metrics.auc.from)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">v{versionData.to_version}</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{formatPercentage(versionData.metrics.auc.to)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Regulatory Status</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">Compliance and authorization</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-3 sm:p-4">
              <p className="text-xs text-muted-foreground mb-2">PCCP Authorization</p>
              {versionData.pccp_authorized ? (
                <Badge className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Authorized
                </Badge>
              ) : (
                <Badge variant="destructive">Not Authorized</Badge>
              )}
            </div>

            <div className="rounded-lg border p-3 sm:p-4">
              <p className="text-xs text-muted-foreground mb-2">PCCP Acceptance</p>
              {versionData.meets_pccp_acceptance ? (
                <Badge className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Meets Criteria
                </Badge>
              ) : (
                <Badge variant="destructive">Does Not Meet</Badge>
              )}
            </div>

            <div className="rounded-lg border p-3 sm:p-4">
              <p className="text-xs text-muted-foreground mb-2">Submission Numbers</p>
              <div className="flex flex-wrap gap-2">
                {versionData.submission_numbers.map((num, idx) => (
                  <Badge key={idx} variant="outline" className="font-mono">
                    {num}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-lg border p-3 sm:p-4">
              <p className="text-xs text-muted-foreground mb-2">Model ID</p>
              <p className="text-xs font-mono break-all">{versionData.model_id}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 sm:p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">All Metrics Improved</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Version {versionData.to_version} shows consistent improvements across all performance metrics. Sensitivity increased by {formatDelta(versionData.metrics.sensitivity.delta)}%, specificity by {formatDelta(versionData.metrics.specificity.delta)}%, and AUC by {formatDelta(versionData.metrics.auc.delta)}%.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3 sm:p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">PCCP Compliance</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This version meets all PCCP acceptance criteria and is authorized for deployment. Submission number: {versionData.submission_numbers[0]}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}