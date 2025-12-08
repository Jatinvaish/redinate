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
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line
} from "recharts";
import { Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

const sensitivityComparisonData = [
  { category: "21-40", cohortA: 92, cohortB: 87 },
  { category: "41-65", cohortA: 87, cohortB: 91 },
  { category: "65+", cohortA: 91, cohortB: 94 },
  { category: "<21", cohortA: 88, cohortB: 89 },
  { category: "Asian", cohortA: 94, cohortB: 96 },
  { category: "Black", cohortA: 88, cohortB: 91 },
  { category: "Hispanic", cohortA: 86, cohortB: 90 },
  { category: "Other", cohortA: 87, cohortB: 92 },
  { category: "White", cohortA: 89, cohortB: 93 },
  { category: "Female", cohortA: 91, cohortB: 97 },
  { category: "Male", cohortA: 84, cohortB: 86 },
  { category: "Non-binary", cohortA: 89, cohortB: 92 },
  { category: "Foot", cohortA: 89, cohortB: 92 },
  { category: "Hand", cohortA: 92, cohortB: 92 },
  { category: "Lower Ext.", cohortA: 77, cohortB: null },
  { category: "Spine Hip.", cohortA: 85, cohortB: 94 },
  { category: "Unspecif.", cohortA: 92, cohortB: 95 },
  { category: "Upper Ext.", cohortA: 87, cohortB: 97 }
];

const specificityComparisonData = [
  { category: "21-40", cohortA: 95, cohortB: 90 },
  { category: "41-65", cohortA: 91, cohortB: 94 },
  { category: "65+", cohortA: 94, cohortB: 91 },
  { category: "<21", cohortA: 89, cohortB: 91 },
  { category: "Asian", cohortA: 96, cohortB: 94 },
  { category: "Black", cohortA: 91, cohortB: 93 },
  { category: "Hispanic", cohortA: 90, cohortB: 97 },
  { category: "Other", cohortA: 92, cohortB: 97 },
  { category: "White", cohortA: 93, cohortB: 100 },
  { category: "Female", cohortA: 97, cohortB: 97 },
  { category: "Male", cohortA: 86, cohortB: 97 },
  { category: "Non-binary", cohortA: 92, cohortB: 100 },
  { category: "Foot", cohortA: 92, cohortB: 92 },
  { category: "Hand", cohortA: 92, cohortB: 92 },
  { category: "Lower Ext.", cohortA: null, cohortB: 98 },
  { category: "Spine Hip.", cohortA: 94, cohortB: 94 },
  { category: "Unspecif.", cohortA: 95, cohortB: 89 },
  { category: "Upper Ext.", cohortA: 97, cohortB: 97 }
];

const trendData = [
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

export default function VersionCompatitor() {
  const [cohortA, setCohortA] = useState("all-sites");
  const [cohortB, setCohortB] = useState("selected-cohort");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Version Compatitor</h1>
          <p className="text-muted-foreground mt-2">
            Gleamer BoneView - Performance Comparison
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={cohortA} onValueChange={setCohortA}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sites">All Sites (21)</SelectItem>
              <SelectItem value="site-a">Site A</SelectItem>
              <SelectItem value="site-b">Site B</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-muted-foreground">vs</span>
          <Select value={cohortB} onValueChange={setCohortB}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected-cohort">Selected Cohort</SelectItem>
              <SelectItem value="site-c">Site C</SelectItem>
              <SelectItem value="site-d">Site D</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Agreement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">All Studies</span>
                  <Badge variant="outline">60%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">63.0%</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Above Baseline</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Selected Cohort</span>
                  <Badge variant="outline">60%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">64.0%</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Above Baseline</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sensitivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">All Studies</span>
                  <Badge>94.23%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-green-600">Above Baseline</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Selected Cohort</span>
                  <Badge>94.48%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-green-600">Above Baseline</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Specificity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">All Studies</span>
                  <Badge>94.23%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-green-600">Above Baseline</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Selected Cohort</span>
                  <Badge>97.3%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-green-600">Above Baseline</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Performance Comparison Over Cohorts</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Age</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>Ethnicity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
                <span>Gender</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500" />
                <span>Study Type</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Sensitivity</p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px] w-full">
            <BarChart data={sensitivityComparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="category" width={100} tick={{ fontSize: 11 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="cohortA" fill="#3b82f6" name="All Studies" radius={[0, 4, 4, 0]} />
              <Bar dataKey="cohortB" fill="#22c55e" name="Selected Cohort" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Comparison Over Cohorts</CardTitle>
          <p className="text-sm text-muted-foreground">Specificity</p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px] w-full">
            <BarChart data={specificityComparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="category" width={100} tick={{ fontSize: 11 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="cohortA" fill="#3b82f6" name="All Studies" radius={[0, 4, 4, 0]} />
              <Bar dataKey="cohortB" fill="#22c55e" name="Selected Cohort" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Agreement Rate Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Last 12 Months</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[58, 66]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
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
            <CardTitle className="text-base">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="font-medium text-sm">Performance Gap</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Selected cohort shows 1.0% higher agreement rate compared to all studies baseline
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <p className="font-medium text-sm">Sensitivity Variance</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Greatest difference observed in Upper Extremity category with 10% gap
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <p className="font-medium text-sm">Specificity Analysis</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Selected cohort achieves 3.07% higher specificity across all categories
              </p>
            </div>
    
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <p className="font-medium text-sm">Trend Direction</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Both cohorts show consistent upward trend over the 12-month period
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}