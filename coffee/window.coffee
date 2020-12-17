###
000   000  000  000   000  0000000     0000000   000   000  
000 0 000  000  0000  000  000   000  000   000  000 0 000  
000000000  000  000 0 000  000   000  000   000  000000000  
000   000  000  000  0000  000   000  000   000  000   000  
00     00  000  000   000  0000000     0000000   00     00  
###

{ $, post, win } = require 'kxk'

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

window.onload = ->

    post.setMaxListeners 30
    
    Data = require './data'
    data = new Data
    
    Clock = require './clock'
    clock = new Clock
    
    Dish = require './sysdish'
    dish = new Dish
    
    Konrad = require './konrad'
    new Konrad '/Users/kodi/s/konrad/konrad-darwin-x64/konrad.app'
    
    Appl = require './appl'
    new Appl '/Users/kodi/s/clippo/clippo-darwin-x64/clippo.app'
    new Appl '/Users/kodi/s/ko/ko-darwin-x64/ko.app'
    new Appl '/Users/kodi/s/klog/klog-darwin-x64/klog.app'
    new Appl '/Users/kodi/s/knot/knot-darwin-x64/knot.app'
    new Appl '/Users/kodi/s/turtle/password-turtle-darwin-x64/password-turtle.app'
    new Appl '/Users/kodi/s/keks/keks-darwin-x64/keks.app'
    new Appl '/Applications/Firefox.app'
    new Appl '/System/Applications/Mail.app'
    new Appl '/Applications/iTerm2.app'
    new Appl '/Users/kodi/s/kalk/kalk-darwin-x64/kalk.app'
    
    main =$ '#main'
    main.onfocus = -> $('#main').children[4]?.focus()
    
    data.start()
