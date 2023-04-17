export const Config = {
    baseUrl: 'https://openai80.p.rapidapi.com',
    gpt: 'chat/completions',
    data: {
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user',
            content: 'hello'
        }]
    },
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
      }
}
