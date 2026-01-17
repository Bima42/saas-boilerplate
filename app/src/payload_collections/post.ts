import { CollectionConfig } from 'payload';

export const Post: CollectionConfig = {
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
};
