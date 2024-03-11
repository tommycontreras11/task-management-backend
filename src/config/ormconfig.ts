import dotenv from 'dotenv'
import path from "path"
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

dotenv.config()

export default {
    type: "mysql",
    host: process.env.DB_HOST as string,
    port: parseInt(`${process.env.DB_PORT}`),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: false,
    logging: true,
    entities: [
        path.join(__dirname, '../database/entities/**/*.{ts,js}'),
    ],
    subscribers: [],
    migrations: [
        path.join(__dirname, '../database/migrations/*.{ts,js}'),
    ],
    seeds: [
        path.join(__dirname, '../database/seedings/seeders/*.{ts,js}'),
    ]
} as MysqlConnectionOptions

export const objectStorageConfig = {
    bucket: process.env.MINIO_BUCKET as string,
    url: process.env.MINIO_URL as string,
    port: parseInt(`${process.env.MINIO_PORT}`),
    ssl: process.env.MINIO_SSL == "true",
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string
}