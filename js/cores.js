// monsterkodi/kode 0.201.0

var _k_ = {extend: function (c,p) {for (var k in p) { if (Object.hasOwn(p, k)) c[k] = p[k] } function ctor() { this.constructor = c; } ctor.prototype = p.prototype; c.prototype = new ctor(); c.__super__ = p.prototype; return c;}, empty: function (l) {return l==='' || l===null || l===undefined || l!==l || typeof(l) === 'object' && Object.keys(l).length === 0}}

var Cores, Kachel, post, utils

empty = require('kxk').empty
post = require('kxk').post

utils = require('./utils')
Kachel = require('./kachel')

Cores = (function ()
{
    _k_.extend(Cores, Kachel)
    function Cores (kachelId = 'cores')
    {
        this.kachelId = kachelId
    
        this["onData"] = this["onData"].bind(this)
        Cores.__super__.constructor.call(this,this.kachelId)
        post.on('sysinfo',this.onData)
        this.colors = ['#44f','#88f','#0a0','#f80','#fa0','#ff0']
        this.init()
    }

    Cores.prototype["onData"] = function (data)
    {
        this.data = data
    
        return this.draw()
    }

    Cores.prototype["init"] = function ()
    {
        var body, i, r, svg

        this.div.innerHTML = ''
        svg = utils.svg(100,100)
        this.div.appendChild(svg)
        body = utils.rect(-40,-40,80,80,8,'core_bg',svg)
        for (i = 0; i < 8; i++)
        {
            r = utils.rect(-36 + i * 9,-36,8,72,3,'core_load',svg)
        }
        this.cores = []
        for (i = 0; i < 8; i++)
        {
            this.cores.push(utils.rect(-36 + i * 9,30,8,6,3,'',svg))
            this.cores[i].setAttribute('fill',this.colors[0])
        }
    }

    Cores.prototype["draw"] = function ()
    {
        var fill, i, _58_29_, _58_34_

        if (_k_.empty(((_58_29_=this.data) != null ? (_58_34_=_58_29_.cpu) != null ? _58_34_.cores : undefined : undefined)))
        {
            return
        }
        if (!this.cores)
        {
            return
        }
        for (i = 0; i < 8; i++)
        {
            fill = this.colors[parseInt(this.data.cpu.cores[i] * 5)]
            this.cores[i].setAttribute('y',36 - 72 * this.data.cpu.cores[i])
            this.cores[i].setAttribute('height',72 * this.data.cpu.cores[i])
            this.cores[i].setAttribute('fill',fill)
        }
    }

    return Cores
})()

module.exports = Cores