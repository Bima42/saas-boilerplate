import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withPayload } from '@payloadcms/next/withPayload';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n-config.ts');
const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            // Use this config if you want to serve locally for dev
            // {
            //     protocol: 'http',
            //     hostname: 'localhost'
            // },
            {
                protocol: 'https',
                hostname: 'pub-a30b904615b94073a3b5906a70d06f7f.r2.dev'
            },
            {
                protocol: 'https',
                hostname: 'pub-*.r2.dev'
            }
        ]
    }
};

export default withPayload(withNextIntl(nextConfig));
