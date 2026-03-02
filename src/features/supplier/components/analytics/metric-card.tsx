import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import type React from "react";

interface MetricCardProps {
	label: string;
	value: string;
	change: string;
	trend: "up" | "down";
	icon: LucideIcon;
	color: string;
	description: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
	label,
	value,
	change,
	trend,
	icon: Icon,
	color,
	description,
}) => {
	return (
		<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
			<div className="flex items-center justify-between mb-4">
				<div
					className={`p-3 rounded-xl ${color === "primary" ? "bg-primary/10" : `bg-${color}-100`}`}
				>
					<Icon
						className={`w-6 h-6 ${color === "primary" ? "text-primary" : `text-${color}-600`}`}
					/>
				</div>
				<div
					className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${
						trend === "up"
							? "text-green-700 bg-green-100"
							: "text-red-700 bg-red-100"
					}`}
				>
					{trend === "up" ? (
						<ArrowUp className="w-3 h-3 mr-1" />
					) : (
						<ArrowDown className="w-3 h-3 mr-1" />
					)}
					{change}
				</div>
			</div>
			<div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
			<div className="text-sm font-medium text-gray-900 mb-1">{label}</div>
			<div className="text-xs text-gray-500">{description}</div>
		</div>
	);
};
