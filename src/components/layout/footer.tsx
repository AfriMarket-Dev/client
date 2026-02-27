import {
	RiFacebookFill,
	RiInstagramFill,
	RiLinkedinFill,
	RiTwitterFill,
	RiMailLine,
	RiMapPinLine,
} from "@remixicon/react";
import type React from "react";

interface FooterProps {
	onAboutClick?: () => void;
	onHelpClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
	onAboutClick,
	onHelpClick,
}) => {
	const footerSections = [
		{
			title: "Marketplace",
			links: [
				"Browse Suppliers",
				"Construction Materials",
				"Heavy Equipment",
				"Labor Services",
			],
		},
		{
			title: "For Suppliers",
			links: [
				"Join as Supplier",
				"Supplier Dashboard",
				"List Products",
				"Verify Identity",
			],
		},
		{
			title: "Support",
			links: [
				{ label: "Help Center", onClick: onHelpClick },
				"Contact Us",
				"Safety Tips",
				"Report a Problem",
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About Us", onClick: onAboutClick },
				"Careers",
				"Press",
				"Blog",
			],
		},
	];

	const socialLinks = [
		{ icon: RiFacebookFill, href: "#", label: "Facebook" },
		{ icon: RiTwitterFill, href: "#", label: "Twitter" },
		{ icon: RiInstagramFill, href: "#", label: "Instagram" },
		{ icon: RiLinkedinFill, href: "#", label: "LinkedIn" },
	];

	return (
		<footer className="bg-card border-t border-border/40 text-muted-foreground">
			<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16">
					<div className="lg:col-span-2">
						<h2 className="text-3xl font-heading font-bold text-foreground mb-8 tracking-tight">
							AfrikaMarket
						</h2>
						<p className="text-muted-foreground/80 mb-10 leading-relaxed max-w-sm text-base">
							Connecting verified local suppliers with contractors across all 30
							districts of Rwanda.
						</p>

						{/* Contact Info */}
						<div className="space-y-5 mb-10">
							<div className="flex items-center text-muted-foreground/80">
								<RiMapPinLine className="w-5 h-5 mr-3 flex-shrink-0 text-primary/70" />
								<span className="font-medium">Kigali, Rwanda</span>
							</div>
							<div className="flex items-center text-muted-foreground/80">
								<RiMailLine className="w-5 h-5 mr-3 flex-shrink-0 text-primary/70" />
								<span className="font-medium">support@afrikamarket.rw</span>
							</div>
						</div>

						<div className="flex gap-4">
							{socialLinks.map((social, index) => (
								<a
									key={index}
									href={social.href}
									aria-label={social.label}
									className="flex items-center justify-center w-12 h-12 bg-muted/30 border border-border/50 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-muted-foreground"
								>
									<social.icon className="w-6 h-6" />
								</a>
							))}
						</div>
					</div>

					{/* Footer Links */}
					{footerSections.map((section, index) => (
						<div key={index}>
							<h3 className="text-lg font-bold mb-8 text-foreground tracking-tight">
								{section.title}
							</h3>
							<ul className="space-y-4">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										{typeof link === "object" && link.onClick ? (
											<button
												onClick={link.onClick}
												className="text-muted-foreground/70 hover:text-primary transition-colors text-left text-sm font-medium"
											>
												{link.label}
											</button>
										) : (
											<a
												href="#"
												className="text-muted-foreground/70 hover:text-primary transition-colors text-sm font-medium"
											>
												{typeof link === "string" ? link : link.label}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			<div className="border-t border-border/40 bg-muted/10">
				<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
					<div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-muted-foreground/60">
						<div>© 2026 AfrikaMarket Rwanda Ltd. All rights reserved.</div>
						<div className="flex gap-10">
							<a href="#" className="hover:text-primary transition-colors">
								Privacy Policy
							</a>
							<a href="#" className="hover:text-primary transition-colors">
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
