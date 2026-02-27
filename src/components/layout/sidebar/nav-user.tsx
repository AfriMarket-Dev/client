import {
	RiDashboardLine,
	RiArrowUpDownLine,
	RiMessage2Line,
	RiSettings4Line,
	RiHeartLine,
	RiStore2Line,
	RiUserLine,
	RiLogoutBoxRLine,
	RiTeamLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/auth-slice";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
		role?: string;
	};
}) {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAdmin = user.role === "admin" || user.role === "agent";
	const isProvider = isAdmin || user.role === "provider";

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
								<RiArrowUpDownLine className="ml-auto size-4" />
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent
						className="w-(--anchor-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback className="rounded-lg">CN</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user.name}</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{isAdmin ? (
								<DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
									<RiDashboardLine />
									Admin Dashboard
								</DropdownMenuItem>
							) : null}
							{isProvider ? (
								<DropdownMenuItem
									onClick={() => navigate({ to: "/dashboard" })}
								>
									<RiStore2Line />
									Supplier Dashboard
								</DropdownMenuItem>
							) : null}
							<DropdownMenuItem onClick={() => navigate({ to: "/messages" })}>
								<RiMessage2Line />
								Messages
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => navigate({ to: "/wishlist" })}>
								<RiHeartLine />
								Wishlist
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
								<RiUserLine />
								My Profile
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									navigate({ to: isAdmin ? "/admin/profile" : "/profile" })
								}
							>
								<RiSettings4Line />
								Settings
							</DropdownMenuItem>
							{isAdmin ? (
								<DropdownMenuItem
									onClick={() => navigate({ to: "/admin/suppliers" })}
								>
									<RiTeamLine />
									Suppliers
								</DropdownMenuItem>
							) : null}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								dispatch(logout());
								navigate({ to: "/" });
							}}
						>
							<RiLogoutBoxRLine />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
