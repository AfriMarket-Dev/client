import {
	RiBuildingLine,
	RiCalendarLine,
	RiChat1Line,
	RiCheckboxCircleLine,
	RiMailLine,
	RiMapPinLine,
	RiPhoneLine,
	RiStarFill,
	RiStarLine,
	RiTimeLine,
} from "@remixicon/react";
import { Package } from "lucide-react";
import type React from "react";
import { TabsContent } from "@/components/ui/tabs";
import type { Service } from "./types";

interface ServiceTabsContentProps {
	service: Service;
	trackAndNavigate: (
		type: "CALL_CLICK" | "EMAIL_CLICK" | "WHATSAPP_CLICK",
		href: string,
	) => void;
}

export const ServiceTabsContent: React.FC<ServiceTabsContentProps> = ({
	service,
	trackAndNavigate,
}) => {
	const phone = service?.company?.phone ?? service?.provider?.phone ?? "";
	const email = service?.company?.email ?? service?.provider?.email ?? "";

	return (
		<>
			<TabsContent value="overview" className="space-y-16 mt-12">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 border border-border/20 overflow-hidden">
					{[
						{ label: "Execution Time", value: "~2 Hrs", icon: RiTimeLine },
						{
							label: "Track Record",
							value: "203+ Jobs",
							icon: RiCheckboxCircleLine,
						},
						{ label: "Performance", value: "4.9/5.0", icon: RiStarLine },
						{ label: "Industry Since", value: "2021", icon: RiCalendarLine },
					].map((stat, i) => (
						<div
							key={i}
							className="bg-background/40 backdrop-blur-xs p-8 group hover:bg-background transition-all duration-500 relative overflow-hidden"
						>
							<div className="absolute top-0 left-0 w-full h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
							<stat.icon className="w-5 h-5 text-primary mb-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
							<div className="space-y-1">
								<div className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.2em]">
									{stat.label}
								</div>
								<div className="text-2xl font-bold font-heading text-foreground tracking-tight">
									{stat.value}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="grid md:grid-cols-2 gap-16">
					<div className="space-y-8">
						<h3 className="font-heading font-black uppercase text-xs tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/40">
							Service Deliverables
						</h3>
						<ul className="space-y-4">
							{[
								"Precision data collection",
								"High-accuracy reporting",
								"Industry standard formats",
								"Certified professional survey",
								"Site-wide accessibility",
							].map((item, i) => (
								<li key={i} className="flex items-start gap-5 group">
									<div className="mt-1.5 w-1 h-1 bg-primary shrink-0 transition-transform group-hover:rotate-45" />
									<span className="text-sm font-medium text-foreground/80 leading-snug group-hover:text-foreground transition-colors">
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>

					<div className="space-y-8">
						<h3 className="font-heading font-black uppercase text-xs tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/40">
							Operational Workflow
						</h3>
						<div className="space-y-8 pt-2">
							{[
								{ step: "I", label: "Consultation" },
								{ step: "II", label: "Assessment" },
								{ step: "III", label: "Execution" },
								{ step: "IV", label: "Final Phase" },
							].map((item, i) => (
								<div key={i} className="flex items-center gap-6 group">
									<span className="text-[10px] font-black font-heading text-primary/40 group-hover:text-primary transition-colors">
										{item.step}
									</span>
									<span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 group-hover:text-foreground transition-colors mr-auto">
										{item.label}
									</span>
									<div className="w-12 h-px bg-border group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
								</div>
							))}
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="products" className="mt-8">
				<div className="border border-border border-dashed p-12 text-center text-muted-foreground bg-muted/5">
					<Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
					<h3 className="font-heading font-bold uppercase tracking-wide mb-2">
						No Products Listed
					</h3>
					<p className="text-sm max-w-sm mx-auto">
						This provider hasn't listed any separate products yet. Check back
						later or inquire directly.
					</p>
				</div>
			</TabsContent>

			<TabsContent value="reviews" className="mt-8">
				<div className="border border-border p-8 bg-muted/5 space-y-8">
					<div className="flex items-center gap-6 pb-8 border-b border-border">
						<div className="text-center">
							<div className="text-5xl font-black font-heading text-foreground">
								4.9
							</div>
							<div className="flex gap-1 justify-center my-2 text-primary text-xs">
								{[1, 2, 3, 4, 5].map((i) => (
									<RiStarFill key={i} className="w-4 h-4 fill-primary" />
								))}
							</div>
							<div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
								203 Reviews
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
										<h4 className="font-bold text-sm uppercase">John Doe</h4>
										<span className="text-xs text-muted-foreground uppercase tracking-widest">
											Feb 14, 2026
										</span>
									</div>
									<div className="flex gap-0.5 text-primary">
										{[1, 2, 3, 4, 5].map((s) => (
											<RiStarFill key={s} className="w-3 h-3 fill-primary" />
										))}
									</div>
								</div>
								<p className="text-sm text-muted-foreground leading-relaxed">
									"Exceptional service delivery. The team was professional,
									timely, and the final report was exactly what we needed for
									our compliance audit."
								</p>
							</div>
						))}
					</div>
				</div>
			</TabsContent>

			<TabsContent value="contact" className="mt-8">
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-6">
						<h3 className="font-heading font-bold uppercase text-sm tracking-widest text-foreground border-b border-primary/20 pb-4">
							Get in Touch
						</h3>
						<div className="grid gap-4">
							{email && (
								<button
									type="button"
									onClick={() =>
										trackAndNavigate("EMAIL_CLICK", `mailto:${email}`)
									}
									className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group text-left w-full"
								>
									<div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
										<RiMailLine className="w-5 h-5" />
									</div>
									<div>
										<div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
											Email Us
										</div>
										<div className="font-bold text-foreground">{email}</div>
									</div>
								</button>
							)}
							{phone && (
								<button
									type="button"
									onClick={() => trackAndNavigate("CALL_CLICK", `tel:${phone}`)}
									className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group text-left w-full"
								>
									<div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
										<RiPhoneLine className="w-5 h-5" />
									</div>
									<div>
										<div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
											Call Us
										</div>
										<div className="font-bold text-foreground">{phone}</div>
									</div>
								</button>
							)}
							{phone && (
								<button
									type="button"
									onClick={() =>
										trackAndNavigate(
											"WHATSAPP_CLICK",
											`https://wa.me/${phone.replace(/\D/g, "")}`,
										)
									}
									className="flex items-center gap-4 p-4 border border-border bg-background hover:border-primary/50 hover:bg-muted/10 transition-colors group text-left w-full"
								>
									<div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
										<RiChat1Line className="w-5 h-5" />
									</div>
									<div>
										<div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
											WhatsApp
										</div>
										<div className="font-bold text-emerald-600">{phone}</div>
									</div>
								</button>
							)}
						</div>
					</div>

					<div className="space-y-6">
						<h3 className="font-heading font-bold uppercase text-sm tracking-widest text-foreground border-b border-primary/20 pb-4">
							Business Information
						</h3>
						<div className="grid grid-cols-2 gap-px bg-border/40 border border-border/40">
							<div className="bg-background p-4">
								<div className="flex items-center gap-2 mb-2 text-muted-foreground">
									<RiMapPinLine className="w-4 h-4" />
									<span className="text-[10px] font-bold uppercase tracking-widest">
										Location
									</span>
								</div>
								<div className="font-bold text-sm">Cape Town, South Africa</div>
							</div>
							<div className="bg-background p-4">
								<div className="flex items-center gap-2 mb-2 text-muted-foreground">
									<RiBuildingLine className="w-4 h-4" />
									<span className="text-[10px] font-bold uppercase tracking-widest">
										Established
									</span>
								</div>
								<div className="font-bold text-sm">2021</div>
							</div>
							<div className="bg-background p-4">
								<div className="flex items-center gap-2 mb-2 text-muted-foreground">
									<Package className="w-4 h-4" />
									<span className="text-[10px] font-bold uppercase tracking-widest">
										Total Products
									</span>
								</div>
								<div className="font-bold text-sm">134 items</div>
							</div>
							<div className="bg-background p-4">
								<div className="flex items-center gap-2 mb-2 text-muted-foreground">
									<RiStarLine className="w-4 h-4" />
									<span className="text-[10px] font-bold uppercase tracking-widest">
										Rating
									</span>
								</div>
								<div className="font-bold text-sm text-primary">
									4.9/5.0{" "}
									<span className="text-muted-foreground font-normal text-xs">
										(203 reviews)
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</TabsContent>
		</>
	);
};
