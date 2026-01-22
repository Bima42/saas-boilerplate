import { db } from '@/server/db';
import { post } from '@/server/db/schema';
import { eq, desc, isNotNull, and } from 'drizzle-orm';

export async function getPublishedPosts() {
    return db.query.post.findMany({
        where: isNotNull(post.publishedAt),
        orderBy: [desc(post.publishedAt)],
        with: {
            author: {
                columns: { name: true, image: true }
            }
        }
    });
}

export async function getPublishedPostBySlug(slug: string) {
    return db.query.post.findFirst({
        where: and(eq(post.slug, slug), isNotNull(post.publishedAt)),
        with: {
            author: {
                columns: { name: true, image: true }
            }
        }
    });
}

export async function getAdminPosts() {
    return db.query.post.findMany({
        orderBy: [desc(post.createdAt)],
        with: {
            author: { columns: { name: true } }
        }
    });
}

export async function getPostById(id: string) {
    return db.query.post.findFirst({
        where: eq(post.id, id),
        with: {
            author: {
                columns: { name: true, image: true }
            }
        }
    });
}

export async function getPostBySlug(slug: string) {
    return db.query.post.findFirst({
        where: eq(post.slug, slug)
    });
}

export async function createPost(data: { title: string; slug: string; authorId: string }) {
    const newPost = await db
        .insert(post)
        .values({
            id: crypto.randomUUID(),
            title: data.title,
            slug: data.slug,
            authorId: data.authorId,
            content: []
        })
        .returning();
    return newPost[0];
}

export async function updatePost(id: string, data: Partial<typeof post.$inferInsert>) {
    const updated = await db.update(post).set(data).where(eq(post.id, id)).returning();
    return updated[0];
}

export async function deletePost(id: string) {
    await db.delete(post).where(eq(post.id, id));
}
