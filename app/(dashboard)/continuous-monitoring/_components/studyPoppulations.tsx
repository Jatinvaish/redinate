import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  ResponsiveContainer
} from "recharts";

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

const chartConfig = {
  studies: { label: "Studies", color: "#22c55e" }
};

function PieChartCard({ title, data, centerLabel }: { title: string; data: any[]; centerLabel: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-1 items-center justify-center">
          <ChartContainer config={{}} className="mx-auto aspect-square max-h-[180px] sm:max-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={45} strokeWidth={5}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-lg font-bold">
                              {centerLabel}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="grid gap-2">
          {data.filter(item => item.value > 0).map((item, idx) => (
            <div key={idx} className="bg-muted flex items-center justify-between rounded-md p-2 sm:p-3">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="text-xs sm:text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudiesAndPopulation() {
  return (
    <>
      {/* Studies Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Studies Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studiesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="studies"
                  stroke="var(--color-studies)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Patient Population */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Patient Population</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PieChartCard title="Gender" data={genderData} centerLabel="Gender" />
          <PieChartCard title="Age" data={ageData} centerLabel="Age" />
          <PieChartCard title="Ethnicity" data={ethnicityData.filter(d => d.value > 0)} centerLabel="Ethnicity" />
          <PieChartCard title="Study Type" data={studyTypeData.slice(0, 4)} centerLabel="Study" />
        </div>
      </div>
    </>
  );
}