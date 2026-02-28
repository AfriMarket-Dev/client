import { apiSlice } from "@/app/api/api-entry";
import type { RootState } from "@/app/store";
import type { ApiResponse } from "@/app/api/types";

export interface ConversationPartner {
  partner: { id: string; name: string; email: string; image?: string };
  lastMessage: string;
  lastMessageAt: string;
}

export interface Message {
  id: string;
  content: string;
  sender: { id: string; name: string; email: string };
  receiver: { id: string; name: string; email: string };
  listing?: { id: string; name: string };
  createdAt: string;
  isRead?: boolean;
}

export interface ChatHistoryResult {
  items: Message[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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
          total: r?.meta?.total ?? 0,
          page: r?.meta?.page ?? 1,
          limit: r?.meta?.limit ?? 50,
          totalPages: r?.meta?.totalPages ?? 0,
        };
      },
      providesTags: (_result, _err, { partnerId }) => [
        { type: "Messages", id: partnerId },
      ],
    }),

    // generic direct message (receiverId required)
    sendMessage: builder.mutation<
      { id: string; content: string; createdAt: string },
      {
        receiverId: string;
        content: string;
        productId?: string;
        serviceId?: string;
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
        const me = (
          state as unknown as {
            auth: { user?: { id?: string; name?: string } };
          }
        ).auth?.user;
        const tempMessage = {
          id: `temp-${Date.now()}`,
          content,
          createdAt: new Date().toISOString(),
          sender: { id: me?.id ?? "", name: me?.name ?? "", email: "" },
          receiver: { id: receiverId, name: "", email: "" },
        };
        // find every active getChatHistory cache entry for this partner and patch all of them
        // this handles any combination of limit/page args the component may use
        const activeQueries = messagesApi.util.selectInvalidatedBy(getState(), [
          { type: "Messages", id: receiverId },
        ]);
        const patches = activeQueries
          .filter((q) => q.endpointName === "getChatHistory")
          .map(({ originalArgs }) =>
            dispatch(
              messagesApi.util.updateQueryData(
                "getChatHistory",
                originalArgs as {
                  partnerId: string;
                  page?: number;
                  limit?: number;
                },
                (draft) => {
                  draft.items.push(tempMessage);
                  draft.total += 1;
                },
              ),
            ),
          );
        try {
          await queryFulfilled;
        } catch {
          patches.forEach((p) => {
            p.undo();
          });
        }
      },
      invalidatesTags: (_result, _err, { receiverId }) => [
        { type: "Messages", id: receiverId },
        { type: "Messages", id: "LIST" },
      ],
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
      invalidatesTags: [{ type: "Messages", id: "LIST" }], // The backend resolves the receiver, safest to just invalidate the list
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
      invalidatesTags: [{ type: "Messages", id: "LIST" }], // The backend resolves the receiver, safest to just invalidate the list
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetChatHistoryQuery,
  useSendMessageMutation,
  useStartProductChatMutation,
  useStartServiceChatMutation,
} = messagesApi;
