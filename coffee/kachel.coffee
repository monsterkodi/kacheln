###
000   000   0000000    0000000  000   000  00000000  000        
000  000   000   000  000       000   000  000       000        
0000000    000000000  000       000000000  0000000   000        
000  000   000   000  000       000   000  000       000        
000   000  000   000   0000000  000   000  00000000  0000000    
###

{ $, app, drag, elem, klog, open, os, slash, stopEvent } = require 'kxk'

class Kachel

    @: (@kachelId='kachel') -> 
    
        @main =$ '#main'
        @div  = elem class:"kachel #{@constructor.name}" 
        
        @main.appendChild @div
        
        @div.addEventListener 'mousedown' @onLeftClick
        
        # @drag = new drag
            # target:   @div
            # onStart:  @onDragStart
            # onMove:   @onDragMove
            # onStop:   @onDragStop
                
    # 00000000   00000000   0000000   000   000  00000000   0000000  000000000
    # 000   000  000       000   000  000   000  000       000          000   
    # 0000000    0000000   000 00 00  000   000  0000000   0000000      000   
    # 000   000  000       000 0000   000   000  000            000     000   
    # 000   000  00000000   00000 00   0000000   00000000  0000000      000   
    
    onContextMenu: (event) => stopEvent event 
    
    # 0000000    00000000    0000000    0000000   
    # 000   000  000   000  000   000  000        
    # 000   000  0000000    000000000  000  0000  
    # 000   000  000   000  000   000  000   000  
    # 0000000    000   000  000   000   0000000   
    
    onDragStart: (drag, event) =>
    
        klog 'onDragStart'
        
    onDragMove: (drag, event) =>
        
        klog 'onDragMove'

    onDragStop: (drag, event) =>

        klog 'onDragStop'
                    
    # 000   0000000   0000000   000   000  
    # 000  000       000   000  0000  000  
    # 000  000       000   000  000 0 000  
    # 000  000       000   000  000  0000  
    # 000   0000000   0000000   000   000  
    
    setIcon: (iconPath, clss='applicon') =>
        
        return if not iconPath
        img = elem 'img' class:clss, src:slash.fileUrl slash.path iconPath
        img.ondragstart = -> false
        @div.innerHTML = ''
        @div.appendChild img

    #  0000000   00000000   00000000  000   000   0000000   00000000   00000000   
    # 000   000  000   000  000       0000  000  000   000  000   000  000   000  
    # 000   000  00000000   0000000   000 0 000  000000000  00000000   00000000   
    # 000   000  000        000       000  0000  000   000  000        000        
    #  0000000   000        00000000  000   000  000   000  000        000        
    
    openApp: (app) ->
        
        if os.platform() == 'win32'
            infos = wxw 'info' slash.file app
            if infos.length
                wxw 'focus' slash.file app
            else
                open slash.unslash app
        else
            open app
        
    # 00000000  000   000  00000000  000   000  000000000  
    # 000       000   000  000       0000  000     000     
    # 0000000    000 000   0000000   000 0 000     000     
    # 000          000     000       000  0000     000     
    # 00000000      0      00000000  000   000     000     
    
    onHover: (event) => @div.classList.add 'kachelHover'
    onLeave: (event) => @div.classList.remove 'kachelHover'
        
    onLoad:        -> # to be overridden in subclasses
    onShow:        -> # to be overridden in subclasses
    onMove:        -> # to be overridden in subclasses
    onFocus:       -> # to be overridden in subclasses
    onBlur:        -> # to be overridden in subclasses
    onMove:        -> # to be overridden in subclasses
    onClose:       -> # to be overridden in subclasses
    onBounds:      -> # to be overridden in subclasses
    onLeftClick:   -> # to be overridden in subclasses
    onMiddleClick: -> # to be overridden in subclasses
    onRightClick:  -> # to be overridden in subclasses
        
module.exports = Kachel
