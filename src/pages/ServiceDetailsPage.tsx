import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Mail,
  Phone,
  Calendar,
  Users,
  Briefcase,
  Clock,
  MessageSquare,
} from "lucide-react";
import { services as mockServices } from "@/data/mockData";

export default function ServiceDetailsPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");

  const service = mockServices.find((s) => s.id === parseInt(serviceId || "0"));

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Service not found
          </h1>
          <button
            onClick={() => navigate("/admin/services")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/services")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
        >
          <ChevronLeft size={20} />
          Back to Services
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 shadow-md">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Service Overview */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <IconComponent size={40} className="text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {service.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {service.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary mb-2">
              {service.price}
            </div>
            <div className="text-sm text-gray-600">Pricing</div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-600">
                Customer Requests
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-900">
              {service.totalRequests || 0}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare size={20} className="text-green-600" />
              <span className="text-sm font-medium text-gray-600">
                Pending Inquiries
              </span>
            </div>
            <p className="text-3xl font-bold text-green-900">
              {service.pendingRequests || 0}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-600">
                Avg. Response Time
              </span>
            </div>
            <p className="text-3xl font-bold text-purple-900">2-4 hrs</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Provider Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provider Details */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase size={24} className="text-primary" />
              Service Provider
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Full Name</span>
                <span className="font-semibold text-gray-900">
                  {service.provider.fullName}
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Role</span>
                <span className="font-semibold text-gray-900">
                  {service.provider.role}
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Experience</span>
                <span className="font-semibold text-gray-900">
                  {service.provider.experience}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star size={18} className="text-gray-300 fill-gray-300" />
                  </div>
                  <span className="font-semibold text-gray-900">
                    {service.provider.rating}/5.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock size={24} className="text-primary" />
              Recent Customer Requests
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 1,
                  customer: "ABC Trading Co.",
                  date: "2026-01-22",
                  status: "pending",
                  message: "Need equipment rental for 2 weeks starting Feb 1st",
                },
                {
                  id: 2,
                  customer: "Global Imports Ltd",
                  date: "2026-01-21",
                  status: "completed",
                  message: "Bulk shipping quote for 50 containers to Nairobi",
                },
                {
                  id: 3,
                  customer: "Retail Solutions",
                  date: "2026-01-20",
                  status: "completed",
                  message: "Trade support for product authentication",
                },
                {
                  id: 4,
                  customer: "Fashion Hub Africa",
                  date: "2026-01-19",
                  status: "pending",
                  message: "Equipment rental for warehouse setup",
                },
                {
                  id: 5,
                  customer: "Tech Distributors",
                  date: "2026-01-18",
                  status: "completed",
                  message: "Shipping consultation and logistics planning",
                },
              ].map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {request.customer}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {request.message}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        request.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(request.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Provider Contact & Actions */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact</h3>

            <div className="space-y-4">
              <a
                href={`mailto:${service.provider.email}`}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Mail size={20} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {service.provider.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${service.provider.phone}`}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Phone size={20} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm font-medium text-gray-900">
                    {service.provider.phone}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Performance
            </h3>

            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-gray-200">
                <p className="text-3xl font-bold text-primary">
                  {service.provider.rating}
                </p>
                <p className="text-sm text-gray-600 mt-1">Average Rating</p>
              </div>

              <div className="text-center pb-4 border-b border-gray-200">
                <p className="text-3xl font-bold text-green-600">98%</p>
                <p className="text-sm text-gray-600 mt-1">
                  Customer Satisfaction
                </p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">156</p>
                <p className="text-sm text-gray-600 mt-1">Services Delivered</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowContactModal(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium rounded-lg hover:from-primary/90 hover:to-primary transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              Send Message
            </button>
            <button className="w-full px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors">
              View More Services
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Send Message to {service.provider.fullName}
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Service inquiry"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowContactModal(false);
                    setMessage("");
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium rounded-lg hover:from-primary/90 hover:to-primary transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
