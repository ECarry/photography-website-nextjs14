"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

const chartConfig = {} satisfies ChartConfig;

function getYearRange(array: { year: string; count: number }[]) {
  if (array.length === 0) {
    return ""; // 或者返回其他默认值，如 'N/A'
  }

  const firstYear = array[0].year;
  const lastYear = array[array.length - 1].year;

  return `${firstYear}-${lastYear}`;
}

// function genRandom(base: number) {
//   return Math.round((Math.random() + 0.5) * 100);
// }

// const fakeData = [
//   { year: 2020, count: genRandom(102) },
//   { year: 2021, count: genRandom(235) },
//   { year: 2022, count: genRandom(56) },
//   { year: 2023, count: genRandom(23) },
//   { year: 2024, count: genRandom(144) },
// ];

export function YearCountChart() {
  const summaryQuery = useGetSummary();

  const data = summaryQuery.data?.yearRes ?? [];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Annual Photo</CardTitle>
        <CardDescription>{getYearRange(data)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="count"
              type="natural"
              strokeWidth={2}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
