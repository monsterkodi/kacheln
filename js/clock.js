// koffee 1.14.0

/*
 0000000  000       0000000    0000000  000   000  
000       000      000   000  000       000  000   
000       000      000   000  000       0000000    
000       000      000   000  000       000  000   
 0000000  0000000   0000000    0000000  000   000
 */
var Clock, Kachel, post, utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

post = require('kxk').post;

Kachel = require('./kachel');

utils = require('./utils');

Clock = (function(superClass) {
    extend(Clock, superClass);

    function Clock(kachelId) {
        this.kachelId = kachelId != null ? kachelId : 'clock';
        this.onData = bind(this.onData, this);
        Clock.__super__.constructor.call(this, this.kachelId);
        post.on('clock', this.onData);
        this.onLoad();
    }

    Clock.prototype.onData = function(data) {
        if (!this.hour) {
            return;
        }
        this.hour.setAttribute('transform', "rotate(" + (30 * data.hour + data.minute / 2) + ")");
        this.minute.setAttribute('transform', "rotate(" + (6 * data.minute + data.second / 10) + ")");
        return this.second.setAttribute('transform', "rotate(" + (6 * data.second) + ")");
    };

    Clock.prototype.onLoad = function() {
        var face, svg;
        svg = utils.svg({
            clss: 'clock'
        });
        this.div.appendChild(svg);
        face = utils.circle({
            radius: 45,
            clss: 'face',
            svg: svg
        });
        this.hour = utils.append(svg, 'line', {
            y1: 0,
            y2: -32,
            "class": 'hour'
        });
        this.minute = utils.append(svg, 'line', {
            y1: 0,
            y2: -42,
            "class": 'minute'
        });
        return this.second = utils.append(svg, 'line', {
            y1: 0,
            y2: -42,
            "class": 'second'
        });
    };

    return Clock;

})(Kachel);

