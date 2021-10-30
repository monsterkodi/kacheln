// koffee 1.14.0

/*
000   000  000000000  000  000       0000000
000   000     000     000  000      000     
000   000     000     000  000      0000000 
000   000     000     000  000           000
 0000000      000     000  0000000  0000000
 */
var Utils;

Utils = (function() {
    function Utils() {}

    Utils.opt = function(e, o) {
        var i, k, len, ref;
        if (o != null) {
            ref = Object.keys(o);
            for (i = 0, len = ref.length; i < len; i++) {
                k = ref[i];
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
        var clss, height, ref, ref1, ref2, svg, width;
        width = (ref = arg.width) != null ? ref : 100, height = (ref1 = arg.height) != null ? ref1 : 100, clss = (ref2 = arg.clss) != null ? ref2 : null;
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', "-" + (width / 2) + " -" + (width / 2) + " " + width + " " + height);
        if (clss) {
            svg.setAttribute('class', clss);
        }
        return svg;
    };

    Utils.circle = function(arg) {
        var c, clss, cx, cy, g, radius, ref, ref1, ref2, ref3, ref4, svg;
        radius = (ref = arg.radius) != null ? ref : 50, cx = (ref1 = arg.cx) != null ? ref1 : 0, cy = (ref2 = arg.cy) != null ? ref2 : 0, clss = (ref3 = arg.clss) != null ? ref3 : null, svg = (ref4 = arg.svg) != null ? ref4 : null;
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

    Utils.pie = function(arg) {
        var angle, clamp, clss, cx, cy, deg2rad, ex, ey, f, g, pie, radius, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, start, svg, sx, sy;
        radius = (ref = arg.radius) != null ? ref : 10, cx = (ref1 = arg.cx) != null ? ref1 : 0, cy = (ref2 = arg.cy) != null ? ref2 : 0, angle = (ref3 = arg.angle) != null ? ref3 : 0, start = (ref4 = arg.start) != null ? ref4 : 0, clss = (ref5 = arg.clss) != null ? ref5 : null, svg = (ref6 = arg.svg) != null ? ref6 : null;
        ref7 = require('kxk'), clamp = ref7.clamp, deg2rad = ref7.deg2rad;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JhcC5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImNyYXAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBOztBQVFNOzs7SUFFRixLQUFDLENBQUEsR0FBRCxHQUFNLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFFRixZQUFBO1FBQUEsSUFBRyxTQUFIO0FBQ0k7QUFBQSxpQkFBQSxxQ0FBQTs7Z0JBQ0ksQ0FBQyxDQUFDLFlBQUYsQ0FBZSxDQUFmLEVBQWtCLENBQUUsQ0FBQSxDQUFBLENBQXBCO0FBREosYUFESjs7ZUFHQTtJQUxFOztJQU9OLEtBQUMsQ0FBQSxNQUFELEdBQVMsU0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUw7QUFFTCxZQUFBO1FBQUEsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxlQUFULENBQXlCLDRCQUF6QixFQUFzRCxDQUF0RDtRQUNKLENBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEdBQUQsQ0FBSyxDQUFMLEVBQVEsQ0FBUixDQUFkO2VBQ0E7SUFKSzs7SUFNVCxLQUFDLENBQUEsR0FBRCxHQUFNLFNBQUMsR0FBRDtBQUVGLFlBQUE7UUFGRywwQ0FBTSxLQUFLLDhDQUFPLEtBQUssMENBQUc7UUFFN0IsR0FBQSxHQUFNLFFBQVEsQ0FBQyxlQUFULENBQXlCLDRCQUF6QixFQUFzRCxLQUF0RDtRQUNOLEdBQUcsQ0FBQyxZQUFKLENBQWlCLFNBQWpCLEVBQTJCLEdBQUEsR0FBRyxDQUFDLEtBQUEsR0FBTSxDQUFQLENBQUgsR0FBWSxJQUFaLEdBQWUsQ0FBQyxLQUFBLEdBQU0sQ0FBUCxDQUFmLEdBQXdCLEdBQXhCLEdBQTJCLEtBQTNCLEdBQWlDLEdBQWpDLEdBQW9DLE1BQS9EO1FBQ0EsSUFBaUMsSUFBakM7WUFBQSxHQUFHLENBQUMsWUFBSixDQUFpQixPQUFqQixFQUF5QixJQUF6QixFQUFBOztlQUNBO0lBTEU7O0lBT04sS0FBQyxDQUFBLE1BQUQsR0FBUyxTQUFDLEdBQUQ7QUFFTCxZQUFBO1FBRk0sNENBQU8sSUFBSSxzQ0FBRyxHQUFHLHNDQUFHLEdBQUcsMENBQUcsTUFBSSx3Q0FBRTs7WUFFdEM7O1lBQUEsTUFBTyxJQUFDLENBQUEsR0FBRCxDQUFLO2dCQUFBLEtBQUEsRUFBTSxDQUFBLEdBQUUsTUFBUjtnQkFBZ0IsTUFBQSxFQUFPLENBQUEsR0FBRSxNQUF6QjthQUFMOztRQUNQLENBQUEsR0FBSSxJQUFDLENBQUEsTUFBRCxDQUFRLEdBQVIsRUFBYSxHQUFiO1FBQ0osQ0FBQSxHQUFJLElBQUMsQ0FBQSxNQUFELENBQVEsQ0FBUixFQUFXLFFBQVgsRUFBcUI7WUFBQSxFQUFBLEVBQUcsRUFBSDtZQUFPLEVBQUEsRUFBRyxFQUFWO1lBQWMsQ0FBQSxFQUFFLE1BQWhCO1lBQXdCLENBQUEsS0FBQSxDQUFBLEVBQU0sSUFBOUI7U0FBckI7ZUFDSjtJQUxLOztJQU9ULEtBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxHQUFEO0FBRUYsWUFBQTtRQUZHLDRDQUFPLElBQUksc0NBQUcsR0FBRyxzQ0FBRyxHQUFHLDRDQUFNLEdBQUcsNENBQU0sR0FBRywwQ0FBRyxNQUFJLHdDQUFFO1FBRXJELE9BQXFCLE9BQUEsQ0FBUSxLQUFSLENBQXJCLEVBQUUsa0JBQUYsRUFBUztRQUVULEtBQUEsR0FBUSxLQUFBLENBQU0sQ0FBTixFQUFRLEdBQVIsRUFBWSxLQUFBLEdBQU0sR0FBbEI7UUFDUixLQUFBLEdBQVEsS0FBQSxDQUFNLENBQU4sRUFBUSxHQUFSLEVBQVksQ0FBQyxLQUFBLEdBQU0sS0FBUCxDQUFBLEdBQWMsR0FBMUI7O1lBRVI7O1lBQUEsTUFBTyxJQUFDLENBQUEsR0FBRCxDQUFLO2dCQUFBLEtBQUEsRUFBTSxDQUFBLEdBQUUsTUFBUjtnQkFBZ0IsTUFBQSxFQUFPLENBQUEsR0FBRSxNQUF6QjthQUFMOztRQUNQLENBQUEsR0FBTyxJQUFDLENBQUEsTUFBRCxDQUFRLEdBQVIsRUFBYSxHQUFiO1FBQ1AsR0FBQSxHQUFPLElBQUMsQ0FBQSxNQUFELENBQVEsQ0FBUixFQUFXLE1BQVgsRUFBa0I7WUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFNLElBQU47U0FBbEI7UUFFUCxFQUFBLEdBQUssRUFBQSxHQUFLLE1BQUEsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLE9BQUEsQ0FBUSxLQUFSLENBQVQ7UUFDbkIsRUFBQSxHQUFLLEVBQUEsR0FBSyxNQUFBLEdBQVMsSUFBSSxDQUFDLEdBQUwsQ0FBUyxPQUFBLENBQVEsS0FBUixDQUFUO1FBQ25CLEVBQUEsR0FBSyxFQUFBLEdBQUssTUFBQSxHQUFTLElBQUksQ0FBQyxHQUFMLENBQVMsT0FBQSxDQUFRLEtBQVIsQ0FBVDtRQUNuQixFQUFBLEdBQUssRUFBQSxHQUFLLE1BQUEsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLE9BQUEsQ0FBUSxLQUFSLENBQVQ7UUFFbkIsQ0FBQSxHQUFJLEtBQUEsR0FBTSxLQUFOLElBQWUsR0FBZixJQUF1QixLQUF2QixJQUFnQztRQUNwQyxHQUFHLENBQUMsWUFBSixDQUFpQixHQUFqQixFQUFxQixJQUFBLEdBQUssRUFBTCxHQUFRLEdBQVIsR0FBVyxFQUFYLEdBQWMsS0FBZCxHQUFtQixFQUFuQixHQUFzQixHQUF0QixHQUF5QixFQUF6QixHQUE0QixLQUE1QixHQUFpQyxNQUFqQyxHQUF3QyxHQUF4QyxHQUEyQyxNQUEzQyxHQUFrRCxHQUFsRCxHQUFxRCxLQUFyRCxHQUEyRCxHQUEzRCxHQUE4RCxDQUE5RCxHQUFnRSxHQUFoRSxHQUFtRSxFQUFuRSxHQUFzRSxHQUF0RSxHQUF5RSxFQUF6RSxHQUE0RSxJQUFqRztlQUNBO0lBbEJFOzs7Ozs7QUFvQlYsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbjAwMCAgIDAwMCAgMDAwMDAwMDAwICAwMDAgIDAwMCAgICAgICAwMDAwMDAwXG4wMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAwMDAgICAgICAwMDAgICAgIFxuMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgMDAwMDAwMCBcbjAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgIDAwMCAgICAgICAgICAgMDAwXG4gMDAwMDAwMCAgICAgIDAwMCAgICAgMDAwICAwMDAwMDAwICAwMDAwMDAwIFxuIyMjXG5cbmNsYXNzIFV0aWxzXG4gICAgXG4gICAgQG9wdDogKGUsbykgLT5cbiAgICAgICAgXG4gICAgICAgIGlmIG8/XG4gICAgICAgICAgICBmb3IgayBpbiBPYmplY3Qua2V5cyBvXG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUgaywgb1trXVxuICAgICAgICBlXG5cbiAgICBAYXBwZW5kOiAocCx0LG8pIC0+XG4gICAgICAgIFxuICAgICAgICBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB0XG4gICAgICAgIHAuYXBwZW5kQ2hpbGQgQG9wdCBlLCBvXG4gICAgICAgIGVcbiAgICAgICAgXG4gICAgQHN2ZzogKHdpZHRoOjEwMCwgaGVpZ2h0OjEwMCwgY2xzczopIC0+XG4gICAgICAgICAgIFxuICAgICAgICBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyAnc3ZnJ1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlICd2aWV3Qm94JyBcIi0je3dpZHRoLzJ9IC0je3dpZHRoLzJ9ICN7d2lkdGh9ICN7aGVpZ2h0fVwiXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUgJ2NsYXNzJyBjbHNzIGlmIGNsc3NcbiAgICAgICAgc3ZnXG4gICAgICAgICAgIFxuICAgIEBjaXJjbGU6IChyYWRpdXM6NTAsIGN4OjAsIGN5OjAsIGNsc3M6LCBzdmc6KSAtPlxuICAgICAgICAgICBcbiAgICAgICAgc3ZnID89IEBzdmcgd2lkdGg6MipyYWRpdXMsIGhlaWdodDoyKnJhZGl1c1xuICAgICAgICBnID0gQGFwcGVuZCBzdmcsICdnJ1xuICAgICAgICBjID0gQGFwcGVuZCBnLCAnY2lyY2xlJywgY3g6Y3gsIGN5OmN5LCByOnJhZGl1cywgY2xhc3M6Y2xzc1xuICAgICAgICBzdmdcbiAgICAgICAgICBcbiAgICBAcGllOiAocmFkaXVzOjEwLCBjeDowLCBjeTowLCBhbmdsZTowLCBzdGFydDowLCBjbHNzOiwgc3ZnOikgLT5cblxuICAgICAgICB7IGNsYW1wLCBkZWcycmFkIH0gPSByZXF1aXJlICdreGsnXG4gICAgICAgIFxuICAgICAgICBzdGFydCA9IGNsYW1wIDAgMzYwIHN0YXJ0JTM2MFxuICAgICAgICBhbmdsZSA9IGNsYW1wIDAgMzYwIChzdGFydCthbmdsZSklMzYwXG4gICAgICAgICAgIFxuICAgICAgICBzdmcgPz0gQHN2ZyB3aWR0aDoyKnJhZGl1cywgaGVpZ2h0OjIqcmFkaXVzXG4gICAgICAgIGcgICAgPSBAYXBwZW5kIHN2ZywgJ2cnXG4gICAgICAgIHBpZSAgPSBAYXBwZW5kIGcsICdwYXRoJyBjbGFzczpjbHNzXG4gICAgICAgICAgIFxuICAgICAgICBzeCA9IGN4ICsgcmFkaXVzICogTWF0aC5zaW4gZGVnMnJhZCBhbmdsZVxuICAgICAgICBzeSA9IGN5IC0gcmFkaXVzICogTWF0aC5jb3MgZGVnMnJhZCBhbmdsZVxuICAgICAgICBleCA9IGN4ICsgcmFkaXVzICogTWF0aC5zaW4gZGVnMnJhZCBzdGFydFxuICAgICAgICBleSA9IGN5IC0gcmFkaXVzICogTWF0aC5jb3MgZGVnMnJhZCBzdGFydFxuICAgICAgICAgICBcbiAgICAgICAgZiA9IGFuZ2xlLXN0YXJ0IDw9IDE4MCBhbmQgJzAgMCcgb3IgJzEgMCdcbiAgICAgICAgcGllLnNldEF0dHJpYnV0ZSAnZCcgXCJNICN7Y3h9ICN7Y3l9IEwgI3tzeH0gI3tzeX0gQSAje3JhZGl1c30gI3tyYWRpdXN9ICN7c3RhcnR9ICN7Zn0gI3tleH0gI3tleX0gelwiXG4gICAgICAgIHBpZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxzXG4iXX0=
//# sourceURL=../coffee/crap.coffee