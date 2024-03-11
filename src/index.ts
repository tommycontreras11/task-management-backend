import { connectDatabase } from "./database/connection"
import app from "./app"
import { ObjectStorage } from "./libs/object-storage"

async function main() {
    await connectDatabase()
    await ObjectStorage.instance.setConfiguration()
    app.listen(process.env.PORT || 3000)
    console.log(`Server running on port ${process.env.PORT || 3000} 🚀`)
}

main()