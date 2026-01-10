import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

export default function FAQ() {
    const t = useTranslations('FAQ');
    const keys = ['1', '2', '3', '4'] as const;

    return (
        <div className="py-24 px-6 bg-muted/30" id="faq">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <h2 className="text-4xl font-semibold tracking-tight mb-4">
                        {t.rich('title', {
                            br: () => <br />
                        })}
                    </h2>
                    <p className="text-muted-foreground">{t('subtitle')}</p>
                </div>

                <div className="md:w-2/3">
                    <Accordion type="single" defaultValue="question-0" className="w-full">
                        {keys.map((key, index) => (
                            <AccordionItem key={key} value={`question-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-medium">
                                    {t(`items.${key}.question`)}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {t(`items.${key}.answer`)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
