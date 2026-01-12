'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LoginButton } from '@/components/login/login-button';
import { Logo } from '@/components/logo';

const navLinks = [
    { title: 'Features', href: '#features' },
    { title: 'Pricing', href: '#pricing' },
    { title: 'Testimonials', href: '#testimonials' },
    { title: 'FAQ', href: '#faq' },
    { title: 'Blog', href: '/blog' }
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
                {/* Left: Logo & Desktop Nav */}
                <div className="flex items-center gap-8">
                    <Logo />
                    <div className="hidden md:block">
                        <DesktopNav />
                    </div>
                </div>

                {/* Right: Actions & Mobile Menu */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <div className="h-6 w-px bg-border mx-2" />
                        <LoginButton />
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}

function DesktopNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {navLinks.map((link) => (
                    <NavigationMenuItem key={link.title}>
                        <Link href={link.href}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {link.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>
                        <Logo />
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8 px-4">
                    {/* Mobile Links */}
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="h-px bg-border" />

                    {/* Mobile Actions */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Theme</span>
                            <ThemeToggle />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Language</span>
                            <LanguageSwitcher />
                        </div>
                        <div className="h-px bg-border" />
                        <LoginButton />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
