// monsterkodi/kode 0.199.0

var _k_

var $, app, elem, Kachel, keyinfo, open, os, slash, stopEvent

$ = require('kxk').$
app = require('kxk').app
elem = require('kxk').elem
keyinfo = require('kxk').keyinfo
open = require('kxk').open
os = require('kxk').os
slash = require('kxk').slash
stopEvent = require('kxk').stopEvent


Kachel = (function ()
{
    function Kachel (kachelId = 'kachel')
    {
        this.kachelId = kachelId
    
        this["onMouseDown"] = this["onMouseDown"].bind(this)
        this["onBlur"] = this["onBlur"].bind(this)
        this["onFocus"] = this["onFocus"].bind(this)
        this["onLeave"] = this["onLeave"].bind(this)
        this["onHover"] = this["onHover"].bind(this)
        this["setIcon"] = this["setIcon"].bind(this)
        this["onContextMenu"] = this["onContextMenu"].bind(this)
        this["onKeyDown"] = this["onKeyDown"].bind(this)
        this.main = $('#main')
        this.div = elem({class:`kachel ${this.constructor.name}`})
        this.div.setAttribute('tabindex','0')
        this.div.onkeydown = this.onKeyDown
        this.div.onmousedown = this.onMouseDown
        this.div.onmouseenter = this.onHover
        this.div.onmouseleave = this.onLeave
        this.div.onfocus = this.onFocus
        this.div.onblur = this.onBlur
        this.main.appendChild(this.div)
        this.div.kachel = this
    }

    Kachel.prototype["onKeyDown"] = function (event)
    {
        var key, _33_36_

        key = keyinfo.forEvent(event).key
        switch (key)
        {
            case 'enter':
                return this.onLeftClick(event)

            case 'left':
            case 'right':
            case 'up':
            case 'down':
                return (this.neighborKachel(key) != null ? this.neighborKachel(key).focus() : undefined)

        }

    }

    Kachel.prototype["neighborKachel"] = function (direction)
    {
        var br, _40_56_, _41_60_

        br = this.div.getBoundingClientRect()
        if (br.width < 100)
        {
            switch (direction)
            {
                case 'down':
                    return (this.div.nextSibling != null ? this.div.nextSibling.nextSibling : undefined)

                case 'up':
                    return (this.div.previousSibling != null ? this.div.previousSibling.previousSibling : undefined)

            }

        }
        switch (direction)
        {
            case 'left':
            case 'up':
                return this.div.previousSibling

            case 'right':
            case 'down':
                return this.div.nextSibling

        }

    }

    Kachel.prototype["onContextMenu"] = function (event)
    {
        return stopEvent(event)
    }

    Kachel.prototype["setIcon"] = function (iconPath, clss = 'applicon')
    {
        var img

        if (!iconPath)
        {
            return
        }
        img = elem('img',{class:clss,src:slash.fileUrl(slash.path(iconPath))})
        img.ondragstart = function ()
        {
            return false
        }
        this.div.innerHTML = ''
        return this.div.appendChild(img)
    }

    Kachel.prototype["openApp"] = function (app)
    {
        var infos

        if (os.platform() === 'win32')
        {
            infos = wxw('info',slash.file(app))
            if (infos.length)
            {
                return wxw('focus',slash.file(app))
            }
            else
            {
                return open(slash.unslash(app))
            }
        }
        else
        {
            return open(app)
        }
    }

    Kachel.prototype["onHover"] = function (event)
    {
        return this.div.classList.add('kachelHover')
    }

    Kachel.prototype["onLeave"] = function (event)
    {
        return this.div.classList.remove('kachelHover')
    }

    Kachel.prototype["onFocus"] = function (event)
    {
        return this.div.classList.add('kachelFocus')
    }

    Kachel.prototype["onBlur"] = function (event)
    {
        return this.div.classList.remove('kachelFocus')
    }

    Kachel.prototype["onMouseDown"] = function (event)
    {
        switch (event.button)
        {
            case 0:
                return this.onLeftClick(event)

            case 1:
                return this.onMiddleClick(event)

            case 2:
                return this.onRightClick(event)

        }

    }

    Kachel.prototype["onLeftClick"] = function ()
    {}

    Kachel.prototype["onMiddleClick"] = function ()
    {}

    Kachel.prototype["onRightClick"] = function ()
    {}

    return Kachel
})()

module.exports = Kachel