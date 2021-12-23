// monsterkodi/kode 0.199.0

var _k_ = {extend: function (c,p) {for (var k in p) { if (Object.hasOwn(p, k)) c[k] = p[k] } function ctor() { this.constructor = c; } ctor.prototype = p.prototype; c.prototype = new ctor(); c.__super__ = p.prototype; return c;}}

var childp, Kachel, klog, Konrad, os, post, slash, udp

childp = require('kxk').childp
klog = require('kxk').klog
os = require('kxk').os
post = require('kxk').post
slash = require('kxk').slash
udp = require('kxk').udp

Kachel = require('./kachel')

Konrad = (function ()
{
    _k_.extend(Konrad, Kachel);
    function Konrad (kachelId = 'konrad')
    {
        this.kachelId = kachelId
    
        this["sleepIcon"] = this["sleepIcon"].bind(this)
        this["errorIcon"] = this["errorIcon"].bind(this)
        this["idleIcon"] = this["idleIcon"].bind(this)
        this["workIcon"] = this["workIcon"].bind(this)
        this["onMsg"] = this["onMsg"].bind(this)
        this["onInitKachel"] = this["onInitKachel"].bind(this)
        this["onContextMenu"] = this["onContextMenu"].bind(this)
        this["onRightClick"] = this["onRightClick"].bind(this)
        this["onLeftClick"] = this["onLeftClick"].bind(this)
        this["onApp"] = this["onApp"].bind(this)
        post.on('app',this.onApp)
        Konrad.__super__.constructor.call(this,this.kachelId)
        this.onInitKachel(this.kachelId)
        return Konrad.__super__.constructor.apply(this, arguments)
    }

    Konrad.prototype["onApp"] = function (action, app)
    {
        klog('onApp')
        switch (action)
        {
            case 'activated':
                return this.idleIcon()

            case 'terminated':
                return this.sleepIcon()

        }

    }

    Konrad.prototype["onLeftClick"] = function (event)
    {
        return this.openApp(this.kachelId)
    }

    Konrad.prototype["onRightClick"] = function ()
    {
        if (slash.win())
        {
            return wxw('minimize',slash.file(this.kachelId))
        }
        else
        {
            return childp.spawn('osascript',['-e',`tell application \"Finder\" to set visible of process \"${slash.base(this.kachelId)}\" to false`])
        }
    }

    Konrad.prototype["onContextMenu"] = function (event)
    {
        var wxw

        if (os.platform() === 'win32')
        {
            wxw = require('wxw')
            return wxw('minimize',slash.file(this.kachelId))
        }
    }

    Konrad.prototype["onInitKachel"] = function (kachelId)
    {
        this.kachelId = kachelId
    
        this.udp = new udp({onMsg:this.onMsg,port:9559})
        return this.sleepIcon()
    }

    Konrad.prototype["onMsg"] = function (msg)
    {
        var prefix

        prefix = msg.split(':')[0]
        switch (prefix)
        {
            case 'version':
                return this.idleIcon()

            case 'error':
                return this.errorIcon()

            case 'exit':
                return this.sleepIcon()

            case 'output':
                this.workIcon()
                return setTimeout(this.idleIcon,2000)

        }

    }

    Konrad.prototype["workIcon"] = function ()
    {
        return this.setIcon(`${__dirname}/../img/konrad.png`)
    }

    Konrad.prototype["idleIcon"] = function ()
    {
        return this.setIcon(`${__dirname}/../img/konrad_idle.png`)
    }

    Konrad.prototype["errorIcon"] = function ()
    {
        return this.setIcon(`${__dirname}/../img/konrad_error.png`)
    }

    Konrad.prototype["sleepIcon"] = function ()
    {
        return this.setIcon(`${__dirname}/../img/konrad_sleep.png`)
    }

    return Konrad
})()

module.exports = Konrad