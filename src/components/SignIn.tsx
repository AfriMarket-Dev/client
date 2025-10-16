import React, { useState } from 'react';
import { ArrowLeft, Mail, Shield, Eye, EyeOff, User, Building } from 'lucide-react';

interface SignInProps {
  onBack: () => void;
  onSignInComplete: (type: 'customer' | 'supplier', email: string) => void;
  onSwitchToSignUp: () => void;
  onSwitchToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onBack, onSignInComplete, onSwitchToSignUp }) => {
  const [accountType, setAccountType] = useState<'customer' | 'supplier'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSignInComplete(accountType, email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={onBack}
              className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            
            {/* Logo */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                AfrikaMarket
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Wholesale Hub</p>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Account Type Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setAccountType('customer')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                accountType === 'customer'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Customer
            </button>
            <button
              onClick={() => setAccountType('supplier')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                accountType === 'supplier'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Building className="w-4 h-4 mr-2" />
              Supplier
            </button>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
            >
              Sign In as {accountType === 'customer' ? 'Customer' : 'Supplier'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20"></div>
        <img
          src="/ChatGPT Image Aug 2, 2025, 09_22_52 AM.png"
          alt="African supplier and customer business discussion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
        
        {/* Overlay Content */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="mb-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              AfrikaMarket
            </h3>
            <p className="text-sm opacity-90">Wholesale Hub</p>
          </div>
          <h4 className="text-xl font-semibold mb-2">
            Connect with Trusted Partners
          </h4>
          <p className="text-sm opacity-90 leading-relaxed">
            Join thousands of successful businesses building lasting relationships 
            across Africa's premier wholesale marketplace.
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

export default SignIn;