import React from 'react';
import Hero from '@/components/hero';
import { Header } from '@/components/landing/header';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Hero />
            </main>
        </div>
    );
}
