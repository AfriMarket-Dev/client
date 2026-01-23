import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Building, User, CheckCircle } from "lucide-react";

interface SupplierFormData {
  companyName: string;
  industry: string;
  registrationId: string;
  location: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  sectorAddress: string;
  fullName: string;
  email: string;
  position: string;
  contactNumber: string;
  nationalId: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export default function AdminAddSupplierPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    "Electronics",
    "Fashion & Textiles",
    "Home & Garden",
    "Beauty & Health",
    "Automotive",
    "Industrial Equipment",
    "Food & Beverages",
    "Agriculture",
    "Construction",
    "Technology",
    "Healthcare",
    "Education",
    "Other",
  ];

  const rwandaLocations = [
    "Kigali City",
    "Eastern Province",
    "Northern Province",
    "Southern Province",
    "Western Province",
  ];

  const [formData, setFormData] = useState<SupplierFormData>({
    companyName: "",
    industry: "",
    registrationId: "",
    location: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
    sectorAddress: "",
    fullName: "",
    email: "",
    position: "",
    contactNumber: "",
    nationalId: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.registrationId.trim())
      newErrors.registrationId = "Registration ID/TIN is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.sector.trim()) newErrors.sector = "Sector is required";
    if (!formData.cell.trim()) newErrors.cell = "Cell is required";
    if (!formData.village.trim()) newErrors.village = "Village is required";
    if (!formData.sectorAddress.trim())
      newErrors.sectorAddress = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.nationalId.trim())
      newErrors.nationalId = "National ID/Passport is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log("Form submitted:", formData);
      navigate("/admin/suppliers", { state: { success: true } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() =>
              currentStep === 1
                ? navigate("/admin/suppliers")
                : setCurrentStep(1)
            }
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <ChevronLeft size={20} />
            {currentStep === 1 ? "Back to Suppliers" : "Back"}
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Supplier
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Step {currentStep} of 2:{" "}
              {currentStep === 1
                ? "Company Information"
                : "Contact Person & Credentials"}
            </p>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-6 pb-4">
          <div className="flex gap-2">
            <div
              className={`flex-1 h-2 rounded-full transition-colors ${
                currentStep >= 1 ? "bg-orange-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex-1 h-2 rounded-full transition-colors ${
                currentStep >= 2 ? "bg-orange-500" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-full mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Building className="text-orange-600" size={24} />
                  Company Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="Enter company name"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.industry ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.industry}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration ID / TIN *
                </label>
                <input
                  type="text"
                  value={formData.registrationId}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationId: e.target.value })
                  }
                  placeholder="Enter registration ID or TIN"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.registrationId ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.registrationId && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.registrationId}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province/Location *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Location</option>
                    {rwandaLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    placeholder="Enter district"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.district && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.district}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector *
                  </label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) =>
                      setFormData({ ...formData, sector: e.target.value })
                    }
                    placeholder="Enter sector"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.sector ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.sector && (
                    <p className="text-red-600 text-sm mt-1">{errors.sector}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cell *
                  </label>
                  <input
                    type="text"
                    value={formData.cell}
                    onChange={(e) =>
                      setFormData({ ...formData, cell: e.target.value })
                    }
                    placeholder="Enter cell"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.cell ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cell && (
                    <p className="text-red-600 text-sm mt-1">{errors.cell}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Village *
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) =>
                      setFormData({ ...formData, village: e.target.value })
                    }
                    placeholder="Enter village"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.village ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.village && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.village}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Sector Address *
                </label>
                <textarea
                  value={formData.sectorAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, sectorAddress: e.target.value })
                  }
                  placeholder="Enter detailed address"
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.sectorAddress ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.sectorAddress && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.sectorAddress}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Contact Person & Credentials */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="text-orange-600" size={24} />
                  Contact Person & Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter full name"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position/Title *
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    placeholder="e.g., Manager, Director"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.position ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.position && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.position}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    placeholder="Enter contact number"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.contactNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.contactNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    National ID / Passport *
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) =>
                      setFormData({ ...formData, nationalId: e.target.value })
                    }
                    placeholder="Enter national ID or passport"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.nationalId ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nationalId && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.nationalId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="Enter phone number"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter password (min 8 characters)"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm password"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(1);
                  setErrors({});
                } else {
                  navigate("/admin/suppliers");
                }
              }}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>
            {currentStep === 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
              >
                Next
              </button>
            )}
            {currentStep === 2 && (
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Create Supplier
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
