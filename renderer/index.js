const { ipcRenderer } = require('electron')
const selectDirBtn = document.getElementById('open')

ipcRenderer.on('selected-file', function (event, path) {
    document.getElementById('selected-file').innerHTML = `&#9658; ${path}`
    document.getElementById('selected-file2').innerHTML = `${path}`
})

// delete id by its text value 
const deleteid = (e) => {
    ipcRenderer.send('delete-id', e.target.textContent)
}

document.getElementById('createidBtn').addEventListener('click', () => {
    ipcRenderer.send('add-id-window')
})

ipcRenderer.on('ids', (event, ids) => {
    const idList = document.getElementById('idList')

    const idItems = ids.reduce((html, id) => {
        html += `<li class="id-item">${id}</li>`
        return html
    }, '')
    
    idList.innerHTML = idItems

    idList.querySelectorAll('.id-item').forEach(item => {
        item.addEventListener('click', deleteid)
    })
})

ipcRenderer.on('idSet', (event, ids) => {
    const idList = document.getElementById('idList')

    const idItems = ids.reduce((html, id) => {
        html += `<li class="id-item">${id.id}</li>`
        return html
    }, '')
    
    idList.innerHTML = idItems

    idList.querySelectorAll('.id-item').forEach(item => {
        item.addEventListener('click', deleteid)
    })
})