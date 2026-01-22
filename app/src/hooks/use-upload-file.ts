import * as React from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/trpc/client';

export interface UploadedFile {
    key: string;
    url: string;
    name: string;
    size: number;
    type: string;
}

interface UseUploadFileProps {
    onUploadComplete?: (file: UploadedFile) => void;
    onUploadError?: (error: unknown) => void;
}

export function useUploadFile({ onUploadComplete, onUploadError }: UseUploadFileProps = {}) {
    const [uploadingFile, setUploadingFile] = React.useState<File>();
    const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>(); // Added state
    const [progress, setProgress] = React.useState<number>(0);
    const [isUploading, setIsUploading] = React.useState(false);

    const getPresignedUrl = api.media.getPresignedUrl.useMutation();

    async function uploadFile(file: File) {
        setIsUploading(true);
        setUploadingFile(file);
        setUploadedFile(undefined); // Reset previous upload
        setProgress(0);

        try {
            const { uploadUrl, fileUrl, key } = await getPresignedUrl.mutateAsync({
                filename: file.name,
                contentType: file.type,
                size: file.size
            });

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        const percentage = (event.loaded / event.total) * 100;
                        setProgress(Math.round(percentage));
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve();
                    } else {
                        reject(new Error('Upload failed'));
                    }
                });

                xhr.addEventListener('error', () => reject(new Error('Network error')));

                xhr.open('PUT', uploadUrl);
                xhr.setRequestHeader('Content-Type', file.type);
                xhr.send(file);
            });

            const result: UploadedFile = {
                key,
                url: fileUrl,
                name: file.name,
                size: file.size,
                type: file.type
            };

            setUploadedFile(result); // Set state to trigger useEffect in PlaceholderElement
            onUploadComplete?.(result);

            return result;
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload file');
            onUploadError?.(error);
        } finally {
            setIsUploading(false);
            setUploadingFile(undefined);
            setProgress(0);
        }
    }

    return {
        isUploading,
        progress,
        uploadFile,
        uploadedFile,
        uploadingFile
    };
}
