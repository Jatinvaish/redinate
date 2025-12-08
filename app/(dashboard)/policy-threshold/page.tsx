"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertTriangle,
  CheckCircle2,
  Save,
  RotateCcw,
  Settings,
  Info,
  TrendingDown,
  TrendingUp,
  Activity
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import DynamicSummaryCards, { SummaryCardData } from "@/components/dynamicSummaryCard";

interface ThresholdConfig {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  value: number;
  unit: string;
  minValue: number;
  maxValue: number;
  description: string;
  severity: "critical" | "warning" | "info";
  lastModified: string;
  modifiedBy: string;
}

const defaultThresholds: ThresholdConfig[] = [
  {
    id: "sensitivity_min",
    name: "Minimum Sensitivity",
    category: "performance",
    enabled: true,
    value: 90,
    unit: "%",
    minValue: 70,
    maxValue: 100,
    description: "Minimum acceptable sensitivity for model performance",
    severity: "critical",
    lastModified: "2025-12-01",
    modifiedBy: "admin@hospital.org"
  },
  {
    id: "specificity_min",
    name: "Minimum Specificity",
    category: "performance",
    enabled: true,
    value: 85,
    unit: "%",
    minValue: 70,
    maxValue: 100,
    description: "Minimum acceptable specificity for model performance",
    severity: "critical",
    lastModified: "2025-12-01",
    modifiedBy: "admin@hospital.org"
  },
  {
    id: "auc_min",
    name: "Minimum AUC",
    category: "performance",
    enabled: true,
    value: 0.85,
    unit: "",
    minValue: 0.5,
    maxValue: 1.0,
    description: "Minimum area under ROC curve",
    severity: "warning",
    lastModified: "2025-11-28",
    modifiedBy: "qa@hospital.org"
  },
  {
    id: "drift_threshold",
    name: "Performance Drift Threshold",
    category: "drift",
    enabled: true,
    value: 5,
    unit: "%",
    minValue: 1,
    maxValue: 20,
    description: "Maximum acceptable performance degradation from baseline",
    severity: "warning",
    lastModified: "2025-11-25",
    modifiedBy: "admin@hospital.org"
  },
  {
    id: "bias_ratio",
    name: "Bias Ratio Threshold",
    category: "fairness",
    enabled: true,
    value: 1.2,
    unit: "ratio",
    minValue: 1.0,
    maxValue: 2.0,
    description: "Maximum acceptable performance ratio between demographic groups",
    severity: "critical",
    lastModified: "2025-12-03",
    modifiedBy: "compliance@hospital.org"
  },
  {
    id: "false_positive_rate",
    name: "Maximum False Positive Rate",
    category: "safety",
    enabled: true,
    value: 10,
    unit: "%",
    minValue: 1,
    maxValue: 30,
    description: "Maximum acceptable false positive rate",
    severity: "warning",
    lastModified: "2025-11-20",
    modifiedBy: "safety@hospital.org"
  },
  {
    id: "validation_frequency",
    name: "Validation Frequency",
    category: "compliance",
    enabled: true,
    value: 30,
    unit: "days",
    minValue: 7,
    maxValue: 180,
    description: "Maximum days between validation runs",
    severity: "info",
    lastModified: "2025-11-15",
    modifiedBy: "admin@hospital.org"
  },
  {
    id: "data_quality_min",
    name: "Minimum Data Quality Score",
    category: "quality",
    enabled: true,
    value: 95,
    unit: "%",
    minValue: 80,
    maxValue: 100,
    description: "Minimum acceptable data quality score for training/validation",
    severity: "warning",
    lastModified: "2025-12-02",
    modifiedBy: "data@hospital.org"
  },
  {
    id: "response_time_max",
    name: "Maximum Response Time",
    category: "performance",
    enabled: true,
    value: 5,
    unit: "sec",
    minValue: 1,
    maxValue: 30,
    description: "Maximum acceptable model inference time",
    severity: "info",
    lastModified: "2025-11-18",
    modifiedBy: "ops@hospital.org"
  },
  {
    id: "sample_size_min",
    name: "Minimum Sample Size",
    category: "quality",
    enabled: true,
    value: 100,
    unit: "samples",
    minValue: 50,
    maxValue: 1000,
    description: "Minimum sample size for validation testing",
    severity: "warning",
    lastModified: "2025-11-30",
    modifiedBy: "qa@hospital.org"
  }
];

