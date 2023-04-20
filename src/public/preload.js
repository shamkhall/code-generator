const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputForm').addEventListener('submit', async (event) => {
        document.getElementById('progress').style.width = `0%`;

        event.preventDefault();
        const res = {}

        const subject = document.getElementById('subject').value;
        const filePath = document.getElementById('file_path').value;

        res['subject'] = subject
        res['file_path'] = filePath
        const codeToGen = document.forms[0];

        for (let i = 0; i < codeToGen.length; i++) {
            if(codeToGen[i].checked) {
                res[codeToGen[i].name] = codeToGen[i].value;
            }
        }

        ipcRenderer.send('inputSubmit', res);

        for (let i = 0; i <= 100; i++) {
            await getDelay();
            document.getElementById('progress').style.width = `${i}%`;
        }

    });

    ipcRenderer.on('result', (evt, message) => {
        document.getElementById('compilation').innerText = message;
    })
})

function getDelay () {
    return new Promise((resolve, reject) =>
        setTimeout(resolve, 20)
    )
}
