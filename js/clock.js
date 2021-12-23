// monsterkodi/kode 0.199.0

var _k_ = {extend: function (c,p) {for (var k in p) { if (Object.hasOwn(p, k)) c[k] = p[k] } function ctor() { this.constructor = c; } ctor.prototype = p.prototype; c.prototype = new ctor(); c.__super__ = p.prototype; return c;}}

var Clock, Kachel, post, utils

post = require('kxk').post

Kachel = require('./kachel')
utils = require('./utils')

Clock = (function ()
{
    _k_.extend(Clock, Kachel);
    function Clock (kachelId = 'clock')
    {
        this.kachelId = kachelId
    
        this["onData"] = this["onData"].bind(this)
        Clock.__super__.constructor.call(this,this.kachelId)
        post.on('clock',this.onData)
        this.onLoad()
        return Clock.__super__.constructor.apply(this, arguments)
    }

    Clock.prototype["onData"] = function (data)
    {
        if (!this.hour)
        {
            return
        }
        this.hour.setAttribute('transform',`rotate(${30 * data.hour + data.minute / 2})`)
        this.minute.setAttribute('transform',`rotate(${6 * data.minute + data.second / 10})`)
        return this.second.setAttribute('transform',`rotate(${6 * data.second})`)
    }

    Clock.prototype["onLoad"] = function ()
    {
        var face, svg

        svg = utils.svg(100,100,'clock')
        this.div.appendChild(svg)
        face = utils.circle(45,0,0,'face',svg)
        this.hour = utils.append(svg,'line',{y1:0,y2:-32,class:'hour'})
        this.minute = utils.append(svg,'line',{y1:0,y2:-42,class:'minute'})
        return this.second = utils.append(svg,'line',{y1:0,y2:-42,class:'second'})
    }

    return Clock
})()

module.exports = Clock