import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '@/lib/s3';
import { env } from '@/config/env';
import { TRPCError } from '@trpc/server';

export const mediaRouter = createTRPCRouter({
    getPresignedUrl: protectedProcedure
        .input(
            z.object({
                filename: z.string(),
                contentType: z.string(),
                size: z.number()
            })
        )
        .mutation(async ({ ctx, input }) => {
            // Validate file size (e.g., max 10MB)
            if (input.size > 10 * 1024 * 1024) {
                throw new TRPCError({
                    code: 'PAYLOAD_TOO_LARGE',
                    message: 'File size exceeds 10MB limit'
                });
            }

            // Generate unique key (folder/uuid-slug)
            const date = new Date().toISOString().split('T')[0];
            const uniqueId = crypto.randomUUID();
            const extension = input.filename.split('.').pop();
            const key = `uploads/${ctx.session.user.id}/${date}/${uniqueId}.${extension}`;

            // Generate Presigned URL
            const command = new PutObjectCommand({
                Bucket: env.S3_BUCKET,
                Key: key,
                ContentType: input.contentType
                // ACL: 'public-read', // Uncomment if your bucket requires ACLs
            });

            try {
                const signedUrl = await getSignedUrl(s3Client, command, {
                    expiresIn: 60 // URL valid for 60 seconds
                });

                return {
                    uploadUrl: signedUrl,
                    fileUrl: `${env.R2_PUBLIC_URL}/${key}`,
                    key: key
                };
            } catch (error) {
                console.error('S3 Signing Error:', error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to generate upload URL'
                });
            }
        })
});
