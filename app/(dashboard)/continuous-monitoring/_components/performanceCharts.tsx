import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";
import { CheckCircle2, AlertTriangle } from "lucide-react";

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

export default function PerformanceCharts() {
  return (
    <>
      {/* Agreement Rate and Classification Matrix */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>Agreement Rate Across Cohorts</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Mean vs Variance</p>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Mean</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
                  <span>Variance</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={agreementData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Mean" dataKey="mean" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Variance" dataKey="variance" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Strength</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Gender shows exceptional consistency with the highest mean agreement (93%) and minimal variance (3%).
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950/30 p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Potential Improvement</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Study Type exhibits the lowest mean agreement (69%) and highest variance (13%).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Classification Matrix</CardTitle>
            <p className="text-sm text-muted-foreground">Gleamer BoneView Performance</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3 sm:p-4 overflow-x-auto">
                <div className="min-w-[300px]">
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
                    <div className="col-span-1"></div>
                    <div className="col-span-1 font-semibold">Positive</div>
                    <div className="col-span-1 font-semibold">Negative</div>
                    <div className="col-span-1 font-semibold">Total</div>

                    <div className="col-span-1 font-semibold">Positive</div>
                    <div className="col-span-1 rounded bg-blue-100 dark:bg-blue-950 p-2">
                      <div className="text-base sm:text-xl font-bold">69,102</div>
                    </div>
                    <div className="col-span-1 rounded bg-gray-100 dark:bg-gray-800 p-2">
                      <div className="text-base sm:text-xl font-bold">9,400</div>
                    </div>
                    <div className="col-span-1 rounded bg-gray-50 dark:bg-gray-900 p-2">
                      <div className="text-base sm:text-xl font-bold">77,902</div>
                    </div>

                    <div className="col-span-1 font-semibold">Negative</div>
                    <div className="col-span-1 rounded bg-gray-100 dark:bg-gray-800 p-2">
                      <div className="text-base sm:text-xl font-bold">62,170</div>
                    </div>
                    <div className="col-span-1 rounded bg-cyan-100 dark:bg-cyan-950 p-2">
                      <div className="text-base sm:text-xl font-bold text-cyan-600">1,086,836</div>
                    </div>
                    <div className="col-span-1 rounded bg-gray-50 dark:bg-gray-900 p-2">
                      <div className="text-base sm:text-xl font-bold">1,070,300</div>
                    </div>

                    <div className="col-span-1 font-semibold">Total</div>
                    <div className="col-span-1 rounded bg-gray-50 dark:bg-gray-900 p-2">
                      <div className="text-base sm:text-xl font-bold">131,302</div>
                    </div>
                    <div className="col-span-1 rounded bg-gray-50 dark:bg-gray-900 p-2">
                      <div className="text-base sm:text-xl font-bold">1,010,400</div>
                    </div>
                    <div className="col-span-1 rounded bg-gray-50 dark:bg-gray-900 p-2">
                      <div className="text-base sm:text-xl font-bold">1,147,700</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-lg border p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground">Sensitivity (Recall)</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">92.8%</p>
                </div>
                <div className="rounded-lg border p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground">Specificity</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">94.5%</p>
                </div>
                <div className="rounded-lg border p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground">Precision (PPV)</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600">88.7%</p>
                </div>
                <div className="rounded-lg border p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground">NPV</p>
                  <p className="text-xl sm:text-2xl font-bold text-cyan-600">96.1%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Comparison and Top/Bottom Sites */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison Over Cohorts</CardTitle>
            <p className="text-sm text-muted-foreground">Sensitivity & Specificity by Demographics</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px] sm:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sensitivityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="category" width={70} tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="sensitivity" fill="#22c55e" name="Sensitivity" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="specificity" fill="#3b82f6" name="Specificity" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle>Top & Bottom Performing Sites</CardTitle>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">View Table</Button>
            </div>
            <p className="text-sm text-muted-foreground">Positive Predictive Value vs Sensitivity</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px] sm:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ppv" domain={[86, 91]} tick={{ fontSize: 11 }} label={{ value: "PPV (%)", position: "insideBottom", offset: -5, style: { fontSize: 11 } }} />
                  <YAxis domain={[83, 95]} tick={{ fontSize: 11 }} label={{ value: "Sensitivity (%)", angle: -90, position: "insideLeft", style: { fontSize: 11 } }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    data={scatterData.filter(d => d.category === "top")}
                    dataKey="sensitivity"
                    stroke="#3b82f6"
                    strokeWidth={0}
                    dot={{ fill: "#3b82f6", r: 5 }}
                    name="Top (90th)"
                  />
                  <Line
                    type="monotone"
                    data={scatterData.filter(d => d.category === "bottom")}
                    dataKey="sensitivity"
                    stroke="#ef4444"
                    strokeWidth={0}
                    dot={{ fill: "#ef4444", r: 5 }}
                    name="Low (50th)"
                  />
                  <Line
                    type="monotone"
                    data={scatterData.filter(d => d.category === "high")}
                    dataKey="sensitivity"
                    stroke="#22c55e"
                    strokeWidth={0}
                    dot={{ fill: "#22c55e", r: 5 }}
                    name="High (90th)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}