###
 0000000  000       0000000    0000000  000   000  
000       000      000   000  000       000  000   
000       000      000   000  000       0000000    
000       000      000   000  000       000  000   
 0000000  0000000   0000000    0000000  000   000  
###

{ post } = require 'kxk'

utils   = require './utils'
Kachel  = require './kachel'

class Clock extends Kachel
        
    @: (@kachelId='clock') -> 

        super @kachelId
        
        post.on 'clock' @onData
        @onLoad()
    
    onData: (data) => 
        
        return if not @hour
        
        @hour  .setAttribute 'transform' "rotate(#{30 * data.hour + data.minute / 2})"
        @minute.setAttribute 'transform' "rotate(#{6 * data.minute + data.second / 10})"
        @second.setAttribute 'transform' "rotate(#{6 * data.second})"
        
    # 000       0000000    0000000   0000000    
    # 000      000   000  000   000  000   000  
    # 000      000   000  000000000  000   000  
    # 000      000   000  000   000  000   000  
    # 0000000   0000000   000   000  0000000    
    
    onLoad: ->
        
        svg = utils.svg clss:'clock'
        @div.appendChild svg
        
        face = utils.circle radius:45 clss:'face' svg:svg
        
        @hour   = utils.append face, 'line' y1:0 y2:-32 class:'hour' 
        @minute = utils.append face, 'line' y1:0 y2:-42 class:'minute'
        @second = utils.append face, 'line' y1:0 y2:-42 class:'second'
                            
module.exports = Clock
