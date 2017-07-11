import { BrowserWindow, ipcMain, Menu } from 'electron';
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
    const item = this.alwaysOnTopMenu;
    if (!item) return;
    if (item.checked !== val) {
      item.checked = val;
    }
    this.win.webContents.send(events.MAIN.SEND_ALWAYS_ON_TOP, val);
    this.win.setAlwaysOnTop(val);
  }

  isExists() {
    return !!this.win;
  }

  createWindow() {
    this.win = new BrowserWindow({width: 800, height: 600});
    this.win.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    }));
    this.win.on('closed', () => {
      this.win = null;
    });
   this.win.webContents.on('did-finish-load', () => {
      if (!this.win) return;
      this.win.webContents.send(events.MAIN.REQUEST_ALWAYS_ON_TOP);
      ipcMain.once(events.RENDERER.SEND_ALWAYS_ON_TOP,
        (e: Electron.IpcMessageEvent, val: boolean) => this.alwaysOnTop = val);
    });
    // this.win.webContents.openDevTools();
  }

  private get alwaysOnTopMenu() {
    const menus = Menu.getApplicationMenu();
    if (!menus) {
      return;
    }
    const menuItem = menus.items.find(item => item.label === 'Window');
    if (!menuItem) {
      return;
    }
    const subMenu: Electron.MenuItem[] = (menuItem as any).submenu.items;
    const item = subMenu.find(v => v.label === 'Always on Top');
    if (!item) {
      return;
    }
    return item;
  }
}

export default function createWindow () {
  return new MainWindow();
}
