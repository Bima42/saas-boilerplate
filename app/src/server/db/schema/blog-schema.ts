import { pgTable, text, timestamp, jsonb, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './auth-schema';

export const post = pgTable(
    'post',
    {
        id: text('id').primaryKey(),
        slug: text('slug').notNull().unique(),
        title: text('title').notNull(),
        description: text('description'),
        content: jsonb('content'),
        coverImage: text('cover_image'),
        tags: text('tags').array(),

        publishedAt: timestamp('published_at'), // Null = Draft, Date = Published

        authorId: text('author_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull()
    },
    (table) => [
        index('post_slug_idx').on(table.slug),
        index('post_publishedAt_idx').on(table.publishedAt),
        index('post_authorId_idx').on(table.authorId)
    ]
);

export const postRelations = relations(post, ({ one }) => ({
    author: one(user, {
        fields: [post.authorId],
        references: [user.id]
    })
}));
