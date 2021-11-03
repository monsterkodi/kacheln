// koffee 1.14.0

/*
0000000     0000000   000000000   0000000 
000   000  000   000     000     000   000
000   000  000000000     000     000000000
000   000  000   000     000     000   000
0000000    000   000     000     000   000
 */
var $, Apps, Clock, Data, Mouse, Sysinfo, Wins, _, childp, electron, empty, filter, kpos, last, os, post, ref, slash, udp, win, wxw,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ref = require('kxk'), $ = ref.$, _ = ref._, childp = ref.childp, empty = ref.empty, filter = ref.filter, kpos = ref.kpos, last = ref.last, os = ref.os, post = ref.post, slash = ref.slash, udp = ref.udp, win = ref.win;

electron = require('electron');

wxw = require('wxw');

Data = (function() {
    function Data() {
        this.slowTick = bind(this.slowTick, this);
        this.onUDP = bind(this.onUDP, this);
        this.detach();
        this.providers = {
            sysinfo: new Sysinfo,
            clock: new Clock,
            wins: new Wins
        };
    }

    Data.prototype.start = function() {
        if (this.udp) {
            return;
        }
        this.udp = new udp({
            port: 65432,
            onMsg: this.onUDP
        });
        return setTimeout(this.slowTick, 1000);
    };

    Data.prototype.detach = function() {
        if (os.platform() === 'win32') {
            return wxw('kill', 'wc.exe');
        }
    };

    Data.prototype.onUDP = function(msg) {
        var ref1, ref2, ref3;
        switch (msg.event) {
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mousewheel':
                return (ref1 = this.providers.mouse) != null ? ref1.onEvent(msg) : void 0;
            case 'proc':
                return (ref2 = this.providers.apps) != null ? ref2.onEvent(msg) : void 0;
            case 'info':
                return (ref3 = this.providers.wins) != null ? ref3.onEvent(msg) : void 0;
        }
    };

    Data.prototype.slowTick = function() {
        var name, provider, ref1;
        ref1 = this.providers;
        for (name in ref1) {
            provider = ref1[name];
            if (provider.tick === 'slow') {
                provider.onTick(this);
            }
        }
        return setTimeout(this.slowTick, 1000 - (new Date).getMilliseconds());
    };

    return Data;

})();

Clock = (function() {
    function Clock(name1, tick) {
        this.name = name1 != null ? name1 : 'clock';
        this.tick = tick != null ? tick : 'slow';
        this.onTick = bind(this.onTick, this);
    }

    Clock.prototype.onTick = function(data) {
        var hours, minutes, seconds, time;
        time = new Date();
        hours = time.getHours();
        minutes = time.getMinutes();
        seconds = time.getSeconds();
        return post.emit('clock', {
            hour: hours,
            minute: minutes,
            second: seconds
        });
    };

    return Clock;

})();

Sysinfo = (function() {
    function Sysinfo(name1) {
        var fork;
        this.name = name1 != null ? name1 : 'sysinfo';
        this.onMessage = bind(this.onMessage, this);
        fork = childp.fork(__dirname + "/memnet");
        fork.on('message', this.onMessage);
    }

    Sysinfo.prototype.onMessage = function(m) {
        return post.emit('sysinfo', JSON.parse(m));
    };

    return Sysinfo;

})();

Mouse = (function() {
    function Mouse(name1) {
        this.name = name1 != null ? name1 : 'mouse';
        this.onEvent = bind(this.onEvent, this);
        this.last = Date.now();
        this.interval = parseInt(1000 / 60);
        this.lastEvent = null;
        this.sendTimer = null;
    }

    Mouse.prototype.onEvent = function(event) {
        var now, pos;
        this.lastEvent = event;
        now = Date.now();
        clearTimeout(this.sendTimer);
        this.sendTimer = null;
        if (now - this.last > this.interval) {
            this.last = now;
            pos = kpos(event);
            if (os.platform() === 'win32') {
                pos = kpos(electron.screen.screenToDipPoint(pos)).rounded();
            }
            event.x = pos.x;
            event.y = pos.y;
            return post.emit('mouse', event);
        } else {
            return this.sendTimer = setTimeout(((function(_this) {
                return function() {
                    return _this.onEvent(_this.lastEvent);
                };
            })(this)), this.interval);
        }
    };

    return Mouse;

})();

