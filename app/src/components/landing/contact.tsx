import { Mail, Github, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Contact() {
    const t = useTranslations('Contact');

    const contactMethods = [
        {
            icon: Mail,
            key: 'email',
            link: 'mailto:contact@tanguypauvret.me'
        },
        {
            icon: Github,
            key: 'github',
            link: 'https://github.com/Bima42/saas-boilerplate'
        },
        {
            icon: MessageCircle,
            key: 'community',
            link: 'https://discord.com'
        }
    ];

    return (
        <div className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-6xl text-center">
                <p className="text-primary font-semibold text-md uppercase tracking-wider mb-2">{t('section')}</p>
                <h2 className="text-4xl font-semibold tracking-tight mb-4">{t('title')}</h2>
                <p className="text-muted-foreground text-lg mb-12">{t('subtitle')}</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contactMethods.map((item) => (
                        <div
                            key={item.key}
                            className="border border-dashed border-border bg-muted/20 p-8 rounded-xl flex flex-col items-center"
                        >
                            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">{t(`${item.key}.title`)}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{t(`${item.key}.desc`)}</p>
                            <Link href={item.link} className="font-medium hover:underline text-primary">
                                {t(`${item.key}.label`)}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
