import React from "react";
import MessageCenter from "@/components/supplier/MessageCenter";

const BuyerMessagesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-stone-900 font-display">My Conversations</h1>
        <p className="text-stone-500 font-medium mt-1">Directly chat with providers and manage your construction quotes.</p>
      </div>
      <MessageCenter role="buyer" />
    </div>
  );
};

export default BuyerMessagesPage;
