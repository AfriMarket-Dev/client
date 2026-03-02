import type React from "react";

interface CategoryPerformanceCardProps {
	categories: any[];
}

export const CategoryPerformanceCard: React.FC<
	CategoryPerformanceCardProps
> = ({ categories }) => {
	return (
		<div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
			<h3 className="text-xl font-semibold text-gray-900 mb-6">
				Category Performance
			</h3>

			<div className="relative w-48 h-48 mx-auto mb-6">
				<svg
					className="w-full h-full transform -rotate-90"
					viewBox="0 0 100 100"
				>
					{categories.map((category, index) => {
						const startAngle = categories
							.slice(0, index)
							.reduce((sum, cat) => sum + cat.percentage * 3.6, 0);
						const endAngle = startAngle + category.percentage * 3.6;
						const largeArcFlag = category.percentage > 50 ? 1 : 0;

						const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
						const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
						const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
						const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

						const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

						return (
							<path
								key={category.category}
								d={pathData}
								fill={category.color
									.replace("bg-", "")
									.replace("-500", "")
									.replace("primary", "orange-600")}
								className="hover:opacity-80 transition-opacity cursor-pointer"
								style={{
									fill:
										category.color === "bg-blue-500"
											? "#3b82f6"
											: category.color === "bg-green-500"
												? "#10b981"
												: category.color === "bg-orange-500" ||
														category.color === "bg-primary"
													? "#ea580c"
													: "#a855f7",
								}}
							/>
						);
					})}
					<circle cx="50" cy="50" r="20" fill="white" />
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<div className="text-lg font-bold text-gray-900">100%</div>
						<div className="text-xs text-gray-500">Total</div>
					</div>
				</div>
			</div>

			<div className="space-y-3">
				{categories.map((category) => (
					<div key={category.category} className="flex items-center justify-between">
						<div className="flex items-center">
							<div className={`w-3 h-3 ${category.color} rounded-full mr-3`} />
							<span className="text-sm font-medium text-gray-700">
								{category.category}
							</span>
						</div>
						<div className="text-right">
							<div className={`text-sm font-semibold ${category.textColor}`}>
								{category.percentage}%
							</div>
							<div className="text-xs text-gray-500">
								{category.value} inquiries
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
