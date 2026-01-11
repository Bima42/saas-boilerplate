import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withPayload } from '@payloadcms/next/withPayload';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n-config.ts');
const nextConfig: NextConfig = {
    output: 'standalone',
    // Allow loading images from local public folder if needed for testing
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost'
            }
        ]
    }
};

export default withPayload(withNextIntl(nextConfig));
