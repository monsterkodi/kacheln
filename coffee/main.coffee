###
00     00   0000000   000  000   000
000   000  000   000  000  0000  000
000000000  000000000  000  000 0 000
000 0 000  000   000  000  000  0000
000   000  000   000  000  000   000
###

{ _, app, args, klog, os, post, prefs, slash } = require 'kxk'

electron  = require 'electron'
wxw       = require 'wxw'
pkg       = require '../package.json'

mainMenu = electron.Menu.buildFromTemplate [ 
        label: pkg.name
        submenu: [
            label: "About #{pkg.name}"
            click: -> KachelApp.showAbout()
        , 
            label: "DevTools"
            accelerator: 'CmdOrCtrl+Alt+I'
            click: -> electron.BrowserWindow.getFocusedWindow().webContents.openDevTools(mode:'detach')
        ,
            label: "Reload"
            accelerator: 'CmdOrCtrl+Alt+L'
            click: -> electron.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()
        ,
            label: "Quit"
            accelerator: 'CmdOrCtrl+Q'
            click: -> KachelApp.quitApp()
        ]
    ]

KachelApp = new app
    pkg:                pkg
    dir:                __dirname
    shortcut:           slash.win() and 'Ctrl+F2' or 'F2'
    index:              './index.html'
    icon:               '../img/app.ico'
    tray:               '../img/menu.png'
    about:              '../img/about.png'
    menu:               mainMenu
    width:              168
    height:             256
    minWidth:           64
    maxWidth:           256
    maximizable:        false
    prefsSeperator:     '▸'
    acceptFirstMouse:   true
    onActivate:         -> klog 'onActivate'
    onOtherInstance:    -> klog 'onOtherInstance'
    onQuit:             -> klog 'onQuit'
    onWinReady: (w) =>
        
        w.webContents.openDevTools(mode:'detach') if args.devtools
        
        # electron.powerSaveBlocker.start 'prevent-app-suspension'
        
        mainWin = w
        w.setHasShadow false
                
        if os.platform() == 'win32'
            keys = 
                left:       'alt+ctrl+left'
                right:      'alt+ctrl+right'
                up:         'alt+ctrl+up'
                down:       'alt+ctrl+down'
                topleft:    'alt+ctrl+1'
                botleft:    'alt+ctrl+2'
                topright:   'alt+ctrl+3'
                botright:   'alt+ctrl+4'
                top:        'alt+ctrl+5'
                bot:        'alt+ctrl+6'
                minimize:   'alt+ctrl+m'
                maximize:   'alt+ctrl+shift+m'
                close:      'alt+ctrl+w'
                taskbar:    'alt+ctrl+t'
                appswitch:  'ctrl+tab'
                screenzoom: 'alt+z'
                
            electron.globalShortcut.register 'F13' -> action 'taskbar'
            
            keys = prefs.get 'keys' keys
            prefs.set 'keys' keys
            prefs.save()
            
            for a in _.keys keys
                electron.globalShortcut.register keys[a], ((a) -> -> action a)(a)
        
        # post.on 'mouse' onMouse
        
        w.show()
        
#  0000000    0000000  000000000  000   0000000   000   000  
# 000   000  000          000     000  000   000  0000  000  
# 000000000  000          000     000  000   000  000 0 000  
# 000   000  000          000     000  000   000  000  0000  
# 000   000   0000000     000     000   0000000   000   000  

action = (act) ->

    klog 'action' act
    switch act
        when 'maximize'   then log wxw 'maximize' 'top'
        when 'minimize'   then log wxw 'minimize' 'top'
        when 'close'      then log wxw 'close'    'top'
        when 'taskbar'    then wxw 'taskbar' 'toggle'; post.toMain 'screensize'
        when 'screenzoom' then require('./zoom').start debug:false
        when 'appswitch'  then onAppSwitch()
        else 
            require('./movewin') act
                
#  0000000   00000000   00000000    0000000  
# 000   000  000   000  000   000  000       
# 000000000  00000000   00000000   0000000   
# 000   000  000        000             000  
# 000   000  000        000        0000000   

activeApps = {}
onApps = (apps) ->
    # klog 'apps ------------ ' apps.length
    # klog apps
    active = {}
    # for app in apps
        # if wid = kachelSet.wids[slash.path app]
            # active[slash.path app] = wid
            
    if not _.isEqual activeApps, active
        # for kid,wid of kachelSet.wids
            # if active[kid] and not activeApps[kid]
                # post.toWin wid, 'app' 'activated' kid
            # else if not active[kid] and activeApps[kid]
                # post.toWin wid, 'app' 'terminated' kid
        activeApps = active
    
# post.on 'apps' onApps
# post.onGet 'wins' -> lastWins
# post.onGet 'mouse' -> mousePos
        
#  0000000  000  0000000  00000000  
# 000       000     000   000       
# 0000000   000    000    0000000   
#      000  000   000     000       
# 0000000   000  0000000  00000000  

# post.on 'quit' KachelApp.quitApp
# post.on 'hide' -> 
                               
