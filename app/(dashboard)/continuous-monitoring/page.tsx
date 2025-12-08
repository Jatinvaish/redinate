"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Label,
  ResponsiveContainer
} from "recharts";
import {
  Download,
  AlertTriangle,
  CheckCircle2,
  Activity,
  TrendingUp
} from "lucide-react";
import CountAnimation from "@/components/ui/custom/count-animation";
import CustomDateRangePicker from "@/components/custom-date-range-picker";
import { Badge } from "@/components/ui/badge";
import DynamicSummaryCards, { SummaryCardData } from "@/components/dynamicSummaryCard";
import DataDriftDetection from "@/app/(dashboard)/continuous-monitoring/_components/dataDrift";
import PerformanceCharts from "@/app/(dashboard)/continuous-monitoring/_components/performanceCharts";
import StudiesAndPopulation from "@/app/(dashboard)/continuous-monitoring/_components/studyPoppulations";

// Data definitions
const studiesData = [
  { month: "Nov 2024", studies: 85000 },
  { month: "Dec 2024", studies: 92000 },
  { month: "Jan 2025", studies: 98000 },
  { month: "Feb 2025", studies: 105000 },
  { month: "Mar 2025", studies: 110000 },
  { month: "Apr 2025", studies: 115000 },
  { month: "May 2025", studies: 120000 },
  { month: "Jun 2025", studies: 118000 },
  { month: "Jul 2025", studies: 125000 },
  { month: "Aug 2025", studies: 130000 },
  { month: "Sep 2025", studies: 135000 },
  { month: "Oct 2025", studies: 140000 }
];

const genderData = [
  { name: "Female", value: 55.4, fill: "#22c55e" },
  { name: "Male", value: 44.2, fill: "#3b82f6" },
  { name: "Non-binary", value: 0.4, fill: "#f59e0b" }
];

const ageData = [
  { name: "21-40", value: 23.9, fill: "#22c55e" },
  { name: "41-65", value: 44.3, fill: "#3b82f6" },
  { name: "65+", value: 28.7, fill: "#eab308" },
  { name: "<21", value: 3.1, fill: "#f97316" }
];

const ethnicityData = [
  { name: "Asian", value: 0.7, fill: "#22c55e" },
  { name: "Black", value: 2.7, fill: "#3b82f6" },
  { name: "Hispanic", value: 31.4, fill: "#eab308" },
  { name: "Other", value: 0.0, fill: "#f97316" },
  { name: "White", value: 65.2, fill: "#a855f7" }
];

const studyTypeData = [
  { name: "Foot", value: 18.4, fill: "#22c55e" },
  { name: "Hand", value: 18.0, fill: "#3b82f6" },
  { name: "Lower Ext.", value: 19.9, fill: "#eab308" },
  { name: "Spine Hip", value: 25.5, fill: "#f97316" },
  { name: "Unspecif.", value: 3.3, fill: "#a855f7" },
  { name: "Upper Ext.", value: 15.0, fill: "#ec4899" }
];

const agreementData = [
  { subject: "Age", mean: 85, variance: 75 },
  { subject: "Study Type", mean: 90, variance: 85 },
  { subject: "Ethnicity", mean: 70, variance: 60 },
  { subject: "Gender", mean: 95, variance: 88 },
  { subject: "Site", mean: 80, variance: 70 }
];

const sensitivityData = [
  { category: "21-40", sensitivity: 92, specificity: 95 },
  { category: "41-65", sensitivity: 87, specificity: 91 },
  { category: "65+", sensitivity: 91, specificity: 94 },
  { category: "<21", sensitivity: 88, specificity: 89 },
  { category: "Asian", sensitivity: 94, specificity: 96 },
  { category: "Black", sensitivity: 88, specificity: 91 },
  { category: "Hispanic", sensitivity: 86, specificity: 90 },
  { category: "Other", sensitivity: 87, specificity: 92 },
  { category: "White", sensitivity: 89, specificity: 93 }
];

const scatterData = [
  { ppv: 86.5, sensitivity: 94.7, category: "top" },
  { ppv: 86.8, sensitivity: 94.5, category: "top" },
  { ppv: 87.2, sensitivity: 94.4, category: "top" },
  { ppv: 87.5, sensitivity: 94.2, category: "top" },
  { ppv: 88.0, sensitivity: 94.0, category: "top" },
  { ppv: 88.5, sensitivity: 93.8, category: "top" },
  { ppv: 89.0, sensitivity: 93.5, category: "high" },
  { ppv: 89.5, sensitivity: 93.2, category: "high" },
  { ppv: 90.0, sensitivity: 92.9, category: "high" },
  { ppv: 90.5, sensitivity: 92.5, category: "high" },
  { ppv: 88.2, sensitivity: 84.5, category: "bottom" },
  { ppv: 88.5, sensitivity: 84.2, category: "bottom" },
  { ppv: 89.0, sensitivity: 84.0, category: "bottom" },
  { ppv: 89.5, sensitivity: 83.7, category: "bottom" }
];

const chartConfig = {
  studies: { label: "Studies", color: "#22c55e" },
  positive: { label: "Positive", color: "#3b82f6" },
  negative: { label: "Negative", color: "#f59e0b" }
};

export default function ContinuousMonitoring() {
  const [selectedCohort, setSelectedCohort] = useState("all-sites");

  // Summary cards data using the new structure
  const summaryCards: SummaryCardData[] = [
    {
      title: "Total Studies",
      value: 1487203,
      changeValue: 12.3,
      icon: "users",
      bgColor: "blue",
      changeLabel: "from last month"
    },
    {
      title: "Ground Truth Positive",
      value: 7,
      changeValue: 0.5,
      icon: "checkCircle",
      bgColor: "green",
      suffix: "%",
      changeLabel: "104,104 positive cases"
    },
    {
      title: "Ground Truth Negative",
      value: 93,
      changeValue: -0.5,
      icon: "alertCircle",
      bgColor: "purple",
      suffix: "%",
      changeLabel: "1,383,099 negative cases"
    },
    {
      title: "Sites Monitored",
      value: 21,
      changeValue: 0,
      icon: "trendingUp",
      bgColor: "orange",
      changeLabel: "All sites selected"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Continuous monitoring</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Gleamer BoneView - All Sites Selected (21)
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Select value={selectedCohort} onValueChange={setSelectedCohort}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sites">All Sites Selected (21)</SelectItem>
              <SelectItem value="site-a">Site A</SelectItem>
              <SelectItem value="site-b">Site B</SelectItem>
              <SelectItem value="site-c">Site C</SelectItem>
            </SelectContent>
          </Select>
          <CustomDateRangePicker />
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Dynamic Summardy Cards */}
      <DynamicSummaryCards cards={summaryCards} />

      <DataDriftDetection />
      <StudiesAndPopulation />
      <PerformanceCharts />
    </div>
  );
}