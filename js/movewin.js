// monsterkodi/kode 0.200.0

var _k_ = {in: function (a,l) {return (typeof l === 'string' && typeof a === 'string' && a.length ? '' : []).indexOf.call(l,a) >= 0}}

var klog, moveWin, os, slash, wxw

klog = require('kxk').klog
os = require('kxk').os
slash = require('kxk').slash

wxw = require('wxw')

moveWin = function (dir)
{
    var ar, b, base, d, h, info, infos, ko, sb, screen, sl, sr, st, w, wr, x, y

    screen = wxw('screen','user')
    klog(`moveWin ${dir}`,screen)
    ar = {w:screen.width,h:screen.height}
    if (os.platform() === 'win32')
    {
        infos = wxw('info','top')
    }
    else
    {
        infos = wxw('info','top').filter(function (i)
        {
            return i.index >= 0
        })
        infos.sort(function (a, b)
        {
            return a.index - b.index
        })
    }
    if (info = infos[0])
    {
        base = slash.base(info.path)
        if (_k_.in(base,['kachel','kacheln','kappo']))
        {
            return
        }
        b = 0
        if (os.platform() === 'win32')
        {
            if (_k_.in(base,['electron','ko','konrad','clippo','klog','kaligraf','kalk','uniko','knot','space','ruler','keks']))
            {
                b = 0
            }
            else if (_k_.in(base,['devenv']))
            {
                b = -1
            }
            else
            {
                b = 10
            }
        }
        wr = {x:info.x,y:info.y,w:info.width,h:info.height}
        ko = 216
        d = 2 * b
        var _44_18_ = ((function ()
        {
            switch (dir)
            {
                case 'left':
                    return [-b,0,ar.w / 2 + d,ar.h + b]

                case 'right':
                    return [ar.w / 2 - b,0,ar.w / 2 + d - ko,ar.h + b]

                case 'down':
                    return [ar.w / 6 - b,0,2 / 3 * ar.w + d,ar.h + b]

                case 'up':
                    return [-b,0,ar.w + d - ko,ar.h + b]

                case 'topleft':
                    return [-b,0,ar.w / 2 + d,ar.h / 2]

                case 'botleft':
                    return [-b,ar.h / 2 - b,ar.w / 2 + d,ar.h / 2 + d]

                case 'topright':
                    return [ar.w / 2 - b,0,ar.w / 2 + d - ko,ar.h / 2]

                case 'botright':
                    return [ar.w / 2 - b,ar.h / 2 - b,ar.w / 2 + d - ko,ar.h / 2 + d]

                case 'top':
                    return [ar.w / 6 - b,0,2 * ar.w / 3 + d,ar.h / 2]

                case 'bot':
                    return [ar.w / 6 - b,ar.h / 2 - b,2 * ar.w / 3 + d,ar.h / 2 + d]

            }

        }).bind(this))() ; x = _44_18_[0]        ; y = _44_18_[1]        ; w = _44_18_[2]        ; h = _44_18_[3]

        sl = 30 > Math.abs(wr.x - x)
        sr = 30 > Math.abs(wr.x + wr.w - (x + w))
        st = 30 > Math.abs(wr.y - y)
        sb = 30 > Math.abs(wr.y + wr.h - (y + h))
        if (sl && sr && st && sb)
        {
            switch (dir)
            {
                case 'left':
                    w = ar.w / 3 + d
                    break
                case 'right':
                    w = ar.w / 2 + d
                    break
                case 'down':
                    x = ar.w / 3 - b
                    w = 2 / 3 * ar.w + d - ko
                    break
                case 'up':
                    x = -b
                    w = ar.w + d
                    break
                case 'topleft':
                    w = ar.w / 3 + d
                    break
                case 'botleft':
                    w = ar.w / 3 + d
                    break
                case 'topright':
                    x = 2 * ar.w / 3 - b
                    w = ar.w / 3 + d
                    break
                case 'botright':
                    x = 2 * ar.w / 3 - b
                    w = ar.w / 3 + d
                    break
                case 'top':
                    x = ar.w / 3 - b
                    w = ar.w / 3 + d
                    break
                case 'bot':
                    x = ar.w / 3 - b
                    w = ar.w / 3 + d
                    break
            }

        }
        klog('bounds',info.id,parseInt(x),parseInt(y),parseInt(w),parseInt(h))
        return wxw('bounds',info.id,parseInt(x),parseInt(y),parseInt(w),parseInt(h))
    }
    else
    {
        return klog('no info!')
    }
}
module.exports = moveWin