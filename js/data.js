// koffee 1.14.0

/*
0000000     0000000   000000000   0000000 
000   000  000   000     000     000   000
000   000  000000000     000     000000000
000   000  000   000     000     000   000
0000000    000   000     000     000   000
 */
var $, Apps, Bounds, Clock, Data, Mouse, Sysinfo, Wins, _, childp, electron, empty, klog, kpos, last, os, post, ref, slash, sysinfo, udp, win, wxw,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ref = require('kxk'), $ = ref.$, _ = ref._, childp = ref.childp, empty = ref.empty, klog = ref.klog, kpos = ref.kpos, last = ref.last, os = ref.os, post = ref.post, slash = ref.slash, udp = ref.udp, win = ref.win;

sysinfo = require('systeminformation');

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

Bounds = (function() {
    function Bounds(name1, receivers) {
        this.name = name1 != null ? name1 : 'bounds';
        this.receivers = receivers != null ? receivers : [];
        this.onBounds = bind(this.onBounds, this);
        post.on('bounds', this.onBounds);
        this.lastInfos = null;
        this.onBounds();
    }

    Bounds.prototype.onBounds = function(msg, arg) {
        var bounds, infos, j, len, receiver, ref1, results;
        bounds = require('./bounds');
        infos = bounds.infos;
        if (!_.isEqual(infos, this.lastInfos)) {
            this.lastInfos = infos;
            ref1 = this.receivers;
            results = [];
            for (j = 0, len = ref1.length; j < len; j++) {
                receiver = ref1[j];
                results.push(post.toWin(receiver, 'data', infos));
            }
            return results;
        }
    };

    return Bounds;

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImRhdGEuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBLDhJQUFBO0lBQUE7O0FBUUEsTUFBdUUsT0FBQSxDQUFRLEtBQVIsQ0FBdkUsRUFBRSxTQUFGLEVBQUssU0FBTCxFQUFRLG1CQUFSLEVBQWdCLGlCQUFoQixFQUF1QixlQUF2QixFQUE2QixlQUE3QixFQUFtQyxlQUFuQyxFQUF5QyxXQUF6QyxFQUE2QyxlQUE3QyxFQUFtRCxpQkFBbkQsRUFBMEQsYUFBMUQsRUFBK0Q7O0FBRS9ELE9BQUEsR0FBVyxPQUFBLENBQVEsbUJBQVI7O0FBQ1gsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLEdBQUEsR0FBVyxPQUFBLENBQVEsS0FBUjs7QUFFTDtJQUVDLGNBQUE7OztRQUVDLElBQUMsQ0FBQSxNQUFELENBQUE7UUFHQSxJQUFDLENBQUEsUUFBRCxHQUFhLEdBQUEsQ0FBSSxNQUFKLEVBQVcsTUFBWDtRQUdiLElBQUMsQ0FBQSxTQUFELEdBR0k7WUFBQSxJQUFBLEVBQVksSUFBSSxJQUFoQjtZQUNBLEtBQUEsRUFBWSxJQUFJLEtBRGhCO1lBRUEsT0FBQSxFQUFZLElBQUksT0FGaEI7O0lBWEw7O21CQWVILEtBQUEsR0FBTyxTQUFBO1FBRUgsSUFBVSxJQUFDLENBQUEsR0FBWDtBQUFBLG1CQUFBOztRQUVBLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBSSxHQUFKLENBQVE7WUFBQSxJQUFBLEVBQUssS0FBTDtZQUFXLEtBQUEsRUFBTSxJQUFDLENBQUEsS0FBbEI7U0FBUjtlQUNQLFVBQUEsQ0FBVyxJQUFDLENBQUEsUUFBWixFQUFzQixJQUF0QjtJQUxHOzttQkFPUCxNQUFBLEdBQVEsU0FBQTtRQUVKLElBQUcsRUFBRSxDQUFDLFFBQUgsQ0FBQSxDQUFBLEtBQWlCLE9BQXBCO21CQUNJLEdBQUEsQ0FBSSxNQUFKLEVBQVcs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MDAwMDAwMCAgICAgMDAwMDAwMCAgIDAwMDAwMDAwMCAgIDAwMDAwMDAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgICAwMDBcbjAwMCAgIDAwMCAgMDAwMDAwMDAwICAgICAwMDAgICAgIDAwMDAwMDAwMFxuMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgMDAwICAgMDAwXG4wMDAwMDAwICAgIDAwMCAgIDAwMCAgICAgMDAwICAgICAwMDAgICAwMDBcbiMjI1xuXG57ICQsIF8sIGNoaWxkcCwgZW1wdHksIGtsb2csIGtwb3MsIGxhc3QsIG9zLCBwb3N0LCBzbGFzaCwgdWRwLCB3aW4gfSA9IHJlcXVpcmUgJ2t4aydcblxuc3lzaW5mbyAgPSByZXF1aXJlICdzeXN0ZW1pbmZvcm1hdGlvbidcbmVsZWN0cm9uID0gcmVxdWlyZSAnZWxlY3Ryb24nXG53eHcgICAgICA9IHJlcXVpcmUgJ3d4dydcblxuY2xhc3MgRGF0YVxuXG4gICAgQDogLT5cbiAgICAgICAgXG4gICAgICAgIEBkZXRhY2goKVxuICAgICAgICBcbiAgICAgICAgIyAgQGhvb2tQcm9jICA9IHd4dyAnaG9vaycgJ3Byb2MnXG4gICAgICAgIEBob29rSW5mbyAgPSB3eHcgJ2hvb2snICdpbmZvJ1xuICAgICAgICAjICBAaG9va0lucHV0ID0gd3h3ICdob29rJyAnaW5wdXQnXG4gICAgICAgICAgICBcbiAgICAgICAgQHByb3ZpZGVycyA9IFxuICAgICAgICAgICAgIyBtb3VzZTogICAgICBuZXcgTW91c2VcbiAgICAgICAgICAgICMgYXBwczogICAgICAgbmV3IEFwcHNcbiAgICAgICAgICAgIHdpbnM6ICAgICAgIG5ldyBXaW5zXG4gICAgICAgICAgICBjbG9jazogICAgICBuZXcgQ2xvY2sgXG4gICAgICAgICAgICBzeXNpbmZvOiAgICBuZXcgU3lzaW5mb1xuICAgICAgICBcbiAgICBzdGFydDogLT5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZiBAdWRwXG5cbiAgICAgICAgQHVkcCA9IG5ldyB1ZHAgcG9ydDo2NTQzMiBvbk1zZzpAb25VRFBcbiAgICAgICAgc2V0VGltZW91dCBAc2xvd1RpY2ssIDEwMDBcbiAgICAgICAgXG4gICAgZGV0YWNoOiAtPlxuICAgICAgICBcbiAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnd2luMzInXG4gICAgICAgICAgICB3eHcgJ2tpbGwnICd3Yy5leGUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHd4dyAna2lsbCcgJ21jJ1xuICAgICAgICAgICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMDAwMDAgICAgMDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICBcbiAgICAjICAwMDAwMDAwICAgMDAwMDAwMCAgICAwMDAgICAgICAgIFxuICAgIFxuICAgIG9uVURQOiAobXNnKSA9PiBcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCBtc2cuZXZlbnRcbiAgICAgICAgICAgIHdoZW4gJ21vdXNlZG93bicgJ21vdXNlbW92ZScgJ21vdXNldXAnICdtb3VzZXdoZWVsJyB0aGVuIEBwcm92aWRlcnMubW91c2U/Lm9uRXZlbnQgbXNnXG4gICAgICAgICAgICB3aGVuICdwcm9jJyB0aGVuIEBwcm92aWRlcnMuYXBwcz8ub25FdmVudCBtc2dcbiAgICAgICAgICAgIHdoZW4gJ2luZm8nIHRoZW4gQHByb3ZpZGVycy53aW5zPy5vbkV2ZW50IG1zZ1xuICAgICAgICAgICAgIyBlbHNlIGxvZyBtc2dcbiAgICAgICAgXG4gICAgc2xvd1RpY2s6ID0+XG4gICAgICAgIFxuICAgICAgICBmb3IgbmFtZSxwcm92aWRlciBvZiBAcHJvdmlkZXJzXG4gICAgICAgICAgICBpZiBwcm92aWRlci50aWNrID09ICdzbG93J1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLm9uVGljayBAXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQgQHNsb3dUaWNrLCAxMDAwIC0gKG5ldyBEYXRlKS5nZXRNaWxsaXNlY29uZHMoKVxuICAgICAgICBcbiMgIDAwMDAwMDAgIDAwMCAgICAgICAwMDAwMDAwICAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgXG4jIDAwMCAgICAgICAwMDAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgIDAwMCAgIFxuIyAwMDAgICAgICAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwMDAwMCAgICBcbiMgMDAwICAgICAgIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgMDAwICAgXG4jICAwMDAwMDAwICAwMDAwMDAwICAgMDAwMDAwMCAgICAwMDAwMDAwICAwMDAgICAwMDAgIFxuXG5jbGFzcyBDbG9ja1xuICAgICAgICBcbiAgICBAOiAoQG5hbWU9J2Nsb2NrJyBAdGljaz0nc2xvdycpIC0+IFxuICAgICAgICBcbiAgICBvblRpY2s6IChkYXRhKSA9PlxuXG4gICAgICAgIHRpbWUgPSBuZXcgRGF0ZSgpXG4gICAgICAgIFxuICAgICAgICBob3VycyAgID0gdGltZS5nZXRIb3VycygpXG4gICAgICAgIG1pbnV0ZXMgPSB0aW1lLmdldE1pbnV0ZXMoKVxuICAgICAgICBzZWNvbmRzID0gdGltZS5nZXRTZWNvbmRzKClcbiAgICAgICAgXG4gICAgICAgIHBvc3QuZW1pdCAnY2xvY2snLFxuICAgICAgICAgICAgaG91cjogICBob3Vyc1xuICAgICAgICAgICAgbWludXRlOiBtaW51dGVzXG4gICAgICAgICAgICBzZWNvbmQ6IHNlY29uZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiMgIDAwMDAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgIDAwMCAgMDAwICAgMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAgICBcbiMgMDAwICAgICAgICAwMDAgMDAwICAgMDAwICAgICAgIDAwMCAgMDAwMCAgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICBcbiMgMDAwMDAwMCAgICAgMDAwMDAgICAgMDAwMDAwMCAgIDAwMCAgMDAwIDAgMDAwICAwMDAwMDAgICAgMDAwICAgMDAwICBcbiMgICAgICAwMDAgICAgIDAwMCAgICAgICAgICAwMDAgIDAwMCAgMDAwICAwMDAwICAwMDAgICAgICAgMDAwICAgMDAwICBcbiMgMDAwMDAwMCAgICAgIDAwMCAgICAgMDAwMDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMDAwMDAgICBcblxuY2xhc3MgU3lzaW5mb1xuICAgICAgICBcbiAgICBAOiAoQG5hbWU9J3N5c2luZm8nIEB0aWNrPSdzbG93JykgLT5cbiAgICAgICAgXG4gICAgICAgIGZvcmsgPSBjaGlsZHAuZm9yayBcIiN7X19kaXJuYW1lfS9tZW1uZXRcIlxuICAgICAgICBmb3JrLm9uICdtZXNzYWdlJyBAb25NZXNzYWdlXG4gICAgICAgIFxuICAgIG9uTWVzc2FnZTogKG0pID0+IFxuICAgICAgICBcbiAgICAgICAgQGRhdGEgPSBKU09OLnBhcnNlIG1cbiAgICAgICAgcG9zdC5lbWl0ICdzeXNpbmZvJyBAZGF0YVxuICAgICAgICBcbiAgICBvblRpY2s6IChkYXRhKSA9PiAjIGlmIEBkYXRhIHRoZW4gcG9zdC5lbWl0ICdzeXNpbmZvJyBAZGF0YVxuICAgICAgICBcbiMgMDAgICAgIDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgIDAwMDAwMDAwICBcbiMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICBcbiMgMDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgIDAwMDAwMDAgICBcbiMgMDAwIDAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgICAwMDAgIDAwMCAgICAgICBcbiMgMDAwICAgMDAwICAgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAwICBcblxuY2xhc3MgTW91c2VcbiAgICBcbiAgICBAOiAoQG5hbWU9J21vdXNlJykgLT5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgQGxhc3QgPSBEYXRlLm5vdygpXG4gICAgICAgIEBpbnRlcnZhbCA9IHBhcnNlSW50IDEwMDAvNjBcbiAgICAgICAgQGxhc3RFdmVudCA9IG51bGxcbiAgICAgICAgQHNlbmRUaW1lciA9IG51bGxcbiAgICAgICAgXG4gICAgb25FdmVudDogKGV2ZW50KSA9PlxuXG4gICAgICAgIEBsYXN0RXZlbnQgPSBldmVudFxuICAgICAgICBub3cgPSBEYXRlLm5vdygpXG4gICAgICAgIGNsZWFyVGltZW91dCBAc2VuZFRpbWVyXG4gICAgICAgIEBzZW5kVGltZXIgPSBudWxsXG4gICAgICAgIFxuICAgICAgICBpZiBub3cgLSBAbGFzdCA+IEBpbnRlcnZhbFxuICAgICAgICAgICAgQGxhc3QgPSBub3dcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcG9zID0ga3BvcyBldmVudFxuICAgICAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnd2luMzInXG4gICAgICAgICAgICAgICAgcG9zID0ga3BvcyhlbGVjdHJvbi5zY3JlZW4uc2NyZWVuVG9EaXBQb2ludCBwb3MpLnJvdW5kZWQoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBldmVudC54ID0gcG9zLnhcbiAgICAgICAgICAgIGV2ZW50LnkgPSBwb3MueVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIGtsb2cgJ21vdXNlJyBldmVudC54LCBldmVudC55XG4gICAgICAgIFxuICAgICAgICAgICAgcG9zdC5lbWl0ICdtb3VzZScgZXZlbnRcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHNlbmRUaW1lciA9IHNldFRpbWVvdXQgKD0+IEBvbkV2ZW50IEBsYXN0RXZlbnQpLCBAaW50ZXJ2YWxcbiAgICAgICAgICAgICAgICBcbiMgMDAwMDAwMCAgICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAwMDAwICAgICAwMDAwMDAwICBcbiMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwMCAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICBcbiMgMDAwMDAwMCAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwIDAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICBcbiMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAwMDAwICAwMDAgICAwMDAgICAgICAgMDAwICBcbiMgMDAwMDAwMCAgICAgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAwMDAwICAgIDAwMDAwMDAgICBcblxuY2xhc3MgQm91bmRzXG4gICAgXG4gICAgQDogKEBuYW1lPSdib3VuZHMnIEByZWNlaXZlcnM9W10pIC0+XG4gICAgICAgIFxuICAgICAgICBwb3N0Lm9uICdib3VuZHMnIEBvbkJvdW5kc1xuICAgICAgICBcbiAgICAgICAgQGxhc3RJbmZvcyA9IG51bGxcbiAgICAgICAgQG9uQm91bmRzKClcbiAgICAgICBcbiAgICBvbkJvdW5kczogKG1zZywgYXJnKSA9PlxuICAgICAgICBcbiAgICAgICAgYm91bmRzID0gcmVxdWlyZSAnLi9ib3VuZHMnXG4gICAgICAgIGluZm9zID0gYm91bmRzLmluZm9zXG4gICAgICAgIGlmIG5vdCBfLmlzRXF1YWwgaW5mb3MsIEBsYXN0SW5mb3NcbiAgICAgICAgICAgIEBsYXN0SW5mb3MgPSBpbmZvc1xuICAgICAgICAgICAgZm9yIHJlY2VpdmVyIGluIEByZWNlaXZlcnNcbiAgICAgICAgICAgICAgICBwb3N0LnRvV2luIHJlY2VpdmVyLCAnZGF0YScsIGluZm9zXG4gICAgICAgICAgICBcbiMgIDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgIDAwMDAwMDAgIFxuIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgXG4jIDAwMDAwMDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAgICBcbiMgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAgICAgICAwMDAgIFxuIyAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICAwMDAwMDAwICAgXG5cbmNsYXNzIEFwcHNcbiAgICBcbiAgICBAOiAoQG5hbWU9J2FwcHMnKSAtPlxuICAgICAgICBcbiAgICAgICAgQGxhc3RBcHBzID0gbnVsbCAgICAgICAgXG4gICAgICAgIFxuICAgIG9uRXZlbnQ6IChldmVudCkgPT5cbiAgICAgICAgXG4gICAgICAgIGFwcHMgPSBBcnJheS5mcm9tIG5ldyBTZXQgZXZlbnQucHJvYy5tYXAgKHApIC0+IHAucGF0aFxuICAgICAgICBcbiAgICAgICAgYXBwcy5wb3AoKSBpZiBlbXB0eSBsYXN0IGFwcHNcbiAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgYXBwcyA9IGFwcHMuZmlsdGVyIChwKSAtPiBcbiAgICAgICAgICAgICAgICBzID0gc2xhc2gucGF0aCBzbGFzaC5yZW1vdmVEcml2ZSBwIFxuICAgICAgICAgICAgICAgIGlmIHMuc3RhcnRzV2l0aCAnL1dpbmRvd3MvU3lzdGVtMzInXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzbGFzaC5iYXNlKHMpIGluIFsnY21kJyAncG93ZXJzaGVsbCddXG4gICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgYXBwcy5zb3J0KClcbiAgICAgICAgaWYgbm90IF8uaXNFcXVhbCBhcHBzLCBAbGFzdEFwcHNcbiAgICAgICAgICAgIGtsb2cgJ2FwcHMnIGFwcHNcbiAgICAgICAgICAgIEBsYXN0QXBwcyA9IGFwcHNcbiAgICAgICAgXG4jIDAwMCAgIDAwMCAgMDAwICAwMDAgICAwMDAgICAwMDAwMDAwICBcbiMgMDAwIDAgMDAwICAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAgIFxuIyAwMDAwMDAwMDAgIDAwMCAgMDAwIDAgMDAwICAwMDAwMDAwICAgXG4jIDAwMCAgIDAwMCAgMDAwICAwMDAgIDAwMDAgICAgICAgMDAwICBcbiMgMDAgICAgIDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgIFxuXG5jbGFzcyBXaW5zXG4gICAgXG4gICAgQDogKEBuYW1lPSd3aW5zJykgLT5cbiAgICAgICAgXG4gICAgICAgIEBsYXN0V2lucyA9IG51bGxcblxuICAgIGthY2hlbG46IC0+XG4gICAgICAgIFxuICAgICAgICBrbCA9IFtdXG4gICAgICAgIGZvciBpIGluIDAuLi4kKCcjbWFpbicpLmNoaWxkcmVuLmxlbmd0aFxuICAgICAgICAgICAga2wucHVzaCAkKCcjbWFpbicpLmNoaWxkcmVuW2ldLmthY2hlbFxuICAgICAgICBrbFxuICAgICAgICBcbiAgICBvbkV2ZW50OiAoZXZlbnQpID0+XG4gICAgICAgIFxuICAgICAgICB3aW5zID0gZXZlbnQuaW5mb1xuICAgICAgICBcbiAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnZGFyd2luJ1xuICAgICAgICAgICAgZm9yIHdpbiBpbiB3aW5zXG4gICAgICAgICAgICAgICAgaWYgd2luLmluZGV4ID09IDBcbiAgICAgICAgICAgICAgICAgICAgd2luLnN0YXR1cyArPSAnIHRvcCdcbiAgICAgICAgICAgICAgICBlbHNlIGlmIHdpbi5pbmRleCA8IDBcbiAgICAgICAgICAgICAgICAgICAgd2luLnN0YXR1cyA9ICdtaW5pbWl6ZWQnXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB3aW5zLnBvcCgpIGlmIGVtcHR5IGxhc3Qgd2luc1xuICAgICAgICBpZiBub3QgXy5pc0VxdWFsIHdpbnMsIEBsYXN0V2luc1xuICAgICAgICAgICAgIyBrbG9nIHdpbnNcbiAgICAgICAgICAgIEBsYXN0V2lucyA9IHdpbnNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIGsgaW4gQGthY2hlbG4oKVxuICAgICAgICAgICAgICAgIGZvciB3aW4gaW4gd2luc1xuICAgICAgICAgICAgICAgICAgICBpZiBrPy5zdGF0dXM/IGFuZCB3aW4ucGF0aCA9PSBrLmthY2hlbElkXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGtsb2cgXCIje2sua2FjaGVsSWR9ICN7d2luLnN0YXR1c31cIlxuICAgICAgICAgICAgICAgICAgICAgICAgay5hY3RpdmF0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBrLnN0YXR1cyA9IHdpbi5zdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGsudXBkYXRlRG90KClcbiAgICBcbm1vZHVsZS5leHBvcnRzID0gRGF0YVxuXG4iXX0=
//# sourceURL=../coffee/data.coffee