const { ipcRenderer } = require('electron')
import { errorMessage } from './stores';

export function connect(connectArgs) {

    errorMessage.set('Connecting...');
    
    ipcRenderer.on('routerosclient:connectError', (event, error)=>{
        errorMessage.set(error);
    });

    ipcRenderer.invoke('routerosclient:connect', connectArgs);
}