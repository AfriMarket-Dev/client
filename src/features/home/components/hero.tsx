import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { Search } from "lucide-react";
import React from "react";
import { z } from "zod";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetCompaniesQuery } from "@/services/api/companies";
import { useGetProductCategoriesQuery } from "@/services/api/product-categories";
import { useGetProductsQuery } from "@/services/api/products";
import { useGetServicesQuery } from "@/services/api/services";
import { useGetMarketplaceStatsQuery } from "@/services/api/stats";
import {
	type HeroFeaturedProduct,
	mapCompanyToWidgetItem,
	mapProductToHeroFeaturedProduct,
	mapProductToWidgetItem,
	mapServiceToWidgetItem,
} from "@/shared/utils/transformers";
import type { HeroWidgetItem } from "@/types";
import { FeaturedProductCard } from "./featured-product-card";
import { HeroWidget } from "./hero-widget";

const DEFAULT_SEARCH_CATEGORY = "All Categories";

const searchSchema = z.object({
	query: z.string().optional().default(""),
	activeCategory: z.string().default(DEFAULT_SEARCH_CATEGORY),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const Hero: React.FC = () => {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			query: "",
			activeCategory: DEFAULT_SEARCH_CATEGORY,
		} as SearchFormValues,
		onSubmit: async ({ value }) => {
			navigate({
				to: "/products",
				search: {
					searchQuery: value.query,
					categoryId: value.activeCategory,
				},
			});
		},
	});

	const [carouselApi, setCarouselApi] =
		React.useState<UseEmblaCarouselType[1]>(undefined);
	const [carouselIndex, setCarouselIndex] = React.useState(0);
	const [carouselCount, setCarouselCount] = React.useState(0);

	// Data Fetching
	const { data: featuredProductsResult } = useGetProductsQuery({
		limit: 3,
		isFeatured: true,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});
	const { data: latestProductsResult } = useGetProductsQuery({
		limit: 3,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});
	const { data: productCategoriesResult } = useGetProductCategoriesQuery({
		limit: 8,
	});
	const { data: marketplaceStats } = useGetMarketplaceStatsQuery();

	// Real "Top" queries
	const { data: manufacturersResult } = useGetCompaniesQuery({
		limit: 3,
		type: "MANUFACTURER_RWANDA",
		sortBy: "averageRating",
		sortOrder: "DESC",
	});
	const { data: topProductsResult } = useGetProductsQuery({
		limit: 3,
		sortBy: "views",
		sortOrder: "DESC",
	});
	const { data: topProvidersResult } = useGetCompaniesQuery({
		limit: 3,
		isVerified: true,
		sortBy: "averageRating",
		sortOrder: "DESC",
	});
	const { data: servicesResult } = useGetServicesQuery({
		limit: 3,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});

	const featuredProducts = React.useMemo(() => {
		const preferred = featuredProductsResult?.data ?? [];
		const fallback = latestProductsResult?.data ?? [];
		const source = preferred.length > 0 ? preferred : fallback;
		return source.slice(0, 3).map(mapProductToHeroFeaturedProduct);
	}, [featuredProductsResult?.data, latestProductsResult?.data]);

	const searchCategories = React.useMemo(
		() => [
			DEFAULT_SEARCH_CATEGORY,
			...(productCategoriesResult?.data.map(
				(category: { name: string }) => category.name,
			) ?? []),
		],
		[productCategoriesResult?.data],
	);

	const manufacturerItems = React.useMemo<HeroWidgetItem[]>(() => {
		// Access the data array from the NormalizedCompaniesResult
		const companies = (manufacturersResult?.data ?? []).slice(0, 3);
		return [
			{
				id: "m-stat",
				type: "stat",
				stat: `${marketplaceStats?.verifiedProviders ?? 0}+`,
				statDesc: "Direct Plants",
			},
			...companies.map(mapCompanyToWidgetItem),
		];
	}, [manufacturersResult, marketplaceStats?.verifiedProviders]);

	const productItems = React.useMemo<HeroWidgetItem[]>(() => {
		// Access the data array from the NormalizedProductsResult
		const products = (topProductsResult?.data ?? []).slice(0, 3);
		return [
			{
				id: "p-stat",
				type: "stat",
				stat: "98%",
				statDesc: "Order Fill Rate",
			},
			...products.map(mapProductToWidgetItem),
		];
	}, [topProductsResult]);

	const providerItems = React.useMemo<HeroWidgetItem[]>(() => {
		// Access the data array from the NormalizedCompaniesResult
		const companies = (topProvidersResult?.data ?? []).slice(0, 3);
		return [
			{
				id: "pr-stat",
				type: "stat",
				stat: `${marketplaceStats?.districtsCovered ?? 30}`,
				statDesc: "Active Districts",
			},
			...companies.map(mapCompanyToWidgetItem),
		];
	}, [topProvidersResult, marketplaceStats?.districtsCovered]);

	const serviceItems = React.useMemo<HeroWidgetItem[]>(() => {
		// Access the data array from the NormalizedServicesResult
		const services = (servicesResult?.data ?? []).slice(0, 3);
		return [
			{
				id: "s-stat",
				type: "stat",
				stat: "Instant",
				statDesc: "Service Quotes",
			},
			...services.map(mapServiceToWidgetItem),
		];
	}, [servicesResult]);

	React.useEffect(() => {
		if (!carouselApi) return;
		const update = () => {
			setCarouselIndex(carouselApi.selectedScrollSnap());
			setCarouselCount(carouselApi.scrollSnapList().length);
		};
		update();
		carouselApi.on("select", update);
		carouselApi.on("reInit", update);
		return () => {
			carouselApi.off("select", update);
			carouselApi.off("reInit", update);
		};
	}, [carouselApi]);

	return (
		<section className="relative pt-0 md:pt-4 pb-4 md:pb-6 bg-background industrial-grain">
			<div className="max-w-[1800px] mx-auto px-0 md:px-6">
				{/* Main Hero Container - Balanced height to show widgets but stay clean */}
				<div className="relative overflow-hidden border-y md:border border-border/20 shadow-xl mb-2 md:mb-3 bg-industrial flex flex-col md:flex-row min-h-[380px] md:min-h-[260px]">
					<div
						className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none"
						style={{
							maskImage: "linear-gradient(to bottom, black, transparent)",
						}}
					/>

					{/* Text & Search Side */}
					<div className="relative z-20 flex flex-col justify-center px-6 py-8 md:px-10 md:py-6 flex-1">
						<div className="flex items-center gap-4 mb-3 md:mb-3">
							<span className="inline-flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
								<div className="w-8 md:w-12 h-px bg-primary" />
								Build The Future
							</span>
						</div>

						<h1 className="text-display font-black text-white leading-[0.9] mb-6 md:mb-4 relative tracking-tighter">
							<span className="block text-2xl sm:text-3xl md:text-2xl lg:text-3xl uppercase">
								SOURCE EVERY
							</span>
							<span className="block text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-primary italic -skew-x-12 inline-block translate-x-2 sm:translate-x-4">
								MATERIAL & SERVICE
							</span>
							<span className="block text-2xl sm:text-3xl md:text-2xl lg:text-3xl uppercase">
								IN RWANDA.
							</span>
						</h1>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
							className="relative max-w-2xl w-full"
						>
							<InputGroup className="h-11 sm:h-12 md:h-11 rounded-none border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
								<InputGroupAddon align="inline-start" className="pl-1">
									<form.Field
										name="activeCategory"
										children={(field) => (
											<Select
												value={field.state.value}
												onValueChange={(val: string | null) => {
													if (val) field.handleChange(val);
												}}
											>
												<SelectTrigger className="h-full px-2 sm:px-4 py-0 text-[10px] font-black text-white uppercase tracking-[0.2em] border-0 bg-transparent rounded-none hover:bg-white/[0.05] max-w-[80px] sm:max-w-none">
													<SelectValue />
												</SelectTrigger>
												<SelectContent className="bg-industrial/95 border-white/10 rounded-none shadow-2xl">
													{searchCategories.map((cat) => (
														<SelectItem
															key={cat}
															value={cat}
															className="text-[10px] font-black uppercase tracking-widest text-white/60 focus:bg-primary focus:text-white rounded-none py-3"
														>
															{cat}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
								</InputGroupAddon>

								<form.Field
									name="query"
									children={(field) => (
										<InputGroupInput
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Search Catalog..."
											className="py-0 text-white placeholder:text-white/30 text-sm"
										/>
									)}
								/>

								<InputGroupButton
									type="submit"
									size="sm"
									className="h-full rounded-none bg-primary text-white hover:bg-primary/90 px-4"
								>
									<Search className="size-4" />
								</InputGroupButton>
							</InputGroup>
						</form>
					</div>

					{/* Carousel Side - Respecting desktop size */}
					<div className="relative w-full md:w-[45%] h-[300px] md:h-[260px] shrink-0 overflow-hidden border-t md:border-t-0 md:border-l border-white/10 group/featured">
						<Carousel
							setApi={setCarouselApi}
							opts={{ loop: true }}
							className="h-full"
						>
							<CarouselContent className="ml-0 h-full">
								{featuredProducts.map(
									(product: HeroFeaturedProduct, index: number) => (
										<CarouselItem key={product.id} className="pl-0 h-full">
											<div className="relative h-full">
												<FeaturedProductCard
													product={product}
													isActive={index === carouselIndex}
												/>
											</div>
										</CarouselItem>
									),
								)}
							</CarouselContent>
						</Carousel>

						{carouselCount > 1 && (
							<div className="absolute bottom-6 left-6 z-20 flex gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm border border-white/10">
								{Array.from({ length: carouselCount }).map((_, i) => (
									<button
										type="button"
										key={`dot-${i}`}
										onClick={() => carouselApi?.scrollTo(i)}
										className={`h-1.5 transition-all duration-500 rounded-full ${
											i === carouselIndex
												? "w-10 bg-primary"
												: "w-3 bg-white/30"
										}`}
									/>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Widgets - Scrollable on mobile */}
				<div className="flex flex-nowrap md:grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 px-3 md:px-0 overflow-x-auto no-scrollbar pb-4 md:pb-0">
					<div className="min-w-[280px] md:min-w-0 flex-1">
						<HeroWidget
							title="Top Manufacturers"
							subtitle="Direct Access"
							items={manufacturerItems}
							href="/providers?type=manufacturer"
						/>
					</div>
					<div className="min-w-[280px] md:min-w-0 flex-1">
						<HeroWidget
							title="Top Products"
							subtitle="Trending Items"
							items={productItems}
							href="/products?sort=popular"
							variant="blue"
						/>
					</div>
					<div className="min-w-[280px] md:min-w-0 flex-1">
						<HeroWidget
							title="Top Suppliers"
							subtitle="Verified Hubs"
							items={providerItems}
							href="/providers"
							variant="emerald"
						/>
					</div>
					<div className="min-w-[280px] md:min-w-0 flex-1">
						<HeroWidget
							title="Top Services"
							subtitle="Expert Solutions"
							items={serviceItems}
							href="/services"
							variant="orange"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
