import { RiArrowLeftLine, RiErrorWarningLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { Button } from "@/components/ui/button";

export const NotFound: React.FC = () => {
	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none" />

			<div className="relative z-10 text-center max-w-md w-full">
				<div className="w-24 h-24 bg-destructive/10 text-destructive mx-auto flex items-center justify-center rounded-none rotate-45 mb-12 border border-destructive/20 shadow-2xl shadow-destructive/10">
					<RiErrorWarningLine className="w-12 h-12 -rotate-45" />
				</div>

				<h1 className="text-8xl font-display font-black text-foreground mb-4 uppercase tracking-tighter leading-none">
					404
				</h1>

				<div className="flex items-center justify-center gap-3 mb-8">
					<div className="w-10 h-px bg-primary" />
					<p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
						Resource Node Not Found
					</p>
					<div className="w-10 h-px bg-primary" />
				</div>

				<p className="text-muted-foreground text-xs font-bold uppercase tracking-widest leading-relaxed mb-12 max-w-sm mx-auto">
					The transmission you're looking for has been disconnected or relocated
					within the construction network.
				</p>

				<div className="flex flex-col gap-3">
					<Link to="/">
						<Button className="w-full h-14 rounded-none font-display font-black uppercase text-[10px] tracking-[0.3em] gap-2 border-none shadow-xl shadow-primary/20">
							<RiArrowLeftLine size={16} />
							Return to Nexus
						</Button>
					</Link>
					<Link to="/marketplace">
						<Button
							variant="outline"
							className="w-full h-14 rounded-none font-display font-black uppercase text-[10px] tracking-[0.3em] border-border/40 hover:bg-muted/5"
						>
							Material Scan
						</Button>
					</Link>
				</div>
			</div>

			<div className="absolute bottom-8 left-0 right-0 text-center">
				<span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.5em]">
					AFRIKAMARKET // SYSTEM ERROR_PROTOCOL 404
				</span>
			</div>
		</div>
	);
};

export default NotFound;
