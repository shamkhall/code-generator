import {RequestSenderService} from "./request-sender/request-sender.service";
import fs from 'fs';

async function bootstrap () {
    const requestSenderService = new RequestSenderService()
    const message = fs.readFileSync('src/message.txt', 'utf-8')
    console.log(await requestSenderService.send(message));
}

bootstrap();
