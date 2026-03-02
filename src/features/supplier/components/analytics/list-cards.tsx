import { BarChart3, Clock } from "lucide-react";
import type React from "react";

interface TopProductsCardProps {
	products: any[];
}

export const TopProductsCard: React.FC<TopProductsCardProps> = ({
	products,
}) => {
	return (
		<div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold text-gray-900">
					Top Performing Products
				</h3>
				<div className="flex items-center text-sm text-gray-500">
					<BarChart3 className="w-4 h-4 mr-1" />
					Last 30 days
				</div>
			</div>

			<div className="space-y-4">
				{products.map((product, index) => (
					<div
						key={product.name}
						className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
					>
						<div className="flex-shrink-0">
							<img
								src={product.image}
								alt={product.name}
								className="w-12 h-12 rounded-lg object-cover"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="font-semibold text-gray-900 text-sm truncate">
								{product.name}
							</h4>
							<div className="grid grid-cols-3 gap-2 mt-2 text-xs">
								<div>
									<span className="text-gray-500">Views:</span>
									<div className="font-semibold text-blue-600">
										{product.views.toLocaleString()}
									</div>
								</div>
								<div>
									<span className="text-gray-500">Inquiries:</span>
									<div className="font-semibold text-green-600">
										{product.inquiries}
									</div>
								</div>
								<div>
									<span className="text-gray-500">Conv.:</span>
									<div className="font-semibold text-primary">
										{product.conversionRate}%
									</div>
								</div>
							</div>
						</div>
						<div className="text-right flex-shrink-0">
							<div className="text-lg font-bold text-gray-900">
								#{index + 1}
							</div>
							<div className="text-xs text-gray-500">
								${product.revenue.toLocaleString()}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

interface RecentActivitiesCardProps {
	activities: any[];
}

export const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({
	activities,
}) => {
	return (
		<div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold text-gray-900">
					Recent Activities
				</h3>
				<div className="flex items-center text-sm text-gray-500">
					<Clock className="w-4 h-4 mr-1" />
					Live updates
				</div>
			</div>

			<div className="space-y-4">
				{activities.map((activity) => (
					<div
						key={activity.message}
						className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
					>
						<div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
							<activity.icon className="w-4 h-4" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900 leading-relaxed">
								{activity.message}
							</p>
							<p className="text-xs text-gray-500 mt-1 flex items-center">
								<Clock className="w-3 h-3 mr-1" />
								{activity.time}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 pt-4 border-t border-gray-100">
				<button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium">
					View All Activities
				</button>
			</div>
		</div>
	);
};
