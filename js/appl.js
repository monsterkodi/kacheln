// koffee 1.14.0

/*
 0000000   00000000   00000000   000      
000   000  000   000  000   000  000      
000000000  00000000   00000000   000      
000   000  000        000        000      
000   000  000        000        0000000
 */
var $, Appl, Kachel, app, appIcon, elem, empty, klog, kstr, os, post, ref, slash, utils, valid, wxw,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ref = require('kxk'), $ = ref.$, app = ref.app, elem = ref.elem, empty = ref.empty, klog = ref.klog, kstr = ref.kstr, os = ref.os, post = ref.post, slash = ref.slash, valid = ref.valid;

Kachel = require('./kachel');

appIcon = require('./icon');

utils = require('./utils');

wxw = require('wxw');

Appl = (function(superClass) {
    extend(Appl, superClass);

    function Appl(kachelId) {
        this.kachelId = kachelId != null ? kachelId : 'appl';
        this.setIcon = bind(this.setIcon, this);
        this.refreshIcon = bind(this.refreshIcon, this);
        this.onInitKachel = bind(this.onInitKachel, this);
        this.onMiddleClick = bind(this.onMiddleClick, this);
        this.onRightClick = bind(this.onRightClick, this);
        this.onLeftClick = bind(this.onLeftClick, this);
        this.onBounds = bind(this.onBounds, this);
        this.onWin = bind(this.onWin, this);
        this.onApp = bind(this.onApp, this);
        post.on('app', this.onApp);
        post.on('win', this.onWin);
        this.activated = false;
        this.status = '';
        Appl.__super__.constructor.call(this, this.kachelId);
        this.onInitKachel(this.kachelId);
    }

    Appl.prototype.onApp = function(action, app) {
        klog('onApp', activated, app);
        this.activated = action === 'activated';
        return this.updateDot();
    };

    Appl.prototype.onWin = function(wins) {
        var c, i, j, k, len, len1, len2, ref1, w;
        klog('onWin', wins);
        this.status = '';
        for (i = 0, len = wins.length; i < len; i++) {
            w = wins[i];
            ref1 = ['maximized', 'normal'];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
                c = ref1[j];
                if (w.status.startsWith(c)) {
                    this.status = w.status;
                    break;
                }
            }
            if (valid(this.status)) {
                break;
            }
        }
        if (empty(this.status)) {
            for (k = 0, len2 = wins.length; k < len2; k++) {
                w = wins[k];
                if (w.status === 'minimized') {
                    this.status = 'minimized';
                    break;
                }
            }
        }
        return this.updateDot();
    };

    Appl.prototype.onBounds = function() {
        var dot;
        if (os.platform() === 'win32') {
            if (dot = $('.appldot')) {
                dot.remove();
                return this.updateDot();
            }
        }
    };

    Appl.prototype.updateDot = function() {
        var crc, dot, grp, i, len, ref1, results, s;
        dot = $('.appldot', this.div);
        if (this.activated && !dot) {
            dot = utils.svg({
                width: 16,
                height: 16,
                clss: 'appldot'
            });
            grp = utils.append(dot, 'g');
            crc = utils.append(grp, 'circle', {
                cx: 0,
                cy: 0,
                r: 7,
                "class": 'applcircle'
            });
            this.div.appendChild(dot);
        } else if (!this.activated && dot) {
            if (dot != null) {
                dot.remove();
            }
            dot = null;
        }
        if (dot) {
            dot.classList.remove('top');
            dot.classList.remove('normal');
            dot.classList.remove('minimized');
            dot.classList.remove('maximized');
            if (valid(this.status)) {
                ref1 = this.status.split(' ');
                results = [];
                for (i = 0, len = ref1.length; i < len; i++) {
                    s = ref1[i];
                    results.push(dot.classList.add(s));
                }
                return results;
            }
        }
    };

    Appl.prototype.onLeftClick = function() {
        return this.openApp(this.kachelId);
    };

    Appl.prototype.onRightClick = function() {
        return wxw('minimize', slash.file(this.kachelId));
    };

    Appl.prototype.onMiddleClick = function() {
        return wxw('terminate', this.kachelId);
    };

    Appl.prototype.onInitKachel = function(kachelId) {
        var appName, base, iconDir, iconPath, minutes;
        this.kachelId = kachelId;
        iconDir = slash.join(slash.userData(), 'icons');
        appName = slash.base(this.kachelId);
        iconPath = iconDir + "/" + appName + ".png";
        if (!slash.isFile(iconPath)) {
            this.refreshIcon();
        } else {
            this.setIcon(iconPath);
        }
        base = slash.base(this.kachelId);
        if (base === 'Calendar') {
            minutes = {
                Calendar: 60
            }[base];
            this.refreshIcon();
            return setInterval(this.refreshIcon, 1000 * 60 * minutes);
        }
    };

    Appl.prototype.refreshIcon = function() {
        var appName, base, day, iconDir, mth, pngPath, time;
        iconDir = slash.join(slash.userData(), 'icons');
        appName = slash.base(this.kachelId);
        pngPath = slash.resolve(slash.join(iconDir, appName + ".png"));
        appIcon(this.kachelId, pngPath);
        this.setIcon(pngPath);
        base = slash.base(this.kachelId);
        if (base === 'Calendar') {
            time = new Date();
            day = elem({
                "class": 'calendarDay',
                text: kstr.lpad(time.getDate(), 2, '0')
            });
            this.main.appendChild(day);
            mth = elem({
                "class": 'calendarMonth',
                text: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][time.getMonth()]
            });
            return this.main.appendChild(mth);
        }
    };

    Appl.prototype.setIcon = function(iconPath) {
        if (!iconPath) {
            return;
        }
        Appl.__super__.setIcon.apply(this, arguments);
        return this.updateDot();
    };

    return Appl;

})(Kachel);

