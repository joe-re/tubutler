import { app, Menu, BrowserWindow } from "electron";

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

function createWindowMenu(): Electron.MenuItemConstructorOptions {
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
    { label: 'Always on Top', checked: true, click: (item, focusWindow) => console.log(item) }
  ]);
  return { label: "window", submenu: subMenu };
}

function createAppMenu(): Electron.MenuItemConstructorOptions {
  return {
    label: app.getName(),
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ],
  }k
}

function setAppMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    createViewMenu(),
    createWindowMenu()
  ];
  if (process.platform === 'darwin') {
    template.unshift(createAppMenu());
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

export default setAppMenu;
