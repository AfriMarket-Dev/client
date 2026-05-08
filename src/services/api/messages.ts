import { apiSlice } from "@/services/api/api-entry";
import type { RootState } from "@/store";
import type {
	ApiResponse,
	ChatHistoryResult,
	ConversationPartner,
	Message,
} from "@/types";

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query<ConversationPartner[], void>({
			query: () => "/messages/conversations",
			transformResponse: (response: ApiResponse<ConversationPartner[]>) =>
				Array.isArray((response as ApiResponse<ConversationPartner[]>)?.data)
					? ((response as ApiResponse<ConversationPartner[]>).data ?? [])
					: [],
			providesTags: (result) =>
				result
					? [
							...result.map(({ partner }) => ({
								type: "Messages" as const,
								id: partner.id,
							})),
							{ type: "Messages", id: "LIST" },
						]
					: [{ type: "Messages", id: "LIST" }],
		}),

		getChatHistory: builder.query<
			ChatHistoryResult,
			{ partnerId: string; page?: number; limit?: number }
		>({
			query: ({ partnerId, page = 1, limit = 50 }) =>
				`/messages/history/${partnerId}?page=${page}&limit=${limit}`,
			transformResponse: (response: ApiResponse<Message[]>) => {
				const r = response as ApiResponse<Message[]> & {
					meta?: {
						total?: number;
						page?: number;
						limit?: number;
						totalPages?: number;
					};
				};
				return {
					items: Array.isArray(r?.data) ? r.data : [],
					meta: {
						total: r?.meta?.total ?? 0,
						page: r?.meta?.page ?? 1,
						limit: r?.meta?.limit ?? 50,
						totalPages: r?.meta?.totalPages ?? 0,
					},
				};
			},
			providesTags: (_result, _err, { partnerId }) => [
				{ type: "Messages", id: partnerId },
			],
		}),

		// generic direct message (receiverId required)
		sendMessage: builder.mutation<
			Message,
			{
				receiverId: string;
				content: string;
				productId?: string;
				serviceId?: string;
				auctionId?: string;
			}
		>({
			query: (body) => ({
				url: "/messages",
				method: "POST",
				body,
			}),
			async onQueryStarted(
				{ receiverId, content },
				{ dispatch, queryFulfilled, getState },
			) {
				const state = getState() as unknown as RootState;
				const me = state.auth.user;
				if (!me) return;

				const tempMessage = {
					id: `temp-${Date.now()}`,
					content,
					createdAt: new Date().toISOString(),
					sender: { id: me.id, name: me.name, email: me.email },
					receiver: { id: receiverId, name: "", email: "" },
					isRead: false,
				} as Message;

				const patch = dispatch(
					messagesApi.util.updateQueryData(
						"getChatHistory",
						{ partnerId: receiverId, page: 1, limit: 50 },
						(draft) => {
							draft.items.push(tempMessage);
							draft.meta.total += 1;
						},
					),
				);
				try {
					const { data: actualMessage } = await queryFulfilled;
					dispatch(
						messagesApi.util.updateQueryData(
							"getChatHistory",
							{ partnerId: receiverId, page: 1, limit: 50 },
							(draft) => {
								const index = draft.items.findIndex((m) => m.id === tempMessage.id);
								if (index !== -1) draft.items[index] = actualMessage;
							},
						),
					);
				} catch {
					patch.undo();
				}
			},
			invalidatesTags: (_result, _err, { receiverId }) => [
				{ type: "Messages", id: "LIST" },
				{ type: "Messages", id: "COUNT" },
				{ type: "Messages", id: receiverId },
			],
		}),

		markAsRead: builder.mutation<{ success: boolean }, string>({
			query: (partnerId) => ({
				url: `/messages/read/${partnerId}`,
				method: "POST",
			}),
			async onQueryStarted(partnerId, { dispatch, queryFulfilled }) {
				const patch = dispatch(
					messagesApi.util.updateQueryData(
						"getChatHistory",
						{ partnerId, page: 1, limit: 50 },
						(draft) => {
							draft.items.forEach((m) => {
								if (m.sender?.id === partnerId) {
									m.isRead = true;
								}
							});
						},
					),
				);
				try {
					await queryFulfilled;
					dispatch(messagesApi.util.invalidateTags([
						{ type: "Messages", id: "LIST" },
						{ type: "Messages", id: "COUNT" },
						{ type: "Messages", id: partnerId },
					]));
				} catch {
					patch.undo();
				}
			},
		}),

		getUnreadCount: builder.query<number, void>({
			query: () => "/messages/unread-count",
			transformResponse: (response: ApiResponse<number>) => response.data ?? 0,
			providesTags: [{ type: "Messages", id: "COUNT" }],
		}),

		// context-aware: backend resolves the company owner automatically
		startProductChat: builder.mutation<
			unknown,
			{ productId: string; content: string }
		>({
			query: ({ productId, content }) => ({
				url: `/messages/product/${productId}`,
				method: "POST",
				body: { content },
			}),
			invalidatesTags: [{ type: "Messages", id: "LIST" }],
		}),

		// context-aware for services
		startServiceChat: builder.mutation<
			unknown,
			{ serviceId: string; content: string }
		>({
			query: ({ serviceId, content }) => ({
				url: `/messages/service/${serviceId}`,
				method: "POST",
				body: { content },
			}),
			invalidatesTags: [{ type: "Messages", id: "LIST" }],
		}),

		// context-aware for auctions
		startAuctionChat: builder.mutation<
			unknown,
			{ auctionId: string; content: string }
		>({
			query: ({ auctionId, content }) => ({
				url: `/messages/auction/${auctionId}`,
				method: "POST",
				body: { content },
			}),
			invalidatesTags: [{ type: "Messages", id: "LIST" }],
		}),
	}),
});

export const {
	useGetConversationsQuery,
	useGetChatHistoryQuery,
	useSendMessageMutation,
	useMarkAsReadMutation,
	useGetUnreadCountQuery,
	useStartProductChatMutation,
	useStartServiceChatMutation,
	useStartAuctionChatMutation,
} = messagesApi;
