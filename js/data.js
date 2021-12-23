// monsterkodi/kode 0.201.0

var _k_ = {empty: function (l) {return l==='' || l===null || l===undefined || l!==l || typeof(l) === 'object' && Object.keys(l).length === 0}, in: function (a,l) {return (typeof l === 'string' && typeof a === 'string' && a.length ? '' : []).indexOf.call(l,a) >= 0}, list: function (l) {return (l != null ? typeof l.length === 'number' ? l : [] : [])}}

var $, Apps, childp, Clock, Data, electron, kpos, kxk, last, Mouse, os, post, slash, Sysinfo, udp, win, Wins, wxw, _

kxk = require('kxk')
$ = kxk.$
_ = kxk._
childp = kxk.childp
kpos = kxk.kpos
last = kxk.last
os = kxk.os
post = kxk.post
slash = kxk.slash
udp = kxk.udp
win = kxk.win

electron = require('electron')
wxw = require('wxw')

Data = (function ()
{
    function Data ()
    {
        this["slowTick"] = this["slowTick"].bind(this)
        this["onUDP"] = this["onUDP"].bind(this)
        this.detach()
        this.providers = {sysinfo:new Sysinfo,clock:new Clock,wins:new Wins}
    }

    Data.prototype["start"] = function ()
    {
        if (this.udp)
        {
            return
        }
        this.udp = new udp({port:65432,onMsg:this.onUDP})
        return setTimeout(this.slowTick,1000)
    }

    Data.prototype["detach"] = function ()
    {
        if (os.platform() === 'win32')
        {
            return wxw('kill','wc.exe')
        }
    }

    Data.prototype["onUDP"] = function (msg)
    {
        var _55_85_, _56_44_, _57_44_

        switch (msg.event)
        {
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mousewheel':
                return (this.providers.mouse != null ? this.providers.mouse.onEvent(msg) : undefined)

            case 'proc':
                return (this.providers.apps != null ? this.providers.apps.onEvent(msg) : undefined)

            case 'info':
                return (this.providers.wins != null ? this.providers.wins.onEvent(msg) : undefined)

        }

    }

    Data.prototype["slowTick"] = function ()
    {
        var name, provider

        for (name in this.providers)
        {
            provider = this.providers[name]
            if (provider.tick === 'slow')
            {
                provider.onTick(this)
            }
        }
        return setTimeout(this.slowTick,1000 - (new Date).getMilliseconds())
    }

    return Data
})()


Clock = (function ()
{
    function Clock (name = 'clock', tick = 'slow')
    {
        this.name = name
        this.tick = tick
    
        this["onTick"] = this["onTick"].bind(this)
    }

    Clock.prototype["onTick"] = function (data)
    {
        var hours, minutes, seconds, time

        time = new Date()
        hours = time.getHours()
        minutes = time.getMinutes()
        seconds = time.getSeconds()
        return post.emit('clock',{hour:hours,minute:minutes,second:seconds})
    }

    return Clock
})()


Sysinfo = (function ()
{
    function Sysinfo (name = 'sysinfo')
    {
        var fork

        this.name = name
    
        this["onMessage"] = this["onMessage"].bind(this)
        fork = childp.fork(`${__dirname}/memnet`)
        fork.on('message',this.onMessage)
    }

    Sysinfo.prototype["onMessage"] = function (m)
    {
        return post.emit('sysinfo',JSON.parse(m))
    }

    return Sysinfo
})()


Mouse = (function ()
{
    function Mouse (name = 'mouse')
    {
        this.name = name
    
        this["onEvent"] = this["onEvent"].bind(this)
        this.last = Date.now()
        this.interval = parseInt(1000 / 60)
        this.lastEvent = null
        this.sendTimer = null
    }

    Mouse.prototype["onEvent"] = function (event)
    {
        var now, pos

        this.lastEvent = event
        now = Date.now()
        clearTimeout(this.sendTimer)
        this.sendTimer = null
        if (now - this.last > this.interval)
        {
            this.last = now
            pos = kpos(event)
            if (os.platform() === 'win32')
            {
                pos = kpos(electron.screen.screenToDipPoint(pos)).rounded()
            }
            event.x = pos.x
            event.y = pos.y
            return post.emit('mouse',event)
        }
        else
        {
            return this.sendTimer = setTimeout(((function ()
            {
                return this.onEvent(this.lastEvent)
            }).bind(this)),this.interval)
        }
    }

    return Mouse
})()


Apps = (function ()
{
    function Apps (name = 'apps')
    {
        this.name = name
    
        this["onEvent"] = this["onEvent"].bind(this)
        this.lastApps = null
    }

    Apps.prototype["onEvent"] = function (event)
    {
        var apps

        apps = Array.from(new Set(event.proc.map(function (p)
        {
            return p.path
        })))
        if (_k_.empty(last(apps)))
        {
            apps.pop()
        }
        if (os.platform() === 'win32')
        {
            apps = apps.filter(function (p)
            {
                var s

                s = slash.path(slash.removeDrive(p))
                if (s.startsWith('/Windows/System32'))
                {
                    return _k_.in(slash.base(s),['cmd','powershell'])
                }
                return true
            })
        }
        apps.sort()
        if (!_.isEqual(apps,this.lastApps))
        {
            return this.lastApps = apps
        }
    }

    return Apps
})()


Wins = (function ()
{
    function Wins (name = 'wins', tick = 'slow')
    {
        this.name = name
        this.tick = tick
    
        this["onEvent"] = this["onEvent"].bind(this)
        this.lastWins = null
    }

    Wins.prototype["onTick"] = function ()
    {}

    Wins.prototype["kacheln"] = function ()
    {
        var i, kl, main

        kl = []
        main = $('#main')
        for (var _223_17_ = i = 0, _223_21_ = main.children.length; (_223_17_ <= _223_21_ ? i < main.children.length : i > main.children.length); (_223_17_ <= _223_21_ ? ++i : --i))
        {
            if (main.children[i].kachel.updateDot)
            {
                kl.push(main.children[i].kachel)
            }
        }
        return kl
    }

    Wins.prototype["onEvent"] = function (event)
    {
        var k, wins, _246_32_

        wins = event.info
        if (os.platform() === 'darwin')
        {
            var list = _k_.list(wins)
            for (var _233_20_ = 0; _233_20_ < list.length; _233_20_++)
            {
                win = list[_233_20_]
                if (win.index === 0)
                {
                    win.status += ' top'
                }
                else if (win.index < 0)
                {
                    win.status = 'minimized'
                }
            }
        }
        if (_k_.empty(last(wins)))
        {
            wins.pop()
        }
        if (!_.isEqual(wins,this.lastWins))
        {
            this.lastWins = wins
            var list1 = _k_.list(this.kacheln())
            for (var _244_18_ = 0; _244_18_ < list1.length; _244_18_++)
            {
                k = list1[_244_18_]
                var list2 = _k_.list(wins)
                for (var _245_24_ = 0; _245_24_ < list2.length; _245_24_++)
                {
                    win = list2[_245_24_]
                    if (((k != null ? k.status : undefined) != null) && win.path === k.kachelId)
                    {
                        k.activated = true
                        k.status = win.status
                        k.updateDot()
                    }
                }
            }
        }
    }

    return Wins
})()

module.exports = Data