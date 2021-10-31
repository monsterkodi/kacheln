// koffee 1.14.0

/*
000   000  000000000  000  000       0000000
000   000     000     000  000      000     
000   000     000     000  000      0000000 
000   000     000     000  000           000
 0000000      000     000  0000000  0000000
 */
var Utils, clamp, deg2rad, ref;

ref = require('kxk'), clamp = ref.clamp, deg2rad = ref.deg2rad;

Utils = (function() {
    function Utils() {}

    Utils.opt = function(e, o) {
        var i, k, len, ref1;
        if (o != null) {
            ref1 = Object.keys(o);
            for (i = 0, len = ref1.length; i < len; i++) {
                k = ref1[i];
                e.setAttribute(k, o[k]);
            }
        }
        return e;
    };

    Utils.append = function(p, t, o) {
        var e;
        e = document.createElementNS("http://www.w3.org/2000/svg", t);
        p.appendChild(this.opt(e, o));
        return e;
    };

    Utils.svg = function(arg) {
        var clss, height, ref1, ref2, ref3, svg, width;
        width = (ref1 = arg.width) != null ? ref1 : 100, height = (ref2 = arg.height) != null ? ref2 : 100, clss = (ref3 = arg.clss) != null ? ref3 : null;
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', "-" + (width / 2) + " -" + (width / 2) + " " + width + " " + height);
        if (clss) {
            svg.setAttribute('class', clss);
        }
        return svg;
    };

    Utils.circle = function(arg) {
        var c, clss, cx, cy, g, radius, ref1, ref2, ref3, ref4, ref5, svg;
        radius = (ref1 = arg.radius) != null ? ref1 : 50, cx = (ref2 = arg.cx) != null ? ref2 : 0, cy = (ref3 = arg.cy) != null ? ref3 : 0, clss = (ref4 = arg.clss) != null ? ref4 : null, svg = (ref5 = arg.svg) != null ? ref5 : null;
        if (svg != null) {
            svg;
        } else {
            svg = this.svg({
                width: 2 * radius,
                height: 2 * radius
            });
        }
        g = this.append(svg, 'g');
        c = this.append(g, 'circle', {
            cx: cx,
            cy: cy,
            r: radius,
            "class": clss
        });
        return svg;
    };

    Utils.rect = function(arg) {
        var clss, g, h, r, ref1, ref2, ref3, ref4, ref5, ref6, ref7, svg, w, x, y;
        x = (ref1 = arg.x) != null ? ref1 : 0, y = (ref2 = arg.y) != null ? ref2 : 0, w = (ref3 = arg.w) != null ? ref3 : 1, h = (ref4 = arg.h) != null ? ref4 : 1, r = (ref5 = arg.r) != null ? ref5 : 0, clss = (ref6 = arg.clss) != null ? ref6 : null, svg = (ref7 = arg.svg) != null ? ref7 : null;
        if (svg != null) {
            svg;
        } else {
            svg = this.svg({
                width: w,
                height: h
            });
        }
        g = this.append(svg, 'g');
        r = this.append(g, 'rect', {
            x: x,
            y: y,
            width: w,
            height: h,
            rx: r,
            "class": clss
        });
        return r;
    };

    Utils.pie = function(arg) {
        var angle, clss, cx, cy, ex, ey, f, g, pie, radius, ref1, ref2, ref3, ref4, ref5, ref6, ref7, start, svg, sx, sy;
        radius = (ref1 = arg.radius) != null ? ref1 : 10, cx = (ref2 = arg.cx) != null ? ref2 : 0, cy = (ref3 = arg.cy) != null ? ref3 : 0, angle = (ref4 = arg.angle) != null ? ref4 : 0, start = (ref5 = arg.start) != null ? ref5 : 0, clss = (ref6 = arg.clss) != null ? ref6 : null, svg = (ref7 = arg.svg) != null ? ref7 : null;
        start = clamp(0, 360, start % 360);
        angle = clamp(0, 360, (start + angle) % 360);
        if (svg != null) {
            svg;
        } else {
            svg = this.svg({
                width: 2 * radius,
                height: 2 * radius
            });
        }
        g = this.append(svg, 'g');
        pie = this.append(g, 'path', {
            "class": clss
        });
        sx = cx + radius * Math.sin(deg2rad(angle));
        sy = cy - radius * Math.cos(deg2rad(angle));
        ex = cx + radius * Math.sin(deg2rad(start));
        ey = cy - radius * Math.cos(deg2rad(start));
        f = angle - start <= 180 && '0 0' || '1 0';
        pie.setAttribute('d', "M " + cx + " " + cy + " L " + sx + " " + sy + " A " + radius + " " + radius + " " + start + " " + f + " " + ex + " " + ey + " z");
        return pie;
    };

    return Utils;

})();

