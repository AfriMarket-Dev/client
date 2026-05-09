import { BarChart3, Clock } from "lucide-react";
import type React from "react";

interface Product {
	name: string;
	image: string;
	views: number;
	inquiries: number;
	conversionRate: number;
	revenue: number;
}

interface Activity {
	message: string;
	time: string;
	icon: React.ElementType;
	color: string;
}

interface TopProductsCardProps {
	products: Product[];
}

export const TopProductsCard: React.FC<TopProductsCardProps> = ({
	products,
}) => {
	return (
		<div className="bg-background rounded-none border border-border p-6 shadow-none">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-bold text-foreground uppercase tracking-tight">
					Top Performing Products
				</h3>
				<div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
					<BarChart3 className="w-3.5 h-3.5 mr-1.5" />
					Last 30 days
				</div>
			</div>

			<div className="space-y-3">
				{products.map((product, index) => (
					<div
						key={product.name}
						className="flex items-center space-x-4 p-4 hover:bg-muted/30 rounded-none transition-colors border border-transparent hover:border-border"
					>
						<div className="flex-shrink-0">
							<img
								src={product.image}
								alt={product.name}
								className="w-12 h-12 rounded-none object-cover border border-border bg-muted"
								onError={(e) => {
									e.currentTarget.src = "/image-fallback.svg";
								}}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="font-bold text-foreground text-sm truncate">
								{product.name}
							</h4>
							<div className="grid grid-cols-3 gap-2 mt-2 text-[10px] font-bold uppercase tracking-wider">
								<div>
									<span className="text-muted-foreground mr-1">Views:</span>
									<span className="text-info">
										{product.views.toLocaleString()}
									</span>
								</div>
								<div>
									<span className="text-muted-foreground mr-1">Inquiries:</span>
									<span className="text-success">{product.inquiries}</span>
								</div>
								<div>
									<span className="text-muted-foreground mr-1">Conv.:</span>
									<span className="text-primary">
										{product.conversionRate}%
									</span>
								</div>
							</div>
						</div>
						<div className="text-right flex-shrink-0">
							<div className="text-base font-black text-foreground">
								#{index + 1}
							</div>
							<div className="text-[10px] font-bold text-muted-foreground uppercase">
								RWF {product.revenue.toLocaleString()}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

interface RecentActivitiesCardProps {
	activities: Activity[];
}

export const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({
	activities,
}) => {
	return (
		<div className="bg-background rounded-none border border-border p-6 shadow-none">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-bold text-foreground uppercase tracking-tight">
					Recent Activities
				</h3>
				<div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
					<Clock className="w-3.5 h-3.5 mr-1.5" />
					Live updates
				</div>
			</div>

			<div className="space-y-3">
				{activities.map((activity) => (
					<div
						key={activity.message}
						className="flex items-start space-x-3 p-3 hover:bg-muted/30 rounded-none transition-colors border border-transparent hover:border-border"
					>
						<div className={`p-2 rounded-none ${activity.color} flex-shrink-0`}>
							<activity.icon className="w-4 h-4" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-semibold text-foreground leading-relaxed">
								{activity.message}
							</p>
							<p className="text-[10px] font-bold text-muted-foreground mt-1 flex items-center uppercase tracking-wider">
								<Clock className="w-3 h-3 mr-1" />
								{activity.time}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 pt-4 border-t border-border">
				<button
					type="button"
					className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
				>
					View All Activities
				</button>
			</div>
		</div>
	);
};
