'use strict'

const { BrowserWindow } = require('electron')

// default window settings
const defaultProps = {
    width: 500,
    height: 800,
    show: false,
    webPreferences: {
        nodeIntegration: true
      }
}

class Window extends BrowserWindow {
    constructor ({ file, ...windowSettings }) {
        // calls new BrowserWindow with these props
        super({ ...defaultProps, ...windowSettings })

        // load the html and devtools
        this.loadFile(file)
        this.webContents.openDevTools()

        // gracefully show when ready to prevent flickering
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window