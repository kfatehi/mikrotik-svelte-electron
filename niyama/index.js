const { ipcMain } = require('electron');
const mndp = require('./mikrotik/mndp');
const routerosclient = require('./mikrotik/client');
const userSettings = require('./user-settings');

module.exports = function(win) {
    mndp(win);
    let client = routerosclient(win);

    ipcMain.handle('niyama:save-connect-form', (event, form)=>{
        userSettings.set('connectForm', form);
    });

    ipcMain.handle('niyama:fetch-main-state', ()=>{
        // called when the svelte app is ready
        // so now is a good time to read for saved stuff

        // userSettings.set('managed', [{macAddress:'123'}]);

        win.webContents.send('niyama:report-main-state', {
            connectForm: userSettings.get('connectForm', {ipAddress:'',login:'',password:''}),
            savedTargets: userSettings.get('savedTargets', []), // TODO
            connected: client && client != null,
        });

    });
}