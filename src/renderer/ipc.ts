import { ipcRenderer, remote } from 'electron';
import events from '../constants/ipcEvents';
import EventEmitter from 'events';
import store from './store';

export default class IPC extends EventEmitter {
  static instance: IPC;

  static getInstance(): IPC {
    if (!this.instance) {
      this.instance = new IPC();
    }
    return this.instance;
  }

  listenStart() {
    ipcRenderer.on(events.MAIN.REQUEST_ALWAYS_ON_TOP, this.sendALwaysOnTop);
    ipcRenderer.on(events.MAIN.SEND_ALWAYS_ON_TOP, (e: Electron.IpcMessageEvent, val: boolean) => this.saveAlwaysOnTop(val));
    ipcRenderer.on(events.MAIN.REQUEST_MIN_PLAYER_MODE, this.sendMinPlayerMode);
    ipcRenderer.on(events.MAIN.SEND_MIN_PLAYER_MODE, (e: Electron.IpcMessageEvent, val: boolean) => {
      if (val) {
        remote.getCurrentWindow().setMaximumSize(700, 392);
      } else {
        remote.getCurrentWindow().setMaximumSize(9999, 9999);
      }
      this.saveMinPlayerMode(val);
      this.emit('onChangeMinPlayer', val);
    });
    remote.getCurrentWindow().on('close', () => {
      ipcRenderer.removeAllListeners(events.MAIN.REQUEST_ALWAYS_ON_TOP);
      ipcRenderer.removeAllListeners(events.MAIN.SEND_ALWAYS_ON_TOP);
      ipcRenderer.removeAllListeners(events.MAIN.SEND_MIN_PLAYER_MODE);
    });
  }

  private sendALwaysOnTop() {
    const val = JSON.parse(window.localStorage.getItem('ALWAYS_ON_TOP') || 'false');
    ipcRenderer.send(events.RENDERER.SEND_ALWAYS_ON_TOP, val);
  }

  private saveAlwaysOnTop(val: boolean) {
    window.localStorage.setItem('ALWAYS_ON_TOP', JSON.stringify(val));
  }

  private sendMinPlayerMode() {
    const val = JSON.parse(window.localStorage.getItem('MIN_PLAYER_MODE') || 'false');
    store.dispatch('setMinPlayerMode', { val });
    ipcRenderer.send(events.RENDERER.SEND_MIN_PLAYER_MODE, val);
  }

  private saveMinPlayerMode(val: boolean) {
    window.localStorage.setItem('MIN_PLAYER_MODE', JSON.stringify(val));
  }
}
