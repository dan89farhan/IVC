const { app, BrowserWindow, Menu } = require('electron');

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./src/index.html');


    const menuTemplate = [
        {
            label: 'Files',
            submenu: [
                {
                    label: 'Feedback',
                    click: () => {
                        console.log('Feedback Clicked');
                    }
                },
                {
                    label: 'version IVC 1.1 - 2020 Freeware',
                    click: () => {
                        console.log('version IVC 1.1 - 2020 Freeware Clicked');
                    }
                },
                {
                    label: 'Software developerd by Ranayas',
                    click: () => {
                        console.log('Software developerd by Ranayas Clicked');
                    }
                },
                {
                    label: 'check for update',
                    click: () => {
                        console.log('check for update Clicked');
                    }
                },
                {
                    role: 'quit'
                },
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    win.setIcon('./src/assets/img/india-flag.jpg');

    win.webContents.openDevTools();
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})