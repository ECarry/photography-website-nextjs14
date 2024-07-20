"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

function genRandom(base: number) {
  return Math.round((Math.random() + 0.5) * 100);
}

const chartData = [
  { city: "Hongkong", count: genRandom(211), fill: "var(--color-Hongkong)" },
  { city: "Macau", count: genRandom(123), fill: "var(--color-Macau)" },
  { city: "FuzhouShi", count: genRandom(53), fill: "var(--color-FuzhouShi)" },
  { city: "XiamenShi", count: genRandom(44), fill: "var(--color-XiamenShi)" },
  { city: "Other", count: genRandom(11), fill: "var(--color-Other)" },
];

const chartConfig = {
  photos: {
    label: "city",
  },
  Hongkong: {
    label: "Hongkong",
    color: "hsl(var(--chart-1))",
  },
  Macau: {
    label: "Macau",
    color: "hsl(var(--chart-2))",
  },
  FuzhouShi: {
    label: "FuzhouShi",
    color: "hsl(var(--chart-3))",
  },
  XiamenShi: {
    label: "XiamenShi",
    color: "hsl(var(--chart-4))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const total = chartData.reduce((acc, curr) => acc + curr.count, 0);

export function CityCountChart() {
  const summaryQuery = useGetSummary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = summaryQuery.data?.cityRes ?? [];

  const totalPhotos = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>City Photo</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="city"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Photos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="city" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
