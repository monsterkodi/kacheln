// monsterkodi/kode 0.199.0

var _k_ = {list: function (l) {return (l != null ? typeof l.length === 'number' ? l : [] : [])}}

var clamp, deg2rad, Utils

clamp = require('kxk').clamp
deg2rad = require('kxk').deg2rad


Utils = (function ()
{
    function Utils ()
    {}

    Utils["opt"] = function (e, o)
    {
        var k

        if ((o != null))
        {
            var list = _k_.list(Object.keys(o))
            for (var _16_18_ = 0; _16_18_ < list.length; _16_18_++)
            {
                k = list[_16_18_]
                e.setAttribute(k,o[k])
            }
        }
        return e
    }

    Utils["append"] = function (p, t, o)
    {
        var e

        e = document.createElementNS("http://www.w3.org/2000/svg",t)
        p.appendChild(this.opt(e,o))
        return e
    }

    Utils["svg"] = function (width = 100, height = 100, clss)
    {
        var svg

        svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
        svg.setAttribute('viewBox',`-${width / 2} -${width / 2} ${width} ${height}`)
        if (clss)
        {
            svg.setAttribute('class',clss)
        }
        return svg
    }

    Utils["circle"] = function (radius = 50, cx = 0, cy = 0, clss, svg)
    {
        var c, g

        svg = (svg != null ? svg : this.svg(2 * radius,2 * radius))
        g = this.append(svg,'g')
        c = this.append(g,'circle',{cx:cx,cy:cy,r:radius,class:clss})
        return svg
    }

    Utils["rect"] = function (x = 0, y = 0, w = 1, h = 1, r = 0, clss, svg)
    {
        var g

        svg = (svg != null ? svg : this.svg(w,h))
        g = this.append(svg,'g')
        r = this.append(g,'rect',{x:x,y:y,width:w,height:h,rx:r,class:clss})
        return r
    }

    Utils["pie"] = function (radius = 10, cx = 0, cy = 0, angle = 0, start = 0, clss, svg)
    {
        var ex, ey, f, g, pie, sx, sy

        start = clamp(0,360,start % 360)
        angle = clamp(0,360,(start + angle) % 360)
        svg = (svg != null ? svg : this.svg(2 * radius,2 * radius))
        g = this.append(svg,'g')
        pie = this.append(g,'path',{class:clss})
        sx = cx + radius * Math.sin(deg2rad(angle))
        sy = cy - radius * Math.cos(deg2rad(angle))
        ex = cx + radius * Math.sin(deg2rad(start))
        ey = cy - radius * Math.cos(deg2rad(start))
        f = angle - start <= 180 && '0 0' || '1 0'
        pie.setAttribute('d',`M ${cx} ${cy} L ${sx} ${sy} A ${radius} ${radius} ${start} ${f} ${ex} ${ey} z`)
        return pie
    }

    return Utils
})()

module.exports = Utils