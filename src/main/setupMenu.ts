import { app, Menu, ipcMain  } from 'electron';
import { MainWindow } from './createMainWindow';

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
      click: (item, focusWindow) => {
        mainWindow.alwaysOnTop = item.checked;
      }
    },
    {
      label: 'Mini Player Mode',
      type: 'checkbox',
      checked: false,
      click: (item, focusWindow) => {
        mainWindow.miniPlayerMode = item.checked;
      }
    }
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
