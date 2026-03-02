import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { cn } from "@/lib/utils";
import { useScroll } from "@/shared/hooks/use-scroll";
import type { RootState } from "@/store";
import { HeaderLogo } from "./header/header-logo";
import { HeaderUserNav } from "./header/header-user-nav";

const navLinks = [
	{ label: "Marketplace", href: "/marketplace" },
	{ label: "Suppliers", href: "/suppliers" },
	{ label: "Categories", href: "/categories" },
	{ label: "About", href: "/about" },
];

export function MobileNav() {
	const [open, setOpen] = React.useState(false);
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className="md:hidden h-10 w-10 p-0"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="ghost"
			>
				{open ? (
					<RiCloseLine className="size-5" />
				) : (
					<RiMenuLine className="size-5" />
				)}
			</Button>
			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4 bg-background border-t border-border/40",
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Link
									className="justify-start text-base font-semibold px-4 py-2 hover:bg-muted"
									key={link.label}
									to={link.href as any}
									onClick={() => setOpen(false)}
									activeProps={{
										className:
											"text-primary border-l-2 border-primary bg-primary/5",
									}}
								>
									{link.label}
								</Link>
							))}
						</div>
						{!isAuthenticated && (
							<div className="mt-8 flex flex-col gap-3">
								<Link to="/auth/signin" onClick={() => setOpen(false)}>
									<Button
										className="w-full h-11 text-base font-bold"
										variant="outline"
									>
										Sign In
									</Button>
								</Link>
								<Link to="/auth/signup" onClick={() => setOpen(false)}>
									<Button className="w-full h-11 text-base font-bold">
										Get Started
									</Button>
								</Link>
							</div>
						)}
					</div>
				</Portal>
			)}
		</div>
	);
}

export const Header: React.FC = () => {
	const scrolled = useScroll(10);
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth,
	);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full border-transparent border-b transition-all duration-300",
				{
					"border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/50":
						scrolled,
				},
			)}
		>
			<div className="mx-auto flex h-12 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
				<HeaderLogo />

				<div className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							to={link.href as any}
							className="font-heading font-black text-[10px] tracking-[0.2em] text-foreground/80 hover:text-primary px-4 py-2 uppercase transition-all relative group"
							activeProps={{
								className: "text-primary",
							}}
						>
							{link.label}
							<span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 group-[.active]:scale-x-100 transition-transform duration-300" />
						</Link>
					))}

					<div className="ml-2 pl-2 border-l border-border/40 flex items-center gap-2">
						{!isAuthenticated ? (
							<>
								<Link to="/auth/signin">
									<Button
										size="sm"
										variant="ghost"
										className="font-heading font-black uppercase tracking-[0.2em] hover:text-primary hover:bg-primary/5 text-[9px] px-4 rounded-none h-9 transition-all"
									>
										Sign In
									</Button>
								</Link>
								<Link to="/auth/signup">
									<Button
										size="sm"
										className="font-heading font-black text-[9px] uppercase tracking-[0.2em] px-6 bg-primary text-white hover:bg-primary/90 rounded-none h-9 shadow-sm shadow-primary/20 transition-all"
									>
										Get Started
									</Button>
								</Link>
							</>
						) : (
							<HeaderUserNav isAuthenticated={isAuthenticated} user={user} />
						)}
					</div>
				</div>

				{/* Mobile View - Logo and Menu mapped differently */}
				<div className="flex md:hidden items-center gap-2">
					{isAuthenticated && (
						<HeaderUserNav isAuthenticated={isAuthenticated} user={user} />
					)}
					<MobileNav />
				</div>
			</div>
		</header>
	);
};
