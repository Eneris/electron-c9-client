'use strict';

const electron = require('electron');
const Menu = require('menu');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1600, height: 900, frame: true});

  const menu = Menu.buildFromTemplate([
    {
      label: 'Application',
      submenu: [
        {
          label: 'DevTools',
          accelerator: 'F12',
          click: function (item ,focusedWindow) {
            focusedWindow.openDevTools();
          },
          type: 'normal'
        },
        {
          type: 'separator'
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function (item ,focusedWindow) {
            focusedWindow.webContents.reload();
          },
          type: 'normal'
        },
        {
          label: 'Open in Browser',
          click: function (item ,focusedWindow) {
            shell.openExternal(focusedWindow.webContents.getUrl());
          },
          type: 'normal'
        },
        {
          label: 'Close window',
          click: function (item, focusedWindow) {
            focusedWindow.close();
          }
        },
        {
          label: 'Exit application',
          accelerator: 'CmdOrCtrl+Q',
          click: function () {
            app.quit();
          },
          type: 'normal'
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  mainWindow.loadURL('https://c9.io');
  // mainWindow.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
