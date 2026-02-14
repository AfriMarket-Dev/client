import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronDown, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/authSlice";
import { useSignOutMutation } from "@/app/api/auth";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface HeaderUserNavProps {
  isAuthenticated: boolean;
  user: any;
  wishlistCount: number;
}

export const HeaderUserNav: React.FC<HeaderUserNavProps> = ({
  isAuthenticated,
  user,
  wishlistCount,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signOut] = useSignOutMutation();

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
          onClick={() => navigate("/services")}
          className="font-heading font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-transparent text-xs"
        >
          Services
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

      <Button
        variant="ghost"
        title="wishlist"
        size="icon"
        className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50 h-10 w-10"
        onClick={() => navigate("/wishlist")}
      >
        <Heart className="w-5 h-5" strokeWidth={2} />
        {wishlistCount > 0 && (
          <Badge className="absolute top-1 right-1 min-w-[16px] h-[16px] flex items-center justify-center p-0 text-[10px] font-bold bg-primary text-primary-foreground border-2 border-background">
            {wishlistCount}
          </Badge>
        )}
      </Button>

      <div className="h-8 w-px bg-border mx-1 hidden sm:block" />

      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="gap-2 pl-2 pr-3 h-10 hover:bg-muted/50 flex items-center"
              >
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-muted text-foreground font-heading font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-heading font-bold uppercase tracking-wide text-foreground hidden sm:inline">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            }
          />
          <DropdownMenuContent
            className="w-56 rounded-sm border-2 border-border shadow-lg"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-heading font-bold uppercase text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-border" />

              {user.role === "admin" && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin")}
                  className="font-bold uppercase text-xs tracking-wide focus:bg-muted"
                >
                  Admin Dashboard
                </DropdownMenuItem>
              )}
              {user.role === "supplier" ? (
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className="font-bold uppercase text-xs tracking-wide focus:bg-muted"
                >
                  Provider Dashboard
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className="font-bold uppercase text-xs tracking-wide focus:bg-muted"
                >
                  Buyer Account
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive focus:bg-destructive/10 font-bold uppercase text-xs tracking-wide"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/auth/signin")}
            variant="ghost"
            className="font-heading font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            Sign in
          </Button>
          <Button
            onClick={() => navigate("/auth/signup")}
            className="h-10 px-6 font-heading font-bold uppercase tracking-wide rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-none border border-primary"
          >
            Join
          </Button>
        </div>
      )}
    </div>
  );
};
