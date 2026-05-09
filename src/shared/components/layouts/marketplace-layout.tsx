import { SlidersHorizontal } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface MarketplaceLayoutProps {
	// slots
	header?: React.ReactNode;
	sidebar?: React.ReactNode;
	toolbar?: React.ReactNode;
	activeFilters?: React.ReactNode;
	content: React.ReactNode;
	pagination?: React.ReactNode;
	mobileFilters?: React.ReactNode;

	// state
	showFilters: boolean;
	hasActiveFilters?: boolean;
	onToggleFilters: () => void;
	onResetFilters: () => void;
	isMobileFiltersOpen: boolean;
	setIsMobileFiltersOpen: (open: boolean) => void;

	// data
	title: string;
	subtitle?: string;
	className?: string;
	isPending?: boolean;
}

export function MarketplaceLayout({
	header,
	sidebar,
	toolbar,
	activeFilters,
	content,
	pagination,
	mobileFilters,
	showFilters,
	hasActiveFilters,
	onResetFilters,
	isMobileFiltersOpen,
	setIsMobileFiltersOpen,
	title,
	subtitle,
	className,
	isPending,
}: MarketplaceLayoutProps) {
	return (
		<div className={cn("min-h-screen bg-background relative", className)}>
			{/* Top Progress Bar for Transitions */}
			{isPending && (
				<div className="fixed top-0 left-0 right-0 h-0.5 bg-primary/20 z-[100] overflow-hidden">
					<div className="h-full bg-primary animate-progress-bar origin-left" />
				</div>
			)}

			{/* Header Section */}
			<div className="bg-background border-b border-border sticky top-[56px] z-30 py-4 md:py-6">
				<div className="max-w-[1800px] mx-auto px-4 md:px-8">
					{header || (
						<div className="flex flex-row items-center justify-between gap-4">
							<div className="space-y-1">
								<h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-none">
									{title}
								</h1>
								{subtitle && (
									<p className="text-sm font-medium text-muted-foreground mt-1">
										{subtitle}
									</p>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="max-w-[1800px] mx-auto px-4 md:px-8 py-8 md:py-10">
				<div className="flex flex-col lg:flex-row gap-10 items-start">
					{/* Desktop Sidebar Filters */}
					{showFilters && sidebar && (
						<aside className="hidden lg:block w-64 shrink-0 sticky top-32">
							<div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50 pr-4">
								<h2 className="text-sm font-semibold flex items-center gap-2">
									<SlidersHorizontal className="w-4 h-4 text-primary" />
									Filters
								</h2>
								{hasActiveFilters && (
									<Button
										variant="ghost"
										size="sm"
										className="h-8 px-2 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-transparent"
										onClick={onResetFilters}
									>
										Reset
									</Button>
								)}
							</div>
							<div className="pr-4">{sidebar}</div>
						</aside>
					)}

					{/* Main Content Area */}
					<div className="flex-1 min-w-0">
						<div className="flex flex-col gap-6 mb-8">
							{/* Toolbar with integrated mobile filter trigger */}
							<div className="flex items-start gap-4">
								<div className="flex-1">{toolbar}</div>

								{/* Mobile Filter Trigger */}
								{showFilters && (
									<div className="lg:hidden">
										<Drawer
											open={isMobileFiltersOpen}
											onOpenChange={setIsMobileFiltersOpen}
										>
											<DrawerTrigger asChild>
												<Button
													variant="outline"
													size="sm"
													className="h-10 font-medium px-4 gap-2"
												>
													<SlidersHorizontal className="w-4 h-4" />
													Filters
													{hasActiveFilters && (
														<span className="w-2 h-2 rounded-full bg-primary" />
													)}
												</Button>
											</DrawerTrigger>
											<DrawerContent className="bg-background flex flex-col max-h-[85vh]">
												<DrawerHeader className="p-6 border-b border-border shrink-0 text-left">
													<DrawerTitle className="text-lg font-semibold flex items-center gap-2">
														<SlidersHorizontal className="w-5 h-5 text-primary" />
														{title} Filters
													</DrawerTitle>
												</DrawerHeader>
												<div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
													{mobileFilters || sidebar}
												</div>
												{hasActiveFilters && (
													<div className="p-6 border-t border-border shrink-0 bg-muted/20">
														<Button
															variant="outline"
															className="w-full text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
															onClick={() => {
																onResetFilters();
																setIsMobileFiltersOpen(false);
															}}
														>
															Reset All Filters
														</Button>
													</div>
												)}
											</DrawerContent>
										</Drawer>
									</div>
								)}
							</div>

							{/* Active Filter Badges */}
							{activeFilters && <div className="pt-2">{activeFilters}</div>}
						</div>

						{/* Results Content */}
						<div className="space-y-10">
							{content}
							{pagination}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
