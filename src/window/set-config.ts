import {ipcMain} from "electron";
import BrowserWindow = Electron.BrowserWindow;
import {RequestSenderService} from "../request-sender/request-sender.service";

export function setConfig (win: BrowserWindow){

    const requestSenderService = new RequestSenderService()

    ipcMain.on('inputSubmit', async (event, inputVal) => {
        const sql = await requestSenderService.send(inputVal);
        console.log('sql', sql)
        win.webContents.send('result', sql)
    });
}
