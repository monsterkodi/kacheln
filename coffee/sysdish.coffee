###
 0000000  000   000   0000000  0000000    000   0000000  000   000  
000        000 000   000       000   000  000  000       000   000  
0000000     00000    0000000   000   000  000  0000000   000000000  
     000     000          000  000   000  000       000  000   000  
0000000      000     0000000   0000000    000  0000000   000   000  
###

{ clamp, deg2rad, post } = require 'kxk'

utils   = require './utils'
Kachel  = require './kachel'

class Sysdish extends Kachel
        
    @: (@kachelId='sysdish') -> 
        
        super @kachelId
        
        @animCount = 0
        
        @colors =
            dsk: [[128 128 255] [ 64  64 255]]
            net: [[  0 150   0] [  0 255   0]]
            cpu: [[255 255   0] [255 100   0]]
            
        @tops = 
            net: '0%'
            dsk: '33%'
            cpu: '66%'
        
        post.on 'sysinfo' @onData
        
        @initDish()
                            
    #  0000000   000   000  0000000     0000000   000000000   0000000   
    # 000   000  0000  000  000   000  000   000     000     000   000  
    # 000   000  000 0 000  000   000  000000000     000     000000000  
    # 000   000  000  0000  000   000  000   000     000     000   000  
    #  0000000   000   000  0000000    000   000     000     000   000  
    
    onData: (@data) =>
            
        @drawDish()
        @animDish()
        
    #  0000000   000   000  000  00     00  0000000    000   0000000  000   000  
    # 000   000  0000  000  000  000   000  000   000  000  000       000   000  
    # 000000000  000 0 000  000  000000000  000   000  000  0000000   000000000  
    # 000   000  000  0000  000  000 0 000  000   000  000       000  000   000  
    # 000   000  000   000  000  000   000  0000000    000  0000000   000   000  

    pie180: (pie, radius, angle, start=0) ->
        
        angle = clamp 0, 180, angle
        sx =  radius * Math.sin deg2rad start+angle
        sy = -radius * Math.cos deg2rad start+angle
        ex =  radius * Math.sin deg2rad start
        ey = -radius * Math.cos deg2rad start
        pie.setAttribute 'd' "M 0 0 L #{sx} #{sy} A #{radius} #{radius} #{start} 0 0 #{ex} #{ey} z"
    
    pie360: (pie, radius, angle) ->
        
        angle = clamp 0, 359, angle
        sx =  radius * Math.sin deg2rad angle
        sy = -radius * Math.cos deg2rad angle
        ex =  0
        ey = -radius
        f = angle <= 180 and '0 0' or '1 0'
        pie.setAttribute 'd' "M 0 0 L #{sx} #{sy} A #{radius} #{radius} 0 #{f} #{ex} #{ey} z"
    
    animDish: =>
        
        clearTimeout @animTimer
        
        return if not @data
        steps = 20 
        @animCount += 1
        if @animCount <= steps
            
            if @data.dsk?
                 
                @dskrNow += (@dskrNew - @dskrOld) / steps 
                @dskwNow += (@dskwNew - @dskwOld) / steps
                 
                @pie180 @dskrPie, 45, @dskrNow
                @pie180 @dskwPie, 45, @dskwNow, 180
                             
            @netrNow += (@netrNew - @netrOld) / steps
            @nettNow += (@nettNew - @nettOld) / steps 
             
            @pie180 @netrPie, 43, @netrNow
            @pie180 @nettPie, 43, @nettNow, 180
            
            @sysNow += (@sysNew - @sysOld) / steps 
            @usrNow += (@usrNew - @usrOld) / steps 
            
            @pie360 @usrPie, 40, @usrNow
            @pie360 @sysPie, 40, @sysNow
            
            @memuNow += (@memuNew - @memuOld) / steps
            @memaNow += (@memaNew - @memaOld) / steps 
            
            @pie360 @memuPie, 18, @memuNow
            @pie360 @memaPie, 18, @memaNow
                            
        @animTimer = setTimeout @animDish, parseInt 4000 / steps
    
    # 000  000   000  000  000000000  0000000    000   0000000  000   000  
    # 000  0000  000  000     000     000   000  000  000       000   000  
    # 000  000 0 000  000     000     000   000  000  0000000   000000000  
    # 000  000  0000  000     000     000   000  000       000  000   000  
    # 000  000   000  000     000     0000000    000  0000000   000   000  
    
    initDish: ->
 
        @div.innerHTML = ''
        svg = utils.svg clss:'dish'
        @div.appendChild svg

        pie = utils.circle radius:45 clss:'sysdish_disk_bgr' svg:svg
        @dskrPie = utils.pie svg:svg, radius:40 clss:'sysdish_disk_read'  angle:0
        @dskwPie = utils.pie svg:svg, radius:40 clss:'sysdish_disk_write' angle:0, start:180
        
        @netrPie = utils.pie svg:svg, radius:40 clss:'sysdish_net_recv' angle:0
        @nettPie = utils.pie svg:svg, radius:40 clss:'sysdish_net_send' angle:0 start:180
            
        pie = utils.circle radius:40 clss:'sysdish_load_bgr' svg:svg
        @sysPie = utils.pie svg:pie, radius:40 clss:'sysdish_load_sys' angle:0
        @usrPie = utils.pie svg:pie, radius:40 clss:'sysdish_load_usr' angle:0

        @memuPie = utils.pie svg:svg, radius:40 clss:'sysdish_mem_used'   angle:0
        @memaPie = utils.pie svg:svg, radius:40 clss:'sysdish_mem_active' angle:0
        
     # 0000000    00000000    0000000   000   000  0000000    000   0000000  000   000
     # 000   000  000   000  000   000  000 0 000  000   000  000  000       000   000
     # 000   000  0000000    000000000  000000000  000   000  000  0000000   000000000
     # 000   000  000   000  000   000  000   000  000   000  000       000  000   000
     # 0000000    000   000  000   000  00     00  0000000    000  0000000   000   000

     drawDish: ->

         return if not @data

         clearTimeout @animTimer
         
         @animCount = 0

         if @data.dsk?

             @dskrOld = @dskrNow = @dskrNew
             @dskwOld = @dskwNow = @dskwNew

             @dskrNew = 180*@data.dsk.r_sec/@data.dsk.r_max
             @dskwNew = 180*@data.dsk.w_sec/@data.dsk.w_max
             
         @netrOld = @netrNow = @netrNew
         @nettOld = @nettNow = @nettNew

         @netrNew = 180*@data.net.rx_sec/@data.net.rx_max
         @nettNew = 180*@data.net.tx_sec/@data.net.tx_max
         
         @sysOld = @sysNow = @sysNew
         @usrOld = @usrNow = @usrNew

         @sysNew = 360*@data.cpu.sys
         @usrNew = 360*@data.cpu.usr

         @memuOld = @memuNow = @memuNew
         @memaOld = @memaNow = @memaNew

         @memuNew = 360*@data.mem.used/@data.mem.total
         @memaNew = 360*@data.mem.active/@data.mem.total
                
module.exports = Sysdish
