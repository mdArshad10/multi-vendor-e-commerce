import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// Ensure upload directory exists
const uploadDir = path.resolve(__dirname, '../../public')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadDir)
    },
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

export const upload = multer({ storage })