module.exports = Utils;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vY29mZmVlIiwic291cmNlcyI6WyJ1dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUE7O0FBUUEsTUFBcUIsT0FBQSxDQUFRLEtBQVIsQ0FBckIsRUFBRSxpQkFBRixFQUFTOztBQUVIOzs7SUFFRixLQUFDLENBQUEsR0FBRCxHQUFNLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFFRixZQUFBO1FBQUEsSUFBRyxTQUFIO0FBQ0k7QUFBQSxpQkFBQSxzQ0FBQTs7Z0JBQ0ksQ0FBQyxDQUFDLFlBQUYsQ0FBZSxDQUFmLEVBQWtCLENBQUUsQ0FBQSxDQUFBLENBQXBCO0FBREosYUFESjs7ZUFHQTtJQUxFOztJQU9OLEtBQUMsQ0FBQSxNQUFELEdBQVMsU0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUw7QUFFTCxZQUFBO1FBQUEsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxlQUFULENBQXlCLDRCQUF6QixFQUFzRCxDQUF0RDtRQUNKLENBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEdBQUQsQ0FBSyxDQUFMLEVBQVEsQ0FBUixDQUFkO2VBQ0E7SUFKSzs7SUFNVCxLQUFDLENBQUEsR0FBRCxHQUFNLFNBQUMsR0FBRDtBQUVGLFlBQUE7UUFGRyw0Q0FBTSxLQUFLLDhDQUFPLEtBQUssMENBQUc7UUFFN0IsR0FBQSxHQUFNLFFBQVEsQ0FBQyxlQUFULENBQXlCLDRCQUF6QixFQUFzRCxLQUF0RDtRQUNOLEdBQUcsQ0FBQyxZQUFKLENBQWlCLFNBQWpCLEVBQTJCLEdBQUEsR0FBRyxDQUFDLEtBQUEsR0FBTSxDQUFQLENBQUgsR0FBWSxJQUFaLEdBQWUsQ0FBQyxLQUFBLEdBQU0sQ0FBUCxDQUFmLEdBQXdCLEdBQXhCLEdBQTJCLEtBQTNCLEdBQWlDLEdBQWpDLEdBQW9DLE1BQS9EO1FBQ0EsSUFBaUMsSUFBakM7WUFBQSxHQUFHLENBQUMsWUFBSixDQUFpQixPQUFqQixF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cEMsR0FBRyxDQUFDLFlBQUosQ0FBaUIsR0FBakIsRUFBcUIsSUFBQSxHQUFLLEVBQUwsR0FBUSxHQUFSLEdBQVcsRUFBWCxHQUFjLEtBQWQsR0FBbUIsRUFBbkIsR0FBc0IsR0FBdEIsR0FBeUIsRUFBekIsR0FBNEIsS0FBNUIsR0FBaUMsTUFBakMsR0FBd0MsR0FBeEMsR0FBMkMsTUFBM0MsR0FBa0QsR0FBbEQsR0FBcUQsS0FBckQsR0FBMkQsR0FBM0QsR0FBOEQsQ0FBOUQsR0FBZ0UsR0FBaEUsR0FBbUUsRUFBbkUsR0FBc0UsR0FBdEUsR0FBeUUsRUFBekUsR0FBNEUsSUFBakc7ZUFHQTtJQWxCRTs7Ozs7O0FBb0JWLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAgICAwMDAgIDAwMDAwMDAwMCAgMDAwICAwMDAgICAgICAgMDAwMDAwMFxuMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgMDAwICAgICBcbjAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgIDAwMCAgICAgIDAwMDAwMDAgXG4wMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAwMDAgICAgICAgICAgIDAwMFxuIDAwMDAwMDAgICAgICAwMDAgICAgIDAwMCAgMDAwMDAwMCAgMDAwMDAwMCBcbiMjI1xuXG57IGNsYW1wLCBkZWcycmFkIH0gPSByZXF1aXJlICdreGsnXG4gICAgICAgIFxuY2xhc3MgVXRpbHNcbiAgICBcbiAgICBAb3B0OiAoZSxvKSAtPlxuICAgICAgICBcbiAgICAgICAgaWYgbz9cbiAgICAgICAgICAgIGZvciBrIGluIE9iamVjdC5rZXlzIG9cbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZSBrLCBvW2tdXG4gICAgICAgIGVcblxuICAgIEBhcHBlbmQ6IChwLHQsbykgLT5cbiAgICAgICAgXG4gICAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHRcbiAgICAgICAgcC5hcHBlbmRDaGlsZCBAb3B0IGUsIG9cbiAgICAgICAgZVxuICAgICAgICBcbiAgICBAc3ZnOiAod2lkdGg6MTAwLCBoZWlnaHQ6MTAwLCBjbHNzOikgLT5cblxuICAgICAgICBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyAnc3ZnJ1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlICd2aWV3Qm94JyBcIi0je3dpZHRoLzJ9IC0je3dpZHRoLzJ9ICN7d2lkdGh9ICN7aGVpZ2h0fVwiXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUgJ2NsYXNzJyBjbHNzIGlmIGNsc3NcbiAgICAgICAgc3ZnXG4gICAgICAgIFxuICAgIEBjaXJjbGU6IChyYWRpdXM6NTAsIGN4OjAsIGN5OjAsIGNsc3M6LCBzdmc6KSAtPlxuICAgICAgICBcbiAgICAgICAgc3ZnID89IEBzdmcgd2lkdGg6MipyYWRpdXMsIGhlaWdodDoyKnJhZGl1c1xuICAgICAgICBnID0gQGFwcGVuZCBzdmcsICdnJ1xuICAgICAgICBjID0gQGFwcGVuZCBnLCAnY2lyY2xlJyBjeDpjeCwgY3k6Y3ksIHI6cmFkaXVzLCBjbGFzczpjbHNzXG4gICAgICAgIHN2ZyAjIHdoeSBzdmcgYW5kIG5vdCBjP1xuXG4gICAgQHJlY3Q6ICh4OjAsIHk6MCwgdzoxLCBoOjEsIHI6MCwgY2xzczosIHN2ZzopIC0+XG5cbiAgICAgICAgc3ZnID89IEBzdmcgd2lkdGg6dywgaGVpZ2h0OmhcbiAgICAgICAgZyA9IEBhcHBlbmQgc3ZnLCAnZydcbiAgICAgICAgciA9IEBhcHBlbmQgZywgJ3JlY3QnIHg6eCwgeTp5LCB3aWR0aDp3LCBoZWlnaHQ6aCwgcng6ciwgY2xhc3M6Y2xzc1xuICAgICAgICByXG4gICAgICAgIFxuICAgIEBwaWU6IChyYWRpdXM6MTAsIGN4OjAsIGN5OjAsIGFuZ2xlOjAsIHN0YXJ0OjAsIGNsc3M6LCBzdmc6KSAtPlxuICAgICAgICBcbiAgICAgICAgc3RhcnQgPSBjbGFtcCAwIDM2MCBzdGFydCUzNjBcbiAgICAgICAgYW5nbGUgPSBjbGFtcCAwIDM2MCAoc3RhcnQrYW5nbGUpJTM2MFxuICAgICAgICBcbiAgICAgICAgc3ZnID89IEBzdmcgd2lkdGg6MipyYWRpdXMsIGhlaWdodDoyKnJhZGl1c1xuICAgICAgICBnICAgID0gQGFwcGVuZCBzdmcsICdnJ1xuICAgICAgICBwaWUgID0gQGFwcGVuZCBnLCAncGF0aCcgY2xhc3M6Y2xzc1xuICAgICAgICBcbiAgICAgICAgc3ggPSBjeCArIHJhZGl1cyAqIE1hdGguc2luIGRlZzJyYWQgYW5nbGVcbiAgICAgICAgc3kgPSBjeSAtIHJhZGl1cyAqIE1hdGguY29zIGRlZzJyYWQgYW5nbGVcbiAgICAgICAgZXggPSBjeCArIHJhZGl1cyAqIE1hdGguc2luIGRlZzJyYWQgc3RhcnRcbiAgICAgICAgZXkgPSBjeSAtIHJhZGl1cyAqIE1hdGguY29zIGRlZzJyYWQgc3RhcnRcbiAgICAgICAgXG4gICAgICAgIGYgPSBhbmdsZS1zdGFydCA8PSAxODAgYW5kICcwIDAnIG9yICcxIDAnXG4gICAgICAgIHBpZS5zZXRBdHRyaWJ1dGUgJ2QnIFwiTSAje2N4fSAje2N5fSBMICN7c3h9ICN7c3l9IEEgI3tyYWRpdXN9ICN7cmFkaXVzfSAje3N0YXJ0fSAje2Z9ICN7ZXh9ICN7ZXl9IHpcIlxuICAgICAgICAjIEEgcnggcnkgeC1heGlzLXJvdGF0aW9uIGxhcmdlLWFyYy1mbGFnIHN3ZWVwLWZsYWcgeCB5XG4gICAgICAgICAgICBcbiAgICAgICAgcGllXG5cbm1vZHVsZS5leHBvcnRzID0gVXRpbHNcbiJdfQ==
//# sourceURL=../coffee/utils.coffee