module.exports = Appl;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbC5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImFwcGwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBLCtGQUFBO0lBQUE7Ozs7QUFRQSxNQUE4RCxPQUFBLENBQVEsS0FBUixDQUE5RCxFQUFFLFNBQUYsRUFBSyxhQUFMLEVBQVUsZUFBVixFQUFnQixpQkFBaEIsRUFBdUIsZUFBdkIsRUFBNkIsZUFBN0IsRUFBbUMsV0FBbkMsRUFBdUMsZUFBdkMsRUFBNkMsaUJBQTdDLEVBQW9EOztBQUVwRCxNQUFBLEdBQVUsT0FBQSxDQUFRLFVBQVI7O0FBQ1YsT0FBQSxHQUFVLE9BQUEsQ0FBUSxRQUFSOztBQUNWLEtBQUEsR0FBVSxPQUFBLENBQVEsU0FBUjs7QUFDVixHQUFBLEdBQVUsT0FBQSxDQUFRLEtBQVI7O0FBRUo7OztJQUVDLGNBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSw4QkFBRCxXQUFVOzs7Ozs7Ozs7O1FBRVYsSUFBSSxDQUFDLEVBQUwsQ0FBUSxLQUFSLEVBQWMsSUFBQyxDQUFBLEtBQWY7UUFDQSxJQUFJLENBQUMsRUFBTCxDQUFRLEtBQVIsRUFBYyxJQUFDLENBQUEsS0FBZjtRQUVBLElBQUMsQ0FBQSxTQUFELEdBQWE7UUFDYixJQUFDLENBQUEsTUFBRCxHQUFhO1FBRWIsc0NBQU0sSUFBQyxDQUFBLFFBQVA7UUFFQSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxRQUFmO0lBVkQ7O21CQVlILEtBQUEsR0FBTyxTQUFDLE1BQUQsRUFBUyxHQUFUO1FBRUgsSUFBQSxDQUFLLE9BQUwsRUFBYSxTQUFiLEVBQXdCLEdBQXhCO1FBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxNQUFBLEtBQVU7ZUFDdkIsSUFBQyxDQUFBLFNBQUQsQ0FBQTtJQUpHOzttQkFNUCxLQUFBLEdBQU8sU0FBQyxJQUFEO0FBRUgsWUFBQTtRQUFBLElBQUEsQ0FBSyxPQUFMLEVBQWEsSUFBYjtR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QUFBO1lBQ1AsR0FBQSxHQUFNLElBQUEsQ0FBSztnQkFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFNLGFBQU47Z0JBQW9CLElBQUEsRUFBSyxJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxPQUFMLENBQUEsQ0FBVixFQUEwQixDQUExQixFQUE2QixHQUE3QixDQUF6QjthQUFMO1lBQ04sSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQWtCLEdBQWxCO1lBQ0EsR0FBQSxHQUFNLElBQUEsQ0FBSztnQkFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFNLGVBQU47Z0JBQXNCLElBQUEsRUFBSyxDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWEsS0FBYixFQUFtQixLQUFuQixFQUF5QixLQUF6QixFQUErQixLQUEvQixFQUFxQyxLQUFyQyxFQUEyQyxLQUEzQyxFQUFpRCxLQUFqRCxFQUF1RCxLQUF2RCxFQUE2RCxLQUE3RCxFQUFtRSxLQUFuRSxDQUEwRSxDQUFBLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBQSxDQUFyRzthQUFMO21CQUNOLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFrQixHQUFsQixFQUxKOztJQVZTOzttQkFpQmIsT0FBQSxHQUFTLFNBQUMsUUFBRDtRQUVMLElBQVUsQ0FBSSxRQUFkO0FBQUEsbUJBQUE7O1FBQ0EsbUNBQUEsU0FBQTtlQUNBLElBQUMsQ0FBQSxTQUFELENBQUE7SUFKSzs7OztHQW5JTTs7QUF5SW5CLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4gMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAgICAgICBcbjAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgIFxuMDAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwICAgICAgXG4wMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICAwMDAgICAgICBcbjAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgIDAwMDAwMDAgIFxuIyMjXG5cbnsgJCwgYXBwLCBlbGVtLCBlbXB0eSwga2xvZywga3N0ciwgb3MsIHBvc3QsIHNsYXNoLCB2YWxpZCB9ID0gcmVxdWlyZSAna3hrJ1xuXG5LYWNoZWwgID0gcmVxdWlyZSAnLi9rYWNoZWwnXG5hcHBJY29uID0gcmVxdWlyZSAnLi9pY29uJ1xudXRpbHMgICA9IHJlcXVpcmUgJy4vdXRpbHMnXG53eHcgICAgID0gcmVxdWlyZSAnd3h3J1xuXG5jbGFzcyBBcHBsIGV4dGVuZHMgS2FjaGVsXG4gICAgICAgIFxuICAgIEA6IChAa2FjaGVsSWQ9J2FwcGwnKSAtPlxuXG4gICAgICAgIHBvc3Qub24gJ2FwcCcgQG9uQXBwXG4gICAgICAgIHBvc3Qub24gJ3dpbicgQG9uV2luXG4gICAgICAgIFxuICAgICAgICBAYWN0aXZhdGVkID0gZmFsc2VcbiAgICAgICAgQHN0YXR1cyAgICA9ICcnXG4gICAgICAgIFxuICAgICAgICBzdXBlciBAa2FjaGVsSWRcbiAgICAgICAgXG4gICAgICAgIEBvbkluaXRLYWNoZWwgQGthY2hlbElkXG4gICAgICAgICAgICAgICAgXG4gICAgb25BcHA6IChhY3Rpb24sIGFwcCkgPT5cbiAgICAgICAgXG4gICAgICAgIGtsb2cgJ29uQXBwJyBhY3RpdmF0ZWQsIGFwcFxuICAgICAgICBAYWN0aXZhdGVkID0gYWN0aW9uID09ICdhY3RpdmF0ZWQnXG4gICAgICAgIEB1cGRhdGVEb3QoKVxuXG4gICAgb25XaW46ICh3aW5zKSA9PlxuICAgICAgICBcbiAgICAgICAga2xvZyAnb25XaW4nIHdpbnNcbiAgICAgICAgQHN0YXR1cyA9ICcnXG4gICAgICAgIGZvciB3IGluIHdpbnNcbiAgICAgICAgICAgIGZvciBjIGluIFsnbWF4aW1pemVkJyAnbm9ybWFsJ11cbiAgICAgICAgICAgICAgICBpZiB3LnN0YXR1cy5zdGFydHNXaXRoIGNcbiAgICAgICAgICAgICAgICAgICAgQHN0YXR1cyA9IHcuc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBpZiB2YWxpZCBAc3RhdHVzXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYgZW1wdHkgQHN0YXR1c1xuICAgICAgICAgICAgZm9yIHcgaW4gd2luc1xuICAgICAgICAgICAgICAgIGlmIHcuc3RhdHVzID09ICdtaW5pbWl6ZWQnXG4gICAgICAgICAgICAgICAgICAgIEBzdGF0dXMgPSAnbWluaW1pemVkJ1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICBcbiAgICAgICAgQHVwZGF0ZURvdCgpXG4gICAgICAgIFxuICAgIG9uQm91bmRzOiA9PlxuICAgICAgICBcbiAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnd2luMzInICMgb24gd2luZG93cyxcbiAgICAgICAgICAgIGlmIGRvdCA9JCAnLmFwcGxkb3QnICAgICMgZm9yIHNvbWUgcmVhc29uIHRoZSBjb250ZW50IFxuICAgICAgICAgICAgICAgIGRvdC5yZW1vdmUoKSAgICAgICAgIyBkb2Vzbid0IGdldCB1cGRhdGVkIGltbWVkaWF0ZWx5IG9uIHJlc2l6ZSBcbiAgICAgICAgICAgICAgICBAdXBkYXRlRG90KCkgICAgICAgICMgaWYgdGhlcmUgaXMgYSBkb3Qgc3ZnIHByZXNlbnRcbiAgICAgICAgXG4gICAgIyAwMDAwMDAwICAgICAwMDAwMDAwICAgMDAwMDAwMDAwICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMDAwMDAgICAgIDAwMDAwMDAgICAgICAwMDAgICAgIFxuICAgIFxuICAgIHVwZGF0ZURvdDogLT5cbiAgICAgICAgXG4gICAgICAgIGRvdCA9JCAnLmFwcGxkb3QnIEBkaXZcbiAgICAgICAgXG4gICAgICAgIGlmIEBhY3RpdmF0ZWQgYW5kIG5vdCBkb3RcbiAgICAgICAgICAgIGRvdCAgPSB1dGlscy5zdmcgd2lkdGg6MTYgaGVpZ2h0OjE2IGNsc3M6J2FwcGxkb3QnXG4gICAgICAgICAgICBncnAgID0gdXRpbHMuYXBwZW5kIGRvdCwgJ2cnXG4gICAgICAgICAgICBjcmMgID0gdXRpbHMuYXBwZW5kIGdycCwgJ2NpcmNsZScgY3g6MCBjeTowIHI6NyBjbGFzczonYXBwbGNpcmNsZSdcbiAgICAgICAgICAgIEBkaXYuYXBwZW5kQ2hpbGQgZG90XG4gICAgICAgIGVsc2UgaWYgbm90IEBhY3RpdmF0ZWQgYW5kIGRvdFxuICAgICAgICAgICAgZG90Py5yZW1vdmUoKVxuICAgICAgICAgICAgZG90ID0gbnVsbFxuICAgICAgICAgICAgXG4gICAgICAgIGlmIGRvdFxuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5yZW1vdmUgJ3RvcCdcbiAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QucmVtb3ZlICdub3JtYWwnXG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LnJlbW92ZSAnbWluaW1pemVkJ1xuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5yZW1vdmUgJ21heGltaXplZCdcbiAgICAgICAgICAgIGlmIHZhbGlkIEBzdGF0dXNcbiAgICAgICAgICAgICAgICBmb3IgcyBpbiBAc3RhdHVzLnNwbGl0ICcgJ1xuICAgICAgICAgICAgICAgICAgICBkb3QuY2xhc3NMaXN0LmFkZCBzXG4gICAgICAgIFxuICAgICMgIDAwMDAwMDAgIDAwMCAgICAgIDAwMCAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgICAgICAgMDAwICAgICAgMDAwICAwMDAgICAgICAgMDAwICAwMDAgICBcbiAgICAjIDAwMCAgICAgICAwMDAgICAgICAwMDAgIDAwMCAgICAgICAwMDAwMDAwICAgIFxuICAgICMgMDAwICAgICAgIDAwMCAgICAgIDAwMCAgMDAwICAgICAgIDAwMCAgMDAwICAgXG4gICAgIyAgMDAwMDAwMCAgMDAwMDAwMCAgMDAwICAgMDAwMDAwMCAgMDAwICAgMDAwICBcbiAgICAgICAgICAgICAgICBcbiAgICBvbkxlZnRDbGljazogPT4gQG9wZW5BcHAgQGthY2hlbElkXG4gICAgb25SaWdodENsaWNrOiA9PiB3eHcgJ21pbmltaXplJyBzbGFzaC5maWxlIEBrYWNoZWxJZFxuICAgIG9uTWlkZGxlQ2xpY2s6ID0+IHd4dyAndGVybWluYXRlJyBAa2FjaGVsSWRcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgIyAwMDAgIDAwMCAgIDAwMCAgMDAwICAwMDAwMDAwMDAgIFxuICAgICMgMDAwICAwMDAwICAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgMDAwIDAgMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgIDAwMCAgMDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICBcbiAgICBvbkluaXRLYWNoZWw6IChAa2FjaGVsSWQpID0+XG4gICAgICAgICAgICBcbiAgICAgICAgaWNvbkRpciA9IHNsYXNoLmpvaW4gc2xhc2gudXNlckRhdGEoKSwgJ2ljb25zJ1xuICAgICAgICBhcHBOYW1lID0gc2xhc2guYmFzZSBAa2FjaGVsSWRcbiAgICAgICAgaWNvblBhdGggPSBcIiN7aWNvbkRpcn0vI3thcHBOYW1lfS5wbmdcIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiBub3Qgc2xhc2guaXNGaWxlIGljb25QYXRoXG4gICAgICAgICAgICBAcmVmcmVzaEljb24oKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAc2V0SWNvbiBpY29uUGF0aFxuICAgICAgICAgICBcbiAgICAgICAgYmFzZSA9IHNsYXNoLmJhc2UgQGthY2hlbElkXG4gICAgICAgIGlmIGJhc2UgaW4gWydDYWxlbmRhciddXG4gICAgICAgICAgICBtaW51dGVzID0ge0NhbGVuZGFyOjYwfVtiYXNlXVxuICAgICAgICAgICAgQHJlZnJlc2hJY29uKClcbiAgICAgICAgICAgIHNldEludGVydmFsIEByZWZyZXNoSWNvbiwgMTAwMCo2MCptaW51dGVzXG4gICAgICAgICAgICBcbiAgICAjIDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICBcbiAgICAjIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwMCAgMDAwICBcbiAgICAjIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwIDAgMDAwICBcbiAgICAjIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAwMDAwICBcbiAgICAjIDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICBcbiAgICAgICAgXG4gICAgcmVmcmVzaEljb246ID0+XG4gICAgICAgIFxuICAgICAgICBpY29uRGlyID0gc2xhc2guam9pbiBzbGFzaC51c2VyRGF0YSgpLCAnaWNvbnMnXG4gICAgICAgIGFwcE5hbWUgPSBzbGFzaC5iYXNlIEBrYWNoZWxJZFxuICAgICAgICBwbmdQYXRoID0gc2xhc2gucmVzb2x2ZSBzbGFzaC5qb2luIGljb25EaXIsIGFwcE5hbWUgKyBcIi5wbmdcIlxuICAgICAgICBcbiAgICAgICAgYXBwSWNvbiBAa2FjaGVsSWQsIHBuZ1BhdGhcbiAgICAgICAgQHNldEljb24gcG5nUGF0aFxuICAgICAgICBcbiAgICAgICAgYmFzZSA9IHNsYXNoLmJhc2UgQGthY2hlbElkXG4gICAgICAgIGlmIGJhc2UgaW4gWydDYWxlbmRhciddXG4gICAgICAgICAgICB0aW1lID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgZGF5ID0gZWxlbSBjbGFzczonY2FsZW5kYXJEYXknIHRleHQ6a3N0ci5scGFkIHRpbWUuZ2V0RGF0ZSgpLCAyLCAnMCdcbiAgICAgICAgICAgIEBtYWluLmFwcGVuZENoaWxkIGRheVxuICAgICAgICAgICAgbXRoID0gZWxlbSBjbGFzczonY2FsZW5kYXJNb250aCcgdGV4dDpbJ0pBTicgJ0ZFQicgJ01BUicgJ0FQUicgJ01BWScgJ0pVTicgJ0pVTCcgJ0FVRycgJ1NFUCcgJ09DVCcgJ05PVicgJ0RFQyddW3RpbWUuZ2V0TW9udGgoKV1cbiAgICAgICAgICAgIEBtYWluLmFwcGVuZENoaWxkIG10aFxuICAgICAgICAgICAgICAgIFxuICAgIHNldEljb246IChpY29uUGF0aCkgPT5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZiBub3QgaWNvblBhdGhcbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHVwZGF0ZURvdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbm1vZHVsZS5leHBvcnRzID0gQXBwbFxuIl19
//# sourceURL=../coffee/appl.coffee