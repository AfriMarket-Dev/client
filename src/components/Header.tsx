import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Search, Menu, Heart, LogOut, ChevronDown, MessageSquare, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/app/store";
import { useSignOutMutation } from "@/app/api/auth";
import { logout } from "@/app/features/authSlice";
import { useWishlist } from "../hooks/useWishlist";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/InputGroup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const [signOut] = useSignOutMutation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { wishlistCount } = useWishlist();

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
    } catch {}
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group transition-all">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-stone-900 tracking-tighter leading-none">
                AfrikaMarket
              </h1>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none mt-1">
                Rwanda Hub
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <InputGroup className="bg-stone-50 border-stone-200 rounded-2xl h-12 shadow-none focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <InputGroupInput 
                placeholder="Search materials, equipment..." 
                className="pl-4 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroupAddon className="pe-4">
                <Search className="w-4 h-4 text-stone-400" />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-11 w-11 relative text-stone-600 hover:bg-stone-100"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[10px] font-black border-2 border-white">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" className="font-bold text-stone-600 hover:bg-stone-100 rounded-xl px-4" onClick={() => navigate("/products")}>
                Marketplace
              </Button>
              <Button variant="ghost" className="font-bold text-stone-600 hover:bg-stone-100 rounded-xl px-4" onClick={() => navigate("/suppliers")}>
                Suppliers
              </Button>
            </div>

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="rounded-2xl h-12 gap-3 pl-2 pr-4 bg-stone-50 hover:bg-stone-100 border border-stone-100"
                    />
                  }
                >
                  <Avatar className="h-8 w-8 rounded-xl shadow-sm">
                    <AvatarImage src={(user as any).avatar} />
                    <AvatarFallback className="bg-primary text-white font-black">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-black text-stone-900 hidden sm:inline">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2 rounded-2xl shadow-2xl border-stone-100" align="end">
                  <DropdownMenuLabel className="p-4 bg-stone-50 rounded-xl mb-2">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-black text-stone-900">{user.name}</p>
                      <p className="text-xs font-medium text-stone-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  
                  {user.role === "admin" && (
                    <DropdownMenuItem className="rounded-lg h-11 font-bold" onClick={() => navigate("/admin")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  {user.role === "supplier" ? (
                    <DropdownMenuItem className="rounded-lg h-11 font-bold" onClick={() => navigate("/dashboard")}>
                      Provider Dashboard
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="rounded-lg h-11 font-bold" onClick={() => navigate("/dashboard")}>
                      Buyer Account
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-lg h-11 font-bold text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate("/auth/signin")}
                  variant="ghost"
                  className="font-bold text-stone-600 rounded-xl h-11 px-6"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate("/auth/signup")}
                  className="font-black rounded-xl h-11 px-6 shadow-lg shadow-primary/20"
                >
                  Join
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-xl h-11 w-11"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

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
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/auth/signin");
                  }}
                  variant="outline"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/auth/signup");
                  }}
                >
                  Join as Supplier
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
