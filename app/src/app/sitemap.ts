import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/payload';
import { env } from '@/config/env';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = env.NEXT_PUBLIC_APP_URL;

    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        }
    ];

    try {
        const payload = await getPayloadClient();

        const posts = await payload.find({
            collection: 'posts',
            limit: 100,
            depth: 0,
            select: {
                slug: true,
                updatedAt: true
            }
        });

        const blogEntries: MetadataRoute.Sitemap = posts.docs.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: 'weekly',
            priority: 0.8
        }));

        return [...staticEntries, ...blogEntries];
    } catch (error) {
        console.error('⚠️ Failed to generate dynamic sitemap entries:', error);
        return staticEntries;
    }
}
