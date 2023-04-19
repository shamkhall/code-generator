const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const subject = document.getElementById('subject').value;
        ipcRenderer.send('inputSubmit', subject);
    });

    ipcRenderer.on('result', (evt, message) => {
        document.getElementById('compilation').innerText = message
    })
})
