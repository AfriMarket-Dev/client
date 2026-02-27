import { apiSlice } from "@/app/api/api-entry";
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
      unknown,
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
