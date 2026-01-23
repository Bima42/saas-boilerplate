'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
    path: string;
}
export function BackButton({ path }: Props) {
    const router = useRouter();
    return (
        <Button variant="ghost" size="icon" onClick={() => router.push(path)}>
            <ArrowLeft size="s" />
        </Button>
    );
}
