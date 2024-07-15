import { Client } from "minio";

const isLocal = process.env.S3_UPLOAD_ENDPOINT?.includes("local");

export const minioClient = new Client({
    region: process.env.S3_UPLOAD_REGION as string,
    accessKey: process.env.S3_UPLOAD_KEY as string,
    secretKey: process.env.S3_UPLOAD_SECRET as string,
    endPoint: process.env.S3_UPLOAD_ENDPOINT as string,
    pathStyle: isLocal,
    ...(isLocal ? { port: 9000, useSSL: false } : {}),
});
