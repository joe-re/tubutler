import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import setupMenu from './setupMenu';

let win: Electron.BrowserWindow | null;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, alwaysOnTop: true})

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  })
}

app.on('ready', () => {
  createWindow();
  setupMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
