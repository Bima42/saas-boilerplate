import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n-config.ts');
const nextConfig: NextConfig = {
    output: 'standalone'
};

export default withNextIntl(nextConfig);
