import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lock, CreditCard, Globe, Database, Layout, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

const featureKeys = [
    { key: 'auth', icon: Lock },
    { key: 'payments', icon: CreditCard },
    { key: 'i18n', icon: Globe },
    { key: 'db', icon: Database },
    { key: 'ui', icon: Layout },
    { key: 'emails', icon: Mail }
];

export default function Features() {
    const t = useTranslations('Features');

    return (
        <div className="py-24 flex items-center justify-center bg-background" id="features">
            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-lg mb-12">{t('title')}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <Accordion defaultValue="item-0" type="single" className="w-full">
                            {featureKeys.map(({ key, icon: Icon }, index) => (
                                <AccordionItem
                                    key={key}
                                    value={`item-${index}`}
                                    className="data-[state=open]:border-b-2 data-[state=open]:border-primary"
                                >
                                    <AccordionTrigger className="text-lg [&>svg]:hidden">
                                        <div className="flex items-center gap-4">
                                            <Icon className="h-5 w-5 text-primary" />
                                            {t(`${key}.title`)}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground pl-9">
                                        {t(`${key}.description`)}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    {/* Media Placeholder */}
                    <div className="hidden md:block w-full h-full min-h-[400px] bg-muted/50 rounded-xl border border-border" />
                </div>
            </div>
        </div>
    );
}
