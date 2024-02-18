import { AppDataSource } from "./database/connection/ormconfig"
import app from "./app"

async function main() {
    await AppDataSource.initialize()
    console.log(`Database connected 🔥`)
    app.listen(process.env.PORT || 3000)
    console.log(`Server running on port ${process.env.PORT || 3000} 🚀`)
}

main()