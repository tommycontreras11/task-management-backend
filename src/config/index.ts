export const objectStorageConfig = {
    bucket: process.env.MINIO_BUCKET as string,
    url: process.env.MINIO_URL as string,
    port: parseInt(`${process.env.MINIO_PORT}`),
    ssl: process.env.MINIO_SSL == "true",
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string
}