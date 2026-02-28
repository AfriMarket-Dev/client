import {
  RiChat1Line,
  RiSendPlane2Line,
  RiUserLine,
  RiSignalTowerLine,
} from "@remixicon/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  useGetChatHistoryQuery,
  useGetConversationsQuery,
  useSendMessageMutation,
} from "@/app/api/messages";
import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const { data: conversations = [], isLoading } = useGetConversationsQuery();
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null,
  );
  const [messageText, setMessageText] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const myId = user?.id ?? "";

  const { data: history } = useGetChatHistoryQuery(
    { partnerId: selectedPartnerId!, limit: 100 },
    { skip: !selectedPartnerId },
  );
  const [sendMessage] = useSendMessageMutation();

  const messages = history?.items ?? [];
  const partner = selectedPartnerId
    ? conversations.find(
        (c) => (c.partner as { id?: string })?.id === selectedPartnerId,
      )?.partner
    : null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartnerId || !messageText.trim()) return;
    try {
      await sendMessage({
        receiverId: selectedPartnerId,
        content: messageText.trim(),
      }).unwrap();
      setMessageText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="h-[calc(100vh-3rem)] bg-background flex flex-col overflow-hidden industrial-grain">
      <div className="flex-1 flex min-h-0 h-full border-t border-border/40">
        {/* Sidebar */}
        <aside className="w-80 border-r border-border/40 bg-card flex flex-col min-h-0 relative">
          <div className="p-6 border-b border-border/40 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Comms_Link
              </span>
            </div>
            <h1 className="text-xl font-display font-black uppercase text-foreground tracking-tighter">
              Active Feeds
            </h1>
          </div>

          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-muted/20 border border-border/5 animate-pulse rounded-none"
                  />
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center">
                <RiSignalTowerLine className="w-8 h-8 mx-auto mb-4 opacity-20 text-primary" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-relaxed">
                  No active channels detected. Initiate connection from a node
                  profile.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/10">
                {conversations.map((c) => {
                  const p = c.partner as {
                    id: string;
                    name: string;
                    email?: string;
                  };
                  const isActive = selectedPartnerId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPartnerId(p.id)}
                      className={cn(
                        "w-full text-left px-6 py-5 transition-all duration-300 relative group",
                        isActive ? "bg-primary/5" : "hover:bg-muted/30",
                      )}
                    >
                      {isActive && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                      )}
                      <div className="flex justify-between items-start mb-1">
                        <p
                          className={cn(
                            "font-black text-[11px] uppercase tracking-widest truncate transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-foreground/80 group-hover:text-primary",
                          )}
                        >
                          {p.name}
                        </p>
                        <span className="text-[8px] font-bold text-muted-foreground/30 uppercase">
                          NODE_{p.id.substring(0, 4)}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 truncate font-medium uppercase tracking-tight">
                        {c.lastMessage}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {!selectedPartnerId ? (
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="text-center max-w-xs">
                <div className="w-20 h-20 bg-muted/10 border border-border/20 flex items-center justify-center mx-auto mb-8 rounded-none rotate-45 group hover:rotate-90 transition-transform duration-700">
                  <RiChat1Line className="w-8 h-8 opacity-20 -rotate-45 group-hover:-rotate-90 transition-transform duration-700" />
                </div>
                <h2 className="text-xl font-display font-black uppercase text-foreground/40 tracking-widest mb-2">
                  Channel_Idle
                </h2>
                <p className="text-[10px] font-bold text-muted-foreground/20 uppercase tracking-[0.3em]">
                  Awaiting operational input
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-border/40 bg-background/80 backdrop-blur-md flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-muted border border-border/40 flex items-center justify-center text-sm font-black text-foreground relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-primary" />
                    {(partner as { name?: string })?.name?.charAt(0) ?? "?"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display font-black uppercase tracking-widest text-foreground">
                        {(partner as { name?: string })?.name ?? "—"}
                      </p>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                    <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em] mt-1">
                      Secure_Operational_Channel
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none h-9 text-[9px] font-black uppercase tracking-widest border-border/40"
                  >
                    Archive_Feed
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-8 relative z-10">
                <div className="space-y-8 max-w-4xl mx-auto">
                  {messages.map((msg, idx) => {
                    const isOwn = (msg.sender as { id?: string })?.id === myId;
                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex flex-col",
                          isOwn ? "items-end" : "items-start",
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2 px-1">
                          {!isOwn && (
                            <span className="text-[8px] font-black uppercase tracking-widest text-primary">
                              {
                                ((partner as any)?.name || "PARTNER").split(
                                  " ",
                                )[0]
                              }
                            </span>
                          )}
                          <span className="text-[8px] font-bold text-muted-foreground/30 uppercase">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {isOwn && (
                            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">
                              You
                            </span>
                          )}
                        </div>
                        <div
                          className={cn(
                            "max-w-[70%] p-4 rounded-none border relative group transition-all duration-300",
                            isOwn
                              ? "bg-slate-950 text-white border-white/10 hover:border-primary/40 shadow-2xl"
                              : "bg-card text-foreground border-border/20 hover:border-primary/40",
                          )}
                        >
                          <p className="text-xs md:text-sm font-medium leading-relaxed">
                            {msg.content}
                          </p>

                          <div
                            className={cn(
                              "absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity translate-y-full py-1 text-[7px] font-black uppercase tracking-widest",
                              isOwn
                                ? "right-0 text-white/20"
                                : "left-0 text-black/20",
                            )}
                          >
                            ENC_SHA256_{msg.id.substring(0, 8)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="p-6 bg-background relative z-10 border-t border-border/40">
                <form
                  onSubmit={handleSend}
                  className="max-w-4xl mx-auto flex gap-4"
                >
                  <div className="relative flex-1 group">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="ENTER TERMINAL FEED..."
                      className="rounded-none h-14 bg-muted/10 border-border/20 focus:ring-0 focus:border-primary/40 pl-6 text-xs font-medium tracking-tight uppercase"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black text-muted-foreground/20 uppercase tracking-[0.2em] pointer-events-none group-focus-within:text-primary/20 transition-colors">
                      INPUT_MODE: ACTIVE
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="rounded-none h-14 w-14 shrink-0 bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 group transition-all active:scale-95"
                  >
                    <RiSendPlane2Line className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
