import { neighbors } from './stores.js'
import { get } from 'svelte/store';

const { ipcRenderer } = require('electron')

export function start() {
    ipcRenderer.on('mndp:deviceFound', (event, device)=>{
        if (device.macAddress.length == "")
            return;

        // prevent dupe by getting current list without the one we just learned of
        let items = get(neighbors).filter((n)=> n.macAddress != device.macAddress);

        // convert the uptime from seconds to that which winbox shows
        device.uptime = new Date(device.uptime * 1000).toISOString().substring(11, 19);

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