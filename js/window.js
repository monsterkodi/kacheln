// monsterkodi/kode 0.199.0

var _k_ = {empty: function (l) {return l==='' || l===null || l===undefined || l!==l || typeof(l) === 'object' && Object.keys(l).length === 0}, valid: undefined}

var $, drag, dragBounds, kxk, post, w, win, winDrag

kxk = require('kxk')
$ = kxk.$
drag = kxk.drag
post = kxk.post
win = kxk.win

w = new win({dir:__dirname,pkg:require('../package.json'),icon:'../img/menu@2x.png',prefsSeperator:'▸'})
dragBounds = null
winDrag = null

window.onload = function ()
{
    var Appl, Battery, Clock, Cores, data, Data, Dish, Konrad, Volume

    post.setMaxListeners(30)
    Appl = require('./appl')
    Data = require('./data')
    Clock = require('./clock')
    Dish = require('./sysdish')
    Konrad = require('./konrad')
    Battery = require('./battery')
    Cores = require('./cores')
    Volume = require('./volume')
    new Clock
    new Dish
    new Konrad('/Applications/konrad.app')
    new Battery()
    new Volume()
    new Cores()
    new Appl('/Applications/clippo.app')
    new Appl('/Applications/ko.app')
    new Appl('/Applications/kalk.app')
    new Appl('/Applications/iTerm2.app')
    new Appl('/Applications/klog.app')
    new Appl('/Applications/knot.app')
    new Appl('/Applications/password-turtle.app')
    new Appl('/Applications/Firefox.app')
    new Appl('/Applications/keks.app')
    new Appl('/Applications/koin.app')
    new Appl('/System/Applications/Mail.app')
    new Appl('/System/Applications/Calendar.app')
    new Appl('/System/Applications/Utilities/Activity Monitor.app')
    data = new Data
    data.start()
    return winDrag = new drag({target:document.body,handle:$('#main'),stopEvent:false,onStart:function (drag, event)
    {
        if (!_k_.empty(event.target.classList))
        {
            return 'skip'
        }
        return dragBounds = window.win.getBounds()
    },onMove:function (drag)
    {
        if (dragBounds)
        {
            return window.win.setBounds({x:dragBounds.x + drag.deltaSum.x,y:dragBounds.y + drag.deltaSum.y,width:dragBounds.width,height:dragBounds.height})
        }
    }})
}