import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Package,
  Truck,
  Shield,
  Clock,
  Heart,
  Eye,
  Grid,
  List,
  Send,
  Building,
  Calendar,
  Verified,
  X,
  Paperclip,
  Smile,
} from "lucide-react";
import { suppliers, products } from "../data/mockData";
import { type Product } from "../types";
import { useWishlist } from "../hooks/useWishlist";

interface SupplierDetailsProps {
  supplierId: string;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({
  supplierId,
  onBack,
  onProductClick,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const supplier = suppliers.find((s) => s.id === supplierId);
  const supplierProducts = products.filter((p) => p.supplierId === supplierId);

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "reviews" | "contact"
  >("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      sender: "supplier",
      message: "Hello! Welcome to our store. How can I help you today?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
  ]);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    productInterest: "",
    orderQuantity: "",
  });

  if (!supplier) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Supplier Not Found
          </h2>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const categories = [
    "all",
    ...Array.from(new Set(supplierProducts.map((p) => p.category))),
  ];
  const filteredProducts =
    selectedCategory === "all"
      ? supplierProducts
      : supplierProducts.filter((p) => p.category === selectedCategory);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Inquiry submitted:", inquiryForm);
    setShowInquiryForm(false);
    // Reset form
    setInquiryForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
      productInterest: "",
      orderQuantity: "",
    });
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "customer",
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setChatMessage("");

      // Simulate supplier response after 2 seconds
      setTimeout(() => {
        const supplierResponse = {
          id: (Date.now() + 1).toString(),
          sender: "supplier",
          message:
            "Thank you for your message! I'll get back to you with more details shortly.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: false,
        };
        setChatMessages((prev) => [...prev, supplierResponse]);
      }, 2000);
    }
  };

  const ChatModal = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <img
              src={supplier.avatar}
              alt={supplier.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">{supplier.name}</h3>
              <div className="flex items-center text-sm text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                Online
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowChatModal(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs ${message.isOwn ? "order-2" : "order-1"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 ${message.isOwn ? "text-right" : "text-left"}`}
                >
                  {message.timestamp}
                </div>
              </div>
              {!message.isOwn && (
                <img
                  src={supplier.avatar}
                  alt={supplier.name}
                  className="w-8 h-8 rounded-full object-cover order-1 mr-2"
                />
              )}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={handleSendChatMessage}
            className="flex items-center space-x-2"
          >
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
            >
              <Smile className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
            </div>
            <button
              type="submit"
              disabled={!chatMessage.trim()}
              className="p-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const InquiryModal = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Send Inquiry</h2>
            <p className="text-muted-foreground">
              Get in touch with {supplier.name}
            </p>
          </div>
          <button
            onClick={() => setShowInquiryForm(false)}
            className="text-muted-foreground hover:text-foreground text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleInquirySubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={inquiryForm.name}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={inquiryForm.email}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={inquiryForm.company}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, company: e.target.value })
                }
                className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={inquiryForm.phone}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Interest
              </label>
              <select
                value={inquiryForm.productInterest}
                onChange={(e) =>
                  setInquiryForm({
                    ...inquiryForm,
                    productInterest: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              >
                <option value="">Select a category</option>
                {supplier.specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expected Order Quantity
              </label>
              <input
                type="text"
                value={inquiryForm.orderQuantity}
                onChange={(e) =>
                  setInquiryForm({
                    ...inquiryForm,
                    orderQuantity: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="e.g., 100 units"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Subject *
            </label>
            <input
              type="text"
              required
              value={inquiryForm.subject}
              onChange={(e) =>
                setInquiryForm({ ...inquiryForm, subject: e.target.value })
              }
              className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              placeholder="Brief subject of your inquiry"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message *
            </label>
            <textarea
              required
              rows={5}
              value={inquiryForm.message}
              onChange={(e) =>
                setInquiryForm({ ...inquiryForm, message: e.target.value })
              }
              className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
              placeholder="Describe your requirements, questions, or any specific details..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowInquiryForm(false)}
              className="flex-1 border-2 border-border text-foreground py-3 rounded-xl font-semibold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Suppliers
          </button>
        </div>
      </div>

      {/* Hero Section with African patterns */}
      <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 400">
            <defs>
              <pattern
                id="supplier-pattern"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="40,10 60,30 40,50 20,30"
                  fill="currentColor"
                  opacity="0.3"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.2"
                />
                <path
                  d="M20,20 L60,60 M60,20 L20,60"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.1"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#supplier-pattern)"
              className="text-primary/10"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Supplier Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={supplier.avatar}
                    alt={supplier.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-background shadow-lg"
                  />
                  {supplier.verified && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                      {supplier.name}
                    </h1>
                    {supplier.verified && (
                      <div className="flex items-center bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
                        <Verified className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-warning fill-current mr-1" />
                      <span className="font-semibold text-foreground">
                        {supplier.rating}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        ({supplier.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {supplier.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {supplier.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg">
              <h3 className="font-semibold text-foreground mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-primary mr-2" />
                    <span className="text-muted-foreground">Products</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {supplier.totalProducts}
                  </span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-gray-600">Delivery</span>
                  </div>
                  <span className="font-semibold text-gray-900">{supplier.services.deliveryTime}</span>
                </div> */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-success mr-2" />
                    <span className="text-muted-foreground">Min. Order</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {supplier.services.minimumOrder}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-muted-foreground">Joined</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {new Date(supplier.joinedDate).getFullYear()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full mt-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Inquiry
              </button>

              <button
                onClick={() => {
                  if (isInWishlist(supplier.id, "supplier")) {
                    removeFromWishlist(supplier.id, "supplier");
                  } else {
                    addToWishlist(supplier, "supplier");

                    <button
                      onClick={() => setShowChatModal(true)}
                      className="w-full bg-gradient-to-r from-success to-success/90 text-success-foreground py-4 rounded-xl font-bold text-lg hover:from-success/90 hover:to-success transition-colors flex items-center justify-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat with Supplier
                    </button>;
                  }
                }}
                className={`w-full mt-3 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center ${
                  isInWishlist(supplier.id, "supplier")
                    ? "bg-destructive/10 text-destructive border-2 border-destructive/20 hover:bg-destructive/20"
                    : "bg-card text-foreground border-2 border-border hover:bg-muted"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isInWishlist(supplier.id, "supplier") ? "fill-current" : ""
                  }`}
                />
                {isInWishlist(supplier.id, "supplier")
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>

              {/* <button
                onClick={() => setShowChatModal(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-background border-b border-border sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Building },
              { id: "products", label: "Products", icon: Package },
              { id: "reviews", label: "Reviews", icon: Star },
              { id: "contact", label: "Contact", icon: MessageCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Services */}
              <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Services & Capabilities
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Truck className="w-5 h-5 text-primary mr-2" />
                      Shipping Options
                    </h4>
                    <ul className="space-y-2">
                      {supplier.services.shipping.map((option, index) => (
                        <li
                          key={index}
                          className="flex items-center text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      Payment Methods
                    </h4>
                    <ul className="space-y-2">
                      {supplier.services.paymentMethods.map((method, index) => (
                        <li
                          key={index}
                          className="flex items-center text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              {supplier.gallery && supplier.gallery.length > 0 && (
                <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {supplier.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-xl bg-muted aspect-square group cursor-pointer"
                      >
                        <img
                          src={image}
                          alt={`${supplier.name} gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Products Preview */}
              <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">
                    Featured Products
                  </h3>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="text-primary hover:text-primary/80 font-medium flex items-center"
                  >
                    View All
                    <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {supplierProducts.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => onProductClick(product)}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInWishlist(product.id, "product")) {
                              removeFromWishlist(product.id, "product");
                            } else {
                              addToWishlist(product, "product");
                            }
                          }}
                          className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isInWishlist(product.id, "product")
                                ? "text-destructive fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                        <h4 className="font-medium text-foreground line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          ${product.priceRange.min} - ${product.priceRange.max}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${supplier.contact.email}`}
                    className="flex items-center p-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      {/* <div className="text-sm text-gray-600">{supplier.contact.email}</div> */}
                    </div>
                  </a>

                  <a
                    href={`tel:${supplier.contact.phone}`}
                    className="flex items-center p-3 bg-success/10 hover:bg-success/20 rounded-xl transition-colors"
                  >
                    <Phone className="w-5 h-5 text-success mr-3" />
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      {/* <div className="text-sm text-gray-600">{supplier.contact.phone}</div> */}
                    </div>
                  </a>

                  {supplier.contact.whatsapp && (
                    <a
                      href={`https://wa.me/${supplier.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-success/10 hover:bg-success/20 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-success mr-3" />
                      <div>
                        <div className="font-medium text-foreground">
                          WhatsApp
                        </div>
                        {/* <div className="text-sm text-gray-600">{supplier.contact.whatsapp}</div> */}
                      </div>
                    </a>
                  )}

                  <button
                    onClick={() => setShowChatModal(true)}
                    className="flex items-center w-full p-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-foreground">
                        Live Chat
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Chat directly on platform
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday - Friday
                    </span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            {/* Products Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Products</h2>
                <p className="text-muted-foreground">
                  Browse {supplierProducts.length} products from {supplier.name}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>

                <div className="flex items-center bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-card text-primary shadow-sm"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-card text-primary shadow-sm"
                        : "text-muted-foreground"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-primary">
                          ${product.priceRange.min} - ${product.priceRange.max}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Min. order: {product.minimumOrder} units
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
            <div className="text-center">
              <Star className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Reviews Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Customer reviews and ratings will be displayed here.
              </p>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <a
                  href={`mailto:${supplier.contact.email}`}
                  className="flex items-center p-4 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
                >
                  <Mail className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-semibold text-foreground">
                      Email Us
                    </div>
                    {/* <div className="text-gray-600">{supplier.contact.email}</div> */}
                  </div>
                </a>

                <a
                  href={`tel:${supplier.contact.phone}`}
                  className="flex items-center p-4 bg-success/10 hover:bg-success/20 rounded-xl transition-colors"
                >
                  <Phone className="w-6 h-6 text-success mr-4" />
                  <div>
                    <div className="font-semibold text-foreground">Call Us</div>
                    {/* <div className="text-gray-600">{supplier.contact.phone}</div> */}
                  </div>
                </a>

                {supplier.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${supplier.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-success/10 hover:bg-success/20 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 text-success mr-4" />
                    <div>
                      <div className="font-semibold text-foreground">
                        WhatsApp
                      </div>
                      {/* <div className="text-gray-600">{supplier.contact.whatsapp}</div> */}
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Business Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground">
                      {supplier.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="font-medium text-foreground">
                      Established
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(supplier.joinedDate).getFullYear()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Package className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="font-medium text-foreground">
                      Total Products
                    </div>
                    <div className="text-muted-foreground">
                      {supplier.totalProducts} items
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Star className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="font-medium text-foreground">Rating</div>
                    <div className="text-muted-foreground">
                      {supplier.rating}/5.0 ({supplier.reviewCount} reviews)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryForm && <InquiryModal />}

      {/* Chat Modal */}
      {showChatModal && <ChatModal />}
    </div>
  );
};

export default SupplierDetails;
