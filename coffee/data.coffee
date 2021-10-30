###
0000000     0000000   000000000   0000000 
000   000  000   000     000     000   000
000   000  000000000     000     000000000
000   000  000   000     000     000   000
0000000    000   000     000     000   000
###

{ $, _, childp, empty, klog, kpos, last, os, post, slash, udp, win } = require 'kxk'

electron = require 'electron'
wxw      = require 'wxw'

class Data

    @: ->
        
        @detach()
        
        #  @hookProc  = wxw 'hook' 'proc'
        @hookInfo  = wxw 'hook' 'info'
        #  @hookInput = wxw 'hook' 'input'
            
        @providers = 
            # mouse:      new Mouse
            # apps:       new Apps
            wins:       new Wins
            clock:      new Clock 
            sysinfo:    new Sysinfo
        
    start: ->
        
        return if @udp

        @udp = new udp port:65432 onMsg:@onUDP
        setTimeout @slowTick, 1000
        
    detach: ->
        
        if os.platform() == 'win32'
            wxw 'kill' 'wc.exe'
        else
            wxw 'kill' 'mc'
            
    # 000   000  0000000    00000000   
    # 000   000  000   000  000   000  
    # 000   000  000   000  00000000   
    # 000   000  000   000  000        
    #  0000000   0000000    000        
    
    onUDP: (msg) => 
        
        switch msg.event
            when 'mousedown' 'mousemove' 'mouseup' 'mousewheel' then @providers.mouse?.onEvent msg
            when 'proc' then @providers.apps?.onEvent msg
            when 'info' then @providers.wins?.onEvent msg
            # else log msg
        
    slowTick: =>
        
        for name,provider of @providers
            if provider.tick == 'slow'
                provider.onTick @
                
        setTimeout @slowTick, 1000 - (new Date).getMilliseconds()
        
#  0000000  000       0000000    0000000  000   000  
# 000       000      000   000  000       000  000   
# 000       000      000   000  000       0000000    
# 000       000      000   000  000       000  000   
#  0000000  0000000   0000000    0000000  000   000  

class Clock
        
    @: (@name='clock' @tick='slow') -> 
        
    onTick: (data) =>

        time = new Date()
        
        hours   = time.getHours()
        minutes = time.getMinutes()
        seconds = time.getSeconds()
        
        post.emit 'clock',
            hour:   hours
            minute: minutes
            second: seconds
                                     
#  0000000  000   000   0000000  000  000   000  00000000   0000000   
# 000        000 000   000       000  0000  000  000       000   000  
# 0000000     00000    0000000   000  000 0 000  000000    000   000  
#      000     000          000  000  000  0000  000       000   000  
# 0000000      000     0000000   000  000   000  000        0000000   

class Sysinfo
        
    @: (@name='sysinfo' @tick='slow') ->
        
        fork = childp.fork "#{__dirname}/memnet"
        fork.on 'message' @onMessage
        
    onMessage: (m) => 
        
        @data = JSON.parse m
        post.emit 'sysinfo' @data
        
    onTick: (data) => # if @data then post.emit 'sysinfo' @data
        
# 00     00   0000000   000   000   0000000  00000000  
# 000   000  000   000  000   000  000       000       
# 000000000  000   000  000   000  0000000   0000000   
# 000 0 000  000   000  000   000       000  000       
# 000   000   0000000    0000000   0000000   00000000  

class Mouse
    
    @: (@name='mouse') ->
                
        @last = Date.now()
        @interval = parseInt 1000/60
        @lastEvent = null
        @sendTimer = null
        
    onEvent: (event) =>

        @lastEvent = event
        now = Date.now()
        clearTimeout @sendTimer
        @sendTimer = null
        
        if now - @last > @interval
            @last = now
            
            pos = kpos event
            if os.platform() == 'win32'
                pos = kpos(electron.screen.screenToDipPoint pos).rounded()
            
            event.x = pos.x
            event.y = pos.y
            
            # klog 'mouse' event.x, event.y
        
            post.emit 'mouse' event
        else
            @sendTimer = setTimeout (=> @onEvent @lastEvent), @interval
                            
#  0000000   00000000   00000000    0000000  
# 000   000  000   000  000   000  000       
# 000000000  00000000   00000000   0000000   
# 000   000  000        000             000  
# 000   000  000        000        0000000   

class Apps
    
    @: (@name='apps') ->
        
        @lastApps = null        
        
    onEvent: (event) =>
        
        apps = Array.from new Set event.proc.map (p) -> p.path
        
        apps.pop() if empty last apps
        
        if os.platform() == 'win32'
            apps = apps.filter (p) -> 
                s = slash.path slash.removeDrive p 
                if s.startsWith '/Windows/System32'
                    return slash.base(s) in ['cmd' 'powershell']
                true
                 
        apps.sort()
        if not _.isEqual apps, @lastApps
            klog 'apps' apps
            @lastApps = apps
        
# 000   000  000  000   000   0000000  
# 000 0 000  000  0000  000  000       
# 000000000  000  000 0 000  0000000   
# 000   000  000  000  0000       000  
# 00     00  000  000   000  0000000   

class Wins
    
    @: (@name='wins') ->
        
        @lastWins = null

    kacheln: ->
        
        kl = []
        for i in 0...$('#main').children.length
            kl.push $('#main').children[i].kachel
        kl
        
    onEvent: (event) =>
        
        wins = event.info
        
        if os.platform() == 'darwin'
            for win in wins
                if win.index == 0
                    win.status += ' top'
                else if win.index < 0
                    win.status = 'minimized'
                    
        wins.pop() if empty last wins
        if not _.isEqual wins, @lastWins
            # klog wins
            @lastWins = wins
            
            for k in @kacheln()
                for win in wins
                    if k?.status? and win.path == k.kachelId
                        # klog "#{k.kachelId} #{win.status}"
                        k.activated = true
                        k.status = win.status
                        k.updateDot()
    
module.exports = Data

