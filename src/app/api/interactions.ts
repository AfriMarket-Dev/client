import { apiSlice } from "@/app/api/api-entry";

export type InteractionType =
  | "VIEW"
  | "WHATSAPP_CLICK"
  | "CALL_CLICK"
  | "EMAIL_CLICK"
  | "SHARE";

export interface LogInteractionPayload {
  type: InteractionType;
  serviceId?: string;
  productId?: string;
  companyId?: string;
  metadata?: Record<string, unknown>;
}

export const interactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logInteraction: builder.mutation<void, LogInteractionPayload>({
      query: (body) => ({
        url: "/interactions/log",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLogInteractionMutation } = interactionsApi;
