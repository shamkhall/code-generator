import {SqlAstService} from "../sql-ast/sql-ast.service";
import {RequestSenderService} from "../request-sender/request-sender.service";
import {FileManagerService} from "../file-manager/file-manager.service";
import {UserResponseDto} from "./user-response.dto";
import {Config} from "../config/config";

export class ExecuteService {
    constructor(private readonly sqlAstService: SqlAstService,
                private readonly requestSenderService: RequestSenderService,
                private readonly fileManagerService: FileManagerService
    ) {
    }
    async createFolders (userResponseDto: UserResponseDto) {
        const ast = this.sqlAstService.createAST(userResponseDto.targetTable);
        if (ast === false) {
            console.log('[x] Error occurred when generating AST')
            return;
        }
        const folderName = ast[0].name.name;
        const schema = ast[0].name.schema;

        const rootFolderFunc = `${userResponseDto.targetFilePath}/functions/${schema}/${folderName}`;
        const rootFolderProd = `${userResponseDto.targetFilePath}/procedures/${schema}/${folderName}`;

        if(userResponseDto.willBeGenerate.findAll) {
            const sqlFile = `R__find_${folderName}.sql`
            await this.generateCode(Config.prompt_path.find_all, rootFolderFunc, sqlFile, userResponseDto)
            console.log('[>] Find All Done!');
        }

        if(userResponseDto.willBeGenerate.findOne) {
            const sqlFile = `R__get_${folderName}.sql`
            await this.generateCode(Config.prompt_path.find_one, rootFolderFunc, sqlFile, userResponseDto)
            console.log('[>] Find One Done!')
        }

        if(userResponseDto.willBeGenerate.create) {
            const sqlFile = `R__create_${folderName}.sql`
            await this.generateCode(Config.prompt_path.create, rootFolderProd, sqlFile, userResponseDto)
            console.log('[>] Create Done!')
        }

        if(userResponseDto.willBeGenerate.update) {
            const sqlFile = `R__update_${folderName}.sql`
            await this.generateCode(Config.prompt_path.update, rootFolderProd, sqlFile, userResponseDto)
            console.log('[>] Update Done!')
        }

        if(userResponseDto.willBeGenerate.delete) {
            const sqlFile = `R__delete_${folderName}.sql`
            await this.generateCode(Config.prompt_path.delete, rootFolderProd, sqlFile, userResponseDto)
            console.log('[>] Delete Done!')
        }

    }

    async generateCode (promptPath: string, rootFolder: string, sqlFile: string, userResponseDto: UserResponseDto) {
        const findAllMessage = this.fileManagerService.readFromFileSync(promptPath)
        const replWithTable = findAllMessage.replace('$tableStructure', userResponseDto.targetTable)
        const sql = await this.requestSenderService.sendMock(replWithTable);
        this.fileManagerService.createFolder(rootFolder);
        this.fileManagerService.toFileSync(`${rootFolder}/${sqlFile}`, sql);
    }
}
