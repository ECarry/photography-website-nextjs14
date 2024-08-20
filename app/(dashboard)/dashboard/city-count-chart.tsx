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

function getYearRange(array: { year: string; count: number }[]) {
  if (array.length === 0) {
    return ""; // 或者返回其他默认值，如 'N/A'
  }

  const firstYear = array[0].year;
  const lastYear = array[array.length - 1].year;

  return `${firstYear}-${lastYear}`;
}

const chartConfig = {} satisfies ChartConfig;

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
]; // 可以自定义更多颜色

export function CityCountChart() {
  const summaryQuery = useGetSummary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = summaryQuery.data?.cityRes ?? [];
  const yearData = summaryQuery.data?.yearRes ?? [];

  // 给每个城市添加颜色
  const coloredData = data.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));

  const totalPhotos = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>City Photo</CardTitle>
        <CardDescription>{getYearRange(yearData)}</CardDescription>
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
              data={coloredData}
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
                          {totalPhotos.toLocaleString()}
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
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
