const { ipcRenderer } = require('electron')
import { get } from 'svelte/store';
import { mainProcessStateLoaded, connectForm, savedTargets} from './stores';

export function fetchMainState() {

    ipcRenderer.on('niyama:report-main-state', (event, mainState)=>{
        console.log('ayy the main procs state', mainState);

        mainProcessStateLoaded.set(true);

        connectForm.set(mainState.connectForm);

        savedTargets.set(mainState.savedTargets);
    });

    ipcRenderer.invoke('niyama:fetch-main-state');
}

export function saveConnectForm() {
    ipcRenderer.invoke('niyama:save-connect-form', get(connectForm));
}