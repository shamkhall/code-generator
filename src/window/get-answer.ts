import {ipcMain} from "electron";
import BrowserWindow = Electron.BrowserWindow;
import {RequestSenderService} from "../request-sender/request-sender.service";
import {SqlAstService} from "../sql-ast/sql-ast.service";
import {ExecuteService} from "../execute/execute.service";
import {FileManagerService} from "../file-manager/file-manager.service";
import {UserResponseDto, WillBeGenerateDto} from "../execute/user-response.dto";

export function getAnswer (win: BrowserWindow){
    const sqlAstService = new SqlAstService();
    const requestSenderService = new RequestSenderService();
    const fileManagerService = new FileManagerService();
    const executeService = new ExecuteService(sqlAstService, requestSenderService, fileManagerService);

    // DTOs
    const userResponseDto = new UserResponseDto();
    const willBeGenerateDto = new WillBeGenerateDto();

    ipcMain.on('inputSubmit', async (event, inputVal) => {
        willBeGenerateDto.findOne = inputVal.find_one === 'true'
        willBeGenerateDto.findAll = inputVal.find_all === 'true'
        willBeGenerateDto.create = inputVal.create === 'true'
        willBeGenerateDto.update = inputVal.update === 'true'
        willBeGenerateDto.delete = inputVal.delete === 'true'

        userResponseDto.willBeGenerate = willBeGenerateDto;
        userResponseDto.targetTable = inputVal.subject;
        userResponseDto.targetFilePath = inputVal.file_path;
        await executeService.createFolders(userResponseDto);
    });
}
