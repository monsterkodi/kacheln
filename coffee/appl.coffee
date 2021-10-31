###
 0000000   00000000   00000000   000      
000   000  000   000  000   000  000      
000000000  00000000   00000000   000      
000   000  000        000        000      
000   000  000        000        0000000  
###

{ $, app, elem, empty, klog, kstr, os, post, slash, valid } = require 'kxk'

Kachel  = require './kachel'
appIcon = require './icon'
utils   = require './utils'
wxw     = require 'wxw'

class Appl extends Kachel
        
    @: (@kachelId='appl') ->

        post.on 'app' @onApp
        post.on 'win' @onWin
        
        @activated = false
        @status    = ''
        
        super @kachelId
        
        @onInitKachel @kachelId
                
    onApp: (action, app) =>
        
        klog 'onApp' activated, app
        @activated = action == 'activated'
        @updateDot()

    onWin: (wins) =>
        
        klog 'onWin' wins
        @status = ''
        for w in wins
            for c in ['maximized' 'normal']
                if w.status.startsWith c
                    @status = w.status
                    break
            if valid @status
                break
                
        if empty @status
            for w in wins
                if w.status == 'minimized'
                    @status = 'minimized'
                    break
        
        @updateDot()
        
    onBounds: =>
        
        if os.platform() == 'win32' # on windows,
            if dot =$ '.appldot'    # for some reason the content 
                dot.remove()        # doesn't get updated immediately on resize 
                @updateDot()        # if there is a dot svg present
        
    # 0000000     0000000   000000000  
    # 000   000  000   000     000     
    # 000   000  000   000     000     
    # 000   000  000   000     000     
    # 0000000     0000000      000     
    
    updateDot: ->
        
        dot =$ '.appldot' @div
        
        if @activated and not dot
            dot  = utils.svg width:16 height:16 clss:'appldot'
            grp  = utils.append dot, 'g'
            crc  = utils.append grp, 'circle' cx:0 cy:0 r:7 class:'applcircle'
            @div.appendChild dot
        else if not @activated and dot
            dot?.remove()
            dot = null
            
        if dot
            dot.classList.remove 'top'
            dot.classList.remove 'normal'
            dot.classList.remove 'minimized'
            dot.classList.remove 'maximized'
            if valid @status
                for s in @status.split ' '
                    dot.classList.add s
        
    #  0000000  000      000   0000000  000   000  
    # 000       000      000  000       000  000   
    # 000       000      000  000       0000000    
    # 000       000      000  000       000  000   
    #  0000000  0000000  000   0000000  000   000  
                
    onLeftClick: => @openApp @kachelId
    onRightClick: => wxw 'minimize' slash.file @kachelId
    onMiddleClick: => wxw 'terminate' @kachelId
                    
    # 000  000   000  000  000000000  
    # 000  0000  000  000     000     
    # 000  000 0 000  000     000     
    # 000  000  0000  000     000     
    # 000  000   000  000     000     
    
    onInitKachel: (@kachelId) =>
            
        iconDir = slash.join post.get('userData'), 'icons'
        appName = slash.base @kachelId
        iconPath = "#{iconDir}/#{appName}.png"
                
        if not slash.isFile iconPath
            @refreshIcon()
        else
            @setIcon iconPath
           
        base = slash.base @kachelId
        if base in ['Calendar']
            minutes = {Calendar:60}[base]
            @refreshIcon()
            setInterval @refreshIcon, 1000*60*minutes
            
    # 000   0000000   0000000   000   000  
    # 000  000       000   000  0000  000  
    # 000  000       000   000  000 0 000  
    # 000  000       000   000  000  0000  
    # 000   0000000   0000000   000   000  
        
    refreshIcon: =>
        
        iconDir = slash.join post.get('userData'), 'icons'
        appName = slash.base @kachelId
        pngPath = slash.resolve slash.join iconDir, appName + ".png"
        
        appIcon @kachelId, pngPath
        @setIcon pngPath
        
        base = slash.base @kachelId
        if base in ['Calendar']
            @div.children[0].style.opacity = 0
            time = new Date()
            day = elem class:'calendarDay' text:kstr.lpad time.getDate(), 2, '0'
            mth = elem class:'calendarMonth' text:['JAN' 'FEB' 'MAR' 'APR' 'MAY' 'JUN' 'JUL' 'AUG' 'SEP' 'OCT' 'NOV' 'DEC'][time.getMonth()]
            @div.appendChild elem class:'calendarIcon' children: [mth, day]
                
    setIcon: (iconPath) =>
        
        return if not iconPath
        super
        @updateDot()
                           
module.exports = Appl
