import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { ENV } from "@/shared/config/env";
import type { RootState } from "@/store";

let socketInstance: Socket | null = null;
let socketToken: string | null = null;
let activeConsumers = 0;
let connectionState = {
	isConnected: false,
	onlineUsers: new Set<string>(),
};
const subscribers = new Set<
	(state: { isConnected: boolean; onlineUsers: Set<string> }) => void
>();

function emitConnectionState() {
	const snapshot = {
		isConnected: connectionState.isConnected,
		onlineUsers: new Set(connectionState.onlineUsers),
	};

	for (const subscriber of subscribers) {
		subscriber(snapshot);
	}
}

function cleanupSocket() {
	if (socketInstance) {
		socketInstance.removeAllListeners();
		socketInstance.disconnect();
		socketInstance = null;
	}

	socketToken = null;
	connectionState = {
		isConnected: false,
		onlineUsers: new Set<string>(),
	};
	emitConnectionState();
}

function connectSocket(token: string) {
	if (socketInstance && socketToken === token) {
		return;
	}

	cleanupSocket();
	socketToken = token;
	socketInstance = io(ENV.API_URL, {
		auth: {
			token,
		},
		autoConnect: true,
		reconnection: true,
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		reconnectionDelayMax: 10000,
		timeout: 10000,
		transports: ["websocket"],
	});

	socketInstance.on("connect", () => {
		connectionState = {
			...connectionState,
			isConnected: true,
		};
		emitConnectionState();
	});

	socketInstance.on("disconnect", () => {
		connectionState = {
			...connectionState,
			isConnected: false,
		};
		emitConnectionState();
	});

	socketInstance.on("user:online-list", (userIds: string[]) => {
		connectionState = {
			...connectionState,
			onlineUsers: new Set(userIds),
		};
		emitConnectionState();
	});

	socketInstance.on(
		"user:presence",
		({ userId, status }: { userId: string; status: "online" | "offline" }) => {
			const nextOnlineUsers = new Set(connectionState.onlineUsers);
			if (status === "online") {
				nextOnlineUsers.add(userId);
			} else {
				nextOnlineUsers.delete(userId);
			}

			connectionState = {
				...connectionState,
				onlineUsers: nextOnlineUsers,
			};
			emitConnectionState();
		},
	);
}

function retainSocket(token: string) {
	activeConsumers += 1;
	connectSocket(token);
}

function releaseSocket() {
	activeConsumers = Math.max(0, activeConsumers - 1);
	if (activeConsumers === 0) {
		cleanupSocket();
	}
}

export const useSocket = (enabled = true) => {
	const token = useSelector((state: RootState) => state.auth.token);
	const [state, setState] = useState(() => ({
		isConnected: connectionState.isConnected,
		onlineUsers: new Set(connectionState.onlineUsers),
	}));

	useEffect(() => {
		subscribers.add(setState);
		return () => {
			subscribers.delete(setState);
		};
	}, []);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		if (!token) {
			cleanupSocket();
			return;
		}

		retainSocket(token);

		return () => {
			releaseSocket();
		};
	}, [enabled, token]);

	return {
		socket: socketInstance,
		isConnected: state.isConnected,
		onlineUsers: state.onlineUsers,
	};
};
