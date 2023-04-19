export const Config = {
    api_key: process.env.API_KEY,
    folder_name: 'sql',
    prompt_path: {
        find_all: 'src/request-sender/prompts/find-all.txt',
        find_one: 'src/request-sender/prompts/find-one.txt',
        create: 'src/request-sender/prompts/create.txt',
        update: 'src/request-sender/prompts/update.txt',
        delete: 'src/request-sender/prompts/delete.txt'
    },
    prompt_keys: {
        find_all: 'find-all',
        find_one: 'find-one',
        create: 'create',
        update: 'update',
        delete: 'delete'
    }
}
