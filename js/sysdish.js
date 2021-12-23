// monsterkodi/kode 0.200.0

var _k_ = {extend: function (c,p) {for (var k in p) { if (Object.hasOwn(p, k)) c[k] = p[k] } function ctor() { this.constructor = c; } ctor.prototype = p.prototype; c.prototype = new ctor(); c.__super__ = p.prototype; return c;}}

var clamp, deg2rad, Kachel, post, Sysdish, utils

clamp = require('kxk').clamp
deg2rad = require('kxk').deg2rad
post = require('kxk').post

utils = require('./utils')
Kachel = require('./kachel')

Sysdish = (function ()
{
    _k_.extend(Sysdish, Kachel)
    function Sysdish (kachelId = 'sysdish')
    {
        this.kachelId = kachelId
    
        this["animDish"] = this["animDish"].bind(this)
        this["onData"] = this["onData"].bind(this)
        Sysdish.__super__.constructor.call(this,this.kachelId)
        this.animCount = 0
        this.colors = {dsk:[[128,128,255],[64,64,255]],net:[[0,150,0],[0,255,0]],cpu:[[255,255,0],[255,100,0]]}
        this.tops = {net:'0%',dsk:'33%',cpu:'66%'}
        post.on('sysinfo',this.onData)
        this.initDish()
    }

    Sysdish.prototype["onData"] = function (data)
    {
        this.data = data
    
        this.drawDish()
        return this.animDish()
    }

    Sysdish.prototype["pie180"] = function (pie, radius, angle, start = 0)
    {
        var ex, ey, sx, sy

        angle = clamp(0,180,angle)
        sx = radius * Math.sin(deg2rad(start + angle))
        sy = -radius * Math.cos(deg2rad(start + angle))
        ex = radius * Math.sin(deg2rad(start))
        ey = -radius * Math.cos(deg2rad(start))
        return pie.setAttribute('d',`M 0 0 L ${sx} ${sy} A ${radius} ${radius} ${start} 0 0 ${ex} ${ey} z`)
    }

    Sysdish.prototype["pie360"] = function (pie, radius, angle)
    {
        var ex, ey, f, sx, sy

        angle = clamp(0,359,angle)
        sx = radius * Math.sin(deg2rad(angle))
        sy = -radius * Math.cos(deg2rad(angle))
        ex = 0
        ey = -radius
        f = angle <= 180 && '0 0' || '1 0'
        return pie.setAttribute('d',`M 0 0 L ${sx} ${sy} A ${radius} ${radius} 0 ${f} ${ex} ${ey} z`)
    }

    Sysdish.prototype["animDish"] = function ()
    {
        var steps, _81_24_

        clearTimeout(this.animTimer)
        if (!this.data)
        {
            return
        }
        steps = 20
        this.animCount += 1
        if (this.animCount <= steps)
        {
            if ((this.data.dsk != null))
            {
                this.dskrNow += (this.dskrNew - this.dskrOld) / steps
                this.dskwNow += (this.dskwNew - this.dskwOld) / steps
                this.pie180(this.dskrPie,45,this.dskrNow)
                this.pie180(this.dskwPie,45,this.dskwNow,180)
            }
            this.netrNow += (this.netrNew - this.netrOld) / steps
            this.nettNow += (this.nettNew - this.nettOld) / steps
            this.pie180(this.netrPie,43,this.netrNow)
            this.pie180(this.nettPie,43,this.nettNow,180)
            this.sysNow += (this.sysNew - this.sysOld) / steps
            this.usrNow += (this.usrNew - this.usrOld) / steps
            this.pie360(this.usrPie,40,this.usrNow)
            this.pie360(this.sysPie,40,this.sysNow)
            this.memuNow += (this.memuNew - this.memuOld) / steps
            this.memaNow += (this.memaNew - this.memaOld) / steps
            this.pie360(this.memuPie,18,this.memuNow)
            this.pie360(this.memaPie,18,this.memaNow)
        }
        return this.animTimer = setTimeout(this.animDish,parseInt(4000 / steps))
    }

    Sysdish.prototype["initDish"] = function ()
    {
        var pie, svg

        this.div.innerHTML = ''
        svg = utils.svg(100,100,'dish')
        this.div.appendChild(svg)
        pie = utils.circle(45,0,0,'sysdish_disk_bgr',svg)
        this.dskrPie = utils.pie(40,0,0,0,0,'sysdish_disk_read',svg)
        this.dskwPie = utils.pie(40,0,0,0,180,'sysdish_disk_write',svg)
        this.netrPie = utils.pie(40,0,0,0,0,'sysdish_net_recv',svg)
        this.nettPie = utils.pie(40,0,0,0,180,'sysdish_net_send',svg)
        pie = utils.circle(40,0,0,'sysdish_load_bgr',svg)
        this.sysPie = utils.pie(40,0,0,0,0,'sysdish_load_sys',pie)
        this.usrPie = utils.pie(40,0,0,0,0,'sysdish_load_usr',pie)
        this.memuPie = utils.pie(40,0,0,0,0,'sysdish_mem_used',svg)
        return this.memaPie = utils.pie(40,0,0,0,0,'sysdish_mem_active',svg)
    }

    Sysdish.prototype["drawDish"] = function ()
    {
        var _149_21_

        if (!this.data)
        {
            return
        }
        clearTimeout(this.animTimer)
        this.animCount = 0
        if ((this.data.dsk != null))
        {
            this.dskrOld = this.dskrNow = this.dskrNew
            this.dskwOld = this.dskwNow = this.dskwNew
            this.dskrNew = 180 * this.data.dsk.r_sec / this.data.dsk.r_max
            this.dskwNew = 180 * this.data.dsk.w_sec / this.data.dsk.w_max
        }
        this.netrOld = this.netrNow = this.netrNew
        this.nettOld = this.nettNow = this.nettNew
        this.netrNew = 180 * this.data.net.rx_sec / this.data.net.rx_max
        this.nettNew = 180 * this.data.net.tx_sec / this.data.net.tx_max
        this.sysOld = this.sysNow = this.sysNew
        this.usrOld = this.usrNow = this.usrNew
        this.sysNew = 360 * this.data.cpu.sys
        this.usrNew = 360 * this.data.cpu.usr
        this.memuOld = this.memuNow = this.memuNew
        this.memaOld = this.memaNow = this.memaNew
        this.memuNew = 360 * this.data.mem.used / this.data.mem.total
        return this.memaNew = 360 * this.data.mem.active / this.data.mem.total
    }

    return Sysdish
})()

module.exports = Sysdish