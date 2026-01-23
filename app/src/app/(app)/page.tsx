import React from 'react';
import { Header } from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Pricing from '@/components/landing/pricing';
import Testimonials from '@/components/landing/testimonials';
import FAQ from '@/components/landing/faq';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <Hero />
                <Features />
                <Pricing />
                <Testimonials />
                <FAQ />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}
