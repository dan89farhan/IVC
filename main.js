const { app, BrowserWindow, Menu, dialog } = require('electron');
const Store = require('electron-store');

const { autoUpdater } = require('electron-updater');

// Enable live reload for Electron too
// require('electron-reload')(__dirname, {
//     // Note that the path to electron may vary according to the main file
//     electron: require(`${__dirname}/node_modules/electron`)
// });

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/src/assets/img/india-flag.jpg',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
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
                    label: 'Setting',
                    click: () => {
                        openFileDialoge(win);
                    }
                },
                {
                    role: 'quit'
                },
            ]
        },
        // {
        //     label: 'View',
        //     submenu: [
        //         { role: 'reload' },
        //         { role: 'forcereload' },
        //         { role: 'toggledevtools' },
        //         { type: 'separator' },
        //         { role: 'resetzoom' },
        //         { role: 'zoomin' },
        //         { role: 'zoomout' },
        //         { type: 'separator' },
        //         { role: 'togglefullscreen' }
        //     ]
        // },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    win.setIcon('./src/assets/img/india-flag.jpg');

    // win.webContents.openDevTools();


    win.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
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
});

function openFileDialoge(win) {
    let options = {
        // See place holder 1 in above image
        title: "Select Directory",

        // See place holder 2 in above image
        defaultPath: "",


        properties: ['openDirectory']
    }

    //Synchronous
    let filePaths = dialog.showOpenDialog(win, options);
    filePaths.then(dir => {
        // console.log();
        const store = new Store();
        const dirLocation = dir.filePaths[0];
        store.set('videoStore', dirLocation);

    }).catch(e => {
        console.log(e);
    });
}


autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});


autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});
