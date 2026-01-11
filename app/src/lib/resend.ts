import { env } from '@/config/env';
import { Resend } from 'resend';

let resendInstance: Resend | null = null;

export function getResend() {
    if (!resendInstance) {
        resendInstance = new Resend(env.RESEND_API_KEY);
    }
    return resendInstance;
}
