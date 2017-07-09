import { ipcRenderer } from 'electron';
import events from '../constants/ipcEvents';

export default class IPC {
  static instance: IPC;
  private constructor() { }

  static getInstance(): IPC {
    if (!this.instance) {
      this.instance = new IPC();
    }
    return this.instance;
  }

  listenStart() {
    ipcRenderer.on(events.MAIN.REQUEST_ALWAYS_ON_TOP, this.sendALwaysOnTop);
    ipcRenderer.on(events.MAIN.SEND_ALWAYS_ON_TOP, (e: Electron.IpcMessageEvent, val: boolean) => this.saveAlwaysOnTop(val));
  }

  sendALwaysOnTop() {
    const val = JSON.parse(window.localStorage.getItem('ALWAYS_ON_TOP') || 'false');
    ipcRenderer.send(events.RENDERER.SEND_ALWAYS_ON_TOP, val);
  }

  saveAlwaysOnTop(val: boolean) {
    window.localStorage.setItem('ALWAYS_ON_TOP', JSON.stringify(val));
  }
}
