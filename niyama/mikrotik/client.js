const { ipcMain } = require('electron')
const RouterOSClient = require('routeros-client').RouterOSClient;

module.exports = function (win) {
    let api = null;

    let state = { connected: false }

    ipcMain.handle('routerosclient:connect', (event, { ipAddress, login, password }) => {

        client = null;
        api = new RouterOSClient({
            host: ipAddress,
            user: login,
            password,
            keepalive: true
        });

        function runtimeError(err) {
            win.webContents.send('routerosclient:connectError', err.message);
            state.connected = false;
            api = null;
        }

        api.connect().then((_client) => {
            // After connecting, the promise will return a client class so you can start using it
            state.connected = true;
            
            client = _client;

            api.on('error', runtimeError);

            win.webContents.send('routerosclient:connected');

            // // You can either use spaces like the winbox terminal or
            // // use the way the api does like "/system/identity", either way is fine
            // client.menu("/system identity").getOnly().then((result) => {
            //     console.log('result?', result, result.identity); // Mikrotik
            //     api.close();
            // }).catch((err) => {
            //     console.log('err?', err); // Some error trying to get the identity
            // });

        }).catch(runtimeError);
    });

    ipcMain.handle('routerosclient:get-addresses', (event) => {
        client.menu("/ip address").getAll().then((result) => {
            win.webContents.send('routerosclient:set-addresses', result);    
        });

    });

    return state;
}