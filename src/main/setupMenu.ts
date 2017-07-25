import { app, Menu, ipcMain  } from 'electron';
import { MainWindow } from './createMainWindow';
import events from '../constants/ipcEvents';

function sendTransparentRate(focusWindow: Electron.BrowserWindow, rate: number) {
  if (focusWindow && focusWindow.webContents) {
    focusWindow.webContents.send(events.MAIN.SEND_TRANSPARENT_RATE, rate);
  }
}

function sendPlayNext(focusWindow: Electron.BrowserWindow) {
  if (focusWindow && focusWindow.webContents) {
    focusWindow.webContents.send(events.MAIN.SEND_PLAY_NEXT);
  }
}

function createViewMenu(): Electron.MenuItemConstructorOptions {
  return {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click: (item: any, focusedWindow: Electron.BrowserWindow) => focusedWindow && focusedWindow.reload()
      },
      {
        label: "Toggle DevTools",
        accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click: (item: any, focusedWindow: Electron.BrowserWindow) => focusedWindow && focusedWindow.webContents.toggleDevTools()
      },
      {
        label: "Play Next",
        accelerator: "CmdOrCtrl+N",
        click: (item, focusWindow) => sendPlayNext(focusWindow)
      }
    ],
  }
};

function createWindowMenu(mainWindow: MainWindow): Electron.MenuItemConstructorOptions {
  let subMenu: Electron.MenuItemConstructorOptions[] = process.platform === 'darwin' ?
    [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ] :
    [
      { role: 'close' },
      { role: 'minimize' }
    ];
  subMenu = subMenu.concat([
    { type: 'separator' },
    {
      label: 'Always on Top',
      type: 'checkbox',
      checked: false,
      accelerator: 'CmdOrCtrl+Alt+T',
      click: (item, focusWindow) => {
        mainWindow.alwaysOnTop = item.checked;
      }
    },
    {
      label: 'Mini Player Mode',
      type: 'checkbox',
      checked: false,
      accelerator: 'CmdOrCtrl+Alt+M',
      click: (item, focusWindow) => {
        mainWindow.miniPlayerMode = item.checked;
      }
    },
    {
      label: 'Transparent Rate',
      type: 'submenu',
      submenu: [
        { label: '0%', accelerator: 'CmdOrCtrl+Alt+0', type: 'radio', checked: true, click: (item, focusWindow) => sendTransparentRate(focusWindow, 0) },
        { label: '10%', accelerator: 'CmdOrCtrl+Alt+1', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 10) },
        { label: '20%', accelerator: 'CmdOrCtrl+Alt+2', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 20) },
        { label: '30%', accelerator: 'CmdOrCtrl+Alt+3', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 30) },
        { label: '40%', accelerator: 'CmdOrCtrl+Alt+4', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 40) },
        { label: '50%', accelerator: 'CmdOrCtrl+Alt+5', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 50) },
        { label: '60%', accelerator: 'CmdOrCtrl+Alt+6', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 60) },
        { label: '70%', accelerator: 'CmdOrCtrl+Alt+7', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 70) },
        { label: '80%', accelerator: 'CmdOrCtrl+Alt+8', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 80) },
        { label: '90%', accelerator: 'CmdOrCtrl+Alt+9', type: 'radio', click: (item, focusWindow) => sendTransparentRate(focusWindow, 90) },
      ]
    },
  ]);
  return { label: 'Window', submenu: subMenu };
}

function createAppMenu(): Electron.MenuItemConstructorOptions {
  return {
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ],
  }
}

function setAppMenu(mainWindow: MainWindow) {
  const template: Electron.MenuItemConstructorOptions[] = [
    createViewMenu(),
    createWindowMenu(mainWindow)
  ];
  if (process.platform === 'darwin') {
    template.unshift(createAppMenu());
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

export default setAppMenu;
