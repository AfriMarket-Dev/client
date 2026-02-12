import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Search,
  Menu,
  User,
  Heart,
  MapPin,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/app/store";
import { useSignOutMutation } from "@/app/api/auth";
import { logout } from "@/app/features/authSlice";
import { useWishlist } from "../hooks/useWishlist";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  console.log({ user });
  const [signOut] = useSignOutMutation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { wishlistCount } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/suppliers", { state: { searchQuery: searchQuery.trim() } });
    }
  };

  const handleSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e as any);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
    } catch {}
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-background shadow-sm border-b border-border sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                Free shipping across Africa on orders $500+
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>24/7 Support</span>
              <span>•</span>
              <span>Multi-currency</span>
              <span>•</span>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 cursor-pointer">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                AfrikaMarket
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Wholesale Hub</p>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative flex items-center gap-2">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchInput}
                  placeholder="Search suppliers, products, or categories..."
                  className="pl-10 pr-4 bg-muted/50 focus:bg-background transition-colors"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-colors rounded-lg px-6"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/wishlist")}
              className="relative text-muted-foreground hover:text-orange-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Button>

            <div className="hidden md:flex items-center space-x-4 ml-4 pl-4 border-l border-border">
              <Button
                variant="ghost"
                onClick={() => navigate("/about")}
        
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/help")}
        
              >
                Help
              </Button>

              {isAuthenticated && user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="max-w-[120px] truncate">{user.name}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>

                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-popover rounded-xl shadow-lg border border-border py-2 z-50">
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                        {(user.role === "admin" || user.role === "agent") && (
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              navigate("/admin");
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            Admin Panel
                          </button>
                        )}
                        {user.role === "supplier" && (
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              navigate("/dashboard");
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            Dashboard
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/auth/signin")}
                    className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/auth/signup")}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-colors"
                  >
                    Join as Supplier
                  </button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-muted-foreground hover:text-orange-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t border-border">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchInput}
              placeholder="Search suppliers, products, or categories..."
              className="pl-10 pr-4 py-3 rounded-xl border-input bg-muted/50 focus:bg-background transition-colors"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/categories");
              }}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Browse Categories
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/suppliers");
              }}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Find Suppliers
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/about");
              }}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/help");
              }}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Help Center
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/wishlist");
              }}
              className="flex items-center w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              <Heart className="w-4 h-4 mr-2" />
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </button>

            {isAuthenticated && user ? (
              <>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  {(user.role === "admin" || user.role === "agent") && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/admin");
                      }}
                      className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors mb-2"
                    >
                      Admin Panel
                    </button>
                  )}
                  {user.role === "supplier" && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/dashboard");
                      }}
                      className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors mb-2"
                    >
                      Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/auth/signin");
                  }}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/auth/signup");
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  Join as Supplier
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
