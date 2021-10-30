// koffee 1.14.0

/*
0000000     0000000   000000000   0000000 
000   000  000   000     000     000   000
000   000  000000000     000     000000000
000   000  000   000     000     000   000
0000000    000   000     000     000   000
 */
var $, Apps, Clock, Data, Mouse, Sysinfo, Wins, _, childp, electron, empty, klog, kpos, last, os, post, ref, slash, udp, win, wxw,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ref = require('kxk'), $ = ref.$, _ = ref._, childp = ref.childp, empty = ref.empty, klog = ref.klog, kpos = ref.kpos, last = ref.last, os = ref.os, post = ref.post, slash = ref.slash, udp = ref.udp, win = ref.win;

electron = require('electron');

wxw = require('wxw');

Data = (function() {
    function Data() {
        this.slowTick = bind(this.slowTick, this);
        this.onUDP = bind(this.onUDP, this);
        this.detach();
        this.hookInfo = wxw('hook', 'info');
        this.providers = {
            wins: new Wins,
            clock: new Clock,
            sysinfo: new Sysinfo
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
        } else {
            return wxw('kill', 'mc');
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
    function Sysinfo(name1, tick) {
        var fork;
        this.name = name1 != null ? name1 : 'sysinfo';
        this.tick = tick != null ? tick : 'slow';
        this.onTick = bind(this.onTick, this);
        this.onMessage = bind(this.onMessage, this);
        fork = childp.fork(__dirname + "/memnet");
        fork.on('message', this.onMessage);
    }

    Sysinfo.prototype.onMessage = function(m) {
        this.data = JSON.parse(m);
        return post.emit('sysinfo', this.data);
    };

    Sysinfo.prototype.onTick = function(data) {};

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
            klog('apps', apps);
            return this.lastApps = apps;
        }
    };

    return Apps;

})();

