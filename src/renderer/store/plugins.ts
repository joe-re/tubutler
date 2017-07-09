import { ipcRenderer } from 'electron';
import { State } from './index';
import Vuex from 'vuex';

const stateSyncPlugin = (store: Vuex.Store<State>) => {
  ipcRenderer.on('toggle', (mutations: any, params: { checked: boolean }) => {
    console.log(params);
  });
};

export default [stateSyncPlugin];
