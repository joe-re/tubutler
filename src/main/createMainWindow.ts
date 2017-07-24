import { shell, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import url from 'url';
import events from '../constants/ipcEvents';

export class MainWindow {
  win: Electron.BrowserWindow | null;
  constructor() {
    this.createWindow();
  }

  get alwaysOnTop() {
    if (!this.win) {
      return false;
    }
    return this.win.isAlwaysOnTop();
  }

  set alwaysOnTop(val: boolean) {
    if (!this.win) return;
    const item = this.findMenuItem('Window', 'Always on Top');;
    if (!item) return;
    if (item.checked !== val) {
      item.checked = val;
    }
    this.win.webContents.send(events.MAIN.SEND_ALWAYS_ON_TOP, val);
    this.win.setAlwaysOnTop(val);
  }

  get miniPlayerMode() {
    const item = this.findMenuItem('Window', 'Mini Player Mode');;
    if (!item) return false;
    return item.checked;
  }

  set miniPlayerMode(val: boolean) {
    if (!this.win) return;
    const item = this.findMenuItem('Window', 'Mini Player Mode');;
    if (!item) return;
    if (item.checked !== val) {
      item.checked = val;
    }
    this.win.webContents.send(events.MAIN.SEND_MINI_PLAYER_MODE, val);
  }

  isExists() {
    return !!this.win;
  }

  createWindow() {
    this.win = new BrowserWindow({ width: 800, height: 600, minHeight: 250, minWidth: 300, transparent: true, titleBarStyle: 'hidden' });
    const htmlPath = process.env.NODE_ENV === 'production' ? './index.html' : '../index.html';
    this.win.loadURL(url.format({
      pathname: path.join(__dirname, htmlPath),
      protocol: 'file:',
      slashes: true
    }));
    this.win.webContents.on('did-finish-load', () => {
      if (!this.win) return;
      this.win.webContents.send(events.MAIN.REQUEST_ALWAYS_ON_TOP);
      this.win.webContents.send(events.MAIN.REQUEST_MINI_PLAYER_MODE);
      ipcMain.once(events.RENDERER.SEND_ALWAYS_ON_TOP,
        (e: Electron.IpcMessageEvent, val: boolean) => this.alwaysOnTop = val);
      ipcMain.once(events.RENDERER.SEND_MINI_PLAYER_MODE,
        (e: Electron.IpcMessageEvent, val: boolean) => this.miniPlayerMode = val);
    });
    this.win.on('closed', () => {
      this.win = null;
    });
    this.win.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
    // this.win.webContents.openDevTools();
  }

  private findMenuItem(menuLabel: string, subMenuLabel: string) {
    const menus = Menu.getApplicationMenu();
    if (!menus) {
      return;
    }
    const menuItem = menus.items.find(item => item.label === menuLabel);
    if (!menuItem) {
      return;
    }
    const subMenu: Electron.MenuItem[] = (menuItem as any).submenu.items;
    const item = subMenu.find(v => v.label === subMenuLabel);
    if (!item) {
      return;
    }
    return item;
  }
}

export default function createWindow () {
  return new MainWindow();
}
