import {
	Calendar,
	CheckCircle,
	Filter,
	Mail,
	MessageCircle,
	Package,
	Phone,
	Star,
	Truck,
} from "lucide-react";
import type React from "react";
import type { Product } from "@/app/api/products";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

interface SupplierTabsContentProps {
	company: any;
	listings: Product[];
	featuredListings: Product[];
	onProductClick: (item: Product) => void;
}

function firstPrice(product: Product): number {
	return product.variants?.[0] ? Number(product.variants[0].price) : 0;
}

function firstImage(product: Product): string | null {
	const imgs = product.variants?.[0]?.images;
	return imgs?.length ? imgs[0] : null;
}

export const SupplierTabsContent: React.FC<SupplierTabsContentProps> = ({
	company,
	listings,
	featuredListings,
	onProductClick,
}) => {
	const galleryImages = [
		"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
		"https://images.unsplash.com/photo-1565514020176-db76dc77122b?auto=format&fit=crop&q=80&w=400",
		"https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?auto=format&fit=crop&q=80&w=400",
		"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
	];

	return (
		<>
			<TabsContent
				value="overview"
				className="space-y-12 animate-in slide-in-from-bottom-2 duration-500 fade-in mt-8"
			>
				<div className="grid md:grid-cols-3 gap-12">
					{/* Left Column (2/3) */}
					<div className="md:col-span-2 space-y-12">
						{/* Services & Capabilities */}
						<div>
							<h3 className="font-heading font-bold uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-primary" /> Services &
								Capabilities
							</h3>
							<div className="grid sm:grid-cols-2 gap-4">
								{[
									"Global Sourcing",
									"Quality Assurance",
									"Bulk Logistics",
									"Custom Packaging",
									"Brand Consulting",
									"Regulatory Compliance",
								].map((item, i) => (
									<div
										key={i}
										className="flex items-center gap-3 p-3 border border-border/40 bg-muted/5"
									>
										<div className="w-1.5 h-1.5 bg-primary/40 rotate-45" />
										<span className="text-sm font-medium text-foreground/80">
											{item}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Gallery */}
						<div>
							<h3 className="font-heading font-bold uppercase text-sm tracking-widest mb-6">
								Gallery
							</h3>
							<div className="grid grid-cols-3 gap-2">
								{galleryImages.map((src, i) => (
									<div
										key={i}
										className="aspect-video bg-muted relative group overflow-hidden border border-border/40"
									>
										<ImageWithFallback
											src={src}
											alt={`Gallery ${i}`}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
								))}
							</div>
						</div>

						{/* Featured Products */}
						<div>
							<div className="flex items-center justify-between mb-6">
								<h3 className="font-heading font-bold uppercase text-sm tracking-widest">
									Featured Products
								</h3>
								<Button
									variant="link"
									className="text-primary text-[10px] font-bold uppercase tracking-widest p-0 h-auto"
								>
									View All
								</Button>
							</div>
							<div className="grid sm:grid-cols-2 gap-6">
								{featuredListings.map((product, i) => {
									const img = firstImage(product);
									const price = firstPrice(product);
									return (
										<button
											key={i}
											onClick={() => onProductClick(product)}
											className="flex gap-4 p-4 border border-border bg-background group hover:border-primary/40 transition-colors text-left w-full"
										>
											<div className="w-20 h-20 bg-muted shrink-0">
												{img && (
													<ImageWithFallback
														src={img}
														alt={product.name}
														className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
													/>
												)}
											</div>
											<div>
												<h4 className="font-heading font-bold text-sm uppercase leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
													{product.name}
												</h4>
												<div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
													{product.category?.name || "Industrial"}
												</div>
												<div className="font-bold text-primary">
													RWF {price.toLocaleString()}
												</div>
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</div>

					{/* Right Column (1/3) - Sidebar Info */}
					<div className="space-y-8">
						{/* Shipping Options */}
						<div className="border border-border p-6 bg-muted/5">
							<h3 className="font-heading font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
								<Truck className="w-4 h-4 text-primary" /> Shipping Options
							</h3>
							<ul className="space-y-3">
								{[
									{ label: "Same Day (Local)", desc: "Orders before 12pm" },
									{ label: "Next Day", desc: "Major cities" },
									{ label: "Standard", desc: "3-5 Business Days" },
								].map((opt, i) => (
									<li
										key={i}
										className="flex justify-between items-start text-sm"
									>
										<span className="font-bold text-foreground">
											{opt.label}
										</span>
										<span className="text-xs text-muted-foreground text-right">
											{opt.desc}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="products" className="mt-8">
				<div className="space-y-6">
					<div className="flex justify-between items-center">
						<p className="text-sm text-muted-foreground">
							Showing {listings.length} products
						</p>
						<Button
							variant="outline"
							size="sm"
							className="gap-2 text-xs font-bold uppercase tracking-wider"
						>
							<Filter className="w-3.5 h-3.5" /> Filter
						</Button>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{listings.map((product) => {
							const img = firstImage(product);
							const price = firstPrice(product);
							return (
								<div
									key={product.id}
									className="group border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
									onClick={() => onProductClick(product)}
								>
									<div className="aspect-4/5 bg-muted overflow-hidden relative">
										{img && (
											<ImageWithFallback
												src={img}
												alt={product.name}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
											/>
										)}
										{!img && (
											<div className="flex items-center justify-center h-full text-muted-foreground/30">
												<Package className="w-8 h-8" />
											</div>
										)}
									</div>
									<div className="p-4 space-y-2">
										<h4 className="font-heading font-bold text-xs uppercase leading-tight line-clamp-2 group-hover:text-primary transition-colors">
											{product.name}
										</h4>
										<div className="font-bold text-sm">
											RWF {price.toLocaleString()}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</TabsContent>

			<TabsContent value="reviews" className="mt-8">
				<div className="border border-border p-8 bg-muted/5 space-y-8">
					<div className="flex items-center gap-6 pb-8 border-b border-border">
						<div className="text-center">
							<div className="text-5xl font-black font-heading text-foreground">
								4.8
							</div>
							<div className="flex gap-1 justify-center my-2 text-primary text-xs">
								{[1, 2, 3, 4, 5].map((i) => (
									<Star key={i} className="w-4 h-4 fill-primary" />
								))}
							</div>
							<div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
								{company.reviewCount || 203} Reviews
							</div>
						</div>
						<div className="flex-1 space-y-2">
							{[5, 4, 3, 2, 1].map((rating, i) => (
								<div key={rating} className="flex items-center gap-3 text-xs">
									<span className="font-bold w-3">{rating}</span>
									<div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
										<div
											className="h-full bg-primary"
											style={{
												width: i === 0 ? "85%" : i === 1 ? "10%" : "2%",
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="space-y-6">
						{[1, 2].map((i) => (
							<div
								key={i}
								className="border-b border-border/40 pb-6 last:border-0 last:pb-0"
							>
								<div className="flex justify-between items-start mb-2">
									<div>
										<h4 className="font-bold text-sm uppercase">
											Verified Buyer
										</h4>
										<span className="text-[10px] text-muted-foreground uppercase tracking-widest">
											Feb 14, 2026
										</span>
									</div>
									<div className="flex gap-0.5 text-primary">
										{[1, 2, 3, 4, 5].map((s) => (
											<Star key={s} className="w-3 h-3 fill-primary" />
										))}
									</div>
								</div>
								<p className="text-sm text-muted-foreground leading-relaxed">
									"Great experience working with {company.name}. Deliveries were
									on time and the product quality exceeded our expectations."
								</p>
							</div>
						))}
					</div>
				</div>
			</TabsContent>

			<TabsContent
				value="contact"
				className="animate-in slide-in-from-bottom-2 duration-500 fade-in mt-8"
			>
				<div className="grid md:grid-cols-2 gap-12">
					<div className="space-y-8">
						<h3 className="font-heading font-bold uppercase text-sm tracking-widest border-b border-border pb-4">
							Contact Information
						</h3>
						<div className="space-y-4">
							{[
								{
									label: "Email",
									value: company?.email || "sales@example.com",
									icon: Mail,
								},
								{
									label: "Phone",
									value: company.phone || "+27 21 555 0123",
									icon: Phone,
								},
								{
									label: "WhatsApp",
									value: "+27 82 555 6789",
									icon: MessageCircle,
								},
							].map((contact, i) => (
								<a
									key={i}
									href="#"
									className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 transition-colors group"
								>
									<div className="w-10 h-10 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
										<contact.icon className="w-5 h-5" />
									</div>
									<div>
										<div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
											{contact.label}
										</div>
										<div className="font-bold text-foreground">
											{contact.value}
										</div>
									</div>
								</a>
							))}
						</div>

						<div className="pt-4">
							<Button className="w-full h-12 font-heading font-bold uppercase tracking-widest text-xs gap-2 rounded-none">
								<MessageCircle className="w-4 h-4" /> Live Chat
								<span className="opacity-70 font-normal normal-case ml-1">
									- Chat directly on platform
								</span>
							</Button>
						</div>
					</div>

					<div className="space-y-8">
						<h3 className="font-heading font-bold uppercase text-sm tracking-widest border-b border-border pb-4">
							Business Hours
						</h3>
						<div className="border border-border bg-muted/5 p-6 space-y-4">
							<div className="flex justify-between items-center pb-4 border-b border-border/40">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4 text-primary" />
									<span className="font-bold text-sm">Monday - Friday</span>
								</div>
								<span className="text-sm font-mono text-muted-foreground">
									8:00 AM - 6:00 PM
								</span>
							</div>
							<div className="flex justify-between items-center pb-4 border-b border-border/40">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4 text-muted-foreground" />
									<span className="font-bold text-sm">Saturday</span>
								</div>
								<span className="text-sm font-mono text-muted-foreground">
									9:00 AM - 4:00 PM
								</span>
							</div>
							<div className="flex justify-between items-center text-muted-foreground/60">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<span className="font-bold text-sm">Sunday</span>
								</div>
								<span className="text-sm font-mono">Closed</span>
							</div>
						</div>
					</div>
				</div>
			</TabsContent>
		</>
	);
};
