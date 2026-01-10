import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Twitch } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');

    const footerLinks = [
        {
            title: t('columns.product'),
            links: [
                { label: t('links.features'), href: '#features' },
                { label: t('links.pricing'), href: '#pricing' },
                { label: t('links.docs'), href: '/docs' }
            ]
        },
        {
            title: t('columns.resources'),
            links: [
                { label: t('links.blog'), href: '/blog' },
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'Discord', href: 'https://discord.com' }
            ]
        },
        {
            title: t('columns.legal'),
            links: [
                { label: t('links.privacy'), href: '/privacy' },
                { label: t('links.terms'), href: '/terms' }
            ]
        }
    ];

    return (
        <footer className="border-t bg-muted/20">
            <div className="container mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="space-y-4">
                        <div className="font-bold text-2xl flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary rounded-md"></div>
                            Boilerplate
                        </div>
                        <p className="text-muted-foreground max-w-xs">{t('brand.desc')}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {footerLinks.map((col) => (
                            <div key={col.title} className="space-y-3">
                                <h4 className="font-medium">{col.title}</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href} className="hover:text-foreground">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-xs w-full">
                        <h4 className="font-medium mb-4">{t('newsletter.title')}</h4>
                        <form className="flex gap-2">
                            <Input placeholder={t('newsletter.placeholder')} className="bg-background" />
                            <Button>{t('newsletter.button')}</Button>
                        </form>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} Boilerplate Inc. {t('rights')}
                    </p>
                    <div className="flex gap-4">
                        <Link href="#">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="#">
                            <Twitch className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