module.exports = Clock;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2suanMiLCJzb3VyY2VSb290IjoiLi4vY29mZmVlIiwic291cmNlcyI6WyJjbG9jay5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUEsMEJBQUE7SUFBQTs7OztBQVFFLE9BQVMsT0FBQSxDQUFRLEtBQVI7O0FBRVgsTUFBQSxHQUFVLE9BQUEsQ0FBUSxVQUFSOztBQUNWLEtBQUEsR0FBVSxPQUFBLENBQVEsU0FBUjs7QUFFSjs7O0lBRUMsZUFBQyxRQUFEO1FBQUMsSUFBQyxDQUFBLDhCQUFELFdBQVU7O1FBRVYsdUNBQU0sSUFBQyxDQUFBLFFBQVA7UUFFQSxJQUFJLENBQUMsRUFBTCxDQUFRLE9BQVIsRUFBZ0IsSUFBQyxDQUFBLE1BQWpCO1FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQTtJQUxEOztvQkFPSCxNQUFBLEdBQVEsU0FBQyxJQUFEO1FBRUosSUFBVSxDQUFJLElBQUMsQ0FBQSxJQUFmO0FBQUEsbUJBQUE7O1FBRUEsSUFBQyxDQUFBLElBQU0sQ0FBQyxZQUFSLENBQXFCLFdBQXJCLEVBQWlDLFNBQUEsR0FBUyxDQUFDLEVBQUEsR0FBSyxJQUFJLENBQUMsSUFBVixHQUFpQixJQUFJLENBQUMsTUFBTCxHQUFjLENBQWhDLENBQVQsR0FBMkMsR0FBNUU7UUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLFlBQVIsQ0FBcUIsV0FBckIsRUFBaUMsU0FBQSxHQUFTLENBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQyxNQUFULEdBQWtCLElBQUksQ0FBQyxNQUFMLEdBQWMsRUFBakMsQ0FBVCxHQUE2QyxHQUE5RTtlQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsWUFBUixDQUFxQixXQUFyQixFQUFpQyxTQUFBLEdBQVMsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDLE1BQVYsQ0FBVCxHQUEwQixHQUEzRDtJQU5JOztvQkFjUixNQUFBLEdBQVEsU0FBQTtBQUVKLFlBQUE7UUFBQSxHQUFBLEdBQU0sS0FBSyxDQUFDLEdBQU4sQ0FBVTtZQUFBLElBQUEsRUFBSyxPQUFMO1NBQVY7UUFDTixJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsR0FBakI7UUFFQSxJQUFBLEdBQU8sS0FBSyxDQUFDLE1BQU4sQ0FBYTtZQUFBLE1BQUEsRUFBTyxFQUFQO1lBQVUsSUFBQSxFQUFLLE1BQWY7WUFBc0IsR0FBQSxFQUFJLEdBQTFCO1NBQWI7UUFFUCxJQUFDLENBQUEsSUFBRCxHQUFVLEtBQUssQ0FBQyxNQUFOLENBQWEsR0FBYixFQUFrQixNQUFsQixFQUF5QjtZQUFBLEVBQUEsRUFBRyxDQUFIO1lBQUssRUFBQSxFQUFHLENBQUMsRUFBVDtZQUFZLENBQUEsS0FBQSxDQUFBLEVBQU0sTUFBbEI7U0FBekI7UUFDVixJQUFDLENBQUEsTUFBRCxHQUFVLEtBQUssQ0FBQyxNQUFOLENBQWEsR0FBYixFQUFrQixNQUFsQixFQUF5QjtZQUFBLEVBQUEsRUFBRyxDQUFIO1lBQUssRUFBQSxFQUFHLENBQUMsRUFBVDtZQUFZLENBQUEsS0FBQSxDQUFBLEVBQU0sUUFBbEI7U0FBekI7ZUFDVixJQUFDLENBQUEsTUFBRCxHQUFVLEtBQUssQ0FBQyxNQUFOLENBQWEsR0FBYixFQUFrQixNQUFsQixFQUF5QjtZQUFBLEVBQUEsRUFBRyxDQUFIO1lBQUssRUFBQSxFQUFHLENBQUMsRUFBVDtZQUFZLENBQUEsS0FBQSxDQUFBLEVBQU0sUUFBbEI7U0FBekI7SUFUTjs7OztHQXZCUTs7QUFrQ3BCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4gMDAwMDAwMCAgMDAwICAgICAgIDAwMDAwMDAgICAgMDAwMDAwMCAgMDAwICAgMDAwICBcbjAwMCAgICAgICAwMDAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgIDAwMCAgIFxuMDAwICAgICAgIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMDAwMDAgICAgXG4wMDAgICAgICAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAwMDAgICBcbiAwMDAwMDAwICAwMDAwMDAwICAgMDAwMDAwMCAgICAwMDAwMDAwICAwMDAgICAwMDAgIFxuIyMjXG5cbnsgcG9zdCB9ID0gcmVxdWlyZSAna3hrJ1xuXG5LYWNoZWwgID0gcmVxdWlyZSAnLi9rYWNoZWwnXG51dGlscyAgID0gcmVxdWlyZSAnLi91dGlscydcblxuY2xhc3MgQ2xvY2sgZXh0ZW5kcyBLYWNoZWxcbiAgICAgICAgXG4gICAgQDogKEBrYWNoZWxJZD0nY2xvY2snKSAtPiBcblxuICAgICAgICBzdXBlciBAa2FjaGVsSWRcbiAgICAgICAgXG4gICAgICAgIHBvc3Qub24gJ2Nsb2NrJyBAb25EYXRhXG4gICAgICAgIEBvbkxvYWQoKVxuICAgIFxuICAgIG9uRGF0YTogKGRhdGEpID0+IFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAaG91clxuICAgICAgICBcbiAgICAgICAgQGhvdXIgIC5zZXRBdHRyaWJ1dGUgJ3RyYW5zZm9ybScgXCJyb3RhdGUoI3szMCAqIGRhdGEuaG91ciArIGRhdGEubWludXRlIC8gMn0pXCJcbiAgICAgICAgQG1pbnV0ZS5zZXRBdHRyaWJ1dGUgJ3RyYW5zZm9ybScgXCJyb3RhdGUoI3s2ICogZGF0YS5taW51dGUgKyBkYXRhLnNlY29uZCAvIDEwfSlcIlxuICAgICAgICBAc2Vjb25kLnNldEF0dHJpYnV0ZSAndHJhbnNmb3JtJyBcInJvdGF0ZSgjezYgKiBkYXRhLnNlY29uZH0pXCJcbiAgICAgICAgXG4gICAgIyAwMDAgICAgICAgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMCAgICBcbiAgICAjIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIFxuICAgICMgMDAwICAgICAgMDAwICAgMDAwICAwMDAwMDAwMDAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAwMDAwICAgIFxuICAgIFxuICAgIG9uTG9hZDogLT5cbiAgICAgICAgXG4gICAgICAgIHN2ZyA9IHV0aWxzLnN2ZyBjbHNzOidjbG9jaydcbiAgICAgICAgQGRpdi5hcHBlbmRDaGlsZCBzdmdcbiAgICAgICAgXG4gICAgICAgIGZhY2UgPSB1dGlscy5jaXJjbGUgcmFkaXVzOjQ1IGNsc3M6J2ZhY2UnIHN2ZzpzdmdcbiAgICAgICAgXG4gICAgICAgIEBob3VyICAgPSB1dGlscy5hcHBlbmQgc3ZnLCAnbGluZScgeTE6MCB5MjotMzIgY2xhc3M6J2hvdXInIFxuICAgICAgICBAbWludXRlID0gdXRpbHMuYXBwZW5kIHN2ZywgJ2xpbmUnIHkxOjAgeTI6LTQyIGNsYXNzOidtaW51dGUnXG4gICAgICAgIEBzZWNvbmQgPSB1dGlscy5hcHBlbmQgc3ZnLCAnbGluZScgeTE6MCB5MjotNDIgY2xhc3M6J3NlY29uZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbm1vZHVsZS5leHBvcnRzID0gQ2xvY2tcbiJdfQ==
//# sourceURL=../coffee/clock.coffee