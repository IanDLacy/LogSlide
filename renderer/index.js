const { ipcRenderer } = require('electron')
const selectDirBtn = document.getElementById('open')

var msgsHidden = true

ipcRenderer.on('selected-file', function (event, path) {
    document.getElementById('selected-file').innerHTML = `&#9658; ${path}`
    document.getElementById('selected-file2').innerHTML = `${path}`
})

// delete id by its text value 
const deleteid = (e) => {
    ipcRenderer.send('delete-id', e.target.textContent)
}

document.getElementById('addId').addEventListener('click', () => {
    ipcRenderer.send('add-id-window')
})

document.getElementById('hideMessages').addEventListener('click', () => {
    console.log('clicked')
    var hideUnhide = document.querySelector("#bodygrid");
    var display = document.querySelector("#messages");
    if (msgsHidden){
        //console.log('unhidden');
        //hideUnhide.style.gridTemplateAreas = ' "sidebar msgbox plots" "sidebar msgbox options" "footer footer footer" ';
        display.style.display = "grid";
        hideUnhide.style.gridTemplateColumns = "3rem 15rem auto";
        hideUnhide.style.display = "grid";
        msgsHidden = false;
    }
    else{
        //console.log('hidden');
        //hideUnhide.style.gridTemplateAreas = ' "sidebar plots plots" "sidebar plots options" "footer footer footer" ';
        display.style.display = "none";
        hideUnhide.style.gridTemplateColumns = "3rem opx auto";
        hideUnhide.style.display = "grid";
        msgsHidden = true;
    }
});

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