console.log("hi");

// In the Renderer process
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action')