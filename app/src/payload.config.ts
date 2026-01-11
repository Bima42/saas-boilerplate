import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * All the migrations docs here: https://payloadcms.com/docs/database/migrations
 */
export default buildConfig({
    admin: {
        user: 'admin-users' // The collection slug to use for admin auth,
    },
    collections: [
        {
            slug: 'admin-users',
            auth: true,
            access: {
                delete: () => false,
                update: () => true
            },
            fields: []
        },
        {
            slug: 'media',
            upload: {
                staticDir: path.resolve(dirname, 'public/media'),
                adminThumbnail: 'mimeType',
                imageSizes: [
                    {
                        name: 'thumbnail',
                        width: 400,
                        height: 300,
                        position: 'centre'
                    }
                ]
            },
            fields: [
                {
                    name: 'alt',
                    type: 'text'
                }
            ]
        },
        {
            slug: 'posts',
            admin: {
                useAsTitle: 'title'
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true
                },
                {
                    name: 'description',
                    type: 'textarea',
                    maxLength: 300,
                    admin: {
                        description: 'A brief summary of the post (max 300 characters).'
                    }
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        position: 'sidebar'
                    }
                },
                {
                    name: 'coverImage',
                    type: 'upload',
                    relationTo: 'media'
                },
                {
                    name: 'content',
                    type: 'richText'
                },
                {
                    name: 'readTime',
                    type: 'number',
                    admin: {
                        position: 'sidebar'
                    }
                },
                {
                    name: 'publishedDate',
                    type: 'date',
                    admin: {
                        position: 'sidebar'
                    }
                },
                {
                    name: 'tags',
                    type: 'array',
                    fields: [
                        {
                            name: 'tag',
                            type: 'text'
                        }
                    ],
                    admin: {
                        position: 'sidebar'
                    }
                }
            ]
        }
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'SET_A_SECRET_IN_ENV',
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL
        },
        migrationDir: path.resolve(dirname, 'payload_migrations'),
        push: false // WARNING: This force us to run migrations manually
    }),
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts')
    }
});
