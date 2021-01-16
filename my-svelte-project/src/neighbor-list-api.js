import { neighbors } from './stores.js'
import { get } from 'svelte/store';

const { ipcRenderer } = require('electron')

export function start() {
    ipcRenderer.on('mndp:deviceFound', (event, device)=>{
        if (device.macAddress.length == "")
            return;

        // remove duplicate so we can add it
        let items = get(neighbors).filter((n)=> n.macAddress != device.macAddress);

        neighbors.set([...items, device]);
    })			
    ipcRenderer.invoke('mndp:start')
}

export function refresh() {
    neighbors.set([]);
    ipcRenderer.invoke('mndp:refresh');
}

export function stop() {
    ipcRenderer.off('mndp:deviceFound');
    ipcRenderer.invoke('mndp:stop');
}   