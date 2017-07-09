import { app, BrowserWindow } from 'electron';
import setupMenu from './setupMenu';
import createMainWindow, { MainWindow } from './createMainWindow';

let mainWindow: MainWindow;
app.on('ready', () => {
  mainWindow = createMainWindow();
  setupMenu(mainWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow.isExists()) {
    mainWindow.createWindow();
  }
})
