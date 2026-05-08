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
		<div className={cn("min-h-screen bg-background pb-24", className)}>
			{mobileActions}

			{/* Top Navigation Header */}
			<div className="bg-background/80 backdrop-blur-md border-b border-border py-4 px-4 sm:px-8 lg:px-12 sticky top-0 z-30">
				<div className="w-full flex items-center justify-between gap-4">
					<div className="flex items-center gap-6 overflow-hidden text-ellipsis">
						<Button
							variant="ghost"
							size="icon"
							onClick={onBack}
							className="shrink-0 h-10 w-10 rounded-none hover:bg-muted/50 transition-all"
						>
							<RiArrowLeftSLine className="size-6" />
						</Button>
						<div className="h-6 w-px bg-border/40 shrink-0" />
						<h1 className="font-semibold text-sm truncate text-foreground leading-none">
							{title}
						</h1>
					</div>
					<div className="flex items-center gap-4 shrink-0">
						{headerAction}
						{badgeText && (
							<Badge className="bg-muted/50 text-foreground border-none text-xs font-medium px-3 py-1 rounded-none hidden sm:flex">
								{badgeText}
							</Badge>
						)}
					</div>
				</div>
			</div>

			<div className="w-full px-4 sm:px-8 lg:px-12 py-8 md:py-12 space-y-12">
				{/* Hero Section: Gallery + Info */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					<div className="w-full">
						{gallery}
					</div>

					<div className="w-full">
						{info}
					</div>
				</div>

				{/* Visual separator */}
				<div className="border-t border-border" />

				{/* Secondary Section: Tabs + Sidebar */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
					<div className="w-full lg:col-span-2 space-y-12">
						{tabs}
						{bottomContent}
					</div>

					<div className="w-full lg:col-span-1">
						<div className="lg:sticky lg:top-24 space-y-6">
							{sidebar}
						</div>
					</div>
				</div>
			</div>

			{modals}
		</div>
	);
}
