import {
	Activity,
	Calendar,
	Eye,
	MessageCircle,
	Package,
	TrendingUp,
	Users,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { CategoryPerformanceCard } from "./analytics/category-performance-card";
import { RecentActivitiesCard, TopProductsCard } from "./analytics/list-cards";
import { MetricCard } from "./analytics/metric-card";
import { PerformanceSummaryCard } from "./analytics/performance-summary-card";
import { PerformanceTrendsCard } from "./analytics/performance-trends-card";

const AnalyticsDashboard: React.FC = () => {
	const [timeRange, setTimeRange] = useState("30d");
	const [activeChart, setActiveChart] = useState<
		"inquiries" | "views" | "conversion"
	>("inquiries");

	const stats = [
		{
			label: "Total Views",
			value: "12,456",
			change: "+23.5%",
			trend: "up" as const,
			icon: Eye,
			color: "blue",
			description: "Profile and product views",
		},
		{
			label: "Product Inquiries",
			value: "342",
			change: "+12.3%",
			trend: "up" as const,
			icon: MessageCircle,
			color: "green",
			description: "Customer inquiries received",
		},
		{
			label: "Conversion Rate",
			value: "8.7%",
			change: "+2.1%",
			trend: "up" as const,
			icon: TrendingUp,
			color: "primary",
			description: "Views to inquiries ratio",
		},
		{
			label: "Response Rate",
			value: "94.2%",
			change: "-1.2%",
			trend: "down" as const,
			icon: Activity,
			color: "purple",
			description: "Inquiry response rate",
		},
	];

	const topProducts = [
		{
			name: "Samsung Galaxy A54 5G",
			views: 2456,
			inquiries: 45,
			conversionRate: 12.3,
			revenue: 15600,
			image:
				"https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		{
			name: "Wireless Bluetooth Earbuds",
			views: 1890,
			inquiries: 38,
			conversionRate: 9.8,
			revenue: 12400,
			image:
				"https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		{
			name: "Premium Cotton Ankara Fabric",
			views: 1567,
			inquiries: 29,
			conversionRate: 8.2,
			revenue: 8900,
			image:
				"https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
		{
			name: "Modern Living Room Set",
			views: 1234,
			inquiries: 22,
			conversionRate: 7.1,
			revenue: 18500,
			image:
				"https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=100",
		},
	];

	const chartDataMap = {
		inquiries: [
			{ month: "Jan", value: 45, secondary: 42 },
			{ month: "Feb", value: 52, secondary: 48 },
			{ month: "Mar", value: 48, secondary: 46 },
			{ month: "Apr", value: 61, secondary: 58 },
			{ month: "May", value: 55, secondary: 52 },
			{ month: "Jun", value: 67, secondary: 63 },
		],
		views: [
			{ month: "Jan", value: 1200, secondary: 980 },
			{ month: "Feb", value: 1450, secondary: 1200 },
			{ month: "Mar", value: 1380, secondary: 1150 },
			{ month: "Apr", value: 1650, secondary: 1400 },
			{ month: "May", value: 1580, secondary: 1320 },
			{ month: "Jun", value: 1820, secondary: 1560 },
		],
		conversion: [
			{ month: "Jan", value: 6.2, secondary: 5.8 },
			{ month: "Feb", value: 7.1, secondary: 6.5 },
			{ month: "Mar", value: 6.8, secondary: 6.2 },
			{ month: "Apr", value: 8.3, secondary: 7.9 },
			{ month: "May", value: 7.9, secondary: 7.4 },
			{ month: "Jun", value: 8.7, secondary: 8.2 },
		],
	};

	const categoryPerformance = [
		{
			category: "Electronics",
			percentage: 45,
			value: 156,
			color: "bg-blue-500",
			textColor: "text-blue-600",
		},
		{
			category: "Fashion & Textiles",
			percentage: 25,
			value: 87,
			color: "bg-green-500",
			textColor: "text-green-600",
		},
		{
			category: "Home & Garden",
			percentage: 20,
			value: 69,
			color: "bg-primary",
			textColor: "text-primary",
		},
		{
			category: "Beauty & Health",
			percentage: 10,
			value: 35,
			color: "bg-purple-500",
			textColor: "text-purple-600",
		},
	];

	const recentActivities = [
		{
			type: "view",
			message:
				"Samsung Galaxy A54 5G viewed by John Kamau from Nairobi Electronics",
			time: "2 hours ago",
			icon: Eye,
			color: "text-blue-600 bg-blue-100",
		},
		{
			type: "inquiry",
			message:
				"New inquiry for Wireless Earbuds from Sarah Mwangi (Kigali Fashion)",
			time: "4 hours ago",
			icon: MessageCircle,
			color: "text-green-600 bg-green-100",
		},
		{
			type: "response",
			message:
				"Responded to David Ochieng's furniture inquiry with custom quote",
			time: "6 hours ago",
			icon: Activity,
			color: "text-primary bg-primary/10",
		},
		{
			type: "view",
			message:
				"Ankara Fabric collection viewed 15 times from 8 different customers",
			time: "8 hours ago",
			icon: TrendingUp,
			color: "text-purple-600 bg-purple-100",
		},
	];

	const currentChartData = useMemo(
		() => chartDataMap[activeChart],
		[activeChart],
	);

	const maxValue = useMemo(
		() =>
			Math.max(...currentChartData.map((d) => Math.max(d.value, d.secondary))),
		[currentChartData],
	);

	const chartLabels = useMemo(() => {
		switch (activeChart) {
			case "inquiries":
				return { primary: "Inquiries", secondary: "Responses" };
			case "views":
				return { primary: "Profile Views", secondary: "Product Views" };
			case "conversion":
				return { primary: "Conversion Rate", secondary: "Industry Average" };
			default:
				return { primary: "Primary", secondary: "Secondary" };
		}
	}, [activeChart]);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div>
					<h2 className="text-3xl font-bold text-gray-900">
						Analytics Dashboard
					</h2>
					<p className="text-gray-600 mt-1">
						Track your business performance and insights
					</p>
				</div>
				<div className="flex items-center space-x-4">
					<select
						value={timeRange}
						onChange={(e) => setTimeRange(e.target.value)}
						className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
					>
						<option value="7d">Last 7 days</option>
						<option value="30d">Last 30 days</option>
						<option value="90d">Last 90 days</option>
						<option value="1y">Last year</option>
					</select>
					<div className="flex items-center bg-gray-100 rounded-lg p-1">
						<Calendar className="w-4 h-4 text-gray-500 mx-2" />
					</div>
				</div>
			</div>

			{/* Key Metrics Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<MetricCard key={index} {...stat} />
				))}
			</div>

			{/* Charts Section */}
			<div className="grid lg:grid-cols-3 gap-8">
				<PerformanceTrendsCard
					activeChart={activeChart}
					onActiveChartChange={setActiveChart}
					chartData={currentChartData}
					maxValue={maxValue}
					labels={chartLabels}
				/>
				<CategoryPerformanceCard categories={categoryPerformance} />
			</div>

			{/* Secondary Metrics */}
			<div className="grid lg:grid-cols-2 gap-8">
				<TopProductsCard products={topProducts} />
				<RecentActivitiesCard activities={recentActivities} />
			</div>

			{/* Performance Summary */}
			<PerformanceSummaryCard />

			{/* Quick Actions */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{[
					{
						label: "Add New Product",
						icon: Package,
						color: "from-blue-500 to-blue-600",
					},
					{
						label: "View Messages",
						icon: MessageCircle,
						color: "from-green-500 to-green-600",
					},
					{
						label: "Check Inquiries",
						icon: Users,
						color: "from-purple-500 to-purple-600",
					},
					{
						label: "Update Profile",
						icon: Activity,
						color: "from-primary to-primary/90",
					},
				].map((action, index) => (
					<button
						key={index}
						className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
					>
						<action.icon className="w-5 h-5 mx-auto mb-2" />
						<div className="text-sm">{action.label}</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default AnalyticsDashboard;
