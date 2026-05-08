import {
	RiArrowLeftSLine,
	RiCheckDoubleLine,
	RiSearchLine,
	RiSendPlane2Fill,
} from "@remixicon/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/shared/components/admin/page-header";
import { cn } from "@/lib/utils";

export function ProviderMessageCenter() {
	const [activeChat, setActiveChat] = useState<string | null>("1");

	const conversations = [
		{
			id: "1",
			user: {
				name: "Jean Doe",
				role: "Construction Lead",
				image: "/avatars/1.jpg",
			},
			lastMessage: "Is the premium cement available for delivery tomorrow?",
			time: "10:24 AM",
			unread: 2,
			online: true,
		},
		{
			id: "2",
			user: {
				name: "Marie Claire",
				role: "Procurement Officer",
				image: "/avatars/2.jpg",
			},
			lastMessage: "Thank you for the quick quote.",
			time: "Yesterday",
			unread: 0,
			online: false,
		},
	];

	return (
		<div className="h-[calc(100vh-140px)] flex flex-col gap-6">
			<PageHeader
				title="Communication Hub"
				subtitle="Manage inquiries, coordinate logistics, and close deals"
				badge="Real-time Center"
			/>

			<div className="flex-1 flex overflow-hidden bg-card border border-border rounded-none shadow-none">
				{/* Sidebar */}
				<aside className="w-full md:w-80 border-r border-border flex flex-col bg-muted/5">
					<div className="p-4 border-b border-border space-y-4">
						<div className="relative">
							<RiSearchLine
								className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
								size={16}
							/>
							<Input
								placeholder="Search conversations..."
								className="pl-9 h-10 rounded-none border-border bg-background shadow-none"
							/>
						</div>
						<div className="flex items-center gap-1">
							<Badge className="bg-primary text-primary-foreground rounded-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
								All
							</Badge>
							<Badge
								variant="outline"
								className="rounded-none border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
							>
								Unread
							</Badge>
						</div>
					</div>

					<ScrollArea className="flex-1">
						<div className="divide-y divide-border">
							{conversations.map((chat) => (
								<button
									key={chat.id}
									type="button"
									onClick={() => setActiveChat(chat.id)}
									className={cn(
										"w-full p-4 flex gap-3 transition-all hover:bg-muted/50 text-left",
										activeChat === chat.id
											? "bg-muted/80 border-l-2 border-primary"
											: "border-l-2 border-transparent",
									)}
								>
									<div className="relative shrink-0">
										<Avatar className="h-11 w-11 rounded-none border border-border">
											<AvatarImage src={chat.user.image} />
											<AvatarFallback className="rounded-none font-bold">
												{chat.user.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										{chat.online && (
											<span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-card rounded-none" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex justify-between items-start mb-0.5">
											<h4 className="font-bold text-sm text-foreground truncate">
												{chat.user.name}
											</h4>
											<span className="text-[10px] font-semibold text-muted-foreground uppercase">
												{chat.time}
											</span>
										</div>
										<p className="text-xs text-muted-foreground line-clamp-1 font-medium">
											{chat.lastMessage}
										</p>
									</div>
									{chat.unread > 0 && (
										<div className="bg-primary text-primary-foreground text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-none shrink-0">
											{chat.unread}
										</div>
									)}
								</button>
							))}
						</div>
					</ScrollArea>
				</aside>

				{/* Chat Area */}
				<main className="flex-1 flex flex-col bg-background relative overflow-hidden">
					{activeChat ? (
						<>
							{/* Chat Header */}
							<header className="p-4 border-b border-border flex items-center justify-between bg-muted/5">
								<div className="flex items-center gap-3">
									<Button
										variant="ghost"
										size="icon"
										className="md:hidden rounded-none"
										onClick={() => setActiveChat(null)}
									>
										<RiArrowLeftSLine size={20} />
									</Button>
									<div className="flex items-center gap-3">
										<Avatar className="h-10 w-10 rounded-none border border-border">
											<AvatarImage src="/avatars/1.jpg" />
											<AvatarFallback className="rounded-none font-bold">
												JD
											</AvatarFallback>
										</Avatar>
										<div>
											<h4 className="font-bold text-sm text-foreground">
												Jean Doe
											</h4>
											<p className="text-[10px] font-bold text-success uppercase tracking-widest">
												Online
											</p>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										className="h-9 rounded-none text-xs font-bold uppercase tracking-widest px-4 shadow-none"
									>
										View Order
									</Button>
								</div>
							</header>

							{/* Messages */}
							<ScrollArea className="flex-1 p-6">
								<div className="space-y-6">
									<div className="flex flex-col items-center">
										<Badge
											variant="outline"
											className="rounded-none border-border text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-muted/20"
										>
											October 24, 2023
										</Badge>
									</div>

									{/* Recipient Message */}
									<div className="flex gap-3 max-w-[80%]">
										<div className="shrink-0 mt-1">
											<Avatar className="h-8 w-8 rounded-none border border-border">
												<AvatarFallback className="text-[10px] font-bold">
													JD
												</AvatarFallback>
											</Avatar>
										</div>
										<div className="space-y-1">
											<div className="bg-muted p-4 rounded-none border border-border">
												<p className="text-sm font-medium leading-relaxed">
													Hello, I'm interested in the Premium Cement. Do you
													have 200 bags in stock for immediate delivery to
													Gasabo?
												</p>
											</div>
											<span className="text-[10px] font-semibold text-muted-foreground uppercase">
												10:24 AM
											</span>
										</div>
									</div>

									{/* Sender Message */}
									<div className="flex flex-row-reverse gap-3 max-w-[80%] ml-auto">
										<div className="space-y-1 items-end flex flex-col">
											<div className="bg-primary text-primary-foreground p-4 rounded-none shadow-none">
												<p className="text-sm font-medium leading-relaxed">
													Yes, we have sufficient stock. We can arrange
													delivery for tomorrow morning. Would you like a formal
													quote?
												</p>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="text-[10px] font-semibold text-muted-foreground uppercase">
													10:26 AM
												</span>
												<RiCheckDoubleLine
													size={14}
													className="text-primary"
												/>
											</div>
										</div>
									</div>
								</div>
							</ScrollArea>

							{/* Input Area */}
							<footer className="p-4 border-t border-border bg-muted/5">
								<form className="flex gap-3">
									<Input
										placeholder="Write your message..."
										className="flex-1 h-12 rounded-none border-border bg-background shadow-none"
									/>
									<Button className="h-12 w-12 p-0 rounded-none shadow-none">
										<RiSendPlane2Fill size={20} />
									</Button>
								</form>
							</footer>
						</>
					) : (
						<div className="flex-1 flex flex-col items-center justify-center text-center p-8">
							<div className="w-16 h-16 bg-muted border border-border rounded-none flex items-center justify-center mb-4">
								<RiSendPlane2Fill
									size={32}
									className="text-muted-foreground"
								/>
							</div>
							<h3 className="text-lg font-bold text-foreground">
								Select a conversation
							</h3>
							<p className="text-sm text-muted-foreground max-w-xs mt-1">
								Choose a conversation from the list to start communicating with
								your clients.
							</p>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default ProviderMessageCenter;