export default function PolicyThresholdPage() {
  const [thresholds, setThresholds] = useState<ThresholdConfig[]>(defaultThresholds);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "performance", label: "Performance" },
    { value: "drift", label: "Drift Detection" },
    { value: "fairness", label: "Fairness & Bias" },
    { value: "safety", label: "Safety" },
    { value: "compliance", label: "Compliance" },
    { value: "quality", label: "Data Quality" }
  ];

  const getSeverityBadge = (severity: string) => {
    const config = {
      critical: { variant: "destructive" as const, className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
      warning: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
      info: { variant: "default" as const, className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" }
    };
    const style = config[severity as keyof typeof config];
    return (
      <Badge variant={style.variant} className={style.className}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const handleThresholdChange = (id: string, field: keyof ThresholdConfig, value: any) => {
    setThresholds(prev =>
      prev.map(threshold =>
        threshold.id === id ? { ...threshold, [field]: value } : threshold
      )
    );
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // In real implementation, this would call an API
    console.log("Saving thresholds:", thresholds);
    setHasChanges(false);
    // Show success notification
  };

  const handleResetDefaults = () => {
    setThresholds(defaultThresholds);
    setHasChanges(true);
  };

  const filteredThresholds = selectedCategory === "all"
    ? thresholds
    : thresholds.filter(t => t.category === selectedCategory);

  const stats = {
    total: thresholds.length,
    enabled: thresholds.filter(t => t.enabled).length,
    critical: thresholds.filter(t => t.severity === "critical").length,
    modified: thresholds.filter(t => {
      const modDate = new Date(t.lastModified);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return modDate > weekAgo;
    }).length
  };
  const summaryCardsData: SummaryCardData[] = [
    {
      title: "Total Policies",
      value: stats.total,
      changeValue: 0,
      icon: "checkCircle",
      bgColor: "indigo",
      changeLabel: "configured"
    },
    {
      title: "Enabled",
      value: stats.enabled,
      changeValue: ((stats.enabled / stats.total) * 100) - 100,
      icon: "checkCircle",
      bgColor: "green",
      changeLabel: "active policies"
    },
    {
      title: "Critical",
      value: stats.critical,
      changeValue: 0,
      icon: "alertCircle",
      bgColor: "red",
      changeLabel: "high priority"
    },
    {
      title: "Recently Modified",
      value: stats.modified,
      changeValue: 12.5,
      icon: "clock",
      bgColor: "blue",
      changeLabel: "last 7 days"
    }
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Policy & Threshold Configuration</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Configure acceptance criteria and monitoring thresholds for AI models
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={handleResetDefaults}
            className="flex-1 sm:flex-none"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Defaults
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className="flex-1 sm:flex-none"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
        <DynamicSummaryCards cards={summaryCardsData} />

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Thresholds Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Threshold Configuration</CardTitle>
          <CardDescription>
            Adjust thresholds and policies for AI model governance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredThresholds.map((threshold) => (
              <Card key={threshold.id} className="border-l-4" style={{
                borderLeftColor: threshold.severity === "critical" ? "#ef4444" :
                  threshold.severity === "warning" ? "#eab308" : "#3b82f6"
              }}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-base sm:text-lg">{threshold.name}</CardTitle>
                        {getSeverityBadge(threshold.severity)}
                        <Badge variant="outline" className="text-xs">
                          {threshold.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs sm:text-sm">
                        {threshold.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`${threshold.id}-enabled`} className="text-sm">
                        Enabled
                      </Label>
                      <Switch
                        id={`${threshold.id}-enabled`}
                        checked={threshold.enabled}
                        onCheckedChange={(checked) =>
                          handleThresholdChange(threshold.id, "enabled", checked)
                        }
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${threshold.id}-value`} className="text-sm">
                          Current Value
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`${threshold.id}-value`}
                            type="number"
                            value={threshold.value}
                            onChange={(e) =>
                              handleThresholdChange(threshold.id, "value", parseFloat(e.target.value))
                            }
                            step={threshold.unit === "%" ? 1 : 0.01}
                            min={threshold.minValue}
                            max={threshold.maxValue}
                            disabled={!threshold.enabled}
                            className="text-sm"
                          />
                          <span className="text-sm text-muted-foreground min-w-[60px]">
                            {threshold.unit}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Range</Label>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{threshold.minValue}</span>
                          <span>-</span>
                          <span>{threshold.maxValue}</span>
                          <span>{threshold.unit}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Last Modified</Label>
                        <div className="text-sm text-muted-foreground">
                          <div>{new Date(threshold.lastModified).toLocaleDateString()}</div>
                          <div className="text-xs truncate">by {threshold.modifiedBy}</div>
                        </div>
                      </div>
                    </div>

                    {/* Slider for visual adjustment */}
                    <div className="space-y-2">
                      <Slider
                        value={[threshold.value]}
                        onValueChange={(value) =>
                          handleThresholdChange(threshold.id, "value", value[0])
                        }
                        min={threshold.minValue}
                        max={threshold.maxValue}
                        step={threshold.unit === "%" ? 1 : 0.01}
                        disabled={!threshold.enabled}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Changes Banner */}
      {hasChanges && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm font-medium">
                You have unsaved changes. Click "Save Changes" to apply your configuration.
              </p>
            </div>
            <Button onClick={handleSaveChanges} size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}