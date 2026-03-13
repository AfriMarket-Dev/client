import {
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
	useQueryStates,
} from "nuqs";

export function useAuctionsParams() {
	return useQueryStates(
		{
			searchQuery: parseAsString.withDefault(""),
			minPrice: parseAsString.withDefault(""),
			maxPrice: parseAsString.withDefault(""),
			sortBy: parseAsString.withDefault("createdAt"),
			sortOrder: parseAsStringEnum<"ASC" | "DESC">(["ASC", "DESC"]).withDefault(
				"DESC",
			),
			page: parseAsInteger.withDefault(1),
		},
		{
			history: "push",
			shallow: false, // Wait for loaders
		},
	);
}
