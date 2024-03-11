import { DataSource } from 'typeorm'
import ormConfig from '../../config/ormconfig'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const connection: DataSource = new DataSource(ormConfig as MysqlConnectionOptions)

export const connectDatabase = async() => {
    return new Promise(async (resolve, _reject) => {
        console.log(`Connecting to database ⌛`)
        try {
            await connection.initialize()
            console.log(`Database connected 🔥`)
            resolve(true)
        } catch (error) {
            console.error('connectDatabase -> error: ', error)
            throw error
        }        
    })
}

export default connection