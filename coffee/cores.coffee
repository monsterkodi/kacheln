###
 0000000   0000000   00000000   00000000   0000000    
000       000   000  000   000  000       000         
000       000   000  0000000    0000000   0000000     
000       000   000  000   000  000            000    
 0000000   0000000   000   000  00000000  0000000     
###

{ empty, post } = require 'kxk'

utils   = require './utils'
Kachel  = require './kachel'

class Cores extends Kachel
        
    @: (@kachelId='cores') -> 
        
        super @kachelId
        
        post.on 'sysinfo' @onData
        
        @colors = ['#44f' '#88f' '#0a0' '#f80' '#fa0' '#ff0']
        
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

        body = utils.rect x:-40 y:-40 w:80 h:80 r:8 clss:'core_bg' svg:svg

        for i in 0...8
            r = utils.rect x:-36+i*9 y:-36 w:8 h:72 r:3 svg:svg, clss:'core_load'
        
        @cores = []
        for i in 0...8
            @cores.push utils.rect x:-36+i*9 y:30 w:8 h:6 r:3 svg:svg
            @cores[i].setAttribute 'fill' @colors[0]
            
     # 0000000    00000000    0000000   000   000
     # 000   000  000   000  000   000  000 0 000
     # 000   000  0000000    000000000  000000000
     # 000   000  000   000  000   000  000   000
     # 0000000    000   000  000   000  00     00

     draw: ->

        return if empty @data?.cpu?.cores
        return if not @cores

        for i in 0...8
            fill = @colors[parseInt @data.cpu.cores[i]*5]
            @cores[i].setAttribute 'y' 36-72*@data.cpu.cores[i]
            @cores[i].setAttribute 'height' 72*@data.cpu.cores[i]
            @cores[i].setAttribute 'fill' fill
                
module.exports = Cores
