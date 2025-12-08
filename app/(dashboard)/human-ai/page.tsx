"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Download, TrendingUp, TrendingDown, Clock, DollarSign, Activity } from "lucide-react";
import CustomDateRangePicker from "@/components/custom-date-range-picker";
import DynamicSummaryCards, { SummaryCardData } from "@/components/dynamicSummaryCard";

const workflowData = [
  { month: "Nov 2024", withAI: 15.8, withoutAI: 20.1 },
  { month: "Dec 2024", withAI: 15.5, withoutAI: 20.0 },
  { month: "Jan 2025", withAI: 15.3, withoutAI: 19.9 },
  { month: "Feb 2025", withAI: 15.0, withoutAI: 19.8 },
  { month: "Mar 2025", withAI: 14.8, withoutAI: 19.7 },
  { month: "Apr 2025", withAI: 14.5, withoutAI: 19.6 },
  { month: "May 2025", withAI: 14.3, withoutAI: 19.5 },
  { month: "Jun 2025", withAI: 14.0, withoutAI: 19.4 },
  { month: "Jul 2025", withAI: 13.8, withoutAI: 19.3 },
  { month: "Aug 2025", withAI: 13.5, withoutAI: 19.2 },
  { month: "Sep 2025", withAI: 13.3, withoutAI: 19.1 },
  { month: "Oct 2025", withAI: 13.0, withoutAI: 19.0 }
];

const agreementData = [
  { month: "Nov 2024", rate: 94.2 },
  { month: "Dec 2024", rate: 94.3 },
  { month: "Jan 2025", rate: 94.5 },
  { month: "Feb 2025", rate: 94.6 },
  { month: "Mar 2025", rate: 94.8 },
  { month: "Apr 2025", rate: 94.9 },
  { month: "May 2025", rate: 95.0 },
  { month: "Jun 2025", rate: 95.1 },
  { month: "Jul 2025", rate: 95.2 },
  { month: "Aug 2025", rate: 95.3 },
  { month: "Sep 2025", rate: 95.4 },
  { month: "Oct 2025", rate: 95.5 }
];

const recallData = [
  { month: "Nov 2024", aiOn: 6.8, aiOff: 8.2 },
  { month: "Dec 2024", aiOn: 6.7, aiOff: 8.1 },
  { month: "Jan 2025", aiOn: 6.6, aiOff: 8.0 },
  { month: "Feb 2025", aiOn: 6.5, aiOff: 7.9 },
  { month: "Mar 2025", aiOn: 6.4, aiOff: 7.8 },
  { month: "Apr 2025", aiOn: 6.3, aiOff: 7.7 },
  { month: "May 2025", aiOn: 6.2, aiOff: 7.6 },
  { month: "Jun 2025", aiOn: 6.1, aiOff: 7.5 },
  { month: "Jul 2025", aiOn: 6.0, aiOff: 7.4 },
  { month: "Aug 2025", aiOn: 5.9, aiOff: 7.3 },
  { month: "Sep 2025", aiOn: 5.8, aiOff: 7.2 },
  { month: "Oct 2025", aiOn: 5.7, aiOff: 7.1 }
];

const cancerDetectionData = [
  { month: "Nov 2024", aiOn: 8.5, aiOff: 5.2 },
  { month: "Dec 2024", aiOn: 8.8, aiOff: 5.4 },
  { month: "Jan 2025", aiOn: 9.1, aiOff: 5.3 },
  { month: "Feb 2025", aiOn: 9.3, aiOff: 5.5 },
  { month: "Mar 2025", aiOn: 9.5, aiOff: 5.4 },
  { month: "Apr 2025", aiOn: 9.7, aiOff: 5.6 },
  { month: "May 2025", aiOn: 9.8, aiOff: 5.5 },
  { month: "Jun 2025", aiOn: 10.1, aiOff: 5.7 },
  { month: "Jul 2025", aiOn: 10.3, aiOff: 5.6 },
  { month: "Aug 2025", aiOn: 10.5, aiOff: 5.8 },
  { month: "Sep 2025", aiOn: 10.7, aiOff: 5.7 },
  { month: "Oct 2025", aiOn: 10.9, aiOff: 5.9 }
];

const turnaroundData = [
  { month: "Nov 2024", aiOn: 12.5, aiOff: 28.3 },
  { month: "Dec 2024", aiOn: 11.8, aiOff: 27.9 },
  { month: "Jan 2025", aiOn: 11.2, aiOff: 27.5 },
  { month: "Feb 2025", aiOn: 10.8, aiOff: 27.2 },
  { month: "Mar 2025", aiOn: 10.3, aiOff: 26.8 },
  { month: "Apr 2025", aiOn: 9.9, aiOff: 26.5 },
  { month: "May 2025", aiOn: 9.5, aiOff: 26.2 },
  { month: "Jun 2025", aiOn: 9.2, aiOff: 25.8 },
  { month: "Jul 2025", aiOn: 8.8, aiOff: 25.5 },
  { month: "Aug 2025", aiOn: 8.5, aiOff: 25.2 },
  { month: "Sep 2025", aiOn: 8.2, aiOff: 24.9 },
  { month: "Oct 2025", aiOn: 7.9, aiOff: 24.6 }
];


export default function HumanAIDashboard() {
  const summaryCards: SummaryCardData[] = [
    {
      title: "Time Saved",
      value: 6.1,
      changeValue: -31.9,
      icon: "trendingUp",
      bgColor: "green",
      prefix: "-",
      suffix: " min",
      changeLabel: "reduction"
    },
    {
      title: "RAD-AI Agreement",
      value: 95.5,
      changeValue: 1.3,
      icon: "checkCircle",
      bgColor: "blue",
      suffix: "%",
      changeLabel: "improvement"
    },
    {
      title: "Turnaround Time",
      value: 7.9,
      changeValue: -67.9,
      icon: "clock",
      bgColor: "purple",
      suffix: " hrs",
      changeLabel: "faster"
    },
    {
      title: "ROI",
      value: 222,
      changeValue: 53,
      icon: "dollarSign",
      bgColor: "orange",
      suffix: "%",
      changeLabel: "growth"
    }
  ];
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Human-AI Analysis</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            Performance metrics and workflow impact
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <CustomDateRangePicker />
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}

      <DynamicSummaryCards cards={summaryCards} />

      {/* Time Saved Analysis */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg">Time Saved: AI On vs AI Off</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Average reading time comparison (minutes)
              </p>
            </div>
            <Badge className="bg-green-500 w-fit">-6.1 min saved per study</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={workflowData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  label={{
                    value: "Minutes",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 10 }
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line
                  type="monotone"
                  dataKey="withAI"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="AI On"
                />
                <Line
                  type="monotone"
                  dataKey="withoutAI"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="AI Off"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-4">
            <div className="rounded-lg border p-2 sm:p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">AI ON</p>
              </div>
              <p className="text-lg sm:text-xl font-bold">13.0 min</p>
            </div>
            <div className="rounded-lg border p-2 sm:p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">AI OFF</p>
              </div>
              <p className="text-lg sm:text-xl font-bold">19.0 min</p>
            </div>
            <div className="rounded-lg border p-2 sm:p-3 col-span-2 sm:col-span-1">
              <p className="text-xs text-muted-foreground mb-1">TIME SAVED</p>
              <p className="text-lg sm:text-xl font-bold text-green-600">-6.0 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Turnaround Time Comparison */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg">Turnaround Time Impact</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Time to report completion (hours)
              </p>
            </div>
            <Badge className="bg-purple-500 w-fit">-67.9% reduction</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnaroundData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  label={{
                    value: "Hours",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 10 }
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line
                  type="monotone"
                  dataKey="aiOn"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="AI On"
                />
                <Line
                  type="monotone"
                  dataKey="aiOff"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="AI Off"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-4">
            <div className="rounded-lg border p-2 sm:p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">AI ON</p>
              </div>
              <p className="text-lg sm:text-xl font-bold">7.9 hrs</p>
            </div>
            <div className="rounded-lg border p-2 sm:p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">AI OFF</p>
              </div>
              <p className="text-lg sm:text-xl font-bold">24.6 hrs</p>
            </div>
            <div className="rounded-lg border p-2 sm:p-3 col-span-2 sm:col-span-1">
              <p className="text-xs text-muted-foreground mb-1">REDUCTION</p>
              <p className="text-lg sm:text-xl font-bold text-green-600">-16.7 hrs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recall Rate & Cancer Detection */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">Recall Rate Comparison</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Lower is better (%)
                </p>
              </div>
              <Badge className="bg-green-500 w-fit">-1.4% reduction</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recallData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9 }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Recall Rate %",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 10 }
                    }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line
                    type="monotone"
                    dataKey="aiOn"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="AI On"
                  />
                  <Line
                    type="monotone"
                    dataKey="aiOff"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="AI Off"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              <div className="rounded-lg border p-2 sm:p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">AI ON</p>
                </div>
                <p className="text-lg sm:text-xl font-bold">5.7%</p>
              </div>
              <div className="rounded-lg border p-2 sm:p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">AI OFF</p>
                </div>
                <p className="text-lg sm:text-xl font-bold">7.1%</p>
              </div>
              <div className="rounded-lg border p-2 sm:p-3">
                <p className="text-xs text-muted-foreground mb-1">DIFFERENCE</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">-1.4%</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/30 p-3">
              <p className="text-xs sm:text-sm text-muted-foreground">
                AI-assisted workflow shows 19.7% reduction in recall rate, improving patient experience and reducing unnecessary follow-up procedures.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">Cancer Detection Rate</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Higher is better (%)
                </p>
              </div>
              <Badge className="bg-blue-500 w-fit">+5.0% increase</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cancerDetectionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9 }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    domain={[0, 12]}
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Detection Rate %",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 10 }
                    }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line
                    type="monotone"
                    dataKey="aiOn"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="AI On"
                  />
                  <Line
                    type="monotone"
                    dataKey="aiOff"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="AI Off"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              <div className="rounded-lg border p-2 sm:p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">AI ON</p>
                </div>
                <p className="text-lg sm:text-xl font-bold">10.9%</p>
              </div>
              <div className="rounded-lg border p-2 sm:p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">AI OFF</p>
                </div>
                <p className="text-lg sm:text-xl font-bold">5.9%</p>
              </div>
              <div className="rounded-lg border p-2 sm:p-3">
                <p className="text-xs text-muted-foreground mb-1">INCREASE</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">+5.0%</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
              <p className="text-xs sm:text-sm text-muted-foreground">
                AI assistance demonstrates 84.7% improvement in cancer detection rate, identifying more cases earlier for better patient outcomes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RAD-AI Agreement & Additional Metrics */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">RAD-AI Agreement Rate</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Concordance between radiologist and AI
                </p>
              </div>
              <Badge variant="outline" className="w-fit">428 overrides</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={agreementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9 }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    domain={[93, 96]}
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Agreement %",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 10 }
                    }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Agreement Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4">
              <div className="rounded-lg border p-2 sm:p-3">
                <p className="text-xs text-muted-foreground mb-1">CURRENT RATE</p>
                <p className="text-lg sm:text-xl font-bold">95.5%</p>
              </div>
              <div className="rounded-lg border p-2 sm:p-3">
                <p className="text-xs text-muted-foreground mb-1">IMPROVEMENT</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">+1.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Throughput & ROI</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Studies per day and return on investment
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-orange-600" />
                    <p className="text-sm font-medium">Throughput</p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold">118</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Studies per radiologist per day
                </p>
                <p className="text-xs text-green-600 mt-1">+38.8% increase from baseline</p>
              </div>

              <div className="rounded-lg border p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium">Return on Investment</p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold">222%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Cumulative ROI percentage
                </p>
                <p className="text-xs text-green-600 mt-1">+53% growth year over year</p>
              </div>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
                <p className="text-xs sm:text-sm font-medium mb-1">Cost Savings</p>
                <p className="text-xs text-muted-foreground">
                  Increased efficiency and earlier detection contribute to significant cost savings across the healthcare system, with reduced recalls and improved patient outcomes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Key Insights & Clinical Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 dark:bg-green-950 p-2 flex-shrink-0">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Workflow Efficiency</h3>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• 6.1 minutes saved per study (31.9% reduction)</li>
                    <li>• 67.9% faster turnaround time (7.9 vs 24.6 hours)</li>
                    <li>• 38.8% increase in daily throughput</li>
                    <li>• Consistent improvements across all time periods</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2 flex-shrink-0">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Clinical Outcomes</h3>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• 84.7% improvement in cancer detection (10.9% vs 5.9%)</li>
                    <li>• 19.7% reduction in recall rate (5.7% vs 7.1%)</li>
                    <li>• 95.5% radiologist-AI agreement rate</li>
                    <li>• Earlier detection for better treatment options</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-purple-100 dark:bg-purple-950 p-2 flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Patient Experience</h3>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• Reduced anxiety from fewer unnecessary recalls</li>
                    <li>• Faster diagnosis and treatment initiation</li>
                    <li>• More cancers detected at earlier, treatable stages</li>
                    <li>• Improved overall satisfaction with care</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-orange-100 dark:bg-orange-950 p-2 flex-shrink-0">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Financial Impact</h3>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• 222% ROI with 53% year-over-year growth</li>
                    <li>• Reduced costs from fewer unnecessary procedures</li>
                    <li>• Increased capacity without additional resources</li>
                    <li>• Better reimbursement from improved outcomes</li>
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