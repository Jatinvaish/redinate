"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  PieChart,
  Pie
} from "recharts";
import { Download, AlertTriangle, CheckCircle2, Filter } from "lucide-react";
import DynamicSummaryCards, { SummaryCardData } from "@/components/dynamicSummaryCard";

const ageGroupData = [
  { group: "21-40", sensitivity: 92, specificity: 95, parity: 97 },
  { group: "41-65", sensitivity: 87, specificity: 91, parity: 93 },
  { group: "65+", sensitivity: 91, specificity: 94, parity: 96 },
  { group: "<21", sensitivity: 88, specificity: 89, parity: 91 }
];

const ethnicityData = [
  { group: "Asian", sensitivity: 94, specificity: 96, parity: 98 },
  { group: "Black", sensitivity: 88, specificity: 91, parity: 94 },
  { group: "Hispanic", sensitivity: 86, specificity: 90, parity: 92 },
  { group: "Other", sensitivity: 87, specificity: 92, parity: 93 },
  { group: "White", sensitivity: 89, specificity: 93, parity: 95 }
];

const genderData = [
  { group: "Female", sensitivity: 91, specificity: 97, parity: 98 },
  { group: "Male", sensitivity: 84, specificity: 86, parity: 89 },
  { group: "Non-binary", sensitivity: 89, specificity: 92, parity: 94 }
];

const studyTypeData = [
  { group: "Foot", sensitivity: 89, specificity: 92, parity: 94 },
  { group: "Hand", sensitivity: 92, specificity: 92, parity: 95 },
  { group: "Lower Ext.", sensitivity: 77, specificity: 85, parity: 87 },
  { group: "Spine Hip", sensitivity: 85, specificity: 94, parity: 93 },
  { group: "Unspecif.", sensitivity: 92, specificity: 95, parity: 96 },
  { group: "Upper Ext.", sensitivity: 87, specificity: 97, parity: 95 }
];

const siteData = [
  { group: "Site A", sensitivity: 91, specificity: 94, parity: 96 },
  { group: "Site B", sensitivity: 89, specificity: 92, parity: 94 },
  { group: "Site C", sensitivity: 93, specificity: 95, parity: 97 },
  { group: "Site D", sensitivity: 87, specificity: 90, parity: 92 },
  { group: "Site E", sensitivity: 90, specificity: 93, parity: 95 }
];

const densityData = [
  { group: "Low", sensitivity: 93, specificity: 96, parity: 97 },
  { group: "Medium", sensitivity: 89, specificity: 92, parity: 94 },
  { group: "High", sensitivity: 86, specificity: 89, parity: 91 },
  { group: "Very High", sensitivity: 84, specificity: 87, parity: 89 }
];

const radarData = [
  { category: "Age", parity: 94, threshold: 90 },
  { category: "Ethnicity", parity: 94, threshold: 90 },
  { category: "Gender", parity: 93, threshold: 90 },
  { category: "Study Type", parity: 92, threshold: 90 },
  { category: "Site", parity: 95, threshold: 90 },
  { category: "Density", parity: 93, threshold: 90 }
];

const riskDistribution = [
  { name: "Low Risk", value: 18, fill: "var(--color-low)" },
  { name: "Medium Risk", value: 4, fill: "var(--color-medium)" },
  { name: "High Risk", value: 2, fill: "var(--color-high)" }
];

const riskChartConfig = {
  value: {
    label: "Groups"
  },
  low: {
    label: "Low Risk",
    color: "#22c55e"
  },
  medium: {
    label: "Medium Risk",
    color: "#eab308"
  },
  high: {
    label: "High Risk",
    color: "#ef4444"
  }
} satisfies ChartConfig;

const getParityColor = (parity: number) => {
  if (parity >= 95) return "text-green-600";
  if (parity >= 90) return "text-yellow-600";
  return "text-red-600";
};

const getParityBadge = (parity: number) => {
  if (parity >= 95) return <Badge className="bg-green-500">Excellent</Badge>;
  if (parity >= 90) return <Badge className="bg-yellow-500">Good</Badge>;
  return <Badge className="bg-red-500">Needs Improvement</Badge>;
};

