###
000   000  000  000   000  0000000     0000000   000   000  
000 0 000  000  0000  000  000   000  000   000  000 0 000  
000000000  000  000 0 000  000   000  000   000  000000000  
000   000  000  000  0000  000   000  000   000  000   000  
00     00  000  000   000  0000000     0000000   00     00  
###

{ $, drag, post, win } = require 'kxk'

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
    
    Data = require './data'
    data = new Data
    
    Clock = require './clock'
    clock = new Clock
    
    Dish = require './sysdish'
    dish = new Dish
    
    Konrad = require './konrad'
    new Konrad '/Applications/konrad.app'
    
    Appl = require './appl'
    new Appl '/Applications/clippo.app'
    new Appl '/Applications/ko.app'
    new Appl '/Applications/kalk.app'
    new Appl '/Applications/iTerm2.app'
    new Appl '/Applications/klog.app'
    # new Appl '/Applications/knot.app'
    new Appl '/Applications/password-turtle.app'
    # new Appl '/Users/kodi/s/keks/keks-darwin-x64/keks.app'
    new Appl '/System/Applications/Mail.app'
    new Appl '/Applications/Firefox.app'
    
    main.onfocus = -> $('#main').children[4]?.focus()
    
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
        onStart:    -> dragBounds = window.win.getBounds()
        onMove:     (drag) ->
            if dragBounds
                window.win.setBounds
                    x:      dragBounds.x + drag.deltaSum.x 
                    y:      dragBounds.y + drag.deltaSum.y 
                    width:  dragBounds.width 
                    height: dragBounds.height
    
