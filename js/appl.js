// monsterkodi/kode 0.201.0

var _k_ = {extend: function (c,p) {for (var k in p) { if (Object.hasOwn(p, k)) c[k] = p[k] } function ctor() { this.constructor = c; } ctor.prototype = p.prototype; c.prototype = new ctor(); c.__super__ = p.prototype; return c;}, list: function (l) {return (l != null ? typeof l.length === 'number' ? l : [] : [])}, empty: function (l) {return l==='' || l===null || l===undefined || l!==l || typeof(l) === 'object' && Object.keys(l).length === 0}, valid: undefined, in: function (a,l) {return (typeof l === 'string' && typeof a === 'string' && a.length ? '' : []).indexOf.call(l,a) >= 0}}

var $, app, appIcon, Appl, childp, elem, Kachel, klog, kstr, kxk, os, post, slash, utils

kxk = require('kxk')
$ = kxk.$
app = kxk.app
childp = kxk.childp
elem = kxk.elem
klog = kxk.klog
kstr = kxk.kstr
os = kxk.os
post = kxk.post
slash = kxk.slash

Kachel = require('./kachel')
appIcon = require('./icon')
utils = require('./utils')

Appl = (function ()
{
    _k_.extend(Appl, Kachel)
    function Appl (kachelId = 'appl')
    {
        this.kachelId = kachelId
    
        this["setIcon"] = this["setIcon"].bind(this)
        this["refreshIcon"] = this["refreshIcon"].bind(this)
        this["onInitKachel"] = this["onInitKachel"].bind(this)
        this["onMiddleClick"] = this["onMiddleClick"].bind(this)
        this["onRightClick"] = this["onRightClick"].bind(this)
        this["onLeftClick"] = this["onLeftClick"].bind(this)
        this["onBounds"] = this["onBounds"].bind(this)
        this["onWin"] = this["onWin"].bind(this)
        this["onApp"] = this["onApp"].bind(this)
        post.on('app',this.onApp)
        post.on('win',this.onWin)
        this.activated = false
        this.status = ''
        Appl.__super__.constructor.call(this,this.kachelId)
        this.onInitKachel(this.kachelId)
    }

    Appl.prototype["onApp"] = function (action, app)
    {
        klog('onApp',activated,app)
        this.activated = action === 'activated'
        return this.updateDot()
    }

    Appl.prototype["onWin"] = function (wins)
    {
        var c, w

        klog('onWin',wins)
        this.status = ''
        var list = _k_.list(wins)
        for (var _40_14_ = 0; _40_14_ < list.length; _40_14_++)
        {
            w = list[_40_14_]
            var list1 = ['maximized','normal']
            for (var _41_18_ = 0; _41_18_ < list1.length; _41_18_++)
            {
                c = list1[_41_18_]
                if (w.status.startsWith(c))
                {
                    this.status = w.status
                    break
                }
            }
            if (!_k_.empty(this.status))
            {
                break
            }
        }
        if (_k_.empty(this.status))
        {
            var list2 = _k_.list(wins)
            for (var _49_18_ = 0; _49_18_ < list2.length; _49_18_++)
            {
                w = list2[_49_18_]
                if (w.status === 'minimized')
                {
                    this.status = 'minimized'
                    break
                }
            }
        }
        return this.updateDot()
    }

    Appl.prototype["onBounds"] = function ()
    {
        var dot

        if (os.platform() === 'win32')
        {
            if (dot = $('.appldot'))
            {
                dot.remove()
                return this.updateDot()
            }
        }
    }

    Appl.prototype["updateDot"] = function ()
    {
        var crc, dot, grp, s

        dot = $('.appldot',this.div)
        if (this.activated && !dot)
        {
            dot = utils.svg(16,16,'appldot')
            grp = utils.append(dot,'g')
            crc = utils.append(grp,'circle',{cx:0,cy:0,r:7,class:'applcircle'})
            this.div.appendChild(dot)
        }
        else if (!this.activated && dot)
        {
            (dot != null ? dot.remove() : undefined)
            dot = null
        }
        if (dot)
        {
            dot.classList.remove('top')
            dot.classList.remove('normal')
            dot.classList.remove('minimized')
            dot.classList.remove('maximized')
            if (!_k_.empty(this.status))
            {
                var list = _k_.list(this.status.split(' '))
                for (var _88_22_ = 0; _88_22_ < list.length; _88_22_++)
                {
                    s = list[_88_22_]
                    dot.classList.add(s)
                }
            }
        }
    }

    Appl.prototype["onLeftClick"] = function ()
    {
        return this.openApp(this.kachelId)
    }

    Appl.prototype["onRightClick"] = function ()
    {
        var wxw

        if (slash.win())
        {
            wxw = require('wxw')
            return wxw('minimize',slash.file(this.kachelId))
        }
        else
        {
            return childp.spawn('osascript',['-e',`tell application \"Finder\" to set visible of process \"${slash.base(this.kachelId)}\" to false`])
        }
    }

    Appl.prototype["onMiddleClick"] = function ()
    {
        var wxw

        wxw = require('wxw')
        return wxw('terminate',this.kachelId)
    }

    Appl.prototype["onInitKachel"] = function (kachelId)
    {
        var appName, base, iconDir, iconPath, minutes

        this.kachelId = kachelId
    
        iconDir = slash.join(post.get('userData'),'icons')
        appName = slash.base(this.kachelId)
        iconPath = `${iconDir}/${appName}.png`
        if (!slash.isFile(iconPath))
        {
            this.refreshIcon()
        }
        else
        {
            this.setIcon(iconPath)
        }
        base = slash.base(this.kachelId)
        if (_k_.in(base,['Calendar']))
        {
            minutes = {Calendar:60}[base]
            this.refreshIcon()
            return setInterval(this.refreshIcon,1000 * 60 * minutes)
        }
    }

    Appl.prototype["refreshIcon"] = function ()
    {
        var appName, base, day, iconDir, mth, pngPath, time

        iconDir = slash.join(post.get('userData'),'icons')
        appName = slash.base(this.kachelId)
        pngPath = slash.resolve(slash.join(iconDir,appName + ".png"))
        appIcon(this.kachelId,pngPath)
        this.setIcon(pngPath)
        base = slash.base(this.kachelId)
        if (base === 'Calendar')
        {
            this.div.children[0].style.opacity = 0
            time = new Date()
            day = elem({class:'calendarDay',text:kstr.lpad(time.getDate(),2,'0')})
            mth = elem({class:'calendarMonth',text:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][time.getMonth()]})
            return this.div.appendChild(elem({class:'calendarIcon',children:[mth,day]}))
        }
    }

    Appl.prototype["setIcon"] = function (iconPath)
    {
        if (!iconPath)
        {
            return
        }
        Appl.__super__.setIcon.call(this,iconPath)
        return this.updateDot()
    }

    return Appl
})()

module.exports = Appl