Apps = (function() {
    function Apps(name1) {
        this.name = name1 != null ? name1 : 'apps';
        this.onEvent = bind(this.onEvent, this);
        this.lastApps = null;
    }

    Apps.prototype.onEvent = function(event) {
        var apps;
        apps = Array.from(new Set(event.proc.map(function(p) {
            return p.path;
        })));
        if (empty(last(apps))) {
            apps.pop();
        }
        if (os.platform() === 'win32') {
            apps = apps.filter(function(p) {
                var ref1, s;
                s = slash.path(slash.removeDrive(p));
                if (s.startsWith('/Windows/System32')) {
                    return (ref1 = slash.base(s)) === 'cmd' || ref1 === 'powershell';
                }
                return true;
            });
        }
        apps.sort();
        if (!_.isEqual(apps, this.lastApps)) {
            return this.lastApps = apps;
        }
    };

    return Apps;

})();

Wins = (function() {
    function Wins(name1, tick) {
        this.name = name1 != null ? name1 : 'wins';
        this.tick = tick != null ? tick : 'slow';
        this.onEvent = bind(this.onEvent, this);
        this.lastWins = null;
    }

    Wins.prototype.onTick = function() {
        var getProcessList;
        if (!slash.win()) {
            getProcessList = require('macos-native-processlist').getProcessList;
            return getProcessList().then((function(_this) {
                return function(procs) {
                    var j, k, l, len, len1, p, ref1, results;
                    procs = filter(procs, function(p) {
                        var ref1;
                        if (0 > p.path.indexOf('.app/Contents/MacOS')) {
                            return false;
                        }
                        if (0 < p.name.indexOf(' Helper')) {
                            return false;
                        }
                        if ((ref1 = p.name) === 'plugin-container') {
                            return false;
                        }
                        if (p.path.startsWith('/System/Library/')) {
                            return false;
                        }
                        return true;
                    });
                    ref1 = _this.kacheln();
                    results = [];
                    for (j = 0, len = ref1.length; j < len; j++) {
                        k = ref1[j];
                        k.activated = false;
                        k.status = '';
                        for (l = 0, len1 = procs.length; l < len1; l++) {
                            p = procs[l];
                            if (p.path.split('/Contents/MacOS/')[0] === k.kachelId) {
                                k.activated = true;
                                k.status = 'normal';
                                break;
                            }
                        }
                        results.push(k.updateDot());
                    }
                    return results;
                };
            })(this));
        }
    };

    Wins.prototype.kacheln = function() {
        var i, j, kl, l, len, main, ref1, ref2, results;
        kl = [];
        main = $('#main');
        ref2 = (function() {
            results = [];
            for (var l = 0, ref1 = main.children.length; 0 <= ref1 ? l < ref1 : l > ref1; 0 <= ref1 ? l++ : l--){ results.push(l); }
            return results;
        }).apply(this);
        for (j = 0, len = ref2.length; j < len; j++) {
            i = ref2[j];
            if (main.children[i].kachel.updateDot) {
                kl.push(main.children[i].kachel);
            }
        }
        return kl;
    };

    Wins.prototype.onEvent = function(event) {
        var j, k, l, len, len1, ref1, results, wins;
        wins = event.info;
        if (os.platform() === 'darwin') {
            for (j = 0, len = wins.length; j < len; j++) {
                win = wins[j];
                if (win.index === 0) {
                    win.status += ' top';
                } else if (win.index < 0) {
                    win.status = 'minimized';
                }
            }
        }
        if (empty(last(wins))) {
            wins.pop();
        }
        if (!_.isEqual(wins, this.lastWins)) {
            this.lastWins = wins;
            ref1 = this.kacheln();
            results = [];
            for (l = 0, len1 = ref1.length; l < len1; l++) {
                k = ref1[l];
                results.push((function() {
                    var len2, n, results1;
                    results1 = [];
                    for (n = 0, len2 = wins.length; n < len2; n++) {
                        win = wins[n];
                        if (((k != null ? k.status : void 0) != null) && win.path === k.kachelId) {
                            k.activated = true;
                            k.status = win.status;
                            results1.push(k.updateDot());
                        } else {
                            results1.push(void 0);
                        }
                    }
                    return results1;
                })());
            }
            return results;
        }
    };

    return Wins;

})();

