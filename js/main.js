// monsterkodi/kode 0.199.0

var _k_

var action, activeApps, app, args, electron, KachelApp, klog, mainMenu, onApps, os, pkg, post, slash, wxw, _

_ = require('kxk')._
app = require('kxk').app
args = require('kxk').args
klog = require('kxk').klog
os = require('kxk').os
post = require('kxk').post
slash = require('kxk').slash

electron = require('electron')
wxw = require('wxw')
pkg = require('../package.json')
mainMenu = electron.Menu.buildFromTemplate([{label:pkg.name,submenu:[{label:`About ${pkg.name}`,click:function ()
{
    return KachelApp.showAbout()
}},{label:"DevTools",accelerator:'CmdOrCtrl+Alt+I',click:function ()
{
    return electron.BrowserWindow.getFocusedWindow().webContents.openDevTools({mode:'detach'})
}},{label:"Reload",accelerator:'CmdOrCtrl+Alt+L',click:function ()
{
    return electron.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()
}},{label:"Quit",accelerator:'CmdOrCtrl+Q',click:function ()
{
    return KachelApp.quitApp()
}}]}])
KachelApp = new app({pkg:pkg,dir:__dirname,shortcut:slash.win() && 'Ctrl+F2' || 'F12',index:'./index.html',icon:'../img/app.ico',tray:'../img/menu.png',about:'../img/about.png',menu:mainMenu,width:132,height:1024,minWidth:64,maxWidth:256,maximizable:false,prefsSeperator:'▸',acceptFirstMouse:true,onActivate:function ()
{
    return klog('onActivate')
},onOtherInstance:function ()
{
    return klog('onOtherInstance')
},onQuit:function ()
{
    return klog('onQuit')
},onWinReady:(function (w)
{
    var k, keys, mainWin, v

    console.log('onWinReady')
    if (args.devtools)
    {
        w.webContents.openDevTools({mode:'detach'})
    }
    mainWin = w
    w.setHasShadow(false)
    if (os.platform() === 'win32')
    {
        keys = {left:'alt+ctrl+left',right:'alt+ctrl+right',up:'alt+ctrl+up',down:'alt+ctrl+down',topleft:'alt+ctrl+1',botleft:'alt+ctrl+2',topright:'alt+ctrl+3',botright:'alt+ctrl+4',top:'alt+ctrl+5',bot:'alt+ctrl+6',minimize:'alt+ctrl+m',maximize:'alt+ctrl+shift+m',close:'alt+ctrl+w',taskbar:'alt+ctrl+t',appswitch:'ctrl+tab',screenzoom:'alt+z'}
        electron.globalShortcut.register('F11',function ()
        {
            return action('taskbar')
        })
        for (k in keys)
        {
            v = keys[k]
            electron.globalShortcut.register(v,(function (a)
            {
                return function ()
                {
                    return action(a)
                }
            })(k))
        }
    }
    return w.show()
}).bind(this)})
console.log('KachelApp',(app != null))

action = function (act)
{
    klog('action',act)
    switch (act)
    {
        case 'maximize':
            console.log(wxw('maximize','top'))
            break
        case 'minimize':
            console.log(wxw('minimize','top'))
            break
        case 'close':
            console.log(wxw('close','top'))
            break
        case 'taskbar':
            wxw('taskbar','toggle')
            return post.toMain('screensize')

        case 'screenzoom':
            return require('./zoom').start({debug:false})

        case 'appswitch':
            return onAppSwitch()

        default:
            return require('./movewin')(act)
    }

}
activeApps = {}

onApps = function (apps)
{
    var active

    active = {}
    if (!_.isEqual(activeApps,active))
    {
        return activeApps = active
    }
}