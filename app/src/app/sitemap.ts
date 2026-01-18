import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/payload';
import { env } from '@/config/env';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayloadClient();
    const baseUrl = env.NEXT_PUBLIC_APP_URL;

    const posts = await payload.find({
        collection: 'posts',
        limit: 100,
        depth: 0,
        select: {
            slug: true,
            updatedAt: true,
            meta: true
        }
    });

    const blogEntries: MetadataRoute.Sitemap = posts.docs.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        },
        ...blogEntries
    ];
}
