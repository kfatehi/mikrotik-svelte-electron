const { settings } = require('cluster');
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

let thedata={};

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

function loaditup() {
    thedata = JSON.parse(fs.readFileSync(settingsPath));
}
function resetit() {
    fs.writeFileSync(settingsPath, '{}');
}

if (fs.existsSync(settingsPath)) {
    try {
        loaditup();
    } catch(err) {
        console.error("couldnt read the user settings, clearing it");
        resetit();
    }

} else {
    resetit();
}

module.exports = {
    get: function(key, defaultRet=null) {
        return thedata[key] || defaultRet;
    },
    set: function(key, value) {
        thedata[key] = value;
        fs.writeFileSync(settingsPath, JSON.stringify(thedata, null, 4));
        return value;
    }
}