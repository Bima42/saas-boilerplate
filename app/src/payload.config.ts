import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '@/config/env';
import { Media } from '@/payload_collections/media';
import { Post } from '@/payload_collections/post';
// import { s3Storage } from '@payloadcms/storage-s3';

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
        Media,
        Post
    ],
    editor: lexicalEditor({}),
    secret: env.PAYLOAD_SECRET || 'SET_A_SECRET_IN_ENV',
    db: postgresAdapter({
        pool: {
            connectionString: env.DATABASE_URL
        },
        migrationDir: path.resolve(dirname, 'payload_migrations')
        // IMPORTANT: Uncomment the following line to disable automatic migrations
        // push: false
    }),
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts')
    }
    // Uncomment the following to enable S3 / R2 storage for media uploads
    // plugins: [
    //     s3Storage({
    //         collections: {
    //             media: true
    //         },
    //         bucket: env.S3_BUCKET,
    //         config: {
    //             endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    //             credentials: {
    //                 accessKeyId: env.S3_ACCESS_KEY_ID,
    //                 secretAccessKey: env.S3_SECRET_ACCESS_KEY
    //             },
    //             region: 'auto',
    //             forcePathStyle: true
    //         }
    //     })
    // ]
});
