import { useCallback, useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { messagesApi } from "@/services/api/messages";
import type { Message } from "@/types";
import { useAppDispatch } from "./store";

export const useChatSocket = ({
	partnerId,
	socket,
	isConnected,
}: {
	partnerId?: string;
	socket: Socket | null;
	isConnected: boolean;
}) => {
	const dispatch = useAppDispatch();
	const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
	const [isTypingState, setIsTypingState] = useState(false);

	useEffect(() => {
		if (!socket || !isConnected || !partnerId) return;

		socket.emit("conversation:join", { partnerId });

		return () => {
			socket.emit("conversation:leave", { partnerId });
		};
	}, [socket, isConnected, partnerId]);

	// Debounced typing indicator cleanup
	useEffect(() => {
		if (!isTypingState || !socket || !isConnected || !partnerId) return;

		const timeout = setTimeout(() => {
			setIsTypingState(false);
			socket.emit("typing", { partnerId, isTyping: false });
		}, 3000);

		return () => clearTimeout(timeout);
	}, [isTypingState, partnerId, socket, isConnected]);

	useEffect(() => {
		if (!socket || !isConnected) return;

		const handleConversationUpdated = () => {
			dispatch(
				messagesApi.util.invalidateTags([
					{ type: "Messages", id: "LIST" },
					{ type: "Messages", id: "COUNT" },
				]),
			);
		};

		const handleNewMessage = (message: Message) => {
			if (!partnerId) return;

			dispatch(
				messagesApi.util.updateQueryData(
					"getChatHistory",
					{ partnerId, page: 1, limit: 50 },
					(draft) => {
						if (!draft.items.find((m) => m.id === message.id)) {
							draft.items.push(message);
							draft.meta.total += 1;
						}
					},
				),
			);
		};

		const handleReadReceipt = ({
			partnerId: readByPartnerId,
		}: {
			partnerId: string;
		}) => {
			if (partnerId && readByPartnerId === partnerId) {
				dispatch(
					messagesApi.util.updateQueryData(
						"getChatHistory",
						{ partnerId, page: 1, limit: 50 },
						(draft) => {
							draft.items.forEach((m) => {
								if (m.receiver.id === partnerId) {
									m.isRead = true;
								}
							});
						},
					),
				);
			}
		};

		const handleTyping = ({
			userId,
			isTyping,
		}: {
			userId: string;
			isTyping: boolean;
		}) => {
			setTypingUsers((prev) => {
				const next = new Set(prev);
				if (isTyping) {
					next.add(userId);
				} else {
					next.delete(userId);
				}
				return next;
			});
		};

		socket.on("conversation:updated", handleConversationUpdated);
		socket.on("message:new", handleNewMessage);
		socket.on("message:read", handleReadReceipt);
		socket.on("typing", handleTyping);

		return () => {
			socket.off("conversation:updated", handleConversationUpdated);
			socket.off("message:new", handleNewMessage);
			socket.off("message:read", handleReadReceipt);
			socket.off("typing", handleTyping);
		};
	}, [socket, isConnected, partnerId, dispatch]);

	const sendTyping = useCallback(
		(isTyping: boolean) => {
			if (socket && isConnected && partnerId) {
				if (isTyping && !isTypingState) {
					setIsTypingState(true);
					socket.emit("typing", { partnerId, isTyping: true });
				} else if (!isTyping && isTypingState) {
					setIsTypingState(false);
					socket.emit("typing", { partnerId, isTyping: false });
				}
			}
		},
		[socket, isConnected, partnerId, isTypingState],
	);

	const markAsRead = useCallback(() => {
		if (socket && isConnected && partnerId) {
			socket.emit("message:read", { partnerId });
		}
	}, [socket, isConnected, partnerId]);

	return {
		isPartnerTyping: partnerId ? typingUsers.has(partnerId) : false,
		sendTyping,
		markAsRead,
	};
};
