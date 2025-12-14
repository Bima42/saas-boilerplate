import { SimpleButton } from '@/components/ui/simple-button';
import { LogIn } from 'lucide-react';
import React from 'react';

export function LoginButton() {
    return <SimpleButton text="Login" icon={LogIn} href="/login" size={'md'} />;
}
