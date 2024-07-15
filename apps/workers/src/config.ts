export const config = {
    database: {
        url: process.env.DATABASE_URL as string,
    },
    s3: {
        BUCKET: process.env.S3_UPLOAD_BUCKET,
    },
};
