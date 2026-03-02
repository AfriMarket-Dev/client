import { useNavigate } from "@tanstack/react-router";
import { RiPulseLine, RiShieldFlashLine, RiBroadcastLine } from "@remixicon/react";
import type React from "react";
import { useEffect, useState } from "react";

const LIVE_NETWORK_FEED = [
	{
		id: 1,
		entity: "KGL_Logistics",
		action: "transmitted",
		detail: "New Bulk Cement Inventory (5000+ Units)",
		time: "1m ago",
	},
	{
		id: 2,
		entity: "Eng_Mutesa",
		action: "connected with",
		detail: "Heavy Machinery Provider [Gasabo Node]",
		time: "4m ago",
	},
	{
		id: 3,
		entity: "BuildRwanda_Corp",
		action: "broadcasted",
		detail: "RFQ: Reinforcement Steel (12mm)",
		time: "Just now",
	},
	{
		id: 4,
		entity: "Infra_Systems",
		action: "secured",
		detail: "Logistics Contract for Regional Transit",
		time: "10m ago",
	},
    {
		id: 5,
		entity: "System_Core",
		action: "verified",
		detail: "3 New Supplier Nodes Synchronized",
		time: "Live",
	},
];

export const LiveDealsTicker: React.FC = () => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % LIVE_NETWORK_FEED.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const feed = LIVE_NETWORK_FEED[currentIndex];

	return (
		<div className="w-full bg-primary border-b border-primary/20 py-2 md:py-2.5 overflow-hidden shadow-lg shadow-primary/10">
			<div className="max-w-[1600px] mx-auto px-4 lg:px-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2 text-white">
						<RiBroadcastLine size={14} className="animate-pulse" />
						<span className="text-[10px] font-black uppercase tracking-[0.25em] font-heading">
							Live Network Feed
						</span>
					</div>

					<div className="h-4 w-[1px] bg-white/20" />

					<div className="flex items-center gap-2 text-[11px] text-white/90 font-sans tracking-tight">
						<span className="font-black uppercase text-[10px]">{feed.entity}</span>
						<span className="text-white/60 lowercase italic font-medium">{feed.action}</span>
						<span
							className="font-bold hover:underline cursor-pointer"
							onClick={() => navigate({ to: "/marketplace" as any })}
						>
							<span className="truncate max-w-[180px] md:max-w-none inline-block align-bottom uppercase">
								{feed.detail}
							</span>
						</span>
						<span className="hidden sm:inline text-[9px] text-white/40 ml-2 font-mono font-bold">
							[{feed.time}]
						</span>
					</div>
				</div>

				<div className="hidden md:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
					<div className="flex items-center gap-2">
						<RiShieldFlashLine size={14} className="text-white" />
						<span>99.9% Nodes Active</span>
					</div>
					<div className="flex items-center gap-2">
						<RiPulseLine size={14} className="text-white" />
						<span>RWF 1.2B Secured Flow</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveDealsTicker;
