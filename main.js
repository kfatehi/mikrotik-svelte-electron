const { deepStrictEqual } = require('assert')
const console = require('console')
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


const { ipcMain } = require('electron');


const mndp = require('node-mndp');
let discovery = new mndp.NodeMndp({
  port: 5678
});

discovery.on('deviceFound', (device) => {
	console.info('Got discovery packet: ', device);
	//nodes[device.macAddress] = { ...device, time: Date.now() };
})

discovery.start();




ipcMain.handle('perform-action', (event, ...args)=>{
  console.log('sending refresh');
  
  discovery.refresh();
})
