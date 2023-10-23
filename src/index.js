const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require("electron-log");
log.transports.file.resolvePath = () => path.join('D:\Electron\Electron-Auto-Update','logs/main.log');
log.info("Electron Auto Update");

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.openDevTools();
};

// app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

app.whenReady().then(() => {
  createWindow();

  autoUpdater.checkForUpdatesAndNotify();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on("update-available", (info)=>{
  log.info("update-available",info);
});

autoUpdater.on("checking-for-update", (info)=>{
  log.info("checking-for-update",info);
});

autoUpdater.on("update-downloaded", (info)=>{
  log.info("update-downloaded", info);
});

autoUpdater.on("download-progress", (progressTrack)=>{
  log.info("download-progress")
  log.info(progressTrack);
});

autoUpdater.on("update-not-available", (info)=>{
  log.info("update-not-available",info);
});

autoUpdater.on('error', (message) => {
  log.info('There was a problem updating the application', message)
});