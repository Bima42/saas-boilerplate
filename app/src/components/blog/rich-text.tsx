import React from 'react';
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical';
import { RichText as PayloadRichText, LinkJSXConverter } from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Props = {
    data: SerializedEditorState;
    className?: string;
};

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value, relationTo } = linkNode.fields.doc!;
    if (typeof value !== 'object') {
        throw new Error('RichText: Expected value to be an object. Did you set depth >= 1?');
    }
    const slug = value.slug;

    switch (relationTo) {
        case 'posts':
            return `/blog/${slug}`;
        default:
            return `/${slug}`;
    }
};

export function RichText({ data, className }: Props) {
    if (!data) return null;

    return (
        <div className={className}>
            <PayloadRichText
                data={data}
                converters={({ defaultConverters }) => ({
                    ...defaultConverters,
                    ...LinkJSXConverter({ internalDocToHref })
                })}
            />
        </div>
    );
}
