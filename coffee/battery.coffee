###
0000000     0000000   000000000  000000000  00000000  00000000   000   000  
000   000  000   000     000        000     000       000   000   000 000   
0000000    000000000     000        000     0000000   0000000      00000    
000   000  000   000     000        000     000       000   000     000     
0000000    000   000     000        000     00000000  000   000     000     
###

{ elem, post } = require 'kxk'

utils   = require './utils'
Kachel  = require './kachel'

class Battery extends Kachel
        
    @: (@kachelId='battery') -> 
        
        super @kachelId
        
        post.on 'sysinfo' @onData
        
        @init()
    
    onData: (@data) => @draw()
        
    # 000  000   000  000  000000000
    # 000  0000  000  000     000   
    # 000  000 0 000  000     000   
    # 000  000  0000  000     000   
    # 000  000   000  000     000   
    
    init: ->
 
        @div.innerHTML = ''
        svg = utils.svg width:100 height:100
        @div.appendChild svg
        @cycles = elem class:'battery_cycles' parent:@div, text:'?'

        body =     utils.rect x:-30 y:-40 w:60 h:80 r:8 clss:'battery_bg' svg:svg
        bobl =     utils.rect x:-15 y:-45 w:30 h:10 r:8 clss:'battery_bg' svg:svg
        @battery = utils.rect x:-25 y:-35 w:50 h:70 r:5 clss:'battery_loaded' svg:svg
        @battery.setAttribute 'fill' '#222222'
            
     # 0000000    00000000    0000000   000   000
     # 000   000  000   000  000   000  000 0 000
     # 000   000  0000000    000000000  000000000
     # 000   000  000   000  000   000  000   000
     # 0000000    000   000  000   000  00     00

     draw: ->

        return if not @data?.battery
        return if not @battery

        if @data.battery.plugged
            if @data.battery.charging
                fill = '#888'
            else
                fill = '#444'
        else
            if @data.battery.percent <= 10
                fill = '#f00'
            else if @data.battery.percent <= 20
                fill = '#f80'
            else
                fill = '#080'
         
        @battery.setAttribute 'y' -35+70-70*@data.battery.loaded
        @battery.setAttribute 'height' 70*@data.battery.loaded
        @battery.setAttribute 'fill' fill
        
        @cycles.innerHTML = @data.battery.cycles
                
module.exports = Battery
