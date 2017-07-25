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
    ipcRenderer.on(events.MAIN.SEND_ALWAYS_ON_TOP, this.saveAlwaysOnTop);
    ipcRenderer.on(events.MAIN.REQUEST_MINI_PLAYER_MODE, this.sendMiniPlayerMode);
    ipcRenderer.on(events.MAIN.SEND_TRANSPARENT_RATE, this.setTransparentTate);
    ipcRenderer.on(events.MAIN.SEND_MINI_PLAYER_MODE, this.saveMiniPlayerMode);
    ipcRenderer.on(events.MAIN.SEND_PLAY_NEXT, () => this.emit('PLAY_NEXT'));
    remote.getCurrentWindow().on('close', () => {
      ipcRenderer.removeAllListeners(events.MAIN.REQUEST_ALWAYS_ON_TOP);
      ipcRenderer.removeAllListeners(events.MAIN.SEND_ALWAYS_ON_TOP);
      ipcRenderer.removeAllListeners(events.MAIN.REQUEST_MINI_PLAYER_MODE);
      ipcRenderer.removeAllListeners(events.MAIN.SEND_TRANSPARENT_RATE);
      ipcRenderer.removeAllListeners(events.MAIN.SEND_MINI_PLAYER_MODE);
      ipcRenderer.removeAllListeners(events.MAIN.SEND_PLAY_NEXT);
    });
  }

  private setTransparentTate(e: Electron.IpcMessageEvent, transparentRate: number) {
    store.actions.setTransparentRate({ transparentRate });
  }

  private sendALwaysOnTop() {
    const val = JSON.parse(window.localStorage.getItem('ALWAYS_ON_TOP') || 'false');
    ipcRenderer.send(events.RENDERER.SEND_ALWAYS_ON_TOP, val);
  }

  private saveAlwaysOnTop(e: Electron.IpcMessageEvent, val: boolean) {
    window.localStorage.setItem('ALWAYS_ON_TOP', JSON.stringify(val));
  }

  private sendMiniPlayerMode() {
    const val = JSON.parse(window.localStorage.getItem('MINI_PLAYER_MODE') || 'false');
    store.actions.setMiniPlayerMode({ val });
    ipcRenderer.send(events.RENDERER.SEND_MINI_PLAYER_MODE, val);
  }

  private saveMiniPlayerMode(e: Electron.IpcMessageEvent, val: boolean) {
    if (val) {
      remote.getCurrentWindow().setMaximumSize(700, 392);
    } else {
      remote.getCurrentWindow().setMaximumSize(9999, 9999);
    }
    store.actions.setMiniPlayerMode({ val });
    window.localStorage.setItem('MINI_PLAYER_MODE', JSON.stringify(val));
  }
}
