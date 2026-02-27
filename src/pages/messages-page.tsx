import { RiChat1Line, RiSendPlane2Line } from "@remixicon/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
	useGetChatHistoryQuery,
	useGetConversationsQuery,
	useSendMessageMutation,
} from "@/app/api/messages";
import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MessagesPage() {
	const { data: conversations = [], isLoading } = useGetConversationsQuery();
	const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
		null,
	);
	const [messageText, setMessageText] = useState("");
	const { user } = useSelector((state: RootState) => state.auth);
	const myId = user?.id ?? "";

	const { data: history } = useGetChatHistoryQuery(
		{ partnerId: selectedPartnerId!, limit: 100 },
		{ skip: !selectedPartnerId },
	);
	const [sendMessage] = useSendMessageMutation();

	const messages = history?.items ?? [];
	const partner = selectedPartnerId
		? conversations.find(
				(c) => (c.partner as { id?: string })?.id === selectedPartnerId,
			)?.partner
		: null;

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedPartnerId || !messageText.trim()) return;
		try {
			await sendMessage({
				receiverId: selectedPartnerId,
				content: messageText.trim(),
			}).unwrap();
			setMessageText("");
		} catch (err) {
			console.error(err);
			toast.error("Failed to send message.");
		}
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="max-w-4xl mx-auto w-full flex flex-1 min-h-0">
				<aside className="w-72 border-r border-border bg-card flex flex-col">
					<div className="p-4 border-b border-border">
						<h1 className="text-lg font-heading font-bold uppercase text-foreground">
							Messages
						</h1>
					</div>
					{isLoading ? (
						<div className="p-4 text-muted-foreground text-sm">Loading...</div>
					) : conversations.length === 0 ? (
						<div className="p-4 text-muted-foreground text-sm">
							No conversations yet. Message a supplier from a product or
							supplier page.
						</div>
					) : (
						<ul className="flex-1 overflow-auto">
							{conversations.map((c) => {
								const p = c.partner as {
									id: string;
									name: string;
									email?: string;
								};
								return (
									<li key={p.id}>
										<button
											type="button"
											onClick={() => setSelectedPartnerId(p.id)}
											className={`w-full text-left px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors ${
												selectedPartnerId === p.id ? "bg-muted" : ""
											}`}
										>
											<p className="font-medium text-foreground truncate">
												{p.name}
											</p>
											<p className="text-xs text-muted-foreground truncate">
												{c.lastMessage}
											</p>
										</button>
									</li>
								);
							})}
						</ul>
					)}
				</aside>

				<main className="flex-1 flex flex-col min-w-0">
					{!selectedPartnerId ? (
						<div className="flex-1 flex items-center justify-center text-muted-foreground">
							<div className="text-center">
								<RiChat1Line className="w-12 h-12 mx-auto mb-4 opacity-50" />
								<p>Select a conversation</p>
							</div>
						</div>
					) : (
						<>
							<div className="p-4 border-b border-border flex items-center gap-2">
								<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
									{(partner as { name?: string })?.name?.charAt(0) ?? "?"}
								</div>
								<div>
									<p className="font-heading font-bold text-foreground">
										{(partner as { name?: string })?.name ?? "—"}
									</p>
								</div>
							</div>

							<div className="flex-1 overflow-auto p-4 space-y-4">
								{messages.map((msg) => {
									const isOwn = (msg.sender as { id?: string })?.id === myId;
									return (
										<div
											key={msg.id}
											className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
										>
											<div
												className={`max-w-[80%] rounded-lg px-4 py-2 ${
													isOwn
														? "bg-primary text-primary-foreground"
														: "bg-muted text-foreground"
												}`}
											>
												<p className="text-sm">{msg.content}</p>
												<p className="text-[10px] opacity-80 mt-1">
													{new Date(msg.createdAt).toLocaleString()}
												</p>
											</div>
										</div>
									);
								})}
							</div>

							<form
								onSubmit={handleSend}
								className="p-4 border-t border-border flex gap-2"
							>
								<Input
									value={messageText}
									onChange={(e) => setMessageText(e.target.value)}
									placeholder="Type a message..."
									className="flex-1"
								/>
								<Button
									type="submit"
									size="icon"
									disabled={!messageText.trim()}
								>
									<RiSendPlane2Line className="w-4 h-4" />
								</Button>
							</form>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
