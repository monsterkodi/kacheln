###
000   000  000  000   000  0000000     0000000   000   000  
000 0 000  000  0000  000  000   000  000   000  000 0 000  
000000000  000  000 0 000  000   000  000   000  000000000  
000   000  000  000  0000  000   000  000   000  000   000  
00     00  000  000   000  0000000     0000000   00     00  
###

{ $, drag, post, valid, win } = require 'kxk'

w = new win
    dir:    __dirname
    pkg:    require '../package.json'
    icon:   '../img/menu@2x.png'
    prefsSeperator: '▸'

#  0000000   000   000  000       0000000    0000000   0000000
# 000   000  0000  000  000      000   000  000   000  000   000
# 000   000  000 0 000  000      000   000  000000000  000   000
# 000   000  000  0000  000      000   000  000   000  000   000
#  0000000   000   000  0000000   0000000   000   000  0000000

dragBounds = null
winDrag = null

window.onload = ->

    post.setMaxListeners 30
    
    Appl = require './appl'
    Data = require './data'
    Clock = require './clock'
    Dish = require './sysdish'
    Konrad = require './konrad'
    Battery = require './battery'
    Cores = require './cores'
    Volume = require './volume'
    
    new Clock
    new Dish
    new Konrad '/Applications/konrad.app'
    new Battery()
    new Volume()
    new Cores()
    
    new Appl '/Applications/clippo.app'
    new Appl '/Applications/ko.app'
    new Appl '/Applications/kalk.app'
    new Appl '/Applications/iTerm2.app'
    new Appl '/Applications/klog.app'
    new Appl '/Applications/knot.app'
    new Appl '/Applications/password-turtle.app'
    new Appl '/Applications/Firefox.app'
    new Appl '/Applications/keks.app'
    new Appl '/Applications/koin.app'
    new Appl '/System/Applications/Mail.app'
    new Appl '/System/Applications/Calendar.app'
    new Appl '/System/Applications/Utilities/Activity Monitor.app'
        
    # main.onfocus = -> $('#main').focus()
    
    data = new Data
    data.start()
    
    # 0000000    00000000    0000000    0000000   
    # 000   000  000   000  000   000  000        
    # 000   000  0000000    000000000  000  0000  
    # 000   000  000   000  000   000  000   000  
    # 0000000    000   000  000   000   0000000   
    
    winDrag = new drag
        target:     document.body
        handle:     $('#main')
        stopEvent:  false
        onStart:    (drag, event) -> 
            if valid event.target.classList
                return 'skip'
            dragBounds = window.win.getBounds()
        onMove:     (drag) ->
            if dragBounds
                window.win.setBounds
                    x:      dragBounds.x + drag.deltaSum.x 
                    y:      dragBounds.y + drag.deltaSum.y 
                    width:  dragBounds.width 
                    height: dragBounds.height
    