Wins = (function() {
    function Wins(name1) {
        this.name = name1 != null ? name1 : 'wins';
        this.onEvent = bind(this.onEvent, this);
        this.lastWins = null;
    }

    Wins.prototype.kacheln = function() {
        var i, j, kl, l, len, ref1, ref2, results;
        kl = [];
        ref2 = (function() {
            results = [];
            for (var l = 0, ref1 = $('#main').children.length; 0 <= ref1 ? l < ref1 : l > ref1; 0 <= ref1 ? l++ : l--){ results.push(l); }
            return results;
        }).apply(this);
        for (j = 0, len = ref2.length; j < len; j++) {
            i = ref2[j];
            kl.push($('#main').children[i].kachel);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImRhdGEuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBLDZIQUFBO0lBQUE7O0FBUUEsTUFBdUUsT0FBQSxDQUFRLEtBQVIsQ0FBdkUsRUFBRSxTQUFGLEVBQUssU0FBTCxFQUFRLG1CQUFSLEVBQWdCLGlCQUFoQixFQUF1QixlQUF2QixFQUE2QixlQUE3QixFQUFtQyxlQUFuQyxFQUF5QyxXQUF6QyxFQUE2QyxlQUE3QyxFQUFtRCxpQkFBbkQsRUFBMEQsYUFBMUQsRUFBK0Q7O0FBRS9ELFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxHQUFBLEdBQVcsT0FBQSxDQUFRLEtBQVI7O0FBRUw7SUFFQyxjQUFBOzs7UUFFQyxJQUFDLENBQUEsTUFBRCxDQUFBO1FBR0EsSUFBQyxDQUFBLFFBQUQsR0FBYSxHQUFBLENBQUksTUFBSixFQUFXLE1BQVg7UUFHYixJQUFDLENBQUEsU0FBRCxHQUdJO1lBQUEsSUFBQSxFQUFZLElBQUksSUFBaEI7WUFDQSxLQUFBLEVBQVksSUFBSSxLQURoQjtZQUVBLE9BQUEsRUFBWSxJQUFJLE9BRmhCOztJQVhMOzttQkFlSCxLQUFBLEdBQU8sU0FBQTtRQUVILElBQVUsSUFBQyxDQUFBLEdBQVg7QUFBQSxtQkFBQTs7UUFFQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBQUksR0FBSixDQUFRO1lBQUEsSUFBQSxFQUFLLEtBQUw7WUFBVyxLQUFBLEVBQU0sSUFBQyxDQUFBLEtBQWxCO1NBQVI7ZUFDUCxVQUFBLENBQVcsSUFBQyxDQUFBLFFBQVosRUFBc0IsSUFBdEI7SUFMRzs7bUJBT1AsTUFBQSxHQUFRLFNBQUE7UUFFSixJQUFHLEVBQUUsQ0FBQyxRQUFILENBQUEsQ0FBQSxLQUFpQixPQUFwQjttQkFDSSxHQUFBLENBQUksTUFBSixFQUFXLFFBQVgsRUFESjtTQUFBLE1BQUE7bUJBR0ksR0FBQSxD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SUFBRyxDQUFJLENBQUMsQ0FBQyxPQUFGLENBQVUsSUFBVixFQUFnQixJQUFDLENBQUEsUUFBakIsQ0FBUDtZQUVJLElBQUMsQ0FBQSxRQUFELEdBQVk7QUFFWjtBQUFBO2lCQUFBLHdDQUFBOzs7O0FBQ0k7eUJBQUEsd0NBQUE7O3dCQUNJLElBQUcseUNBQUEsSUFBZSxHQUFHLENBQUMsSUFBSixLQUFZLENBQUMsQ0FBQyxRQUFoQzs0QkFFSSxDQUFDLENBQUMsU0FBRixHQUFjOzRCQUNkLENBQUMsQ0FBQyxNQUFGLEdBQVcsR0FBRyxDQUFDOzBDQUNmLENBQUMsQ0FBQyxTQUFGLENBQUEsR0FKSjt5QkFBQSxNQUFBO2tEQUFBOztBQURKOzs7QUFESjsyQkFKSjs7SUFaSzs7Ozs7O0FBd0JiLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAwMDAwICAgICAwMDAwMDAwICAgMDAwMDAwMDAwICAgMDAwMDAwMCBcbjAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMFxuMDAwICAgMDAwICAwMDAwMDAwMDAgICAgIDAwMCAgICAgMDAwMDAwMDAwXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgICAwMDBcbjAwMDAwMDAgICAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgIDAwMFxuIyMjXG5cbnsgJCwgXywgY2hpbGRwLCBlbXB0eSwga2xvZywga3BvcywgbGFzdCwgb3MsIHBvc3QsIHNsYXNoLCB1ZHAsIHdpbiB9ID0gcmVxdWlyZSAna3hrJ1xuXG5lbGVjdHJvbiA9IHJlcXVpcmUgJ2VsZWN0cm9uJ1xud3h3ICAgICAgPSByZXF1aXJlICd3eHcnXG5cbmNsYXNzIERhdGFcblxuICAgIEA6IC0+XG4gICAgICAgIFxuICAgICAgICBAZGV0YWNoKClcbiAgICAgICAgXG4gICAgICAgICMgIEBob29rUHJvYyAgPSB3eHcgJ2hvb2snICdwcm9jJ1xuICAgICAgICBAaG9va0luZm8gID0gd3h3ICdob29rJyAnaW5mbydcbiAgICAgICAgIyAgQGhvb2tJbnB1dCA9IHd4dyAnaG9vaycgJ2lucHV0J1xuICAgICAgICAgICAgXG4gICAgICAgIEBwcm92aWRlcnMgPSBcbiAgICAgICAgICAgICMgbW91c2U6ICAgICAgbmV3IE1vdXNlXG4gICAgICAgICAgICAjIGFwcHM6ICAgICAgIG5ldyBBcHBzXG4gICAgICAgICAgICB3aW5zOiAgICAgICBuZXcgV2luc1xuICAgICAgICAgICAgY2xvY2s6ICAgICAgbmV3IENsb2NrIFxuICAgICAgICAgICAgc3lzaW5mbzogICAgbmV3IFN5c2luZm9cbiAgICAgICAgXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWYgQHVkcFxuXG4gICAgICAgIEB1ZHAgPSBuZXcgdWRwIHBvcnQ6NjU0MzIgb25Nc2c6QG9uVURQXG4gICAgICAgIHNldFRpbWVvdXQgQHNsb3dUaWNrLCAxMDAwXG4gICAgICAgIFxuICAgIGRldGFjaDogLT5cbiAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgd3h3ICdraWxsJyAnd2MuZXhlJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3eHcgJ2tpbGwnICdtYydcbiAgICAgICAgICAgIFxuICAgICMgMDAwICAgMDAwICAwMDAwMDAwICAgIDAwMDAwMDAwICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAwMDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgXG4gICAgIyAgMDAwMDAwMCAgIDAwMDAwMDAgICAgMDAwICAgICAgICBcbiAgICBcbiAgICBvblVEUDogKG1zZykgPT4gXG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggbXNnLmV2ZW50XG4gICAgICAgICAgICB3aGVuICdtb3VzZWRvd24nICdtb3VzZW1vdmUnICdtb3VzZXVwJyAnbW91c2V3aGVlbCcgdGhlbiBAcHJvdmlkZXJzLm1vdXNlPy5vbkV2ZW50IG1zZ1xuICAgICAgICAgICAgd2hlbiAncHJvYycgdGhlbiBAcHJvdmlkZXJzLmFwcHM/Lm9uRXZlbnQgbXNnXG4gICAgICAgICAgICB3aGVuICdpbmZvJyB0aGVuIEBwcm92aWRlcnMud2lucz8ub25FdmVudCBtc2dcbiAgICAgICAgICAgICMgZWxzZSBsb2cgbXNnXG4gICAgICAgIFxuICAgIHNsb3dUaWNrOiA9PlxuICAgICAgICBcbiAgICAgICAgZm9yIG5hbWUscHJvdmlkZXIgb2YgQHByb3ZpZGVyc1xuICAgICAgICAgICAgaWYgcHJvdmlkZXIudGljayA9PSAnc2xvdydcbiAgICAgICAgICAgICAgICBwcm92aWRlci5vblRpY2sgQFxuICAgICAgICAgICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0IEBzbG93VGljaywgMTAwMCAtIChuZXcgRGF0ZSkuZ2V0TWlsbGlzZWNvbmRzKClcbiAgICAgICAgXG4jICAwMDAwMDAwICAwMDAgICAgICAgMDAwMDAwMCAgICAwMDAwMDAwICAwMDAgICAwMDAgIFxuIyAwMDAgICAgICAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAwMDAgICBcbiMgMDAwICAgICAgIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMDAwMDAgICAgXG4jIDAwMCAgICAgICAwMDAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgIDAwMCAgIFxuIyAgMDAwMDAwMCAgMDAwMDAwMCAgIDAwMDAwMDAgICAgMDAwMDAwMCAgMDAwICAgMDAwICBcblxuY2xhc3MgQ2xvY2tcbiAgICAgICAgXG4gICAgQDogKEBuYW1lPSdjbG9jaycgQHRpY2s9J3Nsb3cnKSAtPiBcbiAgICAgICAgXG4gICAgb25UaWNrOiAoZGF0YSkgPT5cblxuICAgICAgICB0aW1lID0gbmV3IERhdGUoKVxuICAgICAgICBcbiAgICAgICAgaG91cnMgICA9IHRpbWUuZ2V0SG91cnMoKVxuICAgICAgICBtaW51dGVzID0gdGltZS5nZXRNaW51dGVzKClcbiAgICAgICAgc2Vjb25kcyA9IHRpbWUuZ2V0U2Vjb25kcygpXG4gICAgICAgIFxuICAgICAgICBwb3N0LmVtaXQgJ2Nsb2NrJyxcbiAgICAgICAgICAgIGhvdXI6ICAgaG91cnNcbiAgICAgICAgICAgIG1pbnV0ZTogbWludXRlc1xuICAgICAgICAgICAgc2Vjb25kOiBzZWNvbmRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICAwMDAwMDAwICAwMDAgICAwMDAgICAwMDAwMDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAgXG4jIDAwMCAgICAgICAgMDAwIDAwMCAgIDAwMCAgICAgICAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgXG4jIDAwMDAwMDAgICAgIDAwMDAwICAgIDAwMDAwMDAgICAwMDAgIDAwMCAwIDAwMCAgMDAwMDAwICAgIDAwMCAgIDAwMCAgXG4jICAgICAgMDAwICAgICAwMDAgICAgICAgICAgMDAwICAwMDAgIDAwMCAgMDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgXG4jIDAwMDAwMDAgICAgICAwMDAgICAgIDAwMDAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAwMDAwICAgXG5cbmNsYXNzIFN5c2luZm9cbiAgICAgICAgXG4gICAgQDogKEBuYW1lPSdzeXNpbmZvJyBAdGljaz0nc2xvdycpIC0+XG4gICAgICAgIFxuICAgICAgICBmb3JrID0gY2hpbGRwLmZvcmsgXCIje19fZGlybmFtZX0vbWVtbmV0XCJcbiAgICAgICAgZm9yay5vbiAnbWVzc2FnZScgQG9uTWVzc2FnZVxuICAgICAgICBcbiAgICBvbk1lc3NhZ2U6IChtKSA9PiBcbiAgICAgICAgXG4gICAgICAgIEBkYXRhID0gSlNPTi5wYXJzZSBtXG4gICAgICAgIHBvc3QuZW1pdCAnc3lzaW5mbycgQGRhdGFcbiAgICAgICAgXG4gICAgb25UaWNrOiAoZGF0YSkgPT4gIyBpZiBAZGF0YSB0aGVuIHBvc3QuZW1pdCAnc3lzaW5mbycgQGRhdGFcbiAgICAgICAgXG4jIDAwICAgICAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgICAwMDAwMDAwICAwMDAwMDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAgICAgXG4jIDAwMDAwMDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICAwMDAwMDAwICAgXG4jIDAwMCAwIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgICAgICAgMDAwICAwMDAgICAgICAgXG4jIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgXG5cbmNsYXNzIE1vdXNlXG4gICAgXG4gICAgQDogKEBuYW1lPSdtb3VzZScpIC0+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIEBsYXN0ID0gRGF0ZS5ub3coKVxuICAgICAgICBAaW50ZXJ2YWwgPSBwYXJzZUludCAxMDAwLzYwXG4gICAgICAgIEBsYXN0RXZlbnQgPSBudWxsXG4gICAgICAgIEBzZW5kVGltZXIgPSBudWxsXG4gICAgICAgIFxuICAgIG9uRXZlbnQ6IChldmVudCkgPT5cblxuICAgICAgICBAbGFzdEV2ZW50ID0gZXZlbnRcbiAgICAgICAgbm93ID0gRGF0ZS5ub3coKVxuICAgICAgICBjbGVhclRpbWVvdXQgQHNlbmRUaW1lclxuICAgICAgICBAc2VuZFRpbWVyID0gbnVsbFxuICAgICAgICBcbiAgICAgICAgaWYgbm93IC0gQGxhc3QgPiBAaW50ZXJ2YWxcbiAgICAgICAgICAgIEBsYXN0ID0gbm93XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBvcyA9IGtwb3MgZXZlbnRcbiAgICAgICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgICAgIHBvcyA9IGtwb3MoZWxlY3Ryb24uc2NyZWVuLnNjcmVlblRvRGlwUG9pbnQgcG9zKS5yb3VuZGVkKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZXZlbnQueCA9IHBvcy54XG4gICAgICAgICAgICBldmVudC55ID0gcG9zLnlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyBrbG9nICdtb3VzZScgZXZlbnQueCwgZXZlbnQueVxuICAgICAgICBcbiAgICAgICAgICAgIHBvc3QuZW1pdCAnbW91c2UnIGV2ZW50XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBzZW5kVGltZXIgPSBzZXRUaW1lb3V0ICg9PiBAb25FdmVudCBAbGFzdEV2ZW50KSwgQGludGVydmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4jICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwMCAgICAwMDAwMDAwICBcbiMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIFxuIyAwMDAwMDAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwICAgXG4jIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgICAgICAgMDAwICBcbiMgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAgMDAwMDAwMCAgIFxuXG5jbGFzcyBBcHBzXG4gICAgXG4gICAgQDogKEBuYW1lPSdhcHBzJykgLT5cbiAgICAgICAgXG4gICAgICAgIEBsYXN0QXBwcyA9IG51bGwgICAgICAgIFxuICAgICAgICBcbiAgICBvbkV2ZW50OiAoZXZlbnQpID0+XG4gICAgICAgIFxuICAgICAgICBhcHBzID0gQXJyYXkuZnJvbSBuZXcgU2V0IGV2ZW50LnByb2MubWFwIChwKSAtPiBwLnBhdGhcbiAgICAgICAgXG4gICAgICAgIGFwcHMucG9wKCkgaWYgZW1wdHkgbGFzdCBhcHBzXG4gICAgICAgIFxuICAgICAgICBpZiBvcy5wbGF0Zm9ybSgpID09ICd3aW4zMidcbiAgICAgICAgICAgIGFwcHMgPSBhcHBzLmZpbHRlciAocCkgLT4gXG4gICAgICAgICAgICAgICAgcyA9IHNsYXNoLnBhdGggc2xhc2gucmVtb3ZlRHJpdmUgcCBcbiAgICAgICAgICAgICAgICBpZiBzLnN0YXJ0c1dpdGggJy9XaW5kb3dzL1N5c3RlbTMyJ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2xhc2guYmFzZShzKSBpbiBbJ2NtZCcgJ3Bvd2Vyc2hlbGwnXVxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIGFwcHMuc29ydCgpXG4gICAgICAgIGlmIG5vdCBfLmlzRXF1YWwgYXBwcywgQGxhc3RBcHBzXG4gICAgICAgICAgICBrbG9nICdhcHBzJyBhcHBzXG4gICAgICAgICAgICBAbGFzdEFwcHMgPSBhcHBzXG4gICAgICAgIFxuIyAwMDAgICAwMDAgIDAwMCAgMDAwICAgMDAwICAgMDAwMDAwMCAgXG4jIDAwMCAwIDAwMCAgMDAwICAwMDAwICAwMDAgIDAwMCAgICAgICBcbiMgMDAwMDAwMDAwICAwMDAgIDAwMCAwIDAwMCAgMDAwMDAwMCAgIFxuIyAwMDAgICAwMDAgIDAwMCAgMDAwICAwMDAwICAgICAgIDAwMCAgXG4jIDAwICAgICAwMCAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICBcblxuY2xhc3MgV2luc1xuICAgIFxuICAgIEA6IChAbmFtZT0nd2lucycpIC0+XG4gICAgICAgIFxuICAgICAgICBAbGFzdFdpbnMgPSBudWxsXG5cbiAgICBrYWNoZWxuOiAtPlxuICAgICAgICBcbiAgICAgICAga2wgPSBbXVxuICAgICAgICBmb3IgaSBpbiAwLi4uJCgnI21haW4nKS5jaGlsZHJlbi5sZW5ndGhcbiAgICAgICAgICAgIGtsLnB1c2ggJCgnI21haW4nKS5jaGlsZHJlbltpXS5rYWNoZWxcbiAgICAgICAga2xcbiAgICAgICAgXG4gICAgb25FdmVudDogKGV2ZW50KSA9PlxuICAgICAgICBcbiAgICAgICAgd2lucyA9IGV2ZW50LmluZm9cbiAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ2RhcndpbidcbiAgICAgICAgICAgIGZvciB3aW4gaW4gd2luc1xuICAgICAgICAgICAgICAgIGlmIHdpbi5pbmRleCA9PSAwXG4gICAgICAgICAgICAgICAgICAgIHdpbi5zdGF0dXMgKz0gJyB0b3AnXG4gICAgICAgICAgICAgICAgZWxzZSBpZiB3aW4uaW5kZXggPCAwXG4gICAgICAgICAgICAgICAgICAgIHdpbi5zdGF0dXMgPSAnbWluaW1pemVkJ1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgd2lucy5wb3AoKSBpZiBlbXB0eSBsYXN0IHdpbnNcbiAgICAgICAgaWYgbm90IF8uaXNFcXVhbCB3aW5zLCBAbGFzdFdpbnNcbiAgICAgICAgICAgICMga2xvZyB3aW5zXG4gICAgICAgICAgICBAbGFzdFdpbnMgPSB3aW5zXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciBrIGluIEBrYWNoZWxuKClcbiAgICAgICAgICAgICAgICBmb3Igd2luIGluIHdpbnNcbiAgICAgICAgICAgICAgICAgICAgaWYgaz8uc3RhdHVzPyBhbmQgd2luLnBhdGggPT0gay5rYWNoZWxJZFxuICAgICAgICAgICAgICAgICAgICAgICAgIyBrbG9nIFwiI3trLmthY2hlbElkfSAje3dpbi5zdGF0dXN9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGsuYWN0aXZhdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgay5zdGF0dXMgPSB3aW4uc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgICAgICBrLnVwZGF0ZURvdCgpXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFcblxuIl19
//# sourceURL=../coffee/data.coffee