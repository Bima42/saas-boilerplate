import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
    return (
        <div className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-6xl text-center">
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Contact Us</p>
                <h2 className="text-4xl font-semibold tracking-tight mb-4">We'd love to hear from you</h2>
                <p className="text-muted-foreground text-lg mb-12">Our friendly team is always here to chat.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Mail,
                            title: 'Email',
                            desc: 'Our friendly team is here to help.',
                            link: 'mailto:hello@example.com',
                            label: 'hello@example.com'
                        },
                        {
                            icon: MessageCircle,
                            title: 'Live chat',
                            desc: 'Start a conversation now.',
                            link: '#',
                            label: 'Start new chat'
                        },
                        {
                            icon: MapPin,
                            title: 'Office',
                            desc: 'Come say hello at our HQ.',
                            link: '#',
                            label: '100 Smith St, Melbourne'
                        },
                        {
                            icon: Phone,
                            title: 'Phone',
                            desc: 'Mon-Fri from 8am to 5pm.',
                            link: 'tel:+15550000000',
                            label: '+1 (555) 000-0000'
                        }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="border border-dashed border-border bg-muted/20 p-8 rounded-xl flex flex-col items-center"
                        >
                            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{item.desc}</p>
                            <Link href={item.link} className="font-medium hover:underline text-primary">
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
