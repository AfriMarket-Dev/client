import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Star, Clock, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isOwn: boolean;
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

const MessageCenter: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participantName: 'John Kamau',
      participantAvatar: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      participantCompany: 'Nairobi Electronics Ltd',
      lastMessage: 'What\'s the minimum order quantity for the Samsung phones?',
      lastMessageTime: '2 hours ago',
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: '1',
          senderId: '1',
          senderName: 'John Kamau',
          senderAvatar: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          content: 'Hi, I\'m interested in your Samsung Galaxy A54 5G bulk pack.',
          timestamp: '3 hours ago',
          isRead: true,
          isOwn: false
        },
        {
          id: '2',
          senderId: 'supplier',
          senderName: 'You',
          senderAvatar: '',
          content: 'Hello John! Thank you for your interest. The Samsung Galaxy A54 5G is one of our best sellers. What quantity are you looking for?',
          timestamp: '2.5 hours ago',
          isRead: true,
          isOwn: true
        },
        {
          id: '3',
          senderId: '1',
          senderName: 'John Kamau',
          senderAvatar: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          content: 'What\'s the minimum order quantity for the Samsung phones?',
          timestamp: '2 hours ago',
          isRead: false,
          isOwn: false
        }
      ]
    },
    {
      id: '2',
      participantName: 'Sarah Mwangi',
      participantAvatar: 'https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      participantCompany: 'Kigali Fashion House',
      lastMessage: 'Perfect! Can you send me a quote for 200 pieces?',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: '1',
          senderId: '2',
          senderName: 'Sarah Mwangi',
          senderAvatar: 'https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          content: 'Hi! I saw your Ankara fabric collection. Do you have any new patterns?',
          timestamp: '1 day ago',
          isRead: true,
          isOwn: false
        },
        {
          id: '2',
          senderId: 'supplier',
          senderName: 'You',
          senderAvatar: '',
          content: 'Yes, we just received new patterns from our suppliers in Ghana. I can send you the catalog.',
          timestamp: '1 day ago',
          isRead: true,
          isOwn: true
        },
        {
          id: '3',
          senderId: '2',
          senderName: 'Sarah Mwangi',
          senderAvatar: 'https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          content: 'Perfect! Can you send me a quote for 200 pieces?',
          timestamp: '1 day ago',
          isRead: true,
          isOwn: false
        }
      ]
    },
    {
      id: '3',
      participantName: 'David Ochieng',
      participantAvatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      participantCompany: 'Kampala Home Supplies',
      lastMessage: 'Thank you for the quick response!',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: '1',
          senderId: '3',
          senderName: 'David Ochieng',
          senderAvatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          content: 'Hello, I need furniture for a new hotel project. Can you help?',
          timestamp: '2 days ago',
          isRead: true,
          isOwn: false
        },
        {
          id: '2',
          senderId: 'supplier',
          senderName: 'You',
          senderAvatar: '',
          content: 'Absolutely! We specialize in hotel furniture. What specific items do you need?',
          timestamp: '2 days ago',
          isRead: true,
          isOwn: true
        },
        {
          id: '3',
          senderId: '3',
          senderName: 'David Ochieng',
          senderAvatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          content: 'Thank you for the quick response!',
          timestamp: '2 days ago',
          isRead: true,
          isOwn: false
        }
      ]
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participantCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-white rounded-xl border border-gray-100 overflow-hidden flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-primary/5 border-r-4 border-r-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participantAvatar}
                    alt={conversation.participantName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.participantName}</h3>
                    <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1 truncate">{conversation.participantCompany}</p>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedConv.participantAvatar}
                    alt={selectedConv.participantName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedConv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConv.participantName}</h3>
                  <p className="text-sm text-gray-600">{selectedConv.participantCompany}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConv.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-gradient-to-r from-primary to-primary/90 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`flex items-center mt-1 space-x-1 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.isOwn && (
                        <div className="text-gray-400">
                          {message.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                        </div>
                      )}
                    </div>
                  </div>
                  {!message.isOwn && (
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-8 h-8 rounded-full object-cover order-1 mr-2"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:from-primary/90 hover:to-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;