import {
	RiArrowLeftLine,
	RiBuildingLine,
	RiChat1Line,
	RiCheckboxCircleLine,
	RiEyeLine,
	RiGlobeLine,
	RiHandHeartLine,
	RiSearchLine,
	RiTargetLine,
} from "@remixicon/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function AboutPage() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
				<div className="flex items-center justify-between">
					<Link
						to="/"
						className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-none transition-colors font-display font-bold uppercase text-xs tracking-widest border border-transparent hover:border-border/20"
					>
						<RiArrowLeftLine
							size={16}
							className="group-hover:-translate-x-1 transition-transform"
						/>
						Back to Home
					</Link>
				</div>

				<section className="text-center py-20 px-4 relative overflow-hidden bg-industrial border border-primary/20 rounded-none shadow-2xl shadow-primary/5">
					<div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
					<div className="relative z-10">
						<div className="inline-flex items-center px-4 py-1.5 border border-primary/30 rounded-none bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-[0.3em] mb-10">
							<RiGlobeLine className="w-3.5 h-3.5 mr-2.5" />
							About Karibu
						</div>

						<h1 className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase">
							AFRICA'S PREMIER <br />
							<span className="text-primary italic -skew-x-12 inline-block">
								WHOLESALE HUB
							</span>
						</h1>

						<p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium uppercase tracking-widest">
							Karibu is the leading B2B marketplace for African wholesale
							commerce. We verify, connect, and simplify trade between trusted
							providers, importers, and retailers across the continent.
						</p>
					</div>
				</section>

				<section className="grid md:grid-cols-2 gap-16 items-start py-20 border-y border-border/20">
					<div className="space-y-8">
						<div className="w-14 h-14 bg-primary/10 text-primary rounded-none flex items-center justify-center border border-primary/20">
							<RiTargetLine className="w-7 h-7" />
						</div>
						<h2 className="text-3xl font-display font-extrabold text-foreground uppercase tracking-tight">
							Our Mission
						</h2>
						<p className="text-muted-foreground leading-relaxed font-medium">
							To build a trusted and direct marketplace that connects African
							businesses with reliable global and regional providers. We are
							transforming how wholesale trade happens by removing barriers and
							ensuring transparency.
						</p>
						<ul className="space-y-4 pt-2">
							{[
								"Verified provider network for safety",
								"Transparent bulk pricing & RFQs",
								"Supporting intra-African trade growth",
							].map((item) => (
								<li
									key={item}
									className="flex items-center text-xs font-bold text-foreground/70 uppercase tracking-widest"
								>
									<RiCheckboxCircleLine className="w-4 h-4 text-primary mr-3" />
									{item}
								</li>
							))}
						</ul>
					</div>

					<div className="space-y-8">
						<div className="w-14 h-14 bg-foreground/5 text-foreground rounded-none flex items-center justify-center border border-border/10">
							<RiEyeLine className="w-7 h-7" />
						</div>
						<h2 className="text-3xl font-display font-extrabold text-foreground uppercase tracking-tight">
							Our Vision
						</h2>
						<p className="text-muted-foreground leading-relaxed font-medium">
							To become the primary infrastructure for African commerce—where
							every business, from local retailers to large industrial
							providers, connects through a unified and efficient digital
							marketplace.
						</p>
					</div>
				</section>

				<section className="py-20">
					<div className="text-center mb-20">
						<h2 className="text-3xl font-display font-extrabold text-foreground uppercase tracking-tight mb-4">
							How Trade Happens
						</h2>
						<p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] max-w-xl mx-auto">
							Simple. Secure. Scalable.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-12 relative">
						<div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-primary/20 -z-10" />

						{[
							{
								icon: RiSearchLine,
								title: "1. SOURCE",
								desc: "Find quality products and verified providers across Africa and beyond.",
							},
							{
								icon: RiChat1Line,
								title: "2. NEGOTIATE",
								desc: "Communicate directly, request quotes, and finalize terms in real-time.",
							},
							{
								icon: RiHandHeartLine,
								title: "3. SCALE",
								desc: "Build lasting partnerships and grow your business through efficient supply chains.",
							},
						].map((step) => (
							<div
								key={step.title}
								className="text-center bg-background py-4 relative group"
							>
								<div className="w-20 h-20 mx-auto bg-card border border-border/20 rounded-none flex items-center justify-center mb-8 shadow-2xl shadow-primary/5 transition-all duration-500 group-hover:border-primary/40 group-hover:bg-muted/10">
									<step.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
								</div>
								<h3 className="text-lg font-display font-extrabold text-foreground mb-3 tracking-tight uppercase">
									{step.title}
								</h3>
								<p className="text-muted-foreground/60 text-[10px] uppercase font-bold tracking-widest leading-relaxed px-4">
									{step.desc}
								</p>
							</div>
						))}
					</div>
				</section>

				<section className="py-32 text-center border-t border-border/20">
					<RiBuildingLine className="w-16 h-16 text-muted-foreground/20 mx-auto mb-10" />
					<h2 className="text-4xl md:text-5xl font-display font-black text-foreground mb-10 uppercase tracking-tighter">
						READY TO SCALE <br />
						<span className="text-primary italic -skew-x-12 inline-block">
							YOUR BUSINESS?
						</span>
					</h2>
					<div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
						<Button
							size="lg"
							onClick={() => navigate({ to: "/products" })}
							className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-black uppercase tracking-[0.2em] px-10 h-16 rounded-none shadow-2xl shadow-primary/10 border-none"
						>
							Browse Products
						</Button>
						<Link to="/auth/signup">
							<Button
								variant="outline"
								size="lg"
								className="border-border/40 hover:bg-foreground hover:text-background font-display font-extrabold uppercase tracking-[0.2em] px-10 h-16 rounded-none transition-all"
							>
								Become a Provider
							</Button>
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}
