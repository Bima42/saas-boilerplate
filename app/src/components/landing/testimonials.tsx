import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
    const t = useTranslations('Testimonials');
    const keys = ['1', '2', '3'] as const;

    return (
        <div className="py-24 px-6 bg-background" id="testimonials">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl md:text-5xl font-semibold text-center tracking-tight">{t('title')}</h2>
                <p className="mt-4 text-xl text-center text-muted-foreground">{t('subtitle')}</p>
                <div className="mt-14 grid md:grid-cols-3 gap-8">
                    {keys.map((key) => (
                        <div key={key} className="bg-muted/40 rounded-xl p-6 border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{t(`${key}.author`).charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm">{t(`${key}.author`)}</p>
                                        <p className="text-xs text-muted-foreground">{t(`${key}.role`)}</p>
                                    </div>
                                </div>
                                <Twitter className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground leading-relaxed">&quot;{t(`${key}.text`)}&quot;</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
