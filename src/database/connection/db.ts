import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST as string,
    port: parseInt(`${process.env.DB_PORT}`),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})