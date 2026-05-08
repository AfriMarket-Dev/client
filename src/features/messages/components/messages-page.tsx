import { skipToken } from "@reduxjs/toolkit/query";
import {
  RiArrowLeftLine,
  RiBox3Line,
  RiCheckDoubleLine,
  RiArrowDownLine,
  RiSendPlane2Fill,
  RiChat3Line,
} from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useGetChatHistoryQuery,
  useGetConversationsQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} from "@/services/api/messages";
import type { RootState } from "@/store";
import type { Message as ChatMessage, ConversationPartner } from "@/types";
import { useSocket } from "@/hooks/use-socket";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { format, isToday, isYesterday } from "date-fns";

function formatMessageTime(iso: string | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";
  return format(date, "HH:mm");
}

function formatDividerDate(iso: string) {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "Invalid Date";
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
}

export function MessagesPage() {
  const [msg, setMsg] = useState("");
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const currentUserId = useSelector(
    (state: RootState) => state.auth.user?.id ?? null,
  );

  const { data: conversations = [], isFetching: loadingConversations } =
    useGetConversationsQuery();

  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);

  const { onlineUsers } = useSocket();
  const { isPartnerTyping, sendTyping, markAsRead: emitMarkAsRead } = useChatSocket(activePartnerId ?? undefined);

  const [markAsRead] = useMarkAsReadMutation();

  // On desktop, auto-select first conversation if none selected
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop && !activePartnerId && conversations.length > 0) {
      setActivePartnerId(conversations[0].partner.id);
    }
  }, [activePartnerId, conversations]);

  const activeConversation: ConversationPartner | undefined = useMemo(
    () => conversations.find((c) => c.partner.id === activePartnerId),
    [conversations, activePartnerId],
  );

  useEffect(() => {
    if (activePartnerId && activeConversation && activeConversation.unreadCount > 0) {
      markAsRead(activePartnerId);
      emitMarkAsRead();
    }
  }, [activePartnerId, activeConversation, markAsRead, emitMarkAsRead]);

  const chatArgs = activePartnerId
    ? { partnerId: activePartnerId, page: 1, limit: 50 }
    : skipToken;

  const { data: chatHistory, isFetching: loadingHistory } =
    useGetChatHistoryQuery(chatArgs);

  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

  const messages: ChatMessage[] = chatHistory?.items ?? [];

  const scrollToBottom = useCallback((force = false) => {
    const el = messagesScrollRef.current;
    if (el && (shouldAutoScroll || force)) {
      el.scrollTop = el.scrollHeight;
    }
  }, [shouldAutoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom, isPartnerTyping]);

  const handleScroll = () => {
    const el = messagesScrollRef.current;
    if (el) {
      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  const handleSend = useCallback(async () => {
    if (!activePartnerId || !msg.trim() || sending) return;
    const content = msg.trim();
    setMsg("");
    sendTyping(false);
    try {
      await sendMessage({
        receiverId: activePartnerId,
        content,
      }).unwrap();
      scrollToBottom(true);
    } catch (err) {
      console.error(err);
    }
  }, [activePartnerId, msg, sending, sendMessage, sendTyping, scrollToBottom]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
    sendTyping(e.target.value.length > 0);
  };

  // Message Grouping and Date Dividers
  const groupedMessages = useMemo(() => {
    const groups: any[] = [];
    let lastDate = "";
    let lastSenderId = "";

    messages.forEach((m) => {
      const dateObj = new Date(m.createdAt);
      if (isNaN(dateObj.getTime())) return;

      const currentDate = format(dateObj, "yyyy-MM-dd");
      
      if (currentDate !== lastDate) {
        groups.push({ type: "divider", date: m.createdAt });
        lastDate = currentDate;
        lastSenderId = ""; // Reset sender grouping on new day
      }

      const isMe = m.sender.id === currentUserId;
      const isSameSender = m.sender.id === lastSenderId;

      if (isSameSender) {
        groups[groups.length - 1].messages.push(m);
      } else {
        groups.push({
          type: "message-group",
          sender: m.sender,
          isMe,
          messages: [m],
        });
        lastSenderId = m.sender.id;
      }
    });

    return groups;
  }, [messages, currentUserId]);

  const isChatViewVisible = activePartnerId !== null;

  return (
    <div className="h-[calc(100vh-56px)] flex bg-background overflow-hidden relative">
      {/* Conversations List Sidebar */}
      <div
        className={cn(
          "w-full lg:w-80 xl:w-96 border-r border-border flex flex-col bg-muted shrink-0 transition-all duration-300",
          isChatViewVisible ? "hidden lg:flex" : "flex",
        )}
      >
        <div className="p-4 sm:p-5 border-b border-border bg-background shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight text-foreground leading-none">
                Inbox
              </h1>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mt-1.5 block opacity-80">
                Direct Communication
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-success/10 border border-success/20">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest text-success">Live</span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <RiChat3Line className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input 
              placeholder="Search conversations..."
              className="h-10 pl-9 bg-muted border-transparent focus-visible:bg-background focus-visible:border-primary/30 rounded-none text-[10px] font-bold uppercase tracking-widest placeholder:text-muted-foreground/40 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-2 space-y-1">
            {loadingConversations && (
              <div className="p-8 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                  Loading chats...
                </p>
              </div>
            )}

            {!loadingConversations && conversations.length === 0 && (
              <div className="p-8">
                <Empty className="border-none p-0 gap-2">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <RiBox3Line className="w-4 h-4 text-muted-foreground/20" />
                    </EmptyMedia>
                    <EmptyTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                      No conversations yet
                    </EmptyTitle>
                  </EmptyHeader>
                </Empty>
              </div>
            )}

            {!loadingConversations &&
              conversations
                .filter((chat) => 
                  chat.partner.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  chat.partner.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((chat) => {
                const isActive = chat.partner.id === activePartnerId;
                const isOnline = onlineUsers.has(chat.partner.id);
                return (
                  <button
                    key={chat.partner.id}
                    type="button"
                    onClick={() => setActivePartnerId(chat.partner.id)}
                    className={cn(
                      "w-full text-left p-4 transition-all duration-200 group relative border",
                      isActive
                        ? "bg-background border-border shadow-sm"
                        : "hover:bg-background/70 opacity-70 hover:opacity-100 border-transparent",
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    )}
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                         <div className="relative shrink-0">
                            <div className="w-8 h-8 bg-muted flex items-center justify-center text-[10px] font-black uppercase border border-border">
                                {chat.partner.name?.charAt(0) || "?"}
                            </div>
                            {isOnline && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success border-2 border-background rounded-full" />
                            )}
                         </div>
                         <span
                            className={cn(
                            "text-[11px] font-black uppercase tracking-tight truncate",
                            isActive ? "text-primary" : "text-foreground",
                            )}
                        >
                            {chat.partner.name || chat.partner.email}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase shrink-0">
                        {formatMessageTime(chat.lastMessageAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <p className={cn(
                            "text-[10px] font-medium truncate pr-4",
                            chat.unreadCount > 0 ? "text-foreground font-bold" : "text-muted-foreground"
                        )}>
                            {chat.lastMessage}
                        </p>
                        {chat.unreadCount > 0 && (
                            <div className="bg-primary text-primary-foreground text-[8px] font-black h-4 px-1.5 flex items-center justify-center rounded-none shrink-0">
                                {chat.unreadCount}
                            </div>
                        )}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Chat View */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden bg-background min-w-0 transition-all duration-300",
          !isChatViewVisible ? "hidden lg:flex" : "flex",
        )}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-14 sm:h-[72px] border-b border-border px-4 sm:px-6 flex items-center justify-between bg-background shrink-0 sticky top-0 z-10">
              <div className="flex items-center gap-3 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden -ml-2 rounded-none h-9 w-9 shrink-0"
                  onClick={() => setActivePartnerId(null)}
                >
                  <RiArrowLeftLine className="w-5 h-5" />
                </Button>

                <div className="relative shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-foreground flex items-center justify-center text-background text-xs sm:text-sm font-black uppercase tracking-tighter">
                    {(
                        activeConversation.partner.name ||
                        activeConversation.partner.email ||
                        "?"
                    ).charAt(0)}
                    </div>
                    {onlineUsers.has(activeConversation.partner.id) && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-background rounded-full" />
                    )}
                </div>
                
                <div className="min-w-0">
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-foreground leading-none mb-1 truncate">
                    {activeConversation.partner.name ||
                      activeConversation.partner.email}
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                        "text-[9px] font-bold uppercase tracking-tight",
                        onlineUsers.has(activeConversation.partner.id) ? "text-success" : "text-muted-foreground"
                    )}>
                      {onlineUsers.has(activeConversation.partner.id) ? "Online Now" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesScrollRef}
              onScroll={handleScroll}
              className="flex-1 min-h-0 overflow-y-auto bg-muted/30 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[size:40px_40px] custom-scrollbar relative"
            >
              {loadingHistory && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-background/80 backdrop-blur-md border border-border px-3 py-1.5 flex items-center gap-2 shadow-xl">
                    <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-foreground">
                      Syncing...
                    </p>
                  </div>
                </div>
              )}

              <div className="max-w-3xl mx-auto space-y-8 p-4 sm:p-6">
                {!loadingHistory && messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-border">
                      <RiChat3Line className="w-6 h-6 text-muted-foreground/20" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 max-w-[200px] mx-auto">
                      Start a conversation with this provider
                    </p>
                  </div>
                )}
                
                {!loadingHistory && groupedMessages.map((group, gIdx) => {
                  if (group.type === "divider") {
                    return (
                      <div key={`divider-${gIdx}`} className="flex items-center gap-4 my-8">
                        <div className="h-[1px] flex-1 bg-border" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 whitespace-nowrap">
                          {formatDividerDate(group.date)}
                        </span>
                        <div className="h-[1px] flex-1 bg-border" />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`group-${gIdx}`}
                      className={cn(
                        "flex flex-col gap-1",
                        group.isMe ? "items-end" : "items-start"
                      )}
                    >
                      {!group.isMe && (
                        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1 ml-1">
                          {group.sender.name || group.sender.email}
                        </span>
                      )}
                      
                      <div className={cn(
                          "flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%]",
                          group.isMe ? "items-end" : "items-start"
                      )}>
                        {group.messages.map((m: ChatMessage, mIdx: number) => (
                          <div
                            key={m.id}
                            className={cn(
                              "group relative flex flex-col",
                              group.isMe ? "items-end" : "items-start"
                            )}
                          >
                            <div
                              className={cn(
                                "p-3 sm:px-5 sm:py-4 border shadow-sm transition-all duration-300 relative",
                                group.isMe
                                  ? "bg-foreground text-background border-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                                  : "bg-background text-foreground border-border hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:border-primary/30"
                              )}
                            >
                              {m.product && (
                                <Link
                                  to="/products/$productId"
                                  params={{ productId: m.product.id }}
                                  className={cn(
                                    "mb-3 flex items-center gap-3 px-3 py-2.5 border transition-all w-full group/link",
                                    group.isMe
                                      ? "bg-background/10 border-background/10 hover:bg-background/20"
                                      : "bg-muted/50 border-border/50 hover:bg-primary/5 hover:border-primary/20"
                                  )}
                                >
                                  <div className={cn(
                                    "w-8 h-8 flex items-center justify-center border",
                                    group.isMe ? "bg-background/10 border-background/20" : "bg-primary/10 border-primary/20"
                                  )}>
                                    <RiBox3Line className={cn("h-4 w-4 shrink-0", group.isMe ? "text-background/80" : "text-primary")} />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className={cn("text-[7px] font-black uppercase tracking-[0.2em]", group.isMe ? "text-background/40" : "text-primary/60")}>
                                      Product Reference
                                    </span>
                                    <span className={cn("text-[10px] font-black uppercase tracking-tight truncate", group.isMe ? "text-background" : "text-foreground")}>
                                      {m.product.name}
                                    </span>
                                  </div>
                                </Link>
                              )}

                              {(m.service || m.auction) && (
                                <div className="mb-3 flex items-center gap-2 bg-muted-foreground/10 px-3 py-2 border border-muted-foreground/10 text-[10px] font-bold uppercase tracking-widest opacity-60">
                                  Linked Reference Attached
                                </div>
                              )}

                              <p className="text-[12px] sm:text-[13px] font-medium leading-relaxed break-words">
                                {m.content}
                              </p>
                            </div>

                            {/* Show time on last message in subgroup or on hover */}
                            <div className={cn(
                                "flex items-center gap-1.5 mt-1 transition-opacity",
                                mIdx === group.messages.length - 1 ? "opacity-40" : "opacity-0 group-hover:opacity-40"
                            )}>
                              <span className="text-[8px] font-bold uppercase tracking-widest">
                                {formatMessageTime(m.createdAt)}
                              </span>
                              {group.isMe && (
                                <RiCheckDoubleLine className={cn("w-3 h-3", m.isRead ? "text-success" : "text-muted-foreground")} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {isPartnerTyping && (
                    <div className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-background border border-border p-3 shadow-sm flex items-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                Typing...
                            </span>
                        </div>
                    </div>
                )}
              </div>

              {!shouldAutoScroll && (
                <div className="sticky bottom-4 left-1/2 -translate-x-1/2 z-30 animate-in fade-in zoom-in duration-300">
                  <Button
                    onClick={() => scrollToBottom(true)}
                    className="h-9 rounded-none bg-background border border-border text-foreground hover:bg-muted text-[9px] font-black uppercase tracking-widest shadow-2xl px-4 gap-2"
                  >
                    <RiArrowDownLine className="w-3.5 h-3.5 text-primary" />
                    New Messages
                  </Button>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="shrink-0 p-3 sm:p-4 border-t border-border bg-background">
              <div className="max-w-3xl mx-auto flex gap-2 sm:gap-3 items-end">
                <div className="flex-1 relative">
                  <Input
                    value={msg}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="w-full min-h-[48px] max-h-32 bg-muted border-border focus-visible:ring-0 focus-visible:border-primary/40 text-sm rounded-none px-4 sm:px-5 py-3 transition-all"
                    disabled={!activeConversation}
                    autoComplete="off"
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!activePartnerId || !msg.trim() || sending}
                  className="h-12 w-12 sm:w-auto sm:px-6 rounded-none bg-foreground hover:bg-foreground/90 transition-all shrink-0 shadow-lg shadow-foreground/10 active:scale-95 text-background"
                >
                  <RiSendPlane2Fill className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline font-black uppercase text-[10px] tracking-widest">
                    Send
                  </span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/10 relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grid.svg')] bg-center" />
            
            <div className="relative">
              <div className="w-20 h-20 bg-background border border-border shadow-2xl flex items-center justify-center mb-8 mx-auto relative group">
                <div className="absolute -inset-2 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-none" />
                <RiChat3Line className="w-8 h-8 text-primary relative z-10" />
              </div>
              
              <h2 className="text-xl font-black uppercase tracking-[0.3em] text-foreground mb-3">
                Secure Terminal
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 max-w-[260px] mx-auto leading-loose mb-10">
                End-to-end communication with verified service providers and merchants.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <div className="h-[1px] w-12 bg-border" />
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/30">
                  Select an active session to begin
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
