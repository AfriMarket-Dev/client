import React, { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  FileText,
  BadgeCheck,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { type Quote } from "@/types";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isOwn: boolean;
  type: "text" | "quote";
  quote?: Quote;
}

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantCompany: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const MessageCenter: React.FC<{ role?: "buyer" | "provider" }> = ({ role = "provider" }) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      participantName: "Jean-Paul Habimana",
      participantAvatar: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      participantCompany: "Kigali Modern Builders",
      lastMessage: "Looking forward to the cement quote.",
      lastMessageTime: "10 min ago",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: "m1",
          senderId: "buyer-1",
          senderName: "Jean-Paul Habimana",
          senderAvatar: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          content: "Hi, I need 200 bags of CIMERWA 32.5N delivered to my site in Gahanga. What's your best price?",
          timestamp: "1 hour ago",
          isRead: true,
          isOwn: false,
          type: "text",
        },
        {
          id: "m2",
          senderId: "provider-1",
          senderName: "You",
          senderAvatar: "",
          content: "Hello Jean-Paul! We can certainly help with that. Let me prepare a formal quote for you.",
          timestamp: "45 min ago",
          isRead: true,
          isOwn: true,
          type: "text",
        },
        {
          id: "m3",
          senderId: "buyer-1",
          senderName: "Jean-Paul Habimana",
          senderAvatar: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          content: "Looking forward to the cement quote.",
          timestamp: "10 min ago",
          isRead: false,
          isOwn: false,
          type: "text",
        },
      ],
    },
  ]);

  const selectedConv = conversations.find((conv) => conv.id === selectedConversation);

  const QuoteCard = ({ quote, isOwn }: { quote: Quote; isOwn: boolean }) => (
    <Card className={`w-full max-w-sm border-2 ${quote.status === 'accepted' ? 'border-emerald-500 bg-emerald-50/10' : 'border-primary/20 bg-primary/5'} overflow-hidden rounded-2xl shadow-lg`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Formal Quote</p>
            <p className="text-sm font-black text-stone-900">#Q-2024-001</p>
          </div>
          {quote.status === 'accepted' && (
            <Badge className="ml-auto bg-emerald-500 hover:bg-emerald-600 border-none">Accepted</Badge>
          )}
        </div>

        <div className="space-y-3 mb-6">
          {quote.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-stone-600 font-medium">{item.name} (x{item.quantity})</span>
              <span className="text-stone-900 font-bold">{quote.currency} {(item.unitPrice * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <Separator className="bg-primary/10" />
          <div className="flex justify-between items-center pt-1">
            <span className="font-bold text-stone-900">Total Amount</span>
            <span className="text-lg font-black text-primary">{quote.currency} {quote.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6 text-[10px] font-bold uppercase tracking-wider text-stone-500">
          <div>
            <p className="mb-1">Timeline</p>
            <p className="text-stone-900">{quote.timeline}</p>
          </div>
          <div className="text-right">
            <p className="mb-1">Valid Until</p>
            <p className="text-stone-900">Feb 20, 2024</p>
          </div>
        </div>

        {!isOwn && quote.status === 'pending' && role === 'buyer' && (
          <Button className="w-full rounded-xl font-bold h-12 shadow-lg shadow-primary/20">
            Accept & Create Agreement
          </Button>
        )}
        
        {isOwn && quote.status === 'pending' && (
          <p className="text-center text-xs font-bold text-primary italic">Awaiting Buyer Acceptance</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-stone-100 flex flex-col bg-stone-50/30">
        <div className="p-6 border-b border-stone-100">
          <h2 className="text-xl font-black text-stone-900 mb-4 font-display">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-white border-stone-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-4 border-b border-stone-100 cursor-pointer transition-all ${
                selectedConversation === conv.id ? "bg-white border-l-4 border-l-primary shadow-sm" : "hover:bg-stone-100/50"
              }`}
            >
              <div className="flex gap-3">
                <div className="relative">
                  <img src={conv.participantAvatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                  {conv.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-stone-900 truncate text-sm">{conv.participantName}</h3>
                    <span className="text-[10px] font-bold text-stone-400">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-stone-500 truncate font-medium mb-1">{conv.participantCompany}</p>
                  <p className={`text-xs truncate ${conv.unreadCount > 0 ? "font-bold text-stone-900" : "text-stone-400"}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConv ? (
          <>
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <img src={selectedConv.participantAvatar} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt="" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-stone-900">{selectedConv.participantName}</h3>
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-stone-500">{selectedConv.participantCompany}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-stone-100">
                  <Phone className="w-4 h-4 text-stone-600" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-stone-100 text-stone-600">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-stone-50/20">
              {selectedConv.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"} max-w-[80%]`}>
                    {msg.type === 'quote' ? (
                      <QuoteCard quote={msg.quote!} isOwn={msg.isOwn} />
                    ) : (
                      <div className={`px-5 py-3 rounded-2xl shadow-sm font-medium text-sm ${
                        msg.isOwn ? "bg-primary text-white rounded-tr-none" : "bg-white border border-stone-100 text-stone-800 rounded-tl-none"
                      }`}>
                        <p>{msg.content}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 mt-2 px-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase">{msg.timestamp}</span>
                      {msg.isOwn && (
                        msg.isRead ? <CheckCheck className="w-3 h-3 text-primary" /> : <Check className="w-3 h-3 text-stone-300" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-stone-100 bg-white">
              <form className="flex items-center gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" className="rounded-xl text-stone-400 hover:text-primary">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  {role === 'provider' && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl text-stone-400 hover:text-primary"
                      onClick={() => setIsQuoteDialogOpen(true)}
                    >
                      <FileText className="w-5 h-5" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="h-12 bg-stone-50 border-none rounded-2xl px-6 focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
                <Button 
                  className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-6 border border-stone-100">
              <MessageSquare className="w-10 h-10 text-stone-200" />
            </div>
            <h3 className="text-2xl font-black text-stone-900 mb-2">Your Conversations</h3>
            <p className="text-stone-500 max-w-sm mx-auto font-medium">Select a provider or customer from the list to start discussing project requirements.</p>
          </div>
        )}
      </div>

      {/* Create Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black font-display">Create Formal Quote</DialogTitle>
            <DialogDescription className="font-medium text-stone-500">
              Send a structured offer to <span className="text-stone-900 font-bold">Jean-Paul Habimana</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="py-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-stone-500">Item Name</label>
                <Input defaultValue="CIMERWA Portland Cement 32.5N" className="h-12 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-stone-500">Qty</label>
                  <Input type="number" defaultValue="200" className="h-12 rounded-xl text-center" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-stone-500">Unit Price (RWF)</label>
                  <Input type="number" defaultValue="12500" className="h-12 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-bold text-primary">Add another item</span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-stone-500">Delivery Timeline</label>
                <Input placeholder="e.g. 2 Business Days" defaultValue="2-3 Business Days" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2 text-right">
                <p className="text-xs font-black uppercase tracking-widest text-stone-500 mb-1">Total Quote Amount</p>
                <p className="text-3xl font-black text-primary">RWF 2,500,000</p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-4">
            <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-bold" onClick={() => setIsQuoteDialogOpen(false)}>
              Discard
            </Button>
            <Button className="flex-1 h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
              Send Quote Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageCenter;
