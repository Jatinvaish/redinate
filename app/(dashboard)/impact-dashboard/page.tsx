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
  CartesianGrid
} from "recharts";
import { Download, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import CustomDateRangePicker from "@/components/custom-date-range-picker";
import DynamicSummaryCards, { SummaryCardData } from "@/components/dynamicSummaryCard";

const agreementRateData = [
  { month: "Nov 2024", allStudies: 60, selectedCohort: 62, baseline: 60 },
  { month: "Dec 2024", allStudies: 61, selectedCohort: 63, baseline: 60 },
  { month: "Jan 2025", allStudies: 61.5, selectedCohort: 64, baseline: 60 },
  { month: "Feb 2025", allStudies: 62, selectedCohort: 64.5, baseline: 60 },
  { month: "Mar 2025", allStudies: 62, selectedCohort: 65, baseline: 60 },
  { month: "Apr 2025", allStudies: 62.5, selectedCohort: 65, baseline: 60 },
  { month: "May 2025", allStudies: 63, selectedCohort: 64.5, baseline: 60 },
  { month: "Jun 2025", allStudies: 63, selectedCohort: 64, baseline: 60 },
  { month: "Jul 2025", allStudies: 63.5, selectedCohort: 64, baseline: 60 },
  { month: "Aug 2025", allStudies: 64, selectedCohort: 64.5, baseline: 60 },
  { month: "Sep 2025", allStudies: 64, selectedCohort: 65, baseline: 60 },
  { month: "Oct 2025", allStudies: 64.5, selectedCohort: 65, baseline: 60 }
];

const sensitivityTrendData = [
  { month: "Nov 2024", allStudies: 61, selectedCohort: 62, baseline: 60 },
  { month: "Dec 2024", allStudies: 61.5, selectedCohort: 62.5, baseline: 60 },
  { month: "Jan 2025", allStudies: 62, selectedCohort: 63, baseline: 60 },
  { month: "Feb 2025", allStudies: 62.5, selectedCohort: 63.5, baseline: 60 },
  { month: "Mar 2025", allStudies: 63, selectedCohort: 64, baseline: 60 },
  { month: "Apr 2025", allStudies: 63, selectedCohort: 64, baseline: 60 },
  { month: "May 2025", allStudies: 63.5, selectedCohort: 64.5, baseline: 60 },
  { month: "Jun 2025", allStudies: 64, selectedCohort: 65, baseline: 60 },
  { month: "Jul 2025", allStudies: 64, selectedCohort: 65, baseline: 60 },
  { month: "Aug 2025", allStudies: 64.5, selectedCohort: 65.5, baseline: 60 },
  { month: "Sep 2025", allStudies: 65, selectedCohort: 66, baseline: 60 },
  { month: "Oct 2025", allStudies: 65, selectedCohort: 66, baseline: 60 }
];

const specificityTrendData = [
  { month: "Nov 2024", allStudies: 62, selectedCohort: 64, baseline: 60 },
  { month: "Dec 2024", allStudies: 63, selectedCohort: 65, baseline: 60 },
  { month: "Jan 2025", allStudies: 63.5, selectedCohort: 65.5, baseline: 60 },
  { month: "Feb 2025", allStudies: 64, selectedCohort: 66, baseline: 60 },
  { month: "Mar 2025", allStudies: 64.5, selectedCohort: 66.5, baseline: 60 },
  { month: "Apr 2025", allStudies: 65, selectedCohort: 67, baseline: 60 },
  { month: "May 2025", allStudies: 65, selectedCohort: 67, baseline: 60 },
  { month: "Jun 2025", allStudies: 65.5, selectedCohort: 67.5, baseline: 60 },
  { month: "Jul 2025", allStudies: 66, selectedCohort: 68, baseline: 60 },
  { month: "Aug 2025", allStudies: 66, selectedCohort: 68, baseline: 60 },
  { month: "Sep 2025", allStudies: 66.5, selectedCohort: 68.5, baseline: 60 },
  { month: "Oct 2025", allStudies: 67, selectedCohort: 69, baseline: 60 }
];

const ppvTrendData = [
  { month: "Nov 2024", baseline: 70, allStudies: 72, selectedCohort: 74 },
  { month: "Dec 2024", baseline: 70, allStudies: 73, selectedCohort: 75 },
  { month: "Jan 2025", baseline: 70, allStudies: 73.5, selectedCohort: 76 },
  { month: "Feb 2025", baseline: 70, allStudies: 74, selectedCohort: 76.5 },
  { month: "Mar 2025", baseline: 70, allStudies: 74.5, selectedCohort: 77 },
  { month: "Apr 2025", baseline: 70, allStudies: 75, selectedCohort: 77.5 },
  { month: "May 2025", baseline: 70, allStudies: 75.5, selectedCohort: 78 },
  { month: "Jun 2025", baseline: 70, allStudies: 76, selectedCohort: 78.5 },
  { month: "Jul 2025", baseline: 70, allStudies: 76.5, selectedCohort: 79 },
  { month: "Aug 2025", baseline: 70, allStudies: 77, selectedCohort: 79.5 },
  { month: "Sep 2025", baseline: 70, allStudies: 77.5, selectedCohort: 80 },
  { month: "Oct 2025", baseline: 70, allStudies: 78, selectedCohort: 80.5 }
];

const npvTrendData = [
  { month: "Nov 2024", baseline: 97, allStudies: 98, selectedCohort: 98.5 },
  { month: "Dec 2024", baseline: 97, allStudies: 98.2, selectedCohort: 98.7 },
  { month: "Jan 2025", baseline: 97, allStudies: 98.3, selectedCohort: 98.8 },
  { month: "Feb 2025", baseline: 97, allStudies: 98.4, selectedCohort: 98.9 },
  { month: "Mar 2025", baseline: 97, allStudies: 98.5, selectedCohort: 99.0 },
  { month: "Apr 2025", baseline: 97, allStudies: 98.6, selectedCohort: 99.1 },
  { month: "May 2025", baseline: 97, allStudies: 98.7, selectedCohort: 99.2 },
  { month: "Jun 2025", baseline: 97, allStudies: 98.8, selectedCohort: 99.3 },
  { month: "Jul 2025", baseline: 97, allStudies: 98.9, selectedCohort: 99.4 },
  { month: "Aug 2025", baseline: 97, allStudies: 99.0, selectedCohort: 99.5 },
  { month: "Sep 2025", baseline: 97, allStudies: 99.1, selectedCohort: 99.6 },
  { month: "Oct 2025", baseline: 97, allStudies: 99.2, selectedCohort: 99.7 }
];

export default function ImpactDashboard() {

  const summaryCards: SummaryCardData[] = [
    {
      title: "Agreement Rate",
      value: 64.5,
      changeValue: 4.5,
      icon: "trendingUp",
      bgColor: "green",
      suffix: "%",
      changeLabel: "vs baseline"
    },
    {
      title: "Sensitivity",
      value: 65,
      changeValue: 5.0,
      icon: "checkCircle",
      bgColor: "blue",
      suffix: "%",
      changeLabel: "vs baseline"
    },
    {
      title: "Specificity",
      value: 67,
      changeValue: 7.0,
      icon: "alertCircle",
      bgColor: "purple",
      suffix: "%",
      changeLabel: "vs baseline"
    },
    {
      title: "PPV",
      value: 78,
      changeValue: 8.0,
      icon: "checkCircle",
      bgColor: "orange",
      suffix: "%",
      changeLabel: "vs baseline"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Impact</h1>
          <p className="text-muted-foreground mt-2">
            Performance metrics and trends analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CustomDateRangePicker />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <DynamicSummaryCards cards={summaryCards} />

      <Card>
        <CardHeader>
          <CardTitle>Agreement Rate Trend</CardTitle>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-500" />
              <span>All Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Selected Cohort</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-gray-500 bg-transparent" />
              <span>Baseline</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <LineChart data={agreementRateData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[58, 66]} tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="allStudies"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
                name="All Studies"
              />
              <Line
                type="monotone"
                dataKey="selectedCohort"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="Selected Cohort"
              />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="#6b7280"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Baseline"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sensitivity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={sensitivityTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[58, 68]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="allStudies"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  name="All Studies"
                />
                <Line
                  type="monotone"
                  dataKey="selectedCohort"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  name="Selected Cohort"
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Baseline"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specificity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={specificityTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[58, 70]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="allStudies"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  name="All Studies"
                />
                <Line
                  type="monotone"
                  dataKey="selectedCohort"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  name="Selected Cohort"
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Baseline"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Positive Predictive Value Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={ppvTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[68, 82]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Baseline"
                />
                <Line
                  type="monotone"
                  dataKey="allStudies"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  name="All Studies"
                />
                <Line
                  type="monotone"
                  dataKey="selectedCohort"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  name="Selected Cohort"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Negative Predictive Value Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={npvTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[96, 100]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Baseline"
                />
                <Line
                  type="monotone"
                  dataKey="allStudies"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  name="All Studies"
                />
                <Line
                  type="monotone"
                  dataKey="selectedCohort"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  name="Selected Cohort"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 dark:bg-green-950 p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Consistent Improvement</h3>
                  <p className="text-sm text-muted-foreground">
                    All metrics show positive trends over the 12-month period, with the selected cohort consistently outperforming the baseline across all categories. The agreement rate has improved by 4.5 percentage points, indicating enhanced model reliability.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">High Predictive Values</h3>
                  <p className="text-sm text-muted-foreground">
                    The NPV reaching 99.7% demonstrates excellent performance in ruling out conditions, while the PPV of 80.5% shows strong positive prediction capability. This balanced performance is crucial for clinical decision support.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-purple-100 dark:bg-purple-950 p-2">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Cohort Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    The selected cohort demonstrates superior performance compared to all studies, suggesting that targeted implementation or specific patient populations may yield optimal results. This insight can guide deployment strategies.
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