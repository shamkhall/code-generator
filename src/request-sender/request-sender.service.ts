import axios from 'axios';
import {Config} from "../config/config";

export class RequestSenderService {
    async send(message: string) {
        const data = Config.data;
        data.messages[0].content = message;
        const options = {
            method: 'POST',
            url: `${Config.baseUrl}/${Config.gpt}`,
            headers: Config.headers,
            data: Config.data
        };

        const response = await axios.request(options)

        console.log(response.data)
        return response.data.choices[0].message.content
    }
}
