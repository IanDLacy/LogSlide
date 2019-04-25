const path = require('path')
const {app, ipcMain} = require('electron')
const Window = require('./Window')
const DataStore = require('./DataStore')
const idsData = new DataStore({ name: 'ids Main' })
const {dialog} = require('electron')
const MsgSet = require('./LogFileUtils')
const fs = require('fs')

function main () {
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html')
  })

  let addIdWin

  mainWindow.once('show', () => {
    mainWindow.webContents.send('ids', idsData.ids)
  })

  ipcMain.on('add-id-window', () => {
    console.log("in ad window")
    if (!addIdWin) {
      addIdWin = new Window({
        file: path.join('renderer', 'add.html'),
        width: 400,
        height: 400,
        parent: mainWindow,
        webPreferences: {
          nodeIntegration: true
        }
      })

      addIdWin.on('closed', () => {
        addIdWin = null
      })
    }
  })

  ipcMain.on('open-file-dialog', function (event) {
    dialog.showOpenDialog((fileNames) => {
      // fileNames is an array that contains all the selected
      if(fileNames === undefined){
          console.log("No file selected");
          return
      }
  
      fs.readFile(fileNames[0], 'utf-8', (err, data) => {
          if(err){
              alert("An error ocurred reading the file :" + err.message);
              return
          }
          msgSet = new MsgSet(data, 2.0)
      })
    })
  })

  ipcMain.on('add-id', (event, id) => {
    const updateids = idsData.addid(id).ids
    mainWindow.send('ids', updateids)
  })

  ipcMain.on('delete-id', (event, id) => {
    const updatedids = idsData.deleteid(id).ids

    mainWindow.send('ids', updatedids)
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})