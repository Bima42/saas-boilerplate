"use client";

import {
	Check,
	ChevronsUpDown,
	CreditCard,
	Languages,
	LogOut,
	Moon,
	Newspaper,
	Sparkles,
	Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { LANGUAGE_NAMES, type LanguageCode } from "@/config/config";
import { useLanguageSwitcher } from "@/hooks/use-language-switcher";
import { authClient } from "@/lib/better-auth/auth-client";

export function NavUser() {
	const { isMobile } = useSidebar();
	const router = useRouter();
	const t = useTranslations("UserMenu");
	const { theme, setTheme } = useTheme();
	const { currentLocale, switchLocale } = useLanguageSwitcher();
	const { data: session } = authClient.useSession();

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => router.push("/login"),
			},
		});
	};
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={session?.user.image || undefined}
									alt={session?.user.name}
								/>
								<AvatarFallback className="rounded-lg">
									{session?.user.name.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{session?.user.name}</span>
								<span className="truncate text-xs">{session?.user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={session?.user.image || undefined}
										alt={session?.user.name}
									/>
									<AvatarFallback className="rounded-lg">
										{session?.user.name.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{session?.user.name}
									</span>
									<span className="truncate text-xs">{session?.user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => router.push("/dashboard/billing")}>
								<Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
								{t("upgrade")}
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => router.push("/admin/posts")}>
								<Newspaper className="mr-2 h-4 w-4" />
								{t("admin")}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => router.push("/dashboard/billing")}>
								<CreditCard className="mr-2 h-4 w-4" />
								{t("billing")}
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{/* Theme Switcher */}
							<DropdownMenuItem
								onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							>
								{theme === "dark" ? (
									<Moon className="mr-2 h-4 w-4" />
								) : (
									<Sun className="mr-2 h-4 w-4" />
								)}
								{t("theme")}
								<span className="ml-auto text-xs text-muted-foreground capitalize">
									{theme === "dark" ? t("themeDark") : t("themeLight")}
								</span>
							</DropdownMenuItem>

							{/* Language Switcher Submenu */}
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<Languages className="mr-2 h-4 w-4" />
									{t("language")}
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										{Object.entries(LANGUAGE_NAMES).map(
											([locale, { name, icon }]) => (
												<DropdownMenuItem
													key={locale}
													onClick={() =>
														switchLocale(locale as LanguageCode)
													}
													className="justify-between"
												>
													<span className="flex items-center gap-2">
														<span>{icon}</span>
														<span>{name}</span>
													</span>
													{currentLocale === locale && (
														<Check className="h-4 w-4" />
													)}
												</DropdownMenuItem>
											),
										)}
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut className="mr-2 h-4 w-4" />
							{t("logout")}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
