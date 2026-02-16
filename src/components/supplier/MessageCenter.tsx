import { useState } from "react";
import {
  Search,
  MessageSquare,
  Paperclip,
  Smile,
  Send,
  MoreVertical,
  Phone,
  Video,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface MessageCenterProps {
  role: "buyer" | "provider";
}

const MessageCenter: React.FC<MessageCenterProps> = () => {
  const [activeChat, setActiveChat] = useState<string | null>("1");
  const [message, setMessage] = useState("");

  const chats: Chat[] = [
    {
      id: "1",
      name: "Jean-Paul Habimana",
      avatar:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=100",
      lastMessage: "Can we finalize the cement delivery?",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Alice Umutoni",
      avatar:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=100",
      lastMessage: "Sent the quote for the steel bars.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "2",
      text: "Hello, I'm inquiring about the premium cement.",
      timestamp: "9:00 AM",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "1",
      text: "Hi! Yes, we have 500 bags in stock.",
      timestamp: "9:05 AM",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "2",
      text: "Great. Can we finalize the cement delivery for next Tuesday?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
  ];

  return (
    <div className="flex h-full bg-background border border-border rounded-sm overflow-hidden shadow-2xl">
      {/* Sidebar */}
      <div
        className={cn(
          "w-full md:w-80 lg:w-96 border-r-2 border-border flex flex-col bg-muted/10",
          activeChat && "hidden md:flex",
        )}
      >
        <div className="p-6 border-b-2 border-border bg-background">
          <h2 className="text-xl font-heading font-bold uppercase tracking-widest text-foreground mb-4">
            Transmission Hub
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="SEARCH CHANNELS..."
              className="pl-10 h-11 bg-muted/20 border border-border uppercase text-[10px] font-bold tracking-widest shadow-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={cn(
                "w-full p-4 flex items-start gap-4 hover:bg-muted/50 transition-all border-b-2 border-border/50 group text-left",
                activeChat === chat.id
                  ? "bg-background border-l-4 border-l-primary"
                  : "border-l-4 border-l-transparent",
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-12 w-12 rounded-sm border border-border shadow-md">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="font-heading font-bold">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-heading font-bold text-foreground text-sm uppercase truncate">
                    {chat.name}
                  </span>
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest shrink-0">
                    {chat.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate font-medium uppercase tracking-tight">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-primary text-primary-foreground text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-background",
          !activeChat && "hidden md:flex",
        )}
      >
        {activeChat ? (
          <>
            <div className="h-20 border-b-2 border-border px-6 flex items-center justify-between bg-background/80 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setActiveChat(null)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-sm border border-border">
                    <AvatarImage
                      src={chats.find((c) => c.id === activeChat)?.avatar}
                    />
                    <AvatarFallback className="font-heading font-bold">
                      J
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-heading font-bold text-foreground text-sm uppercase tracking-widest">
                      {chats.find((c) => c.id === activeChat)?.name}
                    </div>
                    <div className="flex items-center text-success text-[10px] font-black uppercase tracking-[0.2em]">
                      <div className="w-1.5 h-1.5 bg-success rounded-full mr-1.5 animate-pulse" />
                      Encrypted Link
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border border-border rounded-sm hover:border-primary"
                >
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border border-border rounded-sm hover:border-primary"
                >
                  <Video className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border border-border rounded-sm hover:border-primary"
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/5 relative">
              <div className="absolute inset-0 african-pattern opacity-5 pointer-events-none" />
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.isOwn ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] lg:max-w-[60%] rounded-sm p-4 relative border",
                      msg.isOwn
                        ? "bg-foreground text-background border-foreground shadow-xl"
                        : "bg-background text-foreground border-border",
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-medium leading-relaxed",
                        msg.isOwn ? "" : "font-mono italic",
                      )}
                    >
                      {msg.text}
                    </p>
                    <div
                      className={cn(
                        "text-[8px] font-black uppercase tracking-widest mt-2",
                        msg.isOwn
                          ? "text-background/60 text-right"
                          : "text-muted-foreground",
                      )}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t-2 border-border bg-background">
              <form
                className="flex items-center gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border border-border rounded-sm hover:bg-muted shrink-0"
                >
                  <Paperclip className="w-5 h-5 text-muted-foreground" />
                </Button>
                <div className="relative flex-1">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="TYPE TRANSMISSION..."
                    className="h-12 bg-muted/10 border border-border rounded-sm px-4 pr-12 font-bold uppercase text-xs tracking-wider shadow-none focus:bg-background"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <Button className="h-12 px-6 rounded-sm font-heading font-bold uppercase tracking-widest shadow-lg shadow-primary/20 shrink-0">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-muted/5">
            <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
            <div className="w-20 h-20 bg-muted/20 border-4 border-border rounded-sm flex items-center justify-center mb-6 relative z-10 shadow-xl">
              <MessageSquare className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground uppercase tracking-widest mb-2 relative z-10">
              Transmission Standby
            </h3>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.2em] max-w-xs leading-loose relative z-10">
              Select a secure node from the hub to initialize communication
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
