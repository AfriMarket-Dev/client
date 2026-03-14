import { RiArrowLeftSLine } from "@remixicon/react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DetailsPageLayoutProps {
	// slots
	mobileActions?: React.ReactNode;
	headerAction?: React.ReactNode;
	gallery?: React.ReactNode;
	info?: React.ReactNode;
	tabs?: React.ReactNode;
	sidebar?: React.ReactNode;
	bottomContent?: React.ReactNode;
	modals?: React.ReactNode;

	// data
	title: string;
	badgeText?: string;
	onBack: () => void;
	className?: string;
}

export function DetailsPageLayout({
	mobileActions,
	headerAction,
	gallery,
	info,
	tabs,
	sidebar,
	bottomContent,
	modals,
	title,
	badgeText,
	onBack,
	className,
}: DetailsPageLayoutProps) {
	return (
		<div
			className={cn(
				"min-h-screen bg-background space-y-0 overflow-x-hidden industrial-grain pb-24",
				className,
			)}
		>
			{mobileActions}

			{/* Top Navigation Header - Compact on mobile */}
			<div className="bg-background border-b border-border/40 py-2.5 md:py-4 px-2 sm:px-6 lg:px-8 sticky top-0 z-30">
				<div className="max-w-[1800px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
					<div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis">
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={onBack}
							className="shrink-0 h-8 w-8"
						>
							<RiArrowLeftSLine className="size-4" />
						</Button>
						<div className="h-4 w-px bg-border/60 shrink-0" />
						<h1 className="font-display font-black uppercase text-[10px] md:text-sm tracking-widest truncate text-foreground leading-none pr-2">
							{title}
						</h1>
					</div>
					<div className="flex items-center gap-2 shrink-0">
						{headerAction}
						{badgeText && (
							<Badge className="bg-primary/10 text-primary border-primary/20 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-none uppercase hidden sm:block">
								{badgeText}
							</Badge>
						)}
					</div>
				</div>
			</div>

			<div className="max-w-[1800px] mx-auto w-full px-0 sm:px-6 lg:px-8 py-4 md:py-12 space-y-8 md:space-y-12">
				{/* Hero Section: Gallery and Primary Info - Stacked on mobile */}
				<div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-12 lg:gap-16 items-start">
					<div className="w-full lg:col-span-6 xl:col-span-5 px-0 sm:px-0">
						{gallery}
					</div>

					<div className="w-full lg:col-span-6 xl:col-span-7 px-4 sm:px-0">
						{info}
					</div>
				</div>

				{/* Secondary Section: Tabs and Sidebar - Stacked on mobile */}
				<div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start pt-4">
					<div className="w-full lg:col-span-8 space-y-10 md:space-y-12 overflow-hidden">
						{/* Tabs content gets padding-x on mobile so it's not raw to edges */}
						<div className="px-4 sm:px-0">
							{tabs}
						</div>
						<div className="px-4 sm:px-0">
							{bottomContent}
						</div>
					</div>

					<div className="w-full lg:col-span-4 space-y-8 px-4 sm:px-0">
						{sidebar}
					</div>
				</div>
			</div>

			{modals}
		</div>
	);
}
