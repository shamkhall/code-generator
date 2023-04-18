import {RequestSenderService} from "./request-sender/request-sender.service";
import {FileManagerService} from "./file-manager/file-manager.service";
import {Config} from "./config/config";

async function bootstrap () {
    console.log('[>] Getting things ready...')
    const requestSenderService = new RequestSenderService()
    const fileManagerService = new FileManagerService(Config.folder_name);

    console.log('[>] Sending message...')
    const message = fileManagerService.readFromFileSync('src/message.txt')
    const sql = await requestSenderService.send(message)
    fileManagerService.toFileSync(`${Config.folder_name}/func.sql`, sql);
    console.log('[>] Done!')
}

bootstrap();
