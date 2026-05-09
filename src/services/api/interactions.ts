import type { LogInteractionPayload } from "@/types";
import { apiSlice } from "./api-entry";

export const interactionsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		logInteraction: builder.mutation<void, LogInteractionPayload>({
			query: (body) => ({
				url: "/interactions",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLogInteractionMutation } = interactionsApi;
