export function decodeFile(file: Express.Multer.File, encoding: BufferEncoding = 'latin1') {
    return file.buffer.toString(encoding)
}