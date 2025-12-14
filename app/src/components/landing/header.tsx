'use client';

import Link from 'next/link';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LoginButton } from '@/components/login/login-button';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-6xl">
                {/* Logo / Home */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <div className="w-6 h-6 bg-primary rounded-md"></div>
                        <span>Boilerplate</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/blog" className="hover:text-foreground transition-colors">
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageSwitcher />

                    <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

                    <LoginButton />
                </div>
            </div>
        </header>
    );
}
