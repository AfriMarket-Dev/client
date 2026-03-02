import { apiSlice } from "@/services/api/api-entry";
import type { LogInteractionPayload } from "@/types";

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
