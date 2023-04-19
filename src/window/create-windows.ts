import {BrowserWindow, ipcMain} from "electron";
import path from "path";
import {setConfig} from "./set-config";

export function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 850,
        webPreferences: {
            preload: path.resolve('src/public/preload.js'),
            devTools: false
        }
    })

    win.loadFile(path.resolve('src/public/index.html'))
    setConfig(win)
}
