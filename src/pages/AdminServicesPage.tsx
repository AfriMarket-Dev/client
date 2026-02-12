import { useState } from "react";
import { Search, Edit, Trash2, Eye, Star, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { services as mockServices } from "@/data/mockData";

export default function AdminServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Services Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Professional services available on the platform
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-primary">
                    {service.price}
                  </p>
                </div>

                {/* Customer Requests Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 rounded-lg p-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {service.totalRequests}
                    </p>
                    <p className="text-xs text-gray-600">Total Requests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-600">
                      {service.pendingRequests}
                    </p>
                    <p className="text-xs text-gray-600">Pending</p>
                  </div>
                </div>

                {/* Provider Info */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">
                      Service Provider
                    </p>
                    <p className="font-semibold text-gray-900">
                      {service.provider.fullName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {service.provider.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="font-semibold text-gray-900">
                      {service.provider.rating}
                    </span>
                    <span className="text-gray-600">
                      ({service.provider.experience} exp.)
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                      <Phone size={14} />
                      <span>{service.provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                      <Mail size={14} />
                      <span className="truncate">{service.provider.email}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/admin/services/${service.id}`)}
                    className="flex-1 p-2 hover:bg-primary/10 rounded-lg transition-all text-primary font-medium text-sm"
                  >
                    <Eye size={16} className="inline mr-1" />
                    View
                  </button>
                  <button className="flex-1 p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600 font-medium text-sm">
                    <Edit size={16} className="inline mr-1" />
                    Edit
                  </button>
                  <button className="flex-1 p-2 hover:bg-red-100 rounded-lg transition-all text-red-600 font-medium text-sm">
                    <Trash2 size={16} className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
