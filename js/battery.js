// monsterkodi/kode 0.200.0

var _k_ = {extend: function (c,p) {for (var k in p) { if (Object.hasOwn(p, k)) c[k] = p[k] } function ctor() { this.constructor = c; } ctor.prototype = p.prototype; c.prototype = new ctor(); c.__super__ = p.prototype; return c;}}

var Battery, elem, Kachel, post, utils

elem = require('kxk').elem
post = require('kxk').post

utils = require('./utils')
Kachel = require('./kachel')

Battery = (function ()
{
    _k_.extend(Battery, Kachel)
    function Battery (kachelId = 'battery')
    {
        this.kachelId = kachelId
    
        this["onData"] = this["onData"].bind(this)
        Battery.__super__.constructor.call(this,this.kachelId)
        post.on('sysinfo',this.onData)
        this.init()
    }

    Battery.prototype["onData"] = function (data)
    {
        this.data = data
    
        return this.draw()
    }

    Battery.prototype["init"] = function ()
    {
        var bobl, body, svg

        this.div.innerHTML = ''
        svg = utils.svg(100,100)
        this.div.appendChild(svg)
        this.cycles = elem({class:'battery_cycles',parent:this.div,text:'?'})
        body = utils.rect(-30,-40,60,80,8,'battery_bg',svg)
        bobl = utils.rect(-15,-45,30,10,8,'battery_bg',svg)
        this.battery = utils.rect(-25,-35,50,70,5,'battery_loaded',svg)
        return this.battery.setAttribute('fill','#222222')
    }

    Battery.prototype["draw"] = function ()
    {
        var fill, _52_27_

        if (!(this.data != null ? this.data.battery : undefined))
        {
            return
        }
        if (!this.battery)
        {
            return
        }
        if (this.data.battery.plugged)
        {
            if (this.data.battery.charging)
            {
                fill = '#888'
            }
            else
            {
                fill = '#444'
            }
        }
        else
        {
            if (this.data.battery.percent <= 10)
            {
                fill = '#f00'
            }
            else if (this.data.battery.percent <= 20)
            {
                fill = '#f80'
            }
            else
            {
                fill = '#080'
            }
        }
        this.battery.setAttribute('y',-35 + 70 - 70 * this.data.battery.loaded)
        this.battery.setAttribute('height',70 * this.data.battery.loaded)
        this.battery.setAttribute('fill',fill)
        return this.cycles.innerHTML = this.data.battery.cycles
    }

    return Battery
})()

module.exports = Battery