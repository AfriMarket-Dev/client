import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Heart, MessageSquare, User, LayoutDashboard } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/authSlice";
import { useSignOutMutation } from "@/app/api/auth";
import { useGetWishlistQuery } from "@/app/api/wishlist";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

const PROVIDER_ROLES = ["provider", "admin", "agent"];

interface HeaderUserNavProps {
  isAuthenticated: boolean;
  user: any;
}

export const HeaderUserNav: React.FC<HeaderUserNavProps> = ({
  isAuthenticated,
  user,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signOut] = useSignOutMutation();
  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
    } catch {}
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="hidden lg:flex items-center gap-1 mr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/products")}
          className="font-heading font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-transparent text-xs"
        >
          Products
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/categories")}
          className="font-heading font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-transparent text-xs"
        >
          Categories
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/suppliers")}
          className="font-heading font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-transparent text-xs"
        >
          Suppliers
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/about")}
          className="font-heading font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-transparent text-xs"
        >
          About
        </Button>
      </div>

      {isAuthenticated && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/wishlist")}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[10px] font-bold">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/messages")}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
        </>
      )}

      <div className="h-8 w-px bg-border mx-1 hidden sm:block" />

      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full border border-border hover:border-primary transition-all duration-200"
              >
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="font-heading font-bold bg-muted/50 text-muted-foreground">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent
            className="w-64 align-end border border-border rounded-sm shadow-lg p-0 bg-background/95 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal p-0">
                <div className="flex items-center justify-start gap-4 p-4 border-b border-border bg-muted/5">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.name && (
                      <p className="font-heading font-bold uppercase tracking-wide text-sm text-foreground">
                        {user.name}
                      </p>
                    )}
                    {user.email && (
                      <p className="text-xs leading-none text-muted-foreground font-medium truncate max-w-[180px]">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              {(user.role === "admin" || user.role === "agent") && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin")}
                  className="cursor-pointer rounded-sm focus:bg-muted focus:text-primary font-medium"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  <span className="font-bold uppercase text-xs tracking-wide">
                    Admin Dashboard
                  </span>
                </DropdownMenuItem>
              )}
              {PROVIDER_ROLES.includes(user.role) && (
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className="cursor-pointer rounded-sm focus:bg-muted focus:text-primary font-medium"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  <span className="font-bold uppercase text-xs tracking-wide">
                    Provider Dashboard
                  </span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer rounded-sm focus:bg-muted focus:text-primary font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                <span className="font-bold uppercase text-xs tracking-wide">
                  Profile
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer rounded-sm focus:bg-destructive/10 focus:text-destructive font-medium text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="font-bold uppercase text-xs tracking-wide">
                  Sign out
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-3">
          <Link to="/auth/signin">
            <Button
              variant="ghost"
              className="font-heading font-bold uppercase tracking-wider hover:bg-muted/50 text-xs h-9 px-4 rounded-sm border border-transparent hover:border-border"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button className="font-heading font-bold uppercase tracking-wider text-xs h-9 px-4 rounded-sm shadow-none border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent text-foreground">
              Join Network
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
