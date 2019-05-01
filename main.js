const path = require('path')
const {app, ipcMain, Menu} = require('electron')
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

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
          {
            label:'Open Log',
            click() {
              openLog()
            }
          },
          {type: 'separator'},
          {label:'Open Project'},
          {label:'Save Project'},
          {label:'New Project'},
          {type: 'separator'},
          {
            label:'Exit',
            click() {
              // TOFU: if not saved, save
              app.quit()
            }
          }
      ]
    }
  ])
  Menu.setApplicationMenu(menu); 

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

  function openLog() {
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
          var msgSet = new MsgSet(data, 1.0)
          console.log(msgSet)
          var msgs = msgSet.msgs.values()
          for (i=0;i<msgSet.msgs.size;i++){
            addMsgSetIdToIds(msgs.next().value)
          }

      })
    })
  }

  function addMsgSetIdToIds(value) {
    //idsData.addIdFromSet(value).ids
    const updateids = idsData.addid(value).ids
    mainWindow.send('idSet', updateids)
  }

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