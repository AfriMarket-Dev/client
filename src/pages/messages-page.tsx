import {
  RiCheckDoubleLine,
  RiMore2Fill,
  RiSendPlane2Fill,
} from "@remixicon/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chats = [
  {
    id: "1",
    name: "Horizon Construction",
    lastMsg: "We sent the quotation for the steel bars.",
    time: "2h ago",
    unread: 2,
  },
  {
    id: "2",
    name: "Modern Build Ltd",
    lastMsg: "Is the site ready for delivery tomorrow?",
    time: "5h ago",
    unread: 0,
  },
  {
    id: "3",
    name: "Afriquip Suppliers",
    lastMsg: "The heavy machinery is available for rent.",
    time: "1d ago",
    unread: 0,
  },
];

const Messages = [
  {
    id: "1",
    text: "Hello, we are interested in your cement supplies for our project in Gikondo.",
    sender: "me",
    time: "10:30 AM",
  },
  {
    id: "2",
    text: "Greetings! We have bulk stock available. How many bags do you need?",
    sender: "them",
    time: "10:35 AM",
  },
  {
    id: "3",
    text: "We need around 500 bags for the first phase.",
    sender: "me",
    time: "10:40 AM",
  },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(Chats[0]);
  const [msg, setMsg] = useState("");

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white border border-slate-200 overflow-hidden rounded-none shadow-sm">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50">
        <div className="p-6 border-b border-slate-100 bg-white">
          <h1 className="text-xl font-black uppercase tracking-tight text-slate-950">
            Messages
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1 block opacity-60">
            Professional Workspace
          </span>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {Chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  activeChat.id === chat.id
                    ? "bg-white border border-slate-200 shadow-sm"
                    : "hover:bg-white/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`text-[11px] font-black uppercase tracking-tight ${activeChat.id === chat.id ? "text-primary" : "text-slate-900"}`}
                  >
                    {chat.name}
                  </span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">
                    {chat.time}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-muted-foreground line-clamp-1 truncate">
                  {chat.lastMsg}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-20 border-b border-slate-100 px-8 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-950 flex items-center justify-center text-white text-sm font-black uppercase tracking-tighter">
              {activeChat.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none mb-1">
                {activeChat.name}
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
                  Direct Supplier
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none border border-slate-100"
          >
            <RiMore2Fill className="w-5 h-5 opacity-60" />
          </Button>
        </div>

        {/* Message List */}
        <ScrollArea className="flex-1 p-8 bg-[size:40px_40px] bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 px-4 py-1.5 border border-slate-100 bg-white">
                Today
              </span>
            </div>

            {Messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "me" ? "items-end" : "items-start slab-chat-entry"}`}
              >
                <div
                  className={`max-w-[80%] p-5 rounded-none border ${
                    m.sender === "me"
                      ? "bg-slate-950 text-white border-slate-950 shadow-xl shadow-slate-950/10"
                      : "bg-white text-slate-900 border-slate-100 shadow-sm"
                  }`}
                >
                  <p className="text-[12px] font-medium leading-relaxed">
                    {m.text}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 opacity-40">
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    {m.time}
                  </span>
                  {m.sender === "me" && (
                    <RiCheckDoubleLine className="w-3 h-3 text-emerald-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-8 border-t border-slate-100 bg-white shadow-[0_-1px_0_rgba(0,0,0,0.05)]">
          <div className="max-w-4xl mx-auto flex gap-4">
            <Input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message to the supplier..."
              className="flex-1 h-14 bg-slate-50 border-slate-200 focus:ring-0 focus:border-primary/40 text-sm italic rounded-none px-6"
            />
            <Button className="h-14 px-8 rounded-none bg-slate-950 hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-slate-950/10">
              <RiSendPlane2Fill className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