export default function BiasRadarPage() {
  const [selectedSlice, setSelectedSlice] = useState("age");
  const [selectedModel, setSelectedModel] = useState("gleamer-boneview");

  const summaryCards: SummaryCardData[] = [
    {
      title: "Overall Fairness Score",
      value: 93.5,
      changeValue: 1.2,
      icon: "checkCircle",
      bgColor: "green",
      suffix: "%",
      changeLabel: "vs last validation"
    },
    {
      title: "Groups at Parity",
      value: 24,
      changeValue: 0,
      icon: "users",
      bgColor: "blue",
      changeLabel: "86% meeting threshold (≥90%)"
    },
    {
      title: "Disparity Alerts",
      value: 4,
      changeValue: 0,
      icon: "alertCircle",
      bgColor: "yellow",
      changeLabel: "Groups requiring attention"
    }
  ];

  const getSliceData = () => {
    switch (selectedSlice) {
      case "age":
        return ageGroupData;
      case "ethnicity":
        return ethnicityData;
      case "gender":
        return genderData;
      case "study-type":
        return studyTypeData;
      case "site":
        return siteData;
      case "density":
        return densityData;
      default:
        return ageGroupData;
    }
  };

  const currentData = getSliceData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bias Radar</h1>
          <p className="text-muted-foreground mt-2">
            Fairness and equity analysis across demographic groups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gleamer-boneview">Gleamer BoneView</SelectItem>
              <SelectItem value="aidoc-brain">Aidoc Brain CT</SelectItem>
              <SelectItem value="viz-stroke">Viz.ai Stroke</SelectItem>
              <SelectItem value="arterys-cardiac">Arterys Cardiac</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <DynamicSummaryCards cards={summaryCards} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Fairness Metrics by Demographic Slice</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Performance parity across subgroups
                </p>
              </div>
              <Select value={selectedSlice} onValueChange={setSelectedSlice}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="age">Age Groups</SelectItem>
                  <SelectItem value="ethnicity">Ethnicity</SelectItem>
                  <SelectItem value="gender">Gender</SelectItem>
                  <SelectItem value="study-type">Study Type</SelectItem>
                  <SelectItem value="site">Site</SelectItem>
                  <SelectItem value="density">Breast Density</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[400px] w-full">
              <BarChart data={currentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="group" width={100} tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="sensitivity" fill="#22c55e" name="Sensitivity" radius={[0, 4, 4, 0]} />
                <Bar dataKey="specificity" fill="#3b82f6" name="Specificity" radius={[0, 4, 4, 0]} />
                <Bar dataKey="parity" fill="#a855f7" name="Parity Score" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>

            <div className="mt-6 space-y-3">
              {currentData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{item.group}</div>
                    {getParityBadge(item.parity)}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Sensitivity: </span>
                      <span className={`font-semibold ${getParityColor(item.sensitivity)}`}>
                        {item.sensitivity}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Specificity: </span>
                      <span className={`font-semibold ${getParityColor(item.specificity)}`}>
                        {item.specificity}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Parity: </span>
                      <span className={`font-semibold ${getParityColor(item.parity)}`}>
                        {item.parity}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fairness Radar</CardTitle>
              <p className="text-sm text-muted-foreground">
                Parity scores across all dimensions
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[80, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Parity Score"
                    dataKey="parity"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Threshold"
                    dataKey="threshold"
                    stroke="#ef4444"
                    fill="transparent"
                    strokeDasharray="5 5"
                  />
                  <Legend />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">
                Groups by performance level
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={riskChartConfig}
                className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie 
                    data={riskDistribution} 
                    dataKey="value" 
                    nameKey="name"
                    label
                    cx="50%"
                    cy="50%"
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/3 *:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Disparity Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Lower Extremity</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sensitivity 13% below average (77% vs 90%)
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Hispanic Population</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Parity score 92%, below 95% target
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Male Gender</p>
                <p className="text-xs text-muted-foreground mt-1">
                  7% performance gap vs female cohort
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Very High Density</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Specificity 87%, 6% below low density
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 p-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Strong Performance</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Gender and Age show excellent parity (≥93%)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fairness Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 dark:bg-green-950 p-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Strengths</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Gender parity score of 93% demonstrates balanced performance</li>
                    <li>• Age groups show consistent metrics across all cohorts</li>
                    <li>• Site performance is uniform, indicating good deployment</li>
                    <li>• Asian and White populations have excellent parity (≥95%)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-yellow-100 dark:bg-yellow-950 p-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Recommended Actions</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Collect additional training data for Lower Extremity studies</li>
                    <li>• Review Hispanic population data quality and representation</li>
                    <li>• Investigate male cohort performance gap root causes</li>
                    <li>• Enhance model for very high breast density cases</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}