module.exports = Data;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImRhdGEuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBLCtIQUFBO0lBQUE7O0FBUUEsTUFBeUUsT0FBQSxDQUFRLEtBQVIsQ0FBekUsRUFBRSxTQUFGLEVBQUssU0FBTCxFQUFRLG1CQUFSLEVBQWdCLGlCQUFoQixFQUF1QixtQkFBdkIsRUFBK0IsZUFBL0IsRUFBcUMsZUFBckMsRUFBMkMsV0FBM0MsRUFBK0MsZUFBL0MsRUFBcUQsaUJBQXJELEVBQTRELGFBQTVELEVBQWlFOztBQUVqRSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsR0FBQSxHQUFXLE9BQUEsQ0FBUSxLQUFSOztBQUVMO0lBRUMsY0FBQTs7O1FBRUMsSUFBQyxDQUFBLE1BQUQsQ0FBQTtRQU1BLElBQUMsQ0FBQSxTQUFELEdBR0k7WUFBQSxPQUFBLEVBQVksSUFBSSxPQUFoQjtZQUNBLEtBQUEsRUFBWSxJQUFJLEtBRGhCO1lBRUEsSUFBQSxFQUFZLElBQUksSUFGaEI7O0lBWEw7O21CQWVILEtBQUEsR0FBTyxTQUFBO1FBRUgsSUFBVSxJQUFDLENBQUEsR0FBWDtBQUFBLG1CQUFBOztRQUVBLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBSSxHQUFKLENBQVE7WUFBQSxJQUFBLEVBQUssS0FBTDtZQUFXLEtBQUEsRUFBTSxJQUFDLENBQUEsS0FBbEI7U0FBUjtlQUNQLFVBQUEsQ0FBVyxJQUFDLENBQUEsUUFBWixFQUFzQixJQUF0QjtJQUxHOzttQkFPUCxNQUFBLEdBQVEsU0FBQTtRQUVKLElBQUcsRUFBRSxDQUFDLFFBQUgsQ0FBQSxDQUFBLEtBQWlCLE9BQXBCO21CQUNJLEdBQUEsQ0FBSSxNQUFKLEVBQVcsUUFBWCxFQURKOztJQUZJOzttQkFhUixLQUFBLEdBQU8sU0FBQyxHQUFEO0FBRUgsWUFBQTtBQUFBLGdCQUFPLEdBQUcsQ0FBQyxLQUFYO0FB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Ozt3QkFDSSxJQUFHLHlDQUFBLElBQWUsR0FBRyxDQUFDLElBQUosS0FBWSxDQUFDLENBQUMsUUFBaEM7NEJBRUksQ0FBQyxDQUFDLFNBQUYsR0FBYzs0QkFDZCxDQUFDLENBQUMsTUFBRixHQUFXLEdBQUcsQ0FBQzswQ0FDZixDQUFDLENBQUMsU0FBRixDQUFBLEdBSko7eUJBQUEsTUFBQTtrREFBQTs7QUFESjs7O0FBREo7MkJBSko7O0lBWks7Ozs7OztBQXdCYixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuMDAwMDAwMCAgICAgMDAwMDAwMCAgIDAwMDAwMDAwMCAgIDAwMDAwMDAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgICAwMDBcbjAwMCAgIDAwMCAgMDAwMDAwMDAwICAgICAwMDAgICAgIDAwMDAwMDAwMFxuMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAgMDAwXG4wMDAwMDAwICAgIDAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgICAwMDBcbiMjI1xuXG57ICQsIF8sIGNoaWxkcCwgZW1wdHksIGZpbHRlciwga3BvcywgbGFzdCwgb3MsIHBvc3QsIHNsYXNoLCB1ZHAsIHdpbiB9ID0gcmVxdWlyZSAna3hrJ1xuXG5lbGVjdHJvbiA9IHJlcXVpcmUgJ2VsZWN0cm9uJ1xud3h3ICAgICAgPSByZXF1aXJlICd3eHcnXG5cbmNsYXNzIERhdGFcblxuICAgIEA6IC0+XG4gICAgICAgIFxuICAgICAgICBAZGV0YWNoKClcbiAgICAgICAgXG4gICAgICAgICMgIEBob29rUHJvYyAgPSB3eHcgJ2hvb2snICdwcm9jJ1xuICAgICAgICAjICBAaG9va0luZm8gID0gd3h3ICdob29rJyAnaW5mbydcbiAgICAgICAgIyAgQGhvb2tJbnB1dCA9IHd4dyAnaG9vaycgJ2lucHV0J1xuICAgICAgICAgICAgXG4gICAgICAgIEBwcm92aWRlcnMgPSBcbiAgICAgICAgICAgICMgbW91c2U6ICAgICAgbmV3IE1vdXNlXG4gICAgICAgICAgICAjIGFwcHM6ICAgICAgIG5ldyBBcHBzXG4gICAgICAgICAgICBzeXNpbmZvOiAgICBuZXcgU3lzaW5mb1xuICAgICAgICAgICAgY2xvY2s6ICAgICAgbmV3IENsb2NrIFxuICAgICAgICAgICAgd2luczogICAgICAgbmV3IFdpbnNcbiAgICAgICAgXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWYgQHVkcFxuXG4gICAgICAgIEB1ZHAgPSBuZXcgdWRwIHBvcnQ6NjU0MzIgb25Nc2c6QG9uVURQXG4gICAgICAgIHNldFRpbWVvdXQgQHNsb3dUaWNrLCAxMDAwXG4gICAgICAgIFxuICAgIGRldGFjaDogLT5cbiAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgd3h3ICdraWxsJyAnd2MuZXhlJ1xuICAgICAgICAjIGVsc2VcbiAgICAgICAgICAgICMgd3h3ICdraWxsJyAnbWMnXG4gICAgICAgICAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwMDAwMCAgICAwMDAwMDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgIFxuICAgICMgIDAwMDAwMDAgICAwMDAwMDAwICAgIDAwMCAgICAgICAgXG4gICAgXG4gICAgb25VRFA6IChtc2cpID0+IFxuICAgICAgICBcbiAgICAgICAgc3dpdGNoIG1zZy5ldmVudFxuICAgICAgICAgICAgd2hlbiAnbW91c2Vkb3duJyAnbW91c2Vtb3ZlJyAnbW91c2V1cCcgJ21vdXNld2hlZWwnIHRoZW4gQHByb3ZpZGVycy5tb3VzZT8ub25FdmVudCBtc2dcbiAgICAgICAgICAgIHdoZW4gJ3Byb2MnIHRoZW4gQHByb3ZpZGVycy5hcHBzPy5vbkV2ZW50IG1zZ1xuICAgICAgICAgICAgd2hlbiAnaW5mbycgdGhlbiBAcHJvdmlkZXJzLndpbnM/Lm9uRXZlbnQgbXNnXG4gICAgICAgICAgICAjIGVsc2UgbG9nIG1zZ1xuICAgICAgICBcbiAgICBzbG93VGljazogPT5cbiAgICAgICAgXG4gICAgICAgIGZvciBuYW1lLHByb3ZpZGVyIG9mIEBwcm92aWRlcnNcbiAgICAgICAgICAgIGlmIHByb3ZpZGVyLnRpY2sgPT0gJ3Nsb3cnXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIub25UaWNrIEBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCBAc2xvd1RpY2ssIDEwMDAgLSAobmV3IERhdGUpLmdldE1pbGxpc2Vjb25kcygpXG4gICAgICAgIFxuIyAgMDAwMDAwMCAgMDAwICAgICAgIDAwMDAwMDAgICAgMDAwMDAwMCAgMDAwICAgMDAwICBcbiMgMDAwICAgICAgIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgMDAwICAgXG4jIDAwMCAgICAgICAwMDAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAwMDAwICAgIFxuIyAwMDAgICAgICAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAwMDAgICBcbiMgIDAwMDAwMDAgIDAwMDAwMDAgICAwMDAwMDAwICAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgXG5cbmNsYXNzIENsb2NrXG4gICAgICAgIFxuICAgIEA6IChAbmFtZT0nY2xvY2snIEB0aWNrPSdzbG93JykgLT4gXG4gICAgICAgIFxuICAgIG9uVGljazogKGRhdGEpID0+XG5cbiAgICAgICAgdGltZSA9IG5ldyBEYXRlKClcbiAgICAgICAgXG4gICAgICAgIGhvdXJzICAgPSB0aW1lLmdldEhvdXJzKClcbiAgICAgICAgbWludXRlcyA9IHRpbWUuZ2V0TWludXRlcygpXG4gICAgICAgIHNlY29uZHMgPSB0aW1lLmdldFNlY29uZHMoKVxuICAgICAgICBcbiAgICAgICAgcG9zdC5lbWl0ICdjbG9jaycsXG4gICAgICAgICAgICBob3VyOiAgIGhvdXJzXG4gICAgICAgICAgICBtaW51dGU6IG1pbnV0ZXNcbiAgICAgICAgICAgIHNlY29uZDogc2Vjb25kc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIyAgMDAwMDAwMCAgMDAwICAgMDAwICAgMDAwMDAwMCAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMCAgIFxuIyAwMDAgICAgICAgIDAwMCAwMDAgICAwMDAgICAgICAgMDAwICAwMDAwICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIFxuIyAwMDAwMDAwICAgICAwMDAwMCAgICAwMDAwMDAwICAgMDAwICAwMDAgMCAwMDAgIDAwMDAwMCAgICAwMDAgICAwMDAgIFxuIyAgICAgIDAwMCAgICAgMDAwICAgICAgICAgIDAwMCAgMDAwICAwMDAgIDAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIFxuIyAwMDAwMDAwICAgICAgMDAwICAgICAwMDAwMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwMDAwMCAgIFxuXG5jbGFzcyBTeXNpbmZvXG4gICAgICAgIFxuICAgIEA6IChAbmFtZT0nc3lzaW5mbycpIC0+XG4gICAgICAgIFxuICAgICAgICBmb3JrID0gY2hpbGRwLmZvcmsgXCIje19fZGlybmFtZX0vbWVtbmV0XCJcbiAgICAgICAgZm9yay5vbiAnbWVzc2FnZScgQG9uTWVzc2FnZVxuICAgICAgICBcbiAgICBvbk1lc3NhZ2U6IChtKSA9PiBcbiAgICAgICAgXG4gICAgICAgIHBvc3QuZW1pdCAnc3lzaW5mbycgSlNPTi5wYXJzZSBtXG4gICAgICAgIFxuICAgICMgb25UaWNrOiAoZGF0YSkgPT4gIyBpZiBAZGF0YSB0aGVuIHBvc3QuZW1pdCAnc3lzaW5mbycgQGRhdGFcbiAgICAgICAgXG4jIDAwICAgICAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgICAwMDAwMDAwICAwMDAwMDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAgICAgXG4jIDAwMDAwMDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICAwMDAwMDAwICAgXG4jIDAwMCAwIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgICAgICAgMDAwICAwMDAgICAgICAgXG4jIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgXG5cbmNsYXNzIE1vdXNlXG4gICAgXG4gICAgQDogKEBuYW1lPSdtb3VzZScpIC0+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIEBsYXN0ID0gRGF0ZS5ub3coKVxuICAgICAgICBAaW50ZXJ2YWwgPSBwYXJzZUludCAxMDAwLzYwXG4gICAgICAgIEBsYXN0RXZlbnQgPSBudWxsXG4gICAgICAgIEBzZW5kVGltZXIgPSBudWxsXG4gICAgICAgIFxuICAgIG9uRXZlbnQ6IChldmVudCkgPT5cblxuICAgICAgICBAbGFzdEV2ZW50ID0gZXZlbnRcbiAgICAgICAgbm93ID0gRGF0ZS5ub3coKVxuICAgICAgICBjbGVhclRpbWVvdXQgQHNlbmRUaW1lclxuICAgICAgICBAc2VuZFRpbWVyID0gbnVsbFxuICAgICAgICBcbiAgICAgICAgaWYgbm93IC0gQGxhc3QgPiBAaW50ZXJ2YWxcbiAgICAgICAgICAgIEBsYXN0ID0gbm93XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBvcyA9IGtwb3MgZXZlbnRcbiAgICAgICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgICAgIHBvcyA9IGtwb3MoZWxlY3Ryb24uc2NyZWVuLnNjcmVlblRvRGlwUG9pbnQgcG9zKS5yb3VuZGVkKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZXZlbnQueCA9IHBvcy54XG4gICAgICAgICAgICBldmVudC55ID0gcG9zLnlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyBrbG9nICdtb3VzZScgZXZlbnQueCwgZXZlbnQueVxuICAgICAgICBcbiAgICAgICAgICAgIHBvc3QuZW1pdCAnbW91c2UnIGV2ZW50XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBzZW5kVGltZXIgPSBzZXRUaW1lb3V0ICg9PiBAb25FdmVudCBAbGFzdEV2ZW50KSwgQGludGVydmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwMCAgICAwMDAwMDAwICBcbiMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIFxuIyAwMDAwMDAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwICAgXG4jIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgICAgICAgMDAwICBcbiMgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAgMDAwMDAwMCAgIFxuXG5jbGFzcyBBcHBzXG4gICAgXG4gICAgQDogKEBuYW1lPSdhcHBzJykgLT5cbiAgICAgICAgXG4gICAgICAgIEBsYXN0QXBwcyA9IG51bGwgICAgICAgIFxuICAgICAgICBcbiAgICBvbkV2ZW50OiAoZXZlbnQpID0+XG4gICAgICAgIFxuICAgICAgICBhcHBzID0gQXJyYXkuZnJvbSBuZXcgU2V0IGV2ZW50LnByb2MubWFwIChwKSAtPiBwLnBhdGhcbiAgICAgICAgXG4gICAgICAgIGFwcHMucG9wKCkgaWYgZW1wdHkgbGFzdCBhcHBzXG4gICAgICAgIFxuICAgICAgICBpZiBvcy5wbGF0Zm9ybSgpID09ICd3aW4zMidcbiAgICAgICAgICAgIGFwcHMgPSBhcHBzLmZpbHRlciAocCkgLT4gXG4gICAgICAgICAgICAgICAgcyA9IHNsYXNoLnBhdGggc2xhc2gucmVtb3ZlRHJpdmUgcCBcbiAgICAgICAgICAgICAgICBpZiBzLnN0YXJ0c1dpdGggJy9XaW5kb3dzL1N5c3RlbTMyJ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2xhc2guYmFzZShzKSBpbiBbJ2NtZCcgJ3Bvd2Vyc2hlbGwnXVxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIGFwcHMuc29ydCgpXG4gICAgICAgIGlmIG5vdCBfLmlzRXF1YWwgYXBwcywgQGxhc3RBcHBzXG4gICAgICAgICAgICAjIGtsb2cgJ2FwcHMnIGFwcHNcbiAgICAgICAgICAgIEBsYXN0QXBwcyA9IGFwcHNcbiAgICAgICAgXG4jIDAwMCAgIDAwMCAgMDAwICAwMDAgICAwMDAgICAwMDAwMDAwICBcbiMgMDAwIDAgMDAwICAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAgIFxuIyAwMDAwMDAwMDAgIDAwMCAgMDAwIDAgMDAwICAwMDAwMDAwICAgXG4jIDAwMCAgIDAwMCAgMDAwICAwMDAgIDAwMDAgICAgICAgMDAwICBcbiMgMDAgICAgIDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgIFxuXG5jbGFzcyBXaW5zXG4gICAgXG4gICAgQDogKEBuYW1lPSd3aW5zJyBAdGljaz0nc2xvdycpIC0+XG4gICAgICAgIFxuICAgICAgICBAbGFzdFdpbnMgPSBudWxsXG4gICAgICAgIFxuICAgIG9uVGljazogLT5cbiAgICAgICAgXG4gICAgICAgIGlmIG5vdCBzbGFzaC53aW4oKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7IGdldFByb2Nlc3NMaXN0IH0gPSByZXF1aXJlICdtYWNvcy1uYXRpdmUtcHJvY2Vzc2xpc3QnXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdldFByb2Nlc3NMaXN0KCkudGhlbiAocHJvY3MpID0+IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHByb2NzID0gZmlsdGVyIHByb2NzLCAocCkgLT4gXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZSBpZiAwID4gcC5wYXRoLmluZGV4T2YoJy5hcHAvQ29udGVudHMvTWFjT1MnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgaWYgMCA8IHAubmFtZS5pbmRleE9mICcgSGVscGVyJ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgaWYgcC5uYW1lIGluIFsncGx1Z2luLWNvbnRhaW5lciddXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZSBpZiBwLnBhdGguc3RhcnRzV2l0aCAnL1N5c3RlbS9MaWJyYXJ5LydcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAjIGtsb2cgJ3Byb2NzJyAoIHAucGF0aCBmb3IgcCBpbiBwcm9jcyApIFxuICAgICAgICAgICAgICAgICMga2xvZyAna2FjaGVsbicgQGthY2hlbG4oKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIGsgaW4gQGthY2hlbG4oKVxuICAgICAgICAgICAgICAgICAgICBrLmFjdGl2YXRlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGsuc3RhdHVzID0gJydcbiAgICAgICAgICAgICAgICAgICAgZm9yIHAgaW4gcHJvY3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHAucGF0aC5zcGxpdCgnL0NvbnRlbnRzL01hY09TLycpWzBdID09IGsua2FjaGVsSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrLmFjdGl2YXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrLnN0YXR1cyA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgIyBrbG9nICdhY3RpdmF0ZWQnIGsuYWN0aXZhdGVkLCBrLmthY2hlbElkXG4gICAgICAgICAgICAgICAgICAgIGsudXBkYXRlRG90KCkgICAgICAgICAgICAgICAgICAgIFxuXG4gICAga2FjaGVsbjogLT5cbiAgICAgICAgXG4gICAgICAgIGtsID0gW11cbiAgICAgICAgbWFpbiA9JCAnI21haW4nXG4gICAgICAgIGZvciBpIGluIDAuLi5tYWluLmNoaWxkcmVuLmxlbmd0aFxuICAgICAgICAgICAgaWYgbWFpbi5jaGlsZHJlbltpXS5rYWNoZWwudXBkYXRlRG90XG4gICAgICAgICAgICAgICAga2wucHVzaCBtYWluLmNoaWxkcmVuW2ldLmthY2hlbFxuICAgICAgICBrbFxuICAgICAgICBcbiAgICBvbkV2ZW50OiAoZXZlbnQpID0+XG4gICAgICAgIFxuICAgICAgICB3aW5zID0gZXZlbnQuaW5mb1xuICAgICAgICBcbiAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnZGFyd2luJ1xuICAgICAgICAgICAgZm9yIHdpbiBpbiB3aW5zXG4gICAgICAgICAgICAgICAgaWYgd2luLmluZGV4ID09IDBcbiAgICAgICAgICAgICAgICAgICAgd2luLnN0YXR1cyArPSAnIHRvcCdcbiAgICAgICAgICAgICAgICBlbHNlIGlmIHdpbi5pbmRleCA8IDBcbiAgICAgICAgICAgICAgICAgICAgd2luLnN0YXR1cyA9ICdtaW5pbWl6ZWQnXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB3aW5zLnBvcCgpIGlmIGVtcHR5IGxhc3Qgd2luc1xuICAgICAgICBpZiBub3QgXy5pc0VxdWFsIHdpbnMsIEBsYXN0V2luc1xuICAgICAgICAgICAgIyBrbG9nIHdpbnNcbiAgICAgICAgICAgIEBsYXN0V2lucyA9IHdpbnNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIGsgaW4gQGthY2hlbG4oKVxuICAgICAgICAgICAgICAgIGZvciB3aW4gaW4gd2luc1xuICAgICAgICAgICAgICAgICAgICBpZiBrPy5zdGF0dXM/IGFuZCB3aW4ucGF0aCA9PSBrLmthY2hlbElkXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGtsb2cgXCIje2sua2FjaGVsSWR9ICN7d2luLnN0YXR1c31cIlxuICAgICAgICAgICAgICAgICAgICAgICAgay5hY3RpdmF0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBrLnN0YXR1cyA9IHdpbi5zdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGsudXBkYXRlRG90KClcbiAgICBcbm1vZHVsZS5leHBvcnRzID0gRGF0YVxuXG4iXX0=
//# sourceURL=../coffee/data.coffee