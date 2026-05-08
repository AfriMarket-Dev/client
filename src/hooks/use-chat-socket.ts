import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from './store';
import { useSocket } from './use-socket';
import { messagesApi } from '@/services/api/messages';
import type { Message } from '@/types';

export const useChatSocket = (partnerId?: string) => {
  const { socket, isConnected } = useSocket();
  const dispatch = useAppDispatch();
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [isTypingState, setIsTypingState] = useState(false);

  // Debounced typing indicator cleanup
  useEffect(() => {
    if (!isTypingState || !socket || !isConnected || !partnerId) return;

    const timeout = setTimeout(() => {
      setIsTypingState(false);
      socket.emit('typing', { partnerId, isTyping: false });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isTypingState, partnerId, socket, isConnected]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewMessage = (message: Message) => {
      // Update chat history if the message is from/to the current partner
      if (partnerId && (message.sender.id === partnerId || message.receiver.id === partnerId)) {
        dispatch(
          messagesApi.util.updateQueryData('getChatHistory', { partnerId, page: 1, limit: 50 }, (draft) => {
            // Only add if not already there (to avoid duplicates with optimistic updates)
            if (!draft.items.find((m) => m.id === message.id)) {
              draft.items.push(message);
              draft.meta.total += 1;
            }
          })
        );
      }

      // Invalidate conversations list and total unread count
      dispatch(messagesApi.util.invalidateTags([
        { type: 'Messages', id: 'LIST' },
        { type: 'Messages', id: 'COUNT' }
      ]));
    };

    const handleReadReceipt = ({ partnerId: readByPartnerId }: { partnerId: string }) => {
      if (partnerId && readByPartnerId === partnerId) {
        dispatch(
          messagesApi.util.updateQueryData('getChatHistory', { partnerId, page: 1, limit: 50 }, (draft) => {
            draft.items.forEach((m) => {
              if (m.receiver.id === partnerId) {
                m.isRead = true;
              }
            });
          })
        );
      }
    };

    const handleTyping = ({ userId, isTyping }: { userId: string, isTyping: boolean }) => {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        if (isTyping) {
          next.add(userId);
        } else {
          next.delete(userId);
        }
        return next;
      });
    };

    socket.on('message:new', handleNewMessage);
    socket.on('message:read', handleReadReceipt);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('message:new', handleNewMessage);
      socket.off('message:read', handleReadReceipt);
      socket.off('typing', handleTyping);
    };
  }, [socket, isConnected, partnerId, dispatch]);

  const sendTyping = useCallback((isTyping: boolean) => {
    if (socket && isConnected && partnerId) {
      if (isTyping && !isTypingState) {
        setIsTypingState(true);
        socket.emit('typing', { partnerId, isTyping: true });
      } else if (!isTyping && isTypingState) {
        setIsTypingState(false);
        socket.emit('typing', { partnerId, isTyping: false });
      }
    }
  }, [socket, isConnected, partnerId, isTypingState]);

  const markAsRead = useCallback(() => {
    if (socket && isConnected && partnerId) {
      socket.emit('message:read', { partnerId });
    }
  }, [socket, isConnected, partnerId]);

  return {
    isPartnerTyping: partnerId ? typingUsers.has(partnerId) : false,
    sendTyping,
    markAsRead,
  };
};
