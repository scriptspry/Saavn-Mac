const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')

// Open external urls in default browser
const open = function (target, appName, callback) {
  var opener;

  if (typeof(appName) === 'function') {
    callback = appName;
    appName = null;
  }

  if (appName)
    opener = 'open -a "' + escape(appName) + '"';
  else
    opener = 'open';

  if (process.env.SUDO_USER)
    opener = 'sudo -u ' + process.env.SUDO_USER + ' ' + opener;

  return exec(opener + ' "' + escape(target) + '"', callback);
}

function escape(s) {
  return s.replace(/"/g, '\\\"');
}

// Module to bind media shortcuts
const globalShortcut = require('electron').globalShortcut

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName

/*
// TODO: package .dll and .so as well for making this work with other platforms
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
*/

// Works only for OS X now
if (process.platform != 'darwin') {
  dialog.showMessageBox({
    "type": "error",
    "title": "Unsupported Platform",
    "message": "Only for Mac"
  });
}

pluginName = 'PepperFlashPlayer.plugin'

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    //	logo: path.join(__dirname, 'logo.png'),
    webPreferences: {
      plugins: true,
      sandbox: true,
      nodeIntegration: false
    }
  })

  // And load gaana.com
  mainWindow.loadURL(`https://www.gaana.com/`)

  // Open DevTools
  // mainWindow.webContents.openDevTools()

  var webView = mainWindow.webContents;

  // Navigation restricted to mainWindow only
  var handleUrl = function (e, url) {
    e.preventDefault()

    // Opening gaana urls
    if (url.replace('https://', '').replace('http://', '').indexOf('www.gaana.com') == 0)
      mainWindow.loadURL(url)
    else
      // Open External URLs in the default web browser
      open(url)
  }
  webView.on('will-navigate', handleUrl)

  // Bind Media Shortcuts - This wouldn't have been required if the
  // client side code listened to these keys along with KEY_NEXT, KEY_SPACE etc.
  // For now trigger functionality by remapping the keys
  globalShortcut.register('MediaPlayPause', function () {
    webView.sendInputEvent({
      type: 'keyDown',
      keyCode: 'Space'
    })
  })

  globalShortcut.register('MediaNextTrack', function () {
    webView.sendInputEvent({
      type: 'keyDown',
      keyCode: 'Right'
    })
  })

  globalShortcut.register('MediaPreviousTrack', function () {
    webView.sendInputEvent({
      type: 'keyDown',
      keyCode: 'Left'
    })
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // hide the window instead of closing when `⌘ + W` is used
  mainWindow.on('close', function (e) {
    if (!mainWindow.forceClose)
      e.preventDefault();
    mainWindow.hide();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // When quitting, unregister the shortcuts
  globalShortcut.unregisterAll()

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('before-quit', function () {
  mainWindow.forceClose = true;
});

app.on('activate', function () {
  mainWindow.show();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
