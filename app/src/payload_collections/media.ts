import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true
    },
    upload: true,
    fields: [
        {
            name: 'alt',
            type: 'text'
        }
    ]
};
