import type React from "react";

interface ProductInfoProps {
	name: string;
	description?: string;
	price: number;
	unit?: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
	name,
	description,
	price,
	unit,
}) => {
	return (
		<div className="hidden md:block pb-12">
			<div className="space-y-8">
				<div className="flex items-center gap-4 text-primary">
					<div className="w-12 h-px bg-primary/30" />
					<span className="font-heading font-bold uppercase tracking-[0.3em] text-[10px] text-muted-foreground whitespace-nowrap">
						Product
					</span>
					<div className="flex-1 h-px bg-border/20" />
				</div>

				<h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black uppercase text-foreground tracking-tighter leading-[0.8] max-w-4xl">
					{name}
				</h1>

				<div className="grid md:grid-cols-12 gap-8 items-start">
					<div className="md:col-span-7">
						<p className="text-xl text-muted-foreground font-light leading-relaxed">
							{description ||
								"High-quality industrial component optimized for enterprise performance and durability."}
						</p>
					</div>
					<div className="md:col-span-1 hidden md:flex justify-center pt-2">
						<div className="w-px h-24 bg-border/30" />
					</div>
					<div className="md:col-span-4 flex flex-col justify-end">
						<div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2 opacity-60">
							Standard Unit Price
						</div>
						<div className="text-3xl font-heading font-black text-foreground">
							RWF {price.toLocaleString()}
						</div>
						<div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
							Per {unit ?? "Unit"}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
