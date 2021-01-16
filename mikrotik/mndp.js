const { ipcMain } = require('electron')
const mndp = require('node-mndp');

module.exports = function(win) {
    let discovery = null;
 
    ipcMain.handle('mndp:start', ()=>{
        if (discovery) {
            return;
        }
        discovery = new mndp.NodeMndp({ port: 5678 });
        discovery.on('deviceFound', (device) => {
            win.webContents.send('mndp:deviceFound', device);
        })
        discovery.on('started', ()=>{
            discovery.refresh();
        })
        discovery.start();
    });

    ipcMain.handle('mndp:refresh', ()=>{
        if (discovery) {
            discovery.refresh()
        }
    });

    ipcMain.handle('mndp:stop', ()=>{
        discovery.stop();
        discovery = null;
    });
}