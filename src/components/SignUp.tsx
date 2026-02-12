import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Building,
  Check,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  FileText,
  Shield,
  Users,
} from "lucide-react";

interface CustomerFormData {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface SupplierStep1Data {
  companyName: string;
  industry: string;
  registrationId: string;
  representativeType: "individual" | "company-rep";
  location: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  sectorAddress: string;
}

interface SupplierStep2Data {
  fullName: string;
  email: string;
  position: string;
  contactNumber: string;
  nationalId: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface SignUpProps {
  onBack: () => void;
  onSignUpComplete: (type: "customer" | "supplier", data: any) => void;
  isLoading?: boolean;
  serverError?: string;
}

const SignUp: React.FC<SignUpProps> = ({
  onBack,
  onSignUpComplete,
  isLoading,
  serverError,
}) => {
  const [accountType, setAccountType] = useState<
    "customer" | "supplier" | null
  >(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data states
  const [customerData, setCustomerData] = useState<CustomerFormData>({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [supplierStep1Data, setSupplierStep1Data] = useState<SupplierStep1Data>(
    {
      companyName: "",
      industry: "",
      registrationId: "",
      representativeType: "individual",
      location: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
      sectorAddress: "",
    },
  );

  const [supplierStep2Data, setSupplierStep2Data] = useState<SupplierStep2Data>(
    {
      fullName: "",
      email: "",
      position: "",
      contactNumber: "",
      nationalId: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  );

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

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateCustomerForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!customerData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(customerData.email))
      newErrors.email = "Invalid email format";
    if (!customerData.address.trim()) newErrors.address = "Address is required";
    if (!customerData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!validatePhone(customerData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number";
    if (!customerData.password) newErrors.password = "Password is required";
    else if (!validatePassword(customerData.password))
      newErrors.password = "Password must be at least 8 characters";
    if (customerData.password !== customerData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSupplierStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!supplierStep1Data.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!supplierStep1Data.industry)
      newErrors.industry = "Industry is required";
    if (!supplierStep1Data.registrationId.trim())
      newErrors.registrationId = "Registration ID/TIN is required";
    if (!supplierStep1Data.location)
      newErrors.location = "Location is required";
    if (!supplierStep1Data.district.trim())
      newErrors.district = "District is required";
    if (!supplierStep1Data.sector.trim())
      newErrors.sector = "Sector is required";
    if (!supplierStep1Data.cell.trim()) newErrors.cell = "Cell is required";
    if (!supplierStep1Data.village.trim())
      newErrors.village = "Village is required";
    if (!supplierStep1Data.sectorAddress.trim())
      newErrors.sectorAddress = "Sector address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSupplierStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!supplierStep2Data.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!supplierStep2Data.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(supplierStep2Data.email))
      newErrors.email = "Invalid email format";
    if (!supplierStep2Data.position.trim())
      newErrors.position = "Position is required";
    if (!supplierStep2Data.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    else if (!validatePhone(supplierStep2Data.contactNumber))
      newErrors.contactNumber = "Invalid contact number";
    if (!supplierStep2Data.nationalId.trim())
      newErrors.nationalId = "National ID/Passport is required";
    if (!supplierStep2Data.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!validatePhone(supplierStep2Data.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number";
    if (!supplierStep2Data.password)
      newErrors.password = "Password is required";
    else if (!validatePassword(supplierStep2Data.password))
      newErrors.password = "Password must be at least 8 characters";
    if (supplierStep2Data.password !== supplierStep2Data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (accountType === "supplier" && currentStep === 1) {
      if (validateSupplierStep1()) {
        setCurrentStep(2);
        setErrors({});
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (accountType === "customer") {
      if (validateCustomerForm()) {
        onSignUpComplete("customer", customerData);
      }
    } else if (accountType === "supplier" && currentStep === 2) {
      if (validateSupplierStep2()) {
        onSignUpComplete("supplier", {
          ...supplierStep1Data,
          ...supplierStep2Data,
        });
      }
    }
  };

  const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    error,
    required = true,
    placeholder,
    icon: Icon,
  }: {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    icon?: React.ComponentType<any>;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
            error ? "border-red-500 bg-red-50" : "border-gray-200"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  const SelectField = ({
    label,
    value,
    onChange,
    options,
    error,
    required = true,
    placeholder,
    icon: Icon,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[] | { value: string; label: string }[];
    error?: string;
    required?: boolean;
    placeholder?: string;
    icon?: React.ComponentType<any>;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
            error ? "border-red-500 bg-red-50" : "border-gray-200"
          }`}
        >
          <option value="">
            {placeholder || `Select ${label.toLowerCase()}`}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={typeof option === "string" ? option : option.value}
            >
              {typeof option === "string" ? option : option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  const PasswordField = ({
    label,
    value,
    onChange,
    error,
    show,
    onToggleShow,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    show: boolean;
    onToggleShow: () => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Shield className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
            error ? "border-red-500 bg-red-50" : "border-gray-200"
          }`}
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {show ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  // Account Type Selection
  if (!accountType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-transparent flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <button
              onClick={onBack}
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join AfrikaMarket
            </h1>
            <p className="text-xl text-gray-600">
              Choose your account type to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer Account */}
            <div
              onClick={() => setAccountType("customer")}
              className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-2xl transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Customer Account
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfect for retailers and businesses looking to source quality
                  products from verified African suppliers.
                </p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Browse thousands of products</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Connect with verified suppliers</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Access bulk pricing</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Secure payment options</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-colors">
                  Sign Up as Customer
                </button>
              </div>
            </div>

            {/* Supplier Account */}
            <div
              onClick={() => setAccountType("supplier")}
              className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-2xl transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Supplier Account
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Ideal for wholesalers, importers, and manufacturers ready to
                  expand their reach across Africa.
                </p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>List unlimited products</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Reach thousands of buyers</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Verified supplier badge</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Analytics and insights</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors">
                  Sign Up as Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-transparent flex">
      {/* Left Side - Form */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => {
                if (accountType === "supplier" && currentStep === 2) {
                  setCurrentStep(1);
                  setErrors({});
                } else {
                  setAccountType(null);
                  setCurrentStep(1);
                  setErrors({});
                }
              }}
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {accountType === "supplier" && currentStep === 2
                ? "Back to Step 1"
                : "Back to Account Type"}
            </button>

            {/* Logo */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AfrikaMarket
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Wholesale Hub</p>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl text-white mr-3 ${
                  accountType === "customer"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                    : "bg-gradient-to-br from-primary to-primary/80"
                }`}
              >
                {accountType === "customer" ? (
                  <User className="w-6 h-6" />
                ) : (
                  <Building className="w-6 h-6" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {accountType === "customer" ? "Customer" : "Supplier"} Sign Up
                </h1>
                {accountType === "supplier" && (
                  <p className="text-gray-600">Step {currentStep} of 2</p>
                )}
              </div>
            </div>

            {/* Progress Indicator for Supplier */}
            {accountType === "supplier" && (
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div
                  className={`flex items-center ${currentStep >= 1 ? "text-primary" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
                  </div>
                  <span className="ml-2 font-medium">Company Info</span>
                </div>
                <div
                  className={`w-16 h-1 rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-200"}`}
                ></div>
                <div
                  className={`flex items-center ${currentStep >= 2 ? "text-primary" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= 2
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-2 font-medium">Representative</span>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {serverError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {serverError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Form */}
              {accountType === "customer" && (
                <>
                  <InputField
                    label="Full Name"
                    value={customerData.fullName}
                    onChange={(value) =>
                      setCustomerData({ ...customerData, fullName: value })
                    }
                    error={errors.fullName}
                    placeholder="Enter your full name"
                    icon={User}
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    value={customerData.email}
                    onChange={(value) =>
                      setCustomerData({ ...customerData, email: value })
                    }
                    error={errors.email}
                    placeholder="Enter your email address"
                    icon={Mail}
                  />

                  <InputField
                    label="Address"
                    value={customerData.address}
                    onChange={(value) =>
                      setCustomerData({ ...customerData, address: value })
                    }
                    error={errors.address}
                    placeholder="Enter your address"
                    icon={MapPin}
                  />

                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={customerData.phoneNumber}
                    onChange={(value) =>
                      setCustomerData({ ...customerData, phoneNumber: value })
                    }
                    error={errors.phoneNumber}
                    placeholder="Enter your phone number"
                    icon={Phone}
                  />

                  <PasswordField
                    label="Password"
                    value={customerData.password}
                    onChange={(value) =>
                      setCustomerData({ ...customerData, password: value })
                    }
                    error={errors.password}
                    show={showPassword}
                    onToggleShow={() => setShowPassword(!showPassword)}
                  />

                  <PasswordField
                    label="Confirm Password"
                    value={customerData.confirmPassword}
                    onChange={(value) =>
                      setCustomerData({
                        ...customerData,
                        confirmPassword: value,
                      })
                    }
                    error={errors.confirmPassword}
                    show={showConfirmPassword}
                    onToggleShow={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  />
                </>
              )}

              {/* Supplier Step 1 */}
              {accountType === "supplier" && currentStep === 1 && (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Company Information
                    </h3>
                    <p className="text-gray-600">Tell us about your business</p>
                  </div>

                  <InputField
                    label="Company Name"
                    value={supplierStep1Data.companyName}
                    onChange={(value) =>
                      setSupplierStep1Data({
                        ...supplierStep1Data,
                        companyName: value,
                      })
                    }
                    error={errors.companyName}
                    placeholder="Enter your company name"
                    icon={Building}
                  />

                  <SelectField
                    label="Industry"
                    value={supplierStep1Data.industry}
                    onChange={(value) =>
                      setSupplierStep1Data({
                        ...supplierStep1Data,
                        industry: value,
                      })
                    }
                    options={industries}
                    error={errors.industry}
                    icon={Users}
                  />

                  <InputField
                    label="Registration ID or TIN Number"
                    value={supplierStep1Data.registrationId}
                    onChange={(value) =>
                      setSupplierStep1Data({
                        ...supplierStep1Data,
                        registrationId: value,
                      })
                    }
                    error={errors.registrationId}
                    placeholder="Enter registration ID or TIN"
                    icon={FileText}
                  />

                  <SelectField
                    label="Representative Type"
                    value={supplierStep1Data.representativeType}
                    onChange={(value) =>
                      setSupplierStep1Data({
                        ...supplierStep1Data,
                        representativeType: value as
                          | "individual"
                          | "company-rep",
                      })
                    }
                    options={[
                      { value: "individual", label: "Individual" },
                      { value: "company-rep", label: "Company Representative" },
                    ]}
                    error={errors.representativeType}
                    icon={User}
                  />

                  <SelectField
                    label="Location (Province)"
                    value={supplierStep1Data.location}
                    onChange={(value) =>
                      setSupplierStep1Data({
                        ...supplierStep1Data,
                        location: value,
                      })
                    }
                    options={rwandaLocations}
                    error={errors.location}
                    icon={MapPin}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      label="District"
                      value={supplierStep1Data.district}
                      onChange={(value) =>
                        setSupplierStep1Data({
                          ...supplierStep1Data,
                          district: value,
                        })
                      }
                      error={errors.district}
                      placeholder="Enter district"
                    />

                    <InputField
                      label="Sector"
                      value={supplierStep1Data.sector}
                      onChange={(value) =>
                        setSupplierStep1Data({
                          ...supplierStep1Data,
                          sector: value,
                        })
                      }
                      error={errors.sector}
                      placeholder="Enter sector"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      label="Cell"
                      value={supplierStep1Data.cell}
                      onChange={(value) =>
                        setSupplierStep1Data({
                          ...supplierStep1Data,
                          cell: value,
                        })
                      }
                      error={errors.cell}
                      placeholder="Enter cell"
                    />

                    <InputField
                      label="Village"
                      value={supplierStep1Data.village}
                      onChange={(value) =>
                        setSupplierStep1Data({
                          ...supplierStep1Data,
                          village: value,
                        })
                      }
                      error={errors.village}
                      placeholder="Enter village"
                    />
                  </div>

                  <InputField
                    label="Sector Address (Physical Location)"
                    value={supplierStep1Data.sectorAddress}
                    onChange={(value) =>
                      setSupplierStep1Data({
                        ...supplierStep1Data,
                        sectorAddress: value,
                      })
                    }
                    error={errors.sectorAddress}
                    placeholder="Enter physical address of operations"
                    icon={MapPin}
                  />
                </>
              )}

              {/* Supplier Step 2 */}
              {accountType === "supplier" && currentStep === 2 && (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Representative Information
                    </h3>
                    <p className="text-gray-600">
                      Personal details of the company representative
                    </p>
                  </div>

                  <InputField
                    label="Full Name of Representative"
                    value={supplierStep2Data.fullName}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        fullName: value,
                      })
                    }
                    error={errors.fullName}
                    placeholder="Enter representative's full name"
                    icon={User}
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    value={supplierStep2Data.email}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        email: value,
                      })
                    }
                    error={errors.email}
                    placeholder="Enter email address"
                    icon={Mail}
                  />

                  <InputField
                    label="Position in Company"
                    value={supplierStep2Data.position}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        position: value,
                      })
                    }
                    error={errors.position}
                    placeholder="e.g., CEO, Sales Manager, Owner"
                    icon={Building}
                  />

                  <InputField
                    label="Contact Number"
                    type="tel"
                    value={supplierStep2Data.contactNumber}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        contactNumber: value,
                      })
                    }
                    error={errors.contactNumber}
                    placeholder="Enter contact number"
                    icon={Phone}
                  />

                  <InputField
                    label="National ID or Passport Number"
                    value={supplierStep2Data.nationalId}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        nationalId: value,
                      })
                    }
                    error={errors.nationalId}
                    placeholder="Enter National ID or Passport number"
                    icon={FileText}
                  />

                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={supplierStep2Data.phoneNumber}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        phoneNumber: value,
                      })
                    }
                    error={errors.phoneNumber}
                    placeholder="Enter phone number"
                    icon={Phone}
                  />

                  <PasswordField
                    label="Password"
                    value={supplierStep2Data.password}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        password: value,
                      })
                    }
                    error={errors.password}
                    show={showPassword}
                    onToggleShow={() => setShowPassword(!showPassword)}
                  />

                  <PasswordField
                    label="Confirm Password"
                    value={supplierStep2Data.confirmPassword}
                    onChange={(value) =>
                      setSupplierStep2Data({
                        ...supplierStep2Data,
                        confirmPassword: value,
                      })
                    }
                    error={errors.confirmPassword}
                    show={showConfirmPassword}
                    onToggleShow={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  />
                </>
              )}

              {/* Form Actions */}
              <div className="flex gap-4 pt-6">
                {accountType === "supplier" && currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Continue to Step 2
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading
                      ? "Creating account..."
                      : `Create ${accountType === "customer" ? "Customer" : "Supplier"} Account`}
                  </button>
                )}
              </div>
            </form>

            {/* Terms and Privacy */}
            <div className="mt-6 text-center text-sm text-gray-600">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10"></div>
        <img
          src="/ChatGPT Image Aug 2, 2025, 09_22_52 AM.png"
          alt="African supplier and customer business discussion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>

        {/* Overlay Content */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="mb-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              AfrikaMarket
            </h3>
            <p className="text-sm opacity-90">Wholesale Hub</p>
          </div>
          <h4 className="text-xl font-semibold mb-2">
            Start Your Success Story
          </h4>
          <p className="text-sm opacity-90 leading-relaxed">
            Whether you're a customer looking for quality products or a supplier
            ready to expand your reach, AfrikaMarket is your gateway to success.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white/30 rounded-full"></div>
        <div className="absolute top-20 right-20 w-8 h-8 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-12 w-12 h-12 border border-white/40 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default SignUp;
