import {Configuration, OpenAIApi} from 'openai';
import {Config} from "../config/config";

export class RequestSenderService {
    async send(message: string): Promise<string> {

        const configuration = new Configuration({
            apiKey: Config.api_key,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            temperature: 0.3,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        return response?.data?.choices?.[0]?.text?.trim();
    }
    async sendMock (message: string): Promise<string> {
        return 'OK';
    }
}
