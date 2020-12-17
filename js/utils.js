// koffee 1.14.0

/*
000   000  000000000  000  000       0000000
000   000     000     000  000      000     
000   000     000     000  000      0000000 
000   000     000     000  000           000
 0000000      000     000  0000000  0000000
 */
var clamp, deg2rad, ref, utils;

ref = require('kxk'), clamp = ref.clamp, deg2rad = ref.deg2rad;

utils = (function() {
    function utils() {}

    utils.opt = function(e, o) {
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

    utils.append = function(p, t, o) {
        var e;
        e = document.createElementNS("http://www.w3.org/2000/svg", t);
        p.appendChild(this.opt(e, o));
        return e;
    };

    utils.svg = function(arg) {
        var clss, height, ref1, ref2, ref3, svg, width;
        width = (ref1 = arg.width) != null ? ref1 : 100, height = (ref2 = arg.height) != null ? ref2 : 100, clss = (ref3 = arg.clss) != null ? ref3 : null;
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', "-" + (width / 2) + " -" + (width / 2) + " " + width + " " + height);
        if (clss) {
            svg.setAttribute('class', clss);
        }
        return svg;
    };

    utils.circle = function(arg) {
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

    utils.pie = function(arg) {
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

    return utils;

})();

module.exports = utils;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vY29mZmVlIiwic291cmNlcyI6WyJ1dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUE7O0FBUUEsTUFBcUIsT0FBQSxDQUFRLEtBQVIsQ0FBckIsRUFBRSxpQkFBRixFQUFTOztBQUVIOzs7SUFFRixLQUFDLENBQUEsR0FBRCxHQUFPLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFFSCxZQUFBO1FBQUEsSUFBRyxTQUFIO0FBQ0k7QUFBQSxpQkFBQSxzQ0FBQTs7Z0JBQ0ksQ0FBQyxDQUFDLFlBQUYsQ0FBZSxDQUFmLEVBQWtCLENBQUUsQ0FBQSxDQUFBLENBQXBCO0FBREosYUFESjs7ZUFHQTtJQUxHOztJQU9QLEtBQUMsQ0FBQSxNQUFELEdBQVMsU0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUw7QUFFTCxZQUFBO1FBQUEsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxlQUFULENBQXlCLDRCQUF6QixFQUFzRCxDQUF0RDtRQUNKLENBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEdBQUQsQ0FBSyxDQUFMLEVBQVEsQ0FBUixDQUFkO2VBQ0E7SUFKSzs7SUFNVCxLQUFDLENBQUEsR0FBRCxHQUFNLFNBQUMsR0FBRDtBQUVGLFlBQUE7UUFGRyw0Q0FBTSxLQUFLLDhDQUFPLEtBQUssMENBQUc7UUFFN0IsR0FBQSxHQUFNLFFBQVEsQ0FBQyxlQUFULENBQXlCLDRCQUF6QixFQUFzRCxLQUF0RDtRQUNOLEdBQUcsQ0FBQyxZQUFKLENBQWlCLFNBQWpCLEVBQTJCLEdBQUEsR0FBRyxDQUFDLEtBQUEsR0FBTSxDQUFQLENBQUgsR0FBWSxJQUFaLEdBQWUsQ0FBQyxLQUFBLEdBQU0sQ0FBUCxDQUFmLEdBQXdCLEdBQXhCLEdBQTJCLEtBQTNCLEdBQWlDLEdBQWpDLEdBQW9DLE1BQS9EO1FBQ0EsSUFBaUMsSUFBakM7WUFBQSxHQUFHLENBQUMsWUFBSixDQUFpQixPQUFqQixFQUF5QixJQUF6QixFQUFBOztlQUNBO0lBTEU7O0lBT04sS0FBQyxDQUFBLE1BQUQsR0FBUyxTQUFDLEdBQUQ7QUFFTCxZQUFBO1FBRk0sOENBQU8sSUFBSSxzQ0FBRyxHQUFHLHNDQUFHLEdBQUcsMENBQUcsTUFBSSx3Q0FBRTs7WUFFdEM7O1lBQUEsTUFBTyxJQUFDLENBQUEsR0FBRCxDQUFLO2dCQUFBLEtBQUEsRUFBTSxDQUFBLEdBQUUsTUFBUjtnQkFBZ0IsTUFBQSxFQUFPLENBQUEsR0FBRSxNQUF6QjthQUFMOztRQUNQLENBQUEsR0FBSSxJQUFDLENBQUEsTUFBRCxDQUFRLEdBQVIsRUFBYSxHQUFiO1FBQ0osQ0FBQSxHQUFJLElBQUMsQ0FBQSxNQUFELENBQVEsQ0FBUixFQUFXLFFBQVgsRUFBcUI7WUFBQSxFQUFBLEVBQUcsRUFBSDtZQUFPLEVBQUEsRUFBRyxFQUFWO1lBQWMsQ0FBQSxFQUFFLE1BQWhCO1lBQXdCLENBQUEsS0FBQSxDQUFBLEVBQU0sSUFBOUI7U0FBckI7ZUFDSjtJQUxLOztJQU9ULEtBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxHQUFEO0FBRUYsWUFBQTtRQUZHLDhDQUFPLElBQUksc0NBQUcsR0FBRyxzQ0FBRyxHQUFHLDRDQUFNLEdBQUcsNENBQU0sR0FBRywwQ0FBRyxNQUFJLHdDQUFFO1FBRXJELEtBQUEsR0FBUSxLQUFBLENBQU0sQ0FBTixFQUFRLEdBQVIsRUFBWSxLQUFBLEdBQU0sR0FBbEI7UUFDUixLQUFBLEdBQVEsS0FBQSxDQUFNLENBQU4sRUFBUSxHQUFSLEVBQVksQ0FBQyxLQUFBLEdBQU0sS0FBUCxDQUFBLEdBQWMsR0FBMUI7O1lBRVI7O1lBQUEsTUFBTyxJQUFDLENBQUEsR0FBRCxDQUFLO2dCQUFBLEtBQUEsRUFBTSxDQUFBLEdBQUUsTUFBUjtnQkFBZ0IsTUFBQSxFQUFPLENBQUEsR0FBRSxNQUF6QjthQUFMOztRQUNQLENBQUEsR0FBTyxJQUFDLENBQUEsTUFBRCxDQUFRLEdBQVIsRUFBYSxHQUFiO1FBQ1AsR0FBQSxHQUFPLElBQUMsQ0FBQSxNQUFELENBQVEsQ0FBUixFQUFXLE1BQVgsRUFBa0I7WUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFNLElBQU47U0FBbEI7UUFFUCxFQUFBLEdBQUssRUFBQSxHQUFLLE1BQUEsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLE9BQUEsQ0FBUSxLQUFSLENBQVQ7UUFDbkIsRUFBQSxHQUFLLEVBQUEsR0FBSyxNQUFBLEdBQVMsSUFBSSxDQUFDLEdBQUwsQ0FBUyxPQUFBLENBQVEsS0FBUixDQUFUO1FBQ25CLEVBQUEsR0FBSyxFQUFBLEdBQUssTUFBQSxHQUFTLElBQUksQ0FBQyxHQUFMLENBQVMsT0FBQSxDQUFRLEtBQVIsQ0FBVDtRQUNuQixFQUFBLEdBQUssRUFBQSxHQUFLLE1BQUEsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLE9BQUEsQ0FBUSxLQUFSLENBQVQ7UUFFbkIsQ0FBQSxHQUFJLEtBQUEsR0FBTSxLQUFOLElBQWUsR0FBZixJQUF1QixLQUF2QixJQUFnQztRQUNwQyxHQUFHLENBQUMsWUFBSixDQUFpQixHQUFqQixFQUFxQixJQUFBLEdBQUssRUFBTCxHQUFRLEdBQVIsR0FBVyxFQUFYLEdBQWMsS0FBZCxHQUFtQixFQUFuQixHQUFzQixHQUF0QixHQUF5QixFQUF6QixHQUE0QixLQUE1QixHQUFpQyxNQUFqQyxHQUF3QyxHQUF4QyxHQUEyQyxNQUEzQyxHQUFrRCxHQUFsRCxHQUFxRCxLQUFyRCxHQUEyRCxHQUEzRCxHQUE4RCxDQUE5RCxHQUFnRSxHQUFoRSxHQUFtRSxFQUFuRSxHQUFzRSxHQUF0RSxHQUF5RSxFQUF6RSxHQUE0RSxJQUFqRztlQUdBO0lBbEJFOzs7Ozs7QUFvQlYsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbjAwMCAgIDAwMCAgMDAwMDAwMDAwICAwMDAgIDAwMCAgICAgICAwMDAwMDAwXG4wMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAwMDAgICAgICAwMDAgICAgIFxuMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgMDAwMDAwMCBcbjAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgIDAwMCAgICAgICAgICAgMDAwXG4gMDAwMDAwMCAgICAgIDAwMCAgICAgMDAwICAwMDAwMDAwICAwMDAwMDAwIFxuIyMjXG5cbnsgY2xhbXAsIGRlZzJyYWQgfSA9IHJlcXVpcmUgJ2t4aydcblxuY2xhc3MgdXRpbHNcbiAgICBcbiAgICBAb3B0ID0gKGUsbykgLT5cbiAgICAgICAgXG4gICAgICAgIGlmIG8/XG4gICAgICAgICAgICBmb3IgayBpbiBPYmplY3Qua2V5cyBvXG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUgaywgb1trXVxuICAgICAgICBlXG5cbiAgICBAYXBwZW5kOiAocCx0LG8pIC0+XG4gICAgICAgIFxuICAgICAgICBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB0XG4gICAgICAgIHAuYXBwZW5kQ2hpbGQgQG9wdCBlLCBvXG4gICAgICAgIGVcbiAgICAgICAgXG4gICAgQHN2ZzogKHdpZHRoOjEwMCwgaGVpZ2h0OjEwMCwgY2xzczopIC0+XG4gICAgICAgIFxuICAgICAgICBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyAnc3ZnJ1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlICd2aWV3Qm94JyBcIi0je3dpZHRoLzJ9IC0je3dpZHRoLzJ9ICN7d2lkdGh9ICN7aGVpZ2h0fVwiXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUgJ2NsYXNzJyBjbHNzIGlmIGNsc3NcbiAgICAgICAgc3ZnXG4gICAgICAgIFxuICAgIEBjaXJjbGU6IChyYWRpdXM6NTAsIGN4OjAsIGN5OjAsIGNsc3M6LCBzdmc6KSAtPlxuICAgICAgICBcbiAgICAgICAgc3ZnID89IEBzdmcgd2lkdGg6MipyYWRpdXMsIGhlaWdodDoyKnJhZGl1c1xuICAgICAgICBnID0gQGFwcGVuZCBzdmcsICdnJ1xuICAgICAgICBjID0gQGFwcGVuZCBnLCAnY2lyY2xlJywgY3g6Y3gsIGN5OmN5LCByOnJhZGl1cywgY2xhc3M6Y2xzc1xuICAgICAgICBzdmdcbiAgICAgICAgXG4gICAgQHBpZTogKHJhZGl1czoxMCwgY3g6MCwgY3k6MCwgYW5nbGU6MCwgc3RhcnQ6MCwgY2xzczosIHN2ZzopIC0+XG5cbiAgICAgICAgc3RhcnQgPSBjbGFtcCAwIDM2MCBzdGFydCUzNjBcbiAgICAgICAgYW5nbGUgPSBjbGFtcCAwIDM2MCAoc3RhcnQrYW5nbGUpJTM2MFxuICAgICAgICBcbiAgICAgICAgc3ZnID89IEBzdmcgd2lkdGg6MipyYWRpdXMsIGhlaWdodDoyKnJhZGl1c1xuICAgICAgICBnICAgID0gQGFwcGVuZCBzdmcsICdnJ1xuICAgICAgICBwaWUgID0gQGFwcGVuZCBnLCAncGF0aCcgY2xhc3M6Y2xzc1xuICAgICAgICBcbiAgICAgICAgc3ggPSBjeCArIHJhZGl1cyAqIE1hdGguc2luIGRlZzJyYWQgYW5nbGVcbiAgICAgICAgc3kgPSBjeSAtIHJhZGl1cyAqIE1hdGguY29zIGRlZzJyYWQgYW5nbGVcbiAgICAgICAgZXggPSBjeCArIHJhZGl1cyAqIE1hdGguc2luIGRlZzJyYWQgc3RhcnRcbiAgICAgICAgZXkgPSBjeSAtIHJhZGl1cyAqIE1hdGguY29zIGRlZzJyYWQgc3RhcnRcbiAgICAgICAgXG4gICAgICAgIGYgPSBhbmdsZS1zdGFydCA8PSAxODAgYW5kICcwIDAnIG9yICcxIDAnXG4gICAgICAgIHBpZS5zZXRBdHRyaWJ1dGUgJ2QnIFwiTSAje2N4fSAje2N5fSBMICN7c3h9ICN7c3l9IEEgI3tyYWRpdXN9ICN7cmFkaXVzfSAje3N0YXJ0fSAje2Z9ICN7ZXh9ICN7ZXl9IHpcIlxuICAgICAgICAjIEEgcnggcnkgeC1heGlzLXJvdGF0aW9uIGxhcmdlLWFyYy1mbGFnIHN3ZWVwLWZsYWcgeCB5XG4gICAgICAgICAgICBcbiAgICAgICAgcGllXG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHNcbiJdfQ==
//# sourceURL=../coffee/utils.coffee