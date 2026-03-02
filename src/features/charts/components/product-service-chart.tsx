"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
	"A stacked bar chart comparing Products and Services";

const chartData = [
	{ month: "January", products: 320, services: 145 },
	{ month: "February", products: 410, services: 230 },
	{ month: "March", products: 280, services: 190 },
	{ month: "April", products: 390, services: 260 },
	{ month: "May", products: 475, services: 310 },
	{ month: "June", products: 520, services: 340 },
];

const chartConfig = {
	products: {
		label: "Products",
		color: "var(--chart-1)",
	},
	services: {
		label: "Services",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function ChartBarStacked() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Revenue by Category</CardTitle>
				<CardDescription>January – June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar
							dataKey="products"
							stackId="a"
							fill="var(--color-products)"
							radius={[0, 0, 4, 4]}
						/>
						<Bar
							dataKey="services"
							stackId="a"
							fill="var(--color-services)"
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 leading-none font-medium">
					Revenue trending up by 8.4% this month{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">
					Showing total revenue split between Products and Services for the last
					6 months
				</div>
			</CardFooter>
		</Card>
	);
}
