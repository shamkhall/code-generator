import {app, BrowserWindow} from 'electron';
import {createWindow} from "./window/create-windows";

async function bootstrap() {

    app.whenReady().then(() => {
        createWindow()

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })

    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
}

bootstrap();

