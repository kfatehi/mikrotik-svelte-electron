const { ipcRenderer } = require('electron')
import { errorMessage, connectForm, connected } from './stores';
import { get } from 'svelte/store';

export function connect() {
    errorMessage.set('Connecting...');

    ipcRenderer.on('routerosclient:connected', ()=>{
        errorMessage.set(null);
        connected.set(true);
    });
    
    ipcRenderer.on('routerosclient:connectError', (event, error)=>{
        errorMessage.set(error);
        connected.set(false);
    });

    ipcRenderer.invoke('routerosclient:connect', get(connectForm));
}

export function save() {
    ipcRenderer.invoke('niyama:save-connect-form', get(connectForm));
}