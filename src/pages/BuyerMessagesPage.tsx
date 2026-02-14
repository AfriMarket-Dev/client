import React from "react";
import MessageCenter from "@/components/supplier/MessageCenter";

const BuyerMessagesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-160px)]">
      <MessageCenter role="buyer" />
    </div>
  );
};

export default BuyerMessagesPage;
