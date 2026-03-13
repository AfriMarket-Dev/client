import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useCategoriesParams() {
	return useQueryStates(
		{
			searchQuery: parseAsString.withDefault(""),
			page: parseAsInteger.withDefault(1),
		},
		{
			history: "push",
			shallow: false,
		},
	);
}
