const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const Store = require('electron-store');
const isDev = require('electron-is-dev');
const log = require('log-to-file');
// import isDev from 'electron-is-dev';
// import log from 'log-to-file';

const { autoUpdater } = require('electron-updater');

// Enable live reload for Electron too
// require('electron-reload')(__dirname, {
//     // Note that the path to electron may vary according to the main file
//     electron: require(`${__dirname}/node_modules/electron`)
// });

function createWindow() {
    const win = new BrowserWindow({
        width: 380,
        height: 600,
        icon: __dirname + '/src/assets/img/india-flag.jpg',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        resizable: false
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
                    label: 'Version IVT 1.0.5 - 2020 Freeware',
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
                    label: 'Check for update',
                    click: () => {
                        console.log('check for update Clicked');
                    }
                },
                {
                    label: 'Set output folder',
                    click: () => {
                        openFileDialoge(win);
                    }
                },
                {
                    label: 'About IVT',
                    click: () => {
                        showMessageBox(win);
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


    // win.once('ready-to-show', () => {
    //     autoUpdater.checkForUpdatesAndNotify();
    // });

    if (isDev) {
        // Open the DevTools.
        win.webContents.openDevTools()
    } else {
        // Handle squirrel event. Avoid calling for updates when install
        if (require('electron-squirrel-startup')) {
            log('Squirrel events handle', 'electron-example.log')
            app.quit()
            // Hack because app.quit() is not immediate
            process.exit(0)
        }

        if (process.platform === 'win32') {
            var cmd = process.argv[1]
            if (cmd === '--squirrel-firstrun') {
                log('Squirrel first run', 'electron-example.log')
                return
            }
        }

        // Check for updates
        win.webContents.once("did-frame-finish-load", function (event) {
            log('Ready to look for update', 'electron-example.log')
            updater.init()
        })
    }
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

/** Show message box */
function showMessageBox(win) {
    let options = {
        type: "info",
        title: "About US IVT",
        message: `
        Hi,

        The IVT (Indian Video Transcoder) is a freeware software and developed by Ranayas (India), this software can convert any format to HLS or Mpeg dash files in H264 and H265 codec.
        Before starting the conversion, need to select the output folder from File Menu
        Specification has given below
        Time slice - 4 sec
        Audio -192k 
        sample rate - 48000Hz
        Codec - ADTS
        Channels - As default attached in Video file 
        Resolution -
        240      426X240
        360      640X360
        480      854X480
        720      1280X720
        1080   1920X1080
        FPS - As default of video
        Key integer - As default in ffmpeg
        Gif time format - HH:MM:SS 

        you can also send feedback on ranayas.store@gmail.com
        `,

    }

    let filePaths = dialog.showMessageBox(win, options);
}

autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
});


autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});
