import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import type { RootState } from '@/store';
import { ENV } from '@/shared/config/env';

let socketInstance: Socket | null = null;

export const useSocket = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!token) {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
        setIsConnected(false);
      }
      return;
    }

    if (!socketInstance) {
      socketInstance = io(ENV.API_URL, {
        auth: {
          token,
        },
        transports: ['websocket'],
      });

      socketInstance.on('connect', () => {
        setIsConnected(true);
        console.log('Socket connected');
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket disconnected');
      });
      
      socketInstance.on('user:online-list', (userIds: string[]) => {
        setOnlineUsers(new Set(userIds));
      });

      socketInstance.on('user:presence', ({ userId, status }: { userId: string, status: 'online' | 'offline' }) => {
        setOnlineUsers((prev) => {
          const next = new Set(prev);
          if (status === 'online') {
            next.add(userId);
          } else {
            next.delete(userId);
          }
          return next;
        });
      });
    }

    return () => {
      // We don't disconnect on unmount because we want a singleton across the app
      // Disconnect only happens on logout (when token becomes null)
    };
  }, [token]);

  return {
    socket: socketInstance,
    isConnected,
    onlineUsers,
  };
};
