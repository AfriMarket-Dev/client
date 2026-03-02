import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleRtkQueryError(
	error: FetchBaseQueryError | SerializedError | undefined | unknown,
	fallbackMessage = "An unexpected error occurred",
) {
	if (!error) return;

	console.error("RTK Query Error:", error);

	if (typeof error === "object" && error !== null && "data" in error) {
		const errorData = error.data as Record<string, any>;
		const message = errorData?.message || errorData?.error || fallbackMessage;
		toast.error(Array.isArray(message) ? message[0] : message);
		return;
	}

	if (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof error.message === "string"
	) {
		toast.error(error.message || fallbackMessage);
		return;
	}
}

export async function shareContent(data: {
	title: string;
	text?: string;
	url: string;
}) {
	if (navigator.share) {
		try {
			await navigator.share(data);
			return true;
		} catch (err) {
			if ((err as Error).name !== "AbortError") {
				console.error("Error sharing:", err);
			}
			return false;
		}
	} else {
		try {
			await navigator.clipboard.writeText(data.url);
			toast.info("Link copied to clipboard");
			return true;
		} catch (err) {
			console.error("Error copying to clipboard:", err);
			return false;
		}
	}
}
