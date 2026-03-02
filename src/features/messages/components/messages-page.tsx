import { skipToken } from "@reduxjs/toolkit/query";
import {
	RiCheckDoubleLine,
	RiMore2Fill,
	RiSendPlane2Fill,
} from "@remixicon/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	useGetChatHistoryQuery,
	useGetConversationsQuery,
	useSendMessageMutation,
} from "@/services/api/messages";
import type { RootState } from "@/store";
import type { Message as ChatMessage, ConversationPartner } from "@/types";

function formatTime(iso: string | undefined) {
	if (!iso) return "";
	const date = new Date(iso);
	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function MessagesPage() {
	const [msg, setMsg] = useState("");

	const currentUserId = useSelector(
		(state: RootState) => state.auth.user?.id ?? null,
	);

	const { data: conversations = [], isFetching: loadingConversations } =
		useGetConversationsQuery();

	const [activePartnerId, setActivePartnerId] = useState<string | null>(null);

	// When conversations load, default to the most recent partner if none selected.
	useEffect(() => {
		if (!activePartnerId && conversations.length > 0) {
			setActivePartnerId(conversations[0].partner.id);
		}
	}, [activePartnerId, conversations]);

	const activeConversation: ConversationPartner | undefined = useMemo(
		() =>
			conversations.find((c) => c.partner.id === activePartnerId) ??
			conversations[0],
		[conversations, activePartnerId],
	);

	const chatArgs = activeConversation?.partner.id
		? {
				partnerId: activeConversation.partner.id,
				page: 1,
				limit: 50,
			}
		: skipToken;

	const { data: chatHistory, isFetching: loadingHistory } =
		useGetChatHistoryQuery(chatArgs as any);

	const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

	const messages: ChatMessage[] = chatHistory?.items ?? [];

	return (
		<div className="h-[calc(100vh-120px)] flex bg-white border border-slate-200 overflow-hidden rounded-none shadow-sm">
			{/* Sidebar */}
			<div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50">
				<div className="p-6 border-b border-slate-100 bg-white">
					<h1 className="text-xl font-black uppercase tracking-tight text-slate-950">
						Messages
					</h1>
					<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1 block opacity-60">
						Professional Workspace
					</span>
				</div>
				<ScrollArea className="flex-1">
					<div className="p-2 space-y-1">
						{loadingConversations && (
							<div className="p-4 text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
								Loading conversations...
							</div>
						)}
						{!loadingConversations &&
							conversations.map((chat) => {
								const isActive =
									activeConversation &&
									chat.partner.id === activeConversation.partner.id;
								return (
									<button
										key={chat.partner.id}
										type="button"
										onClick={() => setActivePartnerId(chat.partner.id)}
										className={`w-full text-left p-4 cursor-pointer transition-all duration-300 ${
											isActive
												? "bg-white border border-slate-200 shadow-sm"
												: "hover:bg-white/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
										}`}
									>
										<div className="flex justify-between items-start mb-1">
											<span
												className={`text-[11px] font-black uppercase tracking-tight ${
													isActive ? "text-primary" : "text-slate-900"
												}`}
											>
												{chat.partner.name || chat.partner.email}
											</span>
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												{formatTime(chat.lastMessageAt)}
											</span>
										</div>
										<p className="text-[10px] font-medium text-muted-foreground line-clamp-1 truncate">
											{chat.lastMessage}
										</p>
									</button>
								);
							})}
						{!loadingConversations && conversations.length === 0 && (
							<div className="p-4 text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
								No conversations yet.
							</div>
						)}
					</div>
				</ScrollArea>
			</div>

			{/* Main Chat Area */}
			<div className="flex-1 flex flex-col bg-white">
				{/* Chat Header */}
				<div className="h-20 border-b border-slate-100 px-8 flex items-center justify-between bg-white z-10">
					<div className="flex items-center gap-4">
						<div className="w-10 h-10 bg-slate-950 flex items-center justify-center text-white text-sm font-black uppercase tracking-tighter">
							{activeConversation
								? (
										activeConversation.partner.name ||
										activeConversation.partner.email ||
										"?"
									).charAt(0)
								: "?"}
						</div>
						<div>
							<h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">
								{activeConversation
									? activeConversation.partner.name ||
										activeConversation.partner.email
									: "Select a conversation"}
							</h2>
							<div className="flex items-center gap-2">
								<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
								<span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
									Direct Supplier
								</span>
							</div>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-none border border-slate-100"
					>
						<RiMore2Fill className="w-5 h-5 opacity-60" />
					</Button>
				</div>

				{/* Message List */}
				<ScrollArea className="flex-1 p-8 bg-[size:40px_40px] bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]">
					<div className="max-w-4xl mx-auto space-y-8">
						{loadingHistory && (
							<div className="text-center text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
								Loading messages...
							</div>
						)}
						{!loadingHistory && messages.length === 0 && (
							<div className="text-center text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
								No messages in this conversation yet.
							</div>
						)}
						{!loadingHistory &&
							messages.map((m) => {
								const isMe =
									currentUserId != null && m.sender.id === currentUserId;
								return (
									<div
										key={m.id}
										className={`flex flex-col ${isMe ? "items-end" : "items-start slab-chat-entry"}`}
									>
										<div
											className={`max-w-[80%] p-5 rounded-none border ${
												isMe
													? "bg-slate-950 text-white border-slate-950 shadow-xl shadow-slate-950/10"
													: "bg-white text-slate-900 border-slate-100 shadow-sm"
											}`}
										>
											<p className="text-[12px] font-medium leading-relaxed">
												{m.content}
											</p>
										</div>
										<div className="flex items-center gap-2 mt-2 opacity-40">
											<span className="text-[9px] font-bold uppercase tracking-widest">
												{formatTime(m.createdAt)}
											</span>
											{isMe && (
												<RiCheckDoubleLine className="w-3 h-3 text-emerald-500" />
											)}
										</div>
									</div>
								);
							})}
					</div>
				</ScrollArea>

				{/* Input Area */}
				<div className="p-8 border-t border-slate-100 bg-white shadow-[0_-1px_0_rgba(0,0,0,0.05)]">
					<div className="max-w-4xl mx-auto flex gap-4">
						<Input
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
							placeholder="Type your message to the supplier..."
							className="flex-1 h-14 bg-slate-50 border-slate-200 focus:ring-0 focus:border-primary/40 text-sm italic rounded-none px-6"
						/>
						<Button
							className="h-14 px-8 rounded-none bg-slate-950 hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-slate-950/10"
							disabled={
								!activeConversation ||
								!activeConversation.partner.id ||
								!msg.trim() ||
								sending
							}
							onClick={async () => {
								if (
									!activeConversation ||
									!activeConversation.partner.id ||
									!msg.trim()
								) {
									return;
								}
								try {
									await sendMessage({
										receiverId: activeConversation.partner.id,
										content: msg.trim(),
									}).unwrap();
									setMsg("");
								} catch (err) {
									// Errors are surfaced via RTK Query; keep UI silent here.
									// eslint-disable-next-line no-console
									console.error(err);
								}
							}}
						>
							<RiSendPlane2Fill className="w-5 h-5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
