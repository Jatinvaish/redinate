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
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import {
  Download,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import CustomDateRangePicker from "@/components/custom-date-range-picker";
import { Badge } from "@/components/ui/badge";
import DynamicSummaryCards, { SummaryCardData } from "@/components/dynamicSummaryCard";

const detectionRateData = [
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

const timeToDetectionData = [
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

const falsePositiveRateData = [
  { month: "Nov 2024", aiOn: 4.2, aiOff: 3.8 },
  { month: "Dec 2024", aiOn: 4.1, aiOff: 3.9 },
  { month: "Jan 2025", aiOn: 4.0, aiOff: 3.7 },
  { month: "Feb 2025", aiOn: 3.9, aiOff: 3.8 },
  { month: "Mar 2025", aiOn: 3.8, aiOff: 3.6 },
  { month: "Apr 2025", aiOn: 3.7, aiOff: 3.7 },
  { month: "May 2025", aiOn: 3.6, aiOff: 3.5 },
  { month: "Jun 2025", aiOn: 3.5, aiOff: 3.6 },
  { month: "Jul 2025", aiOn: 3.4, aiOff: 3.4 },
  { month: "Aug 2025", aiOn: 3.3, aiOff: 3.5 },
  { month: "Sep 2025", aiOn: 3.2, aiOff: 3.3 },
  { month: "Oct 2025", aiOn: 3.1, aiOff: 3.4 }
];

const callbacksPerCancerData = [
  { category: "AI On - Site A", callbacks: 3.2, cancerFound: 45 },
  { category: "AI Off - Site A", callbacks: 5.8, cancerFound: 38 },
  { category: "AI On - Site B", callbacks: 3.4, cancerFound: 52 },
  { category: "AI Off - Site B", callbacks: 6.1, cancerFound: 41 },
  { category: "AI On - Site C", callbacks: 3.1, cancerFound: 48 },
  { category: "AI Off - Site C", callbacks: 5.9, cancerFound: 39 },
  { category: "AI On - Site D", callbacks: 3.5, cancerFound: 43 },
  { category: "AI Off - Site D", callbacks: 6.2, cancerFound: 36 }
];

const siteComparisonData = [
  { site: "Site A", aiOn: 94.5, aiOff: 89.2, improvement: 5.3 },
  { site: "Site B", aiOn: 93.8, aiOff: 88.5, improvement: 5.3 },
  { site: "Site C", aiOn: 95.2, aiOff: 90.1, improvement: 5.1 },
  { site: "Site D", aiOn: 92.9, aiOff: 87.8, improvement: 5.1 },
  { site: "Site E", aiOn: 94.1, aiOff: 89.3, improvement: 4.8 }
];

const scatterData = [
  { sensitivity: 94.5, specificity: 96.2, type: "AI On", size: 100 },
  { sensitivity: 89.2, specificity: 93.8, type: "AI Off", size: 100 },
  { sensitivity: 93.8, specificity: 95.8, type: "AI On", size: 100 },
  { sensitivity: 88.5, specificity: 93.2, type: "AI Off", size: 100 },
  { sensitivity: 95.2, specificity: 96.8, type: "AI On", size: 100 },
  { sensitivity: 90.1, specificity: 94.5, type: "AI Off", size: 100 }
];

export default function OnOffAnalysisPage() {
  const [timeRange, setTimeRange] = useState("last-12-months");
  const [selectedSite, setSelectedSite] = useState("all-sites");

  const summaryCards: SummaryCardData[] = [
    {
      title: "Detection Rate Lift",
      value: 5.0,
      changeValue: 85,
      icon: "trendingUp",
      bgColor: "green",
      prefix: "+",
      suffix: "%",
      changeLabel: "AI On: 10.9% vs AI Off: 5.9%"
    },
    {
      title: "Time Reduction",
      value: 16.7,
      changeValue: -68,
      icon: "clock",
      bgColor: "blue",
      prefix: "-",
      suffix: "min",
      changeLabel: "faster detection with AI"
    },
    {
      title: "Callbacks Efficiency",
      value: 3.3,
      changeValue: 0,
      icon: "checkCircle",
      bgColor: "purple",
      suffix: ":1",
      changeLabel: "vs 6.0:1 without AI"
    },
    {
      title: "False Positive Impact",
      value: 0.3,
      changeValue: 0,
      icon: "alertCircle",
      bgColor: "green",
      prefix: "-",
      suffix: "%",
      changeLabel: "Minimal increase in FP rate"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">On/Off Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Comparative analysis of AI-assisted vs standard workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedSite} onValueChange={setSelectedSite}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sites">All Sites</SelectItem>
              <SelectItem value="site-a">Site A</SelectItem>
              <SelectItem value="site-b">Site B</SelectItem>
              <SelectItem value="site-c">Site C</SelectItem>
              <SelectItem value="site-d">Site D</SelectItem>
            </SelectContent>
          </Select>
          <CustomDateRangePicker />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <DynamicSummaryCards cards={summaryCards} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cancer Detection Rate Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">
              Detection rate comparison (%)
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={detectionRateData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 12]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="aiOn"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="AI On"
                />
                <Line
                  type="monotone"
                  dataKey="aiOff"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="AI Off"
                />
              </LineChart>
            </ChartContainer>
            <div className="mt-4 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">10.9%</div>
                <div className="text-xs text-muted-foreground">AI On</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">5.9%</div>
                <div className="text-xs text-muted-foreground">AI Off</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">+85%</div>
                <div className="text-xs text-muted-foreground">Improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time to Detection</CardTitle>
            <p className="text-sm text-muted-foreground">
              Average time in minutes
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={timeToDetectionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 30]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="aiOn"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="AI On"
                />
                <Line
                  type="monotone"
                  dataKey="aiOff"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="AI Off"
                />
              </LineChart>
            </ChartContainer>
            <div className="mt-4 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">7.9 min</div>
                <div className="text-xs text-muted-foreground">AI On</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">24.6 min</div>
                <div className="text-xs text-muted-foreground">AI Off</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">-68%</div>
                <div className="text-xs text-muted-foreground">Faster</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Callbacks per Cancer Found</CardTitle>
          <p className="text-sm text-muted-foreground">
            Lower is better - efficiency metric by site
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[350px] w-full">
            <BarChart data={callbacksPerCancerData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="callbacks" fill="#3b82f6" name="Callbacks Ratio" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancerFound" fill="#22c55e" name="Cancers Found" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Clinical Impact</p>
                <p className="text-sm text-muted-foreground mt-1">
                  AI-assisted workflow shows 3.3 callbacks per cancer found compared to 6.0 without AI, representing a 45% reduction in unnecessary callbacks while maintaining high cancer detection rates.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site-by-Site Performance Comparison</CardTitle>
            <p className="text-sm text-muted-foreground">
              Sensitivity scores (%)
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <BarChart data={siteComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="site" tick={{ fontSize: 12 }} />
                <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="aiOn" fill="#22c55e" name="AI On" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aiOff" fill="#ef4444" name="AI Off" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {siteComparisonData.map((site, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{site.site}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Improvement:</span>
                    <Badge className="bg-green-500">+{site.improvement}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>False Positive Rate Trend</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly false positive rate (%)
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <LineChart data={falsePositiveRateData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="aiOn"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="AI On"
                />
                <Line
                  type="monotone"
                  dataKey="aiOff"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="AI Off"
                />
              </LineChart>
            </ChartContainer>
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/30 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Balanced Performance</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    False positive rates remain comparable between AI On (3.1%) and AI Off (3.4%) workflows, demonstrating that increased detection does not come at the cost of specificity.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Space Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Sensitivity vs Specificity comparison
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px] w-full">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="sensitivity"
                domain={[85, 100]}
                tick={{ fontSize: 12 }}
                label={{ value: "Sensitivity (%)", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="specificity"
                domain={[90, 100]}
                tick={{ fontSize: 12 }}
                label={{ value: "Specificity (%)", angle: -90, position: "insideLeft" }}
              />
              <ZAxis type="number" dataKey="size" range={[100, 400]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Scatter
                name="AI On"
                data={scatterData.filter((d) => d.type === "AI On")}
                fill="#22c55e"
              />
              <Scatter
                name="AI Off"
                data={scatterData.filter((d) => d.type === "AI Off")}
                fill="#ef4444"
              />
            </ScatterChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Findings & Clinical Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 dark:bg-green-950 p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Improved Detection</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 85% increase in cancer detection rate (10.9% vs 5.9%)</li>
                    <li>• Consistent improvement across all sites (4.8-5.3%)</li>
                    <li>• Higher sensitivity maintained with minimal specificity tradeoff</li>
                    <li>• Detection rate improving 0.2-0.3% monthly with AI</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Workflow Efficiency</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 68% reduction in time to detection (7.9 vs 24.6 minutes)</li>
                    <li>• 45% fewer callbacks per cancer found (3.3:1 vs 6.0:1)</li>
                    <li>• Radiologist reading time reduced by average 16.7 minutes</li>
                    <li>• Consistent efficiency gains across all participating sites</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-purple-100 dark:bg-purple-950 p-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Patient Outcomes</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Earlier cancer detection leads to improved treatment options</li>
                    <li>• Reduced patient anxiety from fewer unnecessary callbacks</li>
                    <li>• Faster turnaround time on critical findings</li>
                    <li>• Maintained quality of care with enhanced AI support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-yellow-100 dark:bg-yellow-950 p-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Considerations</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Slight increase in FP rate (0.3%) requires monitoring</li>
                    <li>• Training period needed for optimal radiologist-AI integration</li>
                    <li>• Ongoing validation essential to maintain performance</li>
                    <li>• Site-specific implementation factors affect outcomes</li>
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