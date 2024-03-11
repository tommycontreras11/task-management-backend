import { generateUniqueFileName, getExtensionByFileName } from "../../utils/dir.util"
import { statusCode } from "../../utils/statusCode"
import { ALLOWED_EXTENSION } from "../../constants"
import { ObjectStorage } from "../../libs/object-storage"
import { FileEntity } from "../../database/entities/entity/file.entity"
import { TaskEntity } from "../../database/entities/entity/task.entity"

export async function uploadFileService(uuid: string, files:
    Record<string, Express.Multer.File[]>
    | Express.Multer.File[]
    | undefined) {

    if(!Array.isArray(files)) {
        return Promise.reject({ message: "No files found", status: statusCode.BAD_REQUEST })
    }

    const foundTask = await TaskEntity.findOne({
        where: {
            uuid
        }
    }).catch((e) => {
        console.error("createFileService -> TaskEntity.findOne: ", e);
        return null;
    })

    if(!foundTask) return Promise.reject({ message: "Task not found", status: statusCode.NOT_FOUND })

    await recursiveUploadFile(foundTask, files)
    return "File created successfully"
}

async function recursiveUploadFile(task: TaskEntity, files: Express.Multer.File[]): Promise<unknown> {
    const payload = files.pop()

    if(!payload) return 

    const extension = getExtensionByFileName(payload.originalname)
    if(!extension || !ALLOWED_EXTENSION.includes(extension)) {
        return Promise.reject({ message: "File extension not allowed. Valid extensions are: " + ALLOWED_EXTENSION.join(", ") + "", status: statusCode.BAD_REQUEST })
    }

    const storage = ObjectStorage.instance

    const fileName = await generateUniqueFileName(extension)

    const file = await FileEntity.create({
        fileName,
        tasks: [task]
    }).save().catch((e) => {
        console.error("createFileService -> FileEntity.create: ", e);
        return null;
    })

    if(!file) return Promise.reject({ message: "File not created", status: statusCode.BAD_REQUEST })

    const minio = await storage.uploadDocument(
        file.fileName,
        payload.buffer,
        payload.size,
        extension
    ).catch(async (e) => {
        console.error("createFileService -> storage.uploadDocument: ", e);
        await file.remove()
        return null;
    })

    if(!minio) return Promise.reject({ message: "File not uploaded to minio", status: statusCode.BAD_REQUEST })

    return Promise.resolve(fileName)
}