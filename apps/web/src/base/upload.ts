import axios from "axios";
import { useState } from "react";

type EndpointOptions = { request: RequestOptions };
type UploadToS3Options = { endpoint?: EndpointOptions; key?: string };
type RequestOptions = { body: Record<string, any>; headers: HeadersInit };
type UploadToS3 = (file: File, options?: UploadToS3Options) => Promise<{ url: string }>;

export const useS3Upload = (options: { endpoint?: string } = {}) => {
    const endpoint = options.endpoint ?? "/api/media/upload";
    const [progress, setProgress] = useState(0);

    const uploadToS3: UploadToS3 = async (file, options = {}) => {
        const filename = encodeURIComponent(file.name);

        const requestExtras = options?.endpoint?.request ?? {
            headers: {},
            body: {},
        };

        const body = {
            filename,
            size: file.size,
            type: file.type,
            key: options.key,
            ...requestExtras.body,
        };

        const destination = await axios.post(endpoint, body);
        const resp = await axios.put(destination.data.url, file, {
            headers: { "content-type": file.type },
            onUploadProgress: (e) => {
                setProgress(e.total ? Math.round((e.loaded * 100) / e.total) : 0);
            },
        });

        return {
            url: destination.data.key,
        };
    };

    return { uploadToS3, progress };
};
