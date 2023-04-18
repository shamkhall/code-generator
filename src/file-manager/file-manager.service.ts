import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
export class FileManagerService {
    constructor(folderName: string) {
        this.createFolder(folderName)
    }
    createFolder (folderName: string) {
        if(existsSync(folderName)) {
            return;
        }
        mkdirSync(folderName)
    }

    toFileSync(filename: string, content: string) {
        writeFileSync(filename, content, 'utf-8')
    }
    readFromFileSync (filename: string) {
        return readFileSync(filename, 'utf-8')
    }
}
