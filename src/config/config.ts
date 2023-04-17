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
        'X-RapidAPI-Key': '3710f82b8bmsh7c9c4ad5ba3bb94p125b2bjsna641b01a4e87',
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
      }
}
