import {
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	useQueryStates,
} from "nuqs";

export function useProvidersParams() {
	return useQueryStates(
		{
			searchQuery: parseAsString.withDefault(""),
			categoryId: parseAsString.withDefault("all"),
			district: parseAsString.withDefault(""),
			type: parseAsString.withDefault("all"),
			minRating: parseAsString.withDefault("0"),
			verified: parseAsBoolean.withDefault(false),
			page: parseAsInteger.withDefault(1),
		},
		{
			history: "push",
			shallow: false,
		},
	);
}
