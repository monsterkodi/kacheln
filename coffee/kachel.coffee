###
000   000   0000000    0000000  000   000  00000000  000        
000  000   000   000  000       000   000  000       000        
0000000    000000000  000       000000000  0000000   000        
000  000   000   000  000       000   000  000       000        
000   000  000   000   0000000  000   000  00000000  0000000    
###

{ $, app, elem, keyinfo, open, os, slash, stopEvent } = require 'kxk'

class Kachel

    @: (@kachelId='kachel') -> 
    
        @main =$ '#main'
        @div  = elem class:"kachel #{@constructor.name}" 
        @div.setAttribute 'tabindex' '0'
        @div.onkeydown    = @onKeyDown
        @div.onmouseenter = @onHover
        @div.onmouseleave = @onLeave
        @div.onfocus      = @onFocus
        @div.onblur       = @onBlur
        @main.appendChild @div
        @div.kachel = @
        @div.addEventListener 'mousedown' @onLeftClick
                    
    onKeyDown: (event) => 
    
        key = keyinfo.forEvent(event).key
        switch key
            when 'enter'  then @onLeftClick event
            when 'left' 'right' 'up' 'down'
                @neighborKachel(key)?.focus()
                
    neighborKachel: (direction) ->
        
        br = @div.getBoundingClientRect()
        if br.width < 100
            switch direction
                when 'down' then return @div.nextSibling?.nextSibling
                when 'up'   then return @div.previousSibling?.previousSibling

        switch direction
            when 'left'  'up'    then @div.previousSibling
            when 'right' 'down'  then @div.nextSibling
            
    # 00000000   00000000   0000000   000   000  00000000   0000000  000000000
    # 000   000  000       000   000  000   000  000       000          000   
    # 0000000    0000000   000 00 00  000   000  0000000   0000000      000   
    # 000   000  000       000 0000   000   000  000            000     000   
    # 000   000  00000000   00000 00   0000000   00000000  0000000      000   
    
    onContextMenu: (event) => stopEvent event 
    
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
    onFocus: (event) => @div.classList.add 'kachelFocus'
    onBlur:  (event) => @div.classList.remove 'kachelFocus'
        
    onLeftClick:   -> # to be overridden in subclasses
    onMiddleClick: -> # to be overridden in subclasses
    onRightClick:  -> # to be overridden in subclasses
        
module.exports = Kachel
