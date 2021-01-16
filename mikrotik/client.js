const { ipcMain } = require('electron')
const RouterOSClient = require('routeros-client').RouterOSClient;

module.exports = function(win) {
    let api = null;
 
    ipcMain.handle('routerosclient:connect', (event, {ipAddress, login, password})=>{

        api = new RouterOSClient({
            host: ipAddress,
            user: login,
            password
        });
         
        api.connect().then((client) => {
            // After connecting, the promise will return a client class so you can start using it


            console.log("connected... getting id");
            // You can either use spaces like the winbox terminal or
            // use the way the api does like "/system/identity", either way is fine
            client.menu("/system identity").getOnly().then((result) => {
                console.log(result.identity); // Mikrotik
                api.close();
            }).catch((err) => {
                console.log(err); // Some error trying to get the identity
            });
         
        }).catch((err) => {
            win.webContents.send('routerosclient:connectError', err.message);
        });
    });
}