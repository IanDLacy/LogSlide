const { ipcRenderer } = require('electron')

document.getElementById('idForm').addEventListener('submit', (evt) => {
    evt.preventDefault()

    const input = evt.target[0]

    ipcRenderer.send('add-id', input.value)

    input.value = ''
})