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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHMuanMiLCJzb3VyY2VSb290IjoiLi4vY29mZmVlIiwic291cmNlcyI6WyJ0b29scy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUE7O0FBUU07OztJQUVGLEtBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxDQUFELEVBQUcsQ0FBSDtBQUVGLFlBQUE7UUFBQSxJQUFHLFNBQUg7QUFDSTtBQUFBLGlCQUFBLHFDQUFBOztnQkFDSSxDQUFDLENBQUMsWUFBRixDQUFlLENBQWYsRUFBa0IsQ0FBRSxDQUFBLENBQUEsQ0FBcEI7QUFESixhQURKOztlQUdBO0lBTEU7O0lBT04sS0FBQyxDQUFBLE1BQUQsR0FBUyxTQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTDtBQUVMLFlBQUE7UUFBQSxDQUFBLEdBQUksUUFBUSxDQUFDLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXNELENBQXREO1FBQ0osQ0FBQyxDQUFDLFdBQUYsQ0FBYyxJQUFDLENBQUEsR0FBRCxDQUFLLENBQUwsRUFBUSxDQUFSLENBQWQ7ZUFDQTtJQUpLOztJQU1ULEtBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxHQUFEO0FBRUYsWUFBQTtRQUZHLDBDQUFNLEtBQUssOENBQU8sS0FBSywwQ0FBRztRQUU3QixHQUFBLEdBQU0sUUFBUSxDQUFDLGVBQVQsQ0FBeUIsNEJBQXpCLEVBQXNELEtBQXREO1FBQ04sR0FBRyxDQUFDLFlBQUosQ0FBaUIsU0FBakIsRUFBMkIsR0FBQSxHQUFHLENBQUMsS0FBQSxHQUFNLENBQVAsQ0FBSCxHQUFZLElBQVosR0FBZSxDQUFDLEtBQUEsR0FBTSxDQUFQLENBQWYsR0FBd0IsR0FBeEIsR0FBMkIsS0FBM0IsR0FBaUMsR0FBakMsR0FBb0MsTUFBL0Q7UUFDQSxJQUFpQyxJQUFqQztZQUFBLEdBQUcsQ0FBQyxZQUFKLENBQWlCLE9BQWpCLEVBQXlCLElBQXpCLEVBQUE7O2VBQ0E7SUFMRTs7SUFPTixLQUFDLENBQUEsTUFBRCxHQUFTLFNBQUMsR0FBRDtBQUVMLFlBQUE7UUFGTSw0Q0FBTyxJQUFJLHNDQUFHLEdBQUcsc0NBQUcsR0FBRywwQ0FBRyxNQUFJLHdDQUFFOztZQUV0Qzs7WUFBQSxNQUFPLElBQUMsQ0FBQSxHQUFELENBQUs7Z0JBQUEsS0FBQSxFQUFNLENBQUEsR0FBRSxNQUFSO2dCQUFnQixNQUFBLEVBQU8sQ0FBQSxHQUFFLE1BQXpCO2FBQUw7O1FBQ1AsQ0FBQSxHQUFJLElBQUMsQ0FBQSxNQUFELENBQVEsR0FBUixFQUFhLEdBQWI7UUFDSixDQUFBLEdBQUksSUFBQyxDQUFBLE1BQUQsQ0FBUSxDQUFSLEVBQVcsUUFBWCxFQUFxQjtZQUFBLEVBQUEsRUFBRyxFQUFIO1lBQU8sRUFBQSxFQUFHLEVBQVY7WUFBYyxDQUFBLEVBQUUsTUFBaEI7WUFBd0IsQ0FBQSxLQUFBLENBQUEsRUFBTSxJQUE5QjtTQUFyQjtlQUNKO0lBTEs7O0lBT1QsS0FBQyxDQUFBLEdBQUQsR0FBTSxTQUFDLEdBQUQ7QUFFRixZQUFBO1FBRkcsNENBQU8sSUFBSSxzQ0FBRyxHQUFHLHNDQUFHLEdBQUcsNENBQU0sR0FBRyw0Q0FBTSxHQUFHLDBDQUFHLE1BQUksd0NBQUU7UUFFckQsT0FBcUIsT0FBQSxDQUFRLEtBQVIsQ0FBckIsRUFBRSxrQkFBRixFQUFTO1FBRVQsS0FBQSxHQUFRLEtBQUEsQ0FBTSxDQUFOLEVBQVEsR0FBUixFQUFZLEtBQUEsR0FBTSxHQUFsQjtRQUNSLEtBQUEsR0FBUSxLQUFBLENBQU0sQ0FBTixFQUFRLEdBQVIsRUFBWSxDQUFDLEtBQUEsR0FBTSxLQUFQLENBQUEsR0FBYyxHQUExQjs7WUFFUjs7WUFBQSxNQUFPLElBQUMsQ0FBQSxHQUFELENBQUs7Z0JBQUEsS0FBQSxFQUFNLENBQUEsR0FBRSxNQUFSO2dCQUFnQixNQUFBLEVBQU8sQ0FBQSxHQUFFLE1BQXpCO2FBQUw7O1FBQ1AsQ0FBQSxHQUFPLElBQUMsQ0FBQSxNQUFELENBQVEsR0FBUixFQUFhLEdBQWI7UUFDUCxHQUFBLEdBQU8sSUFBQyxDQUFBLE1BQUQsQ0FBUSxDQUFSLEVBQVcsTUFBWCxFQUFrQjtZQUFBLENBQUEsS0FBQSxDQUFBLEVBQU0sSUFBTjtTQUFsQjtRQUVQLEVBQUEsR0FBSyxFQUFBLEdBQUssTUFBQSxHQUFTLElBQUksQ0FBQyxHQUFMLENBQVMsT0FBQSxDQUFRLEtBQVIsQ0FBVDtRQUNuQixFQUFBLEdBQUssRUFBQSxHQUFLLE1BQUEsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLE9BQUEsQ0FBUSxLQUFSLENBQVQ7UUFDbkIsRUFBQSxHQUFLLEVBQUEsR0FBSyxNQUFBLEdBQVMsSUFBSSxDQUFDLEdBQUwsQ0FBUyxPQUFBLENBQVEsS0FBUixDQUFUO1FBQ25CLEVBQUEsR0FBSyxFQUFBLEdBQUssTUFBQSxHQUFTLElBQUksQ0FBQyxHQUFMLENBQVMsT0FBQSxDQUFRLEtBQVIsQ0FBVDtRQUVuQixDQUFBLEdBQUksS0FBQSxHQUFNLEtBQU4sSUFBZSxHQUFmLElBQXVCLEtBQXZCLElBQWdDO1FBQ3BDLEdBQUcsQ0FBQyxZQUFKLENBQWlCLEdBQWpCLEVBQXFCLElBQUEsR0FBSyxFQUFMLEdBQVEsR0FBUixHQUFXLEVBQVgsR0FBYyxLQUFkLEdBQW1CLEVBQW5CLEdBQXNCLEdBQXRCLEdBQXlCLEVBQXpCLEdBQTRCLEtBQTVCLEdBQWlDLE1BQWpDLEdBQXdDLEdBQXhDLEdBQTJDLE1BQTNDLEdBQWtELEdBQWxELEdBQXFELEtBQXJELEdBQTJELEdBQTNELEdBQThELENBQTlELEdBQWdFLEdBQWhFLEdBQW1FLEVBQW5FLEdBQXNFLEdBQXRFLEdBQXlFLEVBQXpFLEdBQTRFLElBQWpHO2VBR0E7SUFwQkU7Ozs7OztBQXNCVixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuMDAwICAgMDAwICAwMDAwMDAwMDAgIDAwMCAgMDAwICAgICAgIDAwMDAwMDBcbjAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgIDAwMCAgICAgIDAwMCAgICAgXG4wMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAwMDAgICAgICAwMDAwMDAwIFxuMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgMDAwICAgICAgICAgICAwMDBcbiAwMDAwMDAwICAgICAgMDAwICAgICAwMDAgIDAwMDAwMDAgIDAwMDAwMDAgXG4jIyNcblxuY2xhc3MgVXRpbHNcbiAgICBcbiAgICBAb3B0OiAoZSxvKSAtPlxuICAgICAgICBcbiAgICAgICAgaWYgbz9cbiAgICAgICAgICAgIGZvciBrIGluIE9iamVjdC5rZXlzIG9cbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZSBrLCBvW2tdXG4gICAgICAgIGVcblxuICAgIEBhcHBlbmQ6IChwLHQsbykgLT5cbiAgICAgICAgXG4gICAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHRcbiAgICAgICAgcC5hcHBlbmRDaGlsZCBAb3B0IGUsIG9cbiAgICAgICAgZVxuICAgICAgICBcbiAgICBAc3ZnOiAod2lkdGg6MTAwLCBoZWlnaHQ6MTAwLCBjbHNzOikgLT5cbiAgICAgICAgXG4gICAgICAgIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnICdzdmcnXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUgJ3ZpZXdCb3gnIFwiLSN7d2lkdGgvMn0gLSN7d2lkdGgvMn0gI3t3aWR0aH0gI3toZWlnaHR9XCJcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSAnY2xhc3MnIGNsc3MgaWYgY2xzc1xuICAgICAgICBzdmdcbiAgICAgICAgXG4gICAgQGNpcmNsZTogKHJhZGl1czo1MCwgY3g6MCwgY3k6MCwgY2xzczosIHN2ZzopIC0+XG4gICAgICAgIFxuICAgICAgICBzdmcgPz0gQHN2ZyB3aWR0aDoyKnJhZGl1cywgaGVpZ2h0OjIqcmFkaXVzXG4gICAgICAgIGcgPSBAYXBwZW5kIHN2ZywgJ2cnXG4gICAgICAgIGMgPSBAYXBwZW5kIGcsICdjaXJjbGUnLCBjeDpjeCwgY3k6Y3ksIHI6cmFkaXVzLCBjbGFzczpjbHNzXG4gICAgICAgIHN2Z1xuICAgICAgICBcbiAgICBAcGllOiAocmFkaXVzOjEwLCBjeDowLCBjeTowLCBhbmdsZTowLCBzdGFydDowLCBjbHNzOiwgc3ZnOikgLT5cblxuICAgICAgICB7IGNsYW1wLCBkZWcycmFkIH0gPSByZXF1aXJlICdreGsnXG4gICAgICAgIFxuICAgICAgICBzdGFydCA9IGNsYW1wIDAgMzYwIHN0YXJ0JTM2MFxuICAgICAgICBhbmdsZSA9IGNsYW1wIDAgMzYwIChzdGFydCthbmdsZSklMzYwXG4gICAgICAgIFxuICAgICAgICBzdmcgPz0gQHN2ZyB3aWR0aDoyKnJhZGl1cywgaGVpZ2h0OjIqcmFkaXVzXG4gICAgICAgIGcgICAgPSBAYXBwZW5kIHN2ZywgJ2cnXG4gICAgICAgIHBpZSAgPSBAYXBwZW5kIGcsICdwYXRoJyBjbGFzczpjbHNzXG4gICAgICAgIFxuICAgICAgICBzeCA9IGN4ICsgcmFkaXVzICogTWF0aC5zaW4gZGVnMnJhZCBhbmdsZVxuICAgICAgICBzeSA9IGN5IC0gcmFkaXVzICogTWF0aC5jb3MgZGVnMnJhZCBhbmdsZVxuICAgICAgICBleCA9IGN4ICsgcmFkaXVzICogTWF0aC5zaW4gZGVnMnJhZCBzdGFydFxuICAgICAgICBleSA9IGN5IC0gcmFkaXVzICogTWF0aC5jb3MgZGVnMnJhZCBzdGFydFxuICAgICAgICBcbiAgICAgICAgZiA9IGFuZ2xlLXN0YXJ0IDw9IDE4MCBhbmQgJzAgMCcgb3IgJzEgMCdcbiAgICAgICAgcGllLnNldEF0dHJpYnV0ZSAnZCcgXCJNICN7Y3h9ICN7Y3l9IEwgI3tzeH0gI3tzeX0gQSAje3JhZGl1c30gI3tyYWRpdXN9ICN7c3RhcnR9ICN7Zn0gI3tleH0gI3tleX0gelwiXG4gICAgICAgICMgQSByeCByeSB4LWF4aXMtcm90YXRpb24gbGFyZ2UtYXJjLWZsYWcgc3dlZXAtZmxhZyB4IHlcbiAgICAgICAgICAgIFxuICAgICAgICBwaWVcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsc1xuIl19
//# sourceURL=../coffee/tools.coffee