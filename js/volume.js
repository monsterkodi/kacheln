// monsterkodi/kode 0.199.0

var _k_ = {extend: function (c,p) {for (var k in p) { if (Object.hasOwn(p, k)) c[k] = p[k] } function ctor() { this.constructor = c; } ctor.prototype = p.prototype; c.prototype = new ctor(); c.__super__ = p.prototype; return c;}}

var childp, clamp, drag, Kachel, kpos, utils, Volume, wxw

childp = require('kxk').childp
clamp = require('kxk').clamp
drag = require('kxk').drag
kpos = require('kxk').kpos

wxw = require('wxw')
utils = require('./utils')
Kachel = require('./kachel')

Volume = (function ()
{
    _k_.extend(Volume, Kachel);
    function Volume (kachelId = 'volume')
    {
        this.kachelId = kachelId
    
        this["onRightClick"] = this["onRightClick"].bind(this)
        this["checkVolume"] = this["checkVolume"].bind(this)
        this["onWheel"] = this["onWheel"].bind(this)
        this["setVolumeAtEvent"] = this["setVolumeAtEvent"].bind(this)
        this["onLeftClick"] = this["onLeftClick"].bind(this)
        Volume.__super__.constructor.call(this,this.kachelId)
        this.mute = false
        this.div.addEventListener('mousewheel',this.onWheel)
        this.volume = this.getVolume()
        this.folume = this.volume
        setInterval(this.checkVolume,1000)
        this.onLoad()
        this.drag = new drag({target:this.div,handle:this.div,stopEvent:false,onStart:(function (drag, event)
        {
            if (event.button === 0)
            {
                return this.setVolumeAtEvent(event)
            }
        }).bind(this),onMove:(function (drag, event)
        {
            if (event.button === 0)
            {
                return this.setVolumeAtEvent(event)
            }
        }).bind(this)})
        return Volume.__super__.constructor.apply(this, arguments)
    }

    Volume.prototype["onLeftClick"] = function (event)
    {}

    Volume.prototype["setVolumeAtEvent"] = function (event)
    {
        var br, ctr, rot, vec

        br = this.div.getBoundingClientRect()
        ctr = kpos(br.left,br.top).plus(kpos(br.width,br.height).times(0.5))
        vec = ctr.to(kpos(event))
        rot = vec.normal().rotation(kpos(0,-1))
        return this.setVolume(50 + rot / 3)
    }

    Volume.prototype["onWheel"] = function (event)
    {
        if (event.deltaY === 0)
        {
            return
        }
        this.folume -= event.deltaY / 100
        this.folume = clamp(0,100,this.folume)
        return this.setVolume(this.folume)
    }

    Volume.prototype["getVolume"] = function ()
    {
        return parseInt(wxw('volume'))
    }

    Volume.prototype["setVolume"] = function (v)
    {
        v = parseInt(clamp(0,100,v))
        if (v !== this.volume)
        {
            this.volume = v
            this.mute = false
            this.updateVolume()
            return childp.exec(`osascript -e \"set volume output volume ${this.volume}\"`)
        }
    }

    Volume.prototype["checkVolume"] = function ()
    {
        var volume

        volume = this.getVolume()
        if (volume !== this.volume)
        {
            this.setVolume(volume)
        }
        return this.folume = this.volume
    }

    Volume.prototype["onRightClick"] = function (event)
    {
        if (this.mute)
        {
            this.mute = false
            childp.exec('osascript -e "set volume without output muted"')
        }
        else
        {
            this.mute = true
            childp.exec('osascript -e "set volume with output muted"')
        }
        return this.updateVolume()
    }

    Volume.prototype["onLoad"] = function ()
    {
        var face, m, svg

        svg = utils.svg(100,100,'volume')
        this.div.appendChild(svg)
        utils.circle(40,0,0,'scala',svg)
        face = utils.circle(36,0,0,'knob',svg)
        for (m = 1; m <= 11; m++)
        {
            utils.append(face,'line',{class:'volmrk',y1:40,y2:47,transform:`rotate(${30 * m * 5})`})
        }
        this.voldot = utils.append(face,'circle',{r:5,cx:0,cy:-25,class:'voldot'})
        return this.updateVolume()
    }

    Volume.prototype["updateVolume"] = function ()
    {
        var angle

        angle = 150 * (this.volume - 50) / 50
        this.voldot.setAttribute('transform',`rotate(${angle})`)
        return this.voldot.classList.toggle('mute',this.mute)
    }

    return Volume
})()

module.exports = Volume