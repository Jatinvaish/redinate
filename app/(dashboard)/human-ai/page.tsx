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
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { Download, TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";
import CustomDateRangePicker from "@/components/custom-date-range-picker";

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
  { month: "Nov 2024", rate: 8.2 },
  { month: "Dec 2024", rate: 8.1 },
  { month: "Jan 2025", rate: 8.0 },
  { month: "Feb 2025", rate: 7.9 },
  { month: "Mar 2025", rate: 7.8 },
  { month: "Apr 2025", rate: 7.7 },
  { month: "May 2025", rate: 7.6 },
  { month: "Jun 2025", rate: 7.5 },
  { month: "Jul 2025", rate: 7.4 },
  { month: "Aug 2025", rate: 7.3 },
  { month: "Sep 2025", rate: 7.2 },
  { month: "Oct 2025", rate: 7.1 }
];

const detectionData = [
  { month: "Nov 2024", rate: 6.8 },
  { month: "Dec 2024", rate: 6.9 },
  { month: "Jan 2025", rate: 7.0 },
  { month: "Feb 2025", rate: 7.1 },
  { month: "Mar 2025", rate: 7.2 },
  { month: "Apr 2025", rate: 7.3 },
  { month: "May 2025", rate: 7.4 },
  { month: "Jun 2025", rate: 7.5 },
  { month: "Jul 2025", rate: 7.6 },
  { month: "Aug 2025", rate: 7.7 },
  { month: "Sep 2025", rate: 7.8 },
  { month: "Oct 2025", rate: 7.9 }
];

const turnaroundData = [
  { month: "Nov 2024", time: 48 },
  { month: "Dec 2024", time: 46 },
  { month: "Jan 2025", time: 44 },
  { month: "Feb 2025", time: 42 },
  { month: "Mar 2025", time: 40 },
  { month: "Apr 2025", time: 38 },
  { month: "May 2025", time: 36 },
  { month: "Jun 2025", time: 34 },
  { month: "Jul 2025", time: 32 },
  { month: "Aug 2025", time: 30 },
  { month: "Sep 2025", time: 28 },
  { month: "Oct 2025", time: 26 }
];

const throughputData = [
  { month: "Nov 2024", studies: 85 },
  { month: "Dec 2024", studies: 88 },
  { month: "Jan 2025", studies: 91 },
  { month: "Feb 2025", studies: 94 },
  { month: "Mar 2025", studies: 97 },
  { month: "Apr 2025", studies: 100 },
  { month: "May 2025", studies: 103 },
  { month: "Jun 2025", studies: 106 },
  { month: "Jul 2025", studies: 109 },
  { month: "Aug 2025", studies: 112 },
  { month: "Sep 2025", studies: 115 },
  { month: "Oct 2025", studies: 118 }
];

const roiData = [
  { month: "Nov 2024", roi: 145 },
  { month: "Dec 2024", roi: 152 },
  { month: "Jan 2025", roi: 159 },
  { month: "Feb 2025", roi: 166 },
  { month: "Mar 2025", roi: 173 },
  { month: "Apr 2025", roi: 180 },
  { month: "May 2025", roi: 187 },
  { month: "Jun 2025", roi: 194 },
  { month: "Jul 2025", roi: 201 },
  { month: "Aug 2025", roi: 208 },
  { month: "Sep 2025", roi: 215 },
  { month: "Oct 2025", roi: 222 }
];

export default function HumanAIDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
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
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Time Saved</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">-4.3 min</p>
                <p className="text-xs text-green-600 mt-1">-21% reduction</p>
              </div>
              <div className="rounded-full bg-green-100 dark:bg-green-950 p-3">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">RAD-AI Agreement</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">94.2%</p>
                <p className="text-xs text-green-600 mt-1">428 overrides</p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Turnaround Time</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">26 hrs</p>
                <p className="text-xs text-green-600 mt-1">-46% faster</p>
              </div>
              <div className="rounded-full bg-purple-100 dark:bg-purple-950 p-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">ROI</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">222%</p>
                <p className="text-xs text-green-600 mt-1">+53% growth</p>
              </div>
              <div className="rounded-full bg-orange-100 dark:bg-orange-950 p-3">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Workflow & Agreement Section */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">Workflow & Agreement</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Turnaround & concordance</p>
              </div>
              <Badge className="bg-green-500 w-fit">-4.3 min saved</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workflowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: "Minutes", angle: -90, position: "insideLeft", style: { fontSize: 11 } }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="withAI"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                    name="With AI"
                  />
                  <Line
                    type="monotone"
                    dataKey="withoutAI"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={false}
                    name="Without AI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-xs text-muted-foreground">WITH AI</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold">15.8 min</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <p className="text-xs text-muted-foreground">WITHOUT AI</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold">20.1 min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">RAD-AI Agreement</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Human-AI analysis</p>
              </div>
              <Badge variant="outline" className="w-fit">428 overrides</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={agreementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                  <YAxis domain={[93, 96]} tick={{ fontSize: 11 }} label={{ value: "Agreement %", angle: -90, position: "insideLeft", style: { fontSize: 11 } }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Agreement Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground mb-1">RAD-AI AGREEMENT</p>
                <p className="text-xl sm:text-2xl font-bold">94.2%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground mb-1">ENHANCED DETECTION</p>
                <p className="text-xl sm:text-2xl font-bold">6.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Downstream Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Downstream Impact</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">Clinical outcomes</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <div className="rounded-lg border p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">RECALL RATE</p>
                <p className="text-2xl sm:text-3xl font-bold">8.2%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-green-600">Decreasing</p>
                </div>
              </div>
              <ChartContainer config={{}} className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={recallData}>
                    <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">AVG LENGTH OF STAY</p>
                <p className="text-2xl sm:text-3xl font-bold">2.3 days</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-green-600">Stable</p>
                </div>
              </div>
              <div className="h-[120px] w-full rounded-lg bg-muted flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Stable trend</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">ENHANCED DETECTION</p>
                <p className="text-2xl sm:text-3xl font-bold">6.8%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-green-600">Increasing</p>
                </div>
              </div>
              <ChartContainer config={{}} className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detectionData}>
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New KPIs Section */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Turnaround Time</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">Report completion time</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnaroundData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 10 }} label={{ value: "Hours", angle: -90, position: "insideLeft", style: { fontSize: 10 } }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    name="Turnaround (hrs)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Current</p>
                <p className="text-lg font-bold text-purple-600">26 hrs</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">-46% improvement</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Throughput</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">Studies per radiologist per day</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={throughputData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 10 }} label={{ value: "Studies/Day", angle: -90, position: "insideLeft", style: { fontSize: 10 } }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="studies"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    name="Throughput"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Current</p>
                <p className="text-lg font-bold text-orange-600">118 studies</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+39% increase</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Return on Investment</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">Cumulative ROI percentage</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 10 }} label={{ value: "ROI %", angle: -90, position: "insideLeft", style: { fontSize: 10 } }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="roi"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    name="ROI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-3 rounded-lg bg-green-50 dark:bg-green-950/30 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Current</p>
                <p className="text-lg font-bold text-green-600">222%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+53% growth YoY</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
