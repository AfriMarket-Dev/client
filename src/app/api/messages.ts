import { apiSlice } from "@/app/api/apiEntry";
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
          ? (response as ApiResponse<ConversationPartner[]>).data!
          : [],
      providesTags: ["Messages"],
    }),

    getChatHistory: builder.query<
      ChatHistoryResult,
      { partnerId: string; page?: number; limit?: number }
    >({
      query: ({ partnerId, page = 1, limit = 50 }) =>
        `/messages/history/${partnerId}?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<Message[]>) => {
        const r = response as ApiResponse<Message[]> & { meta?: { total?: number; page?: number; limit?: number; totalPages?: number } };
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

    sendMessage: builder.mutation<
      unknown,
      { receiverId: string; content: string; listingId?: string }
    >({
      query: (body) => ({
        url: "/messages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),

    startListingChat: builder.mutation<
      unknown,
      { listingId: string; content: string }
    >({
      query: ({ listingId, content }) => ({
        url: `/messages/listing/${listingId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetChatHistoryQuery,
  useSendMessageMutation,
  useStartListingChatMutation,
} = messagesApi;
