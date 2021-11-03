// koffee 1.14.0

/*
 0000000   00000000   00000000   000      
000   000  000   000  000   000  000      
000000000  00000000   00000000   000      
000   000  000        000        000      
000   000  000        000        0000000
 */
var $, Appl, Kachel, app, appIcon, childp, elem, empty, klog, kstr, os, post, ref, slash, utils, valid,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ref = require('kxk'), $ = ref.$, app = ref.app, childp = ref.childp, elem = ref.elem, empty = ref.empty, klog = ref.klog, kstr = ref.kstr, os = ref.os, post = ref.post, slash = ref.slash, valid = ref.valid;

Kachel = require('./kachel');

appIcon = require('./icon');

utils = require('./utils');

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
        var wxw;
        if (slash.win()) {
            wxw = require('wxw');
            return wxw('minimize', slash.file(this.kachelId));
        } else {
            return childp.spawn('osascript', ['-e', "tell application \"Finder\" to set visible of process \"" + (slash.base(this.kachelId)) + "\" to false"]);
        }
    };

    Appl.prototype.onMiddleClick = function() {
        var wxw;
        wxw = require('wxw');
        return wxw('terminate', this.kachelId);
    };

    Appl.prototype.onInitKachel = function(kachelId) {
        var appName, base, iconDir, iconPath, minutes;
        this.kachelId = kachelId;
        iconDir = slash.join(post.get('userData'), 'icons');
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
        iconDir = slash.join(post.get('userData'), 'icons');
        appName = slash.base(this.kachelId);
        pngPath = slash.resolve(slash.join(iconDir, appName + ".png"));
        appIcon(this.kachelId, pngPath);
        this.setIcon(pngPath);
        base = slash.base(this.kachelId);
        if (base === 'Calendar') {
            this.div.children[0].style.opacity = 0;
            time = new Date();
            day = elem({
                "class": 'calendarDay',
                text: kstr.lpad(time.getDate(), 2, '0')
            });
            mth = elem({
                "class": 'calendarMonth',
                text: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][time.getMonth()]
            });
            return this.div.appendChild(elem({
                "class": 'calendarIcon',
                children: [mth, day]
            }));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbC5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImFwcGwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBLGtHQUFBO0lBQUE7Ozs7QUFRQSxNQUFzRSxPQUFBLENBQVEsS0FBUixDQUF0RSxFQUFFLFNBQUYsRUFBSyxhQUFMLEVBQVUsbUJBQVYsRUFBa0IsZUFBbEIsRUFBd0IsaUJBQXhCLEVBQStCLGVBQS9CLEVBQXFDLGVBQXJDLEVBQTJDLFdBQTNDLEVBQStDLGVBQS9DLEVBQXFELGlCQUFyRCxFQUE0RDs7QUFFNUQsTUFBQSxHQUFVLE9BQUEsQ0FBUSxVQUFSOztBQUNWLE9BQUEsR0FBVSxPQUFBLENBQVEsUUFBUjs7QUFDVixLQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVI7O0FBRUo7OztJQUVDLGNBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSw4QkFBRCxXQUFVOzs7Ozs7Ozs7O1FBRVYsSUFBSSxDQUFDLEVBQUwsQ0FBUSxLQUFSLEVBQWMsSUFBQyxDQUFBLEtBQWY7UUFDQSxJQUFJLENBQUMsRUFBTCxDQUFRLEtBQVIsRUFBYyxJQUFDLENBQUEsS0FBZjtRQUVBLElBQUMsQ0FBQSxTQUFELEdBQWE7UUFDYixJQUFDLENBQUEsTUFBRCxHQUFhO1FBRWIsc0NBQU0sSUFBQyxDQUFBLFFBQVA7UUFFQSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxRQUFmO0lBVkQ7O21CQVlILEtBQUEsR0FBTyxTQUFDLE1BQUQsRUFBUyxHQUFUO1FBRUgsSUFBQSxDQUFLLE9BQUwsRUFBYSxTQUFiLEVBQXdCLEdBQXhCO1FBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxNQUFBLEtBQVU7ZUFDdkIsSUFBQyxDQUFBLFNBQUQsQ0FBQTtJQUpHOzttQkFNUCxLQUFBLEdBQU8sU0FBQyxJQUFEO0FBRUgsWUFBQTtRQUFBLElBQUEsQ0FBSyxPQUFMLEVBQWEsSUFBYjtRQUNBLElBQUMsQ0FBQSxNQUFE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LE9BQUEsR0FBUyxTQUFDLFFBQUQ7UUFFTCxJQUFVLENBQUksUUFBZDtBQUFBLG1CQUFBOztRQUNBLG1DQUFBLFNBQUE7ZUFDQSxJQUFDLENBQUEsU0FBRCxDQUFBO0lBSks7Ozs7R0EzSU07O0FBaUpuQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwICAgICAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICBcbjAwMDAwMDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMCAgICAgIFxuMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAgMDAwICAgICAgXG4wMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICAwMDAwMDAwICBcbiMjI1xuXG57ICQsIGFwcCwgY2hpbGRwLCBlbGVtLCBlbXB0eSwga2xvZywga3N0ciwgb3MsIHBvc3QsIHNsYXNoLCB2YWxpZCB9ID0gcmVxdWlyZSAna3hrJ1xuXG5LYWNoZWwgID0gcmVxdWlyZSAnLi9rYWNoZWwnXG5hcHBJY29uID0gcmVxdWlyZSAnLi9pY29uJ1xudXRpbHMgICA9IHJlcXVpcmUgJy4vdXRpbHMnXG5cbmNsYXNzIEFwcGwgZXh0ZW5kcyBLYWNoZWxcbiAgICAgICAgXG4gICAgQDogKEBrYWNoZWxJZD0nYXBwbCcpIC0+XG5cbiAgICAgICAgcG9zdC5vbiAnYXBwJyBAb25BcHBcbiAgICAgICAgcG9zdC5vbiAnd2luJyBAb25XaW5cbiAgICAgICAgXG4gICAgICAgIEBhY3RpdmF0ZWQgPSBmYWxzZVxuICAgICAgICBAc3RhdHVzICAgID0gJydcbiAgICAgICAgXG4gICAgICAgIHN1cGVyIEBrYWNoZWxJZFxuICAgICAgICBcbiAgICAgICAgQG9uSW5pdEthY2hlbCBAa2FjaGVsSWRcbiAgICAgICAgICAgICAgICBcbiAgICBvbkFwcDogKGFjdGlvbiwgYXBwKSA9PlxuICAgICAgICBcbiAgICAgICAga2xvZyAnb25BcHAnIGFjdGl2YXRlZCwgYXBwXG4gICAgICAgIEBhY3RpdmF0ZWQgPSBhY3Rpb24gPT0gJ2FjdGl2YXRlZCdcbiAgICAgICAgQHVwZGF0ZURvdCgpXG5cbiAgICBvbldpbjogKHdpbnMpID0+XG4gICAgICAgIFxuICAgICAgICBrbG9nICdvbldpbicgd2luc1xuICAgICAgICBAc3RhdHVzID0gJydcbiAgICAgICAgZm9yIHcgaW4gd2luc1xuICAgICAgICAgICAgZm9yIGMgaW4gWydtYXhpbWl6ZWQnICdub3JtYWwnXVxuICAgICAgICAgICAgICAgIGlmIHcuc3RhdHVzLnN0YXJ0c1dpdGggY1xuICAgICAgICAgICAgICAgICAgICBAc3RhdHVzID0gdy5zdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGlmIHZhbGlkIEBzdGF0dXNcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiBlbXB0eSBAc3RhdHVzXG4gICAgICAgICAgICBmb3IgdyBpbiB3aW5zXG4gICAgICAgICAgICAgICAgaWYgdy5zdGF0dXMgPT0gJ21pbmltaXplZCdcbiAgICAgICAgICAgICAgICAgICAgQHN0YXR1cyA9ICdtaW5pbWl6ZWQnXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIFxuICAgICAgICBAdXBkYXRlRG90KClcbiAgICAgICAgXG4gICAgb25Cb3VuZHM6ID0+XG4gICAgICAgIFxuICAgICAgICBpZiBvcy5wbGF0Zm9ybSgpID09ICd3aW4zMicgIyBvbiB3aW5kb3dzLFxuICAgICAgICAgICAgaWYgZG90ID0kICcuYXBwbGRvdCcgICAgIyBmb3Igc29tZSByZWFzb24gdGhlIGNvbnRlbnQgXG4gICAgICAgICAgICAgICAgZG90LnJlbW92ZSgpICAgICAgICAjIGRvZXNuJ3QgZ2V0IHVwZGF0ZWQgaW1tZWRpYXRlbHkgb24gcmVzaXplIFxuICAgICAgICAgICAgICAgIEB1cGRhdGVEb3QoKSAgICAgICAgIyBpZiB0aGVyZSBpcyBhIGRvdCBzdmcgcHJlc2VudFxuICAgICAgICBcbiAgICAjIDAwMDAwMDAgICAgIDAwMDAwMDAgICAwMDAwMDAwMDAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwMDAwMCAgICAgMDAwMDAwMCAgICAgIDAwMCAgICAgXG4gICAgXG4gICAgdXBkYXRlRG90OiAtPlxuICAgICAgICBcbiAgICAgICAgZG90ID0kICcuYXBwbGRvdCcgQGRpdlxuICAgICAgICBcbiAgICAgICAgaWYgQGFjdGl2YXRlZCBhbmQgbm90IGRvdFxuICAgICAgICAgICAgZG90ICA9IHV0aWxzLnN2ZyB3aWR0aDoxNiBoZWlnaHQ6MTYgY2xzczonYXBwbGRvdCdcbiAgICAgICAgICAgIGdycCAgPSB1dGlscy5hcHBlbmQgZG90LCAnZydcbiAgICAgICAgICAgIGNyYyAgPSB1dGlscy5hcHBlbmQgZ3JwLCAnY2lyY2xlJyBjeDowIGN5OjAgcjo3IGNsYXNzOidhcHBsY2lyY2xlJ1xuICAgICAgICAgICAgQGRpdi5hcHBlbmRDaGlsZCBkb3RcbiAgICAgICAgZWxzZSBpZiBub3QgQGFjdGl2YXRlZCBhbmQgZG90XG4gICAgICAgICAgICBkb3Q/LnJlbW92ZSgpXG4gICAgICAgICAgICBkb3QgPSBudWxsXG4gICAgICAgICAgICBcbiAgICAgICAgaWYgZG90XG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LnJlbW92ZSAndG9wJ1xuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5yZW1vdmUgJ25vcm1hbCdcbiAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QucmVtb3ZlICdtaW5pbWl6ZWQnXG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LnJlbW92ZSAnbWF4aW1pemVkJ1xuICAgICAgICAgICAgaWYgdmFsaWQgQHN0YXR1c1xuICAgICAgICAgICAgICAgIGZvciBzIGluIEBzdGF0dXMuc3BsaXQgJyAnXG4gICAgICAgICAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QuYWRkIHNcbiAgICAgICAgXG4gICAgIyAgMDAwMDAwMCAgMDAwICAgICAgMDAwICAgMDAwMDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMCAgICAgICAwMDAgICAgICAwMDAgIDAwMCAgICAgICAwMDAgIDAwMCAgIFxuICAgICMgMDAwICAgICAgIDAwMCAgICAgIDAwMCAgMDAwICAgICAgIDAwMDAwMDAgICAgXG4gICAgIyAwMDAgICAgICAgMDAwICAgICAgMDAwICAwMDAgICAgICAgMDAwICAwMDAgICBcbiAgICAjICAwMDAwMDAwICAwMDAwMDAwICAwMDAgICAwMDAwMDAwICAwMDAgICAwMDAgIFxuICAgICAgICAgICAgICAgIFxuICAgIG9uTGVmdENsaWNrOiA9PiBAb3BlbkFwcCBAa2FjaGVsSWRcbiAgICBvblJpZ2h0Q2xpY2s6ID0+IFxuICAgICAgICBpZiBzbGFzaC53aW4oKVxuICAgICAgICAgICAgd3h3ID0gcmVxdWlyZSAnd3h3J1xuICAgICAgICAgICAgd3h3ICdtaW5pbWl6ZScgc2xhc2guZmlsZSBAa2FjaGVsSWRcbiAgICAgICAgZWxzZSAgICAgICAgICAgIFxuICAgICAgICAgICAgY2hpbGRwLnNwYXduICdvc2FzY3JpcHQnIFsnLWUnIFwidGVsbCBhcHBsaWNhdGlvbiBcXFwiRmluZGVyXFxcIiB0byBzZXQgdmlzaWJsZSBvZiBwcm9jZXNzIFxcXCIje3NsYXNoLmJhc2UgQGthY2hlbElkfVxcXCIgdG8gZmFsc2VcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIG9uTWlkZGxlQ2xpY2s6ID0+IFxuICAgICAgICB3eHcgPSByZXF1aXJlICd3eHcnXG4gICAgICAgIHd4dyAndGVybWluYXRlJyBAa2FjaGVsSWRcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgIyAwMDAgIDAwMCAgIDAwMCAgMDAwICAwMDAwMDAwMDAgIFxuICAgICMgMDAwICAwMDAwICAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgMDAwIDAgMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgIDAwMCAgMDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICBcbiAgICBvbkluaXRLYWNoZWw6IChAa2FjaGVsSWQpID0+XG4gICAgICAgICAgICBcbiAgICAgICAgaWNvbkRpciA9IHNsYXNoLmpvaW4gcG9zdC5nZXQoJ3VzZXJEYXRhJyksICdpY29ucydcbiAgICAgICAgYXBwTmFtZSA9IHNsYXNoLmJhc2UgQGthY2hlbElkXG4gICAgICAgIGljb25QYXRoID0gXCIje2ljb25EaXJ9LyN7YXBwTmFtZX0ucG5nXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYgbm90IHNsYXNoLmlzRmlsZSBpY29uUGF0aFxuICAgICAgICAgICAgQHJlZnJlc2hJY29uKClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHNldEljb24gaWNvblBhdGhcbiAgICAgICAgICAgXG4gICAgICAgIGJhc2UgPSBzbGFzaC5iYXNlIEBrYWNoZWxJZFxuICAgICAgICBpZiBiYXNlIGluIFsnQ2FsZW5kYXInXVxuICAgICAgICAgICAgbWludXRlcyA9IHtDYWxlbmRhcjo2MH1bYmFzZV1cbiAgICAgICAgICAgIEByZWZyZXNoSWNvbigpXG4gICAgICAgICAgICBzZXRJbnRlcnZhbCBAcmVmcmVzaEljb24sIDEwMDAqNjAqbWludXRlc1xuICAgICAgICAgICAgXG4gICAgIyAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMDAgIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAwIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgMDAwMCAgXG4gICAgIyAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4gICAgICAgIFxuICAgIHJlZnJlc2hJY29uOiA9PlxuICAgICAgICBcbiAgICAgICAgaWNvbkRpciA9IHNsYXNoLmpvaW4gcG9zdC5nZXQoJ3VzZXJEYXRhJyksICdpY29ucydcbiAgICAgICAgYXBwTmFtZSA9IHNsYXNoLmJhc2UgQGthY2hlbElkXG4gICAgICAgIHBuZ1BhdGggPSBzbGFzaC5yZXNvbHZlIHNsYXNoLmpvaW4gaWNvbkRpciwgYXBwTmFtZSArIFwiLnBuZ1wiXG4gICAgICAgIFxuICAgICAgICBhcHBJY29uIEBrYWNoZWxJZCwgcG5nUGF0aFxuICAgICAgICBAc2V0SWNvbiBwbmdQYXRoXG4gICAgICAgIFxuICAgICAgICBiYXNlID0gc2xhc2guYmFzZSBAa2FjaGVsSWRcbiAgICAgICAgaWYgYmFzZSBpbiBbJ0NhbGVuZGFyJ11cbiAgICAgICAgICAgIEBkaXYuY2hpbGRyZW5bMF0uc3R5bGUub3BhY2l0eSA9IDBcbiAgICAgICAgICAgIHRpbWUgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICBkYXkgPSBlbGVtIGNsYXNzOidjYWxlbmRhckRheScgdGV4dDprc3RyLmxwYWQgdGltZS5nZXREYXRlKCksIDIsICcwJ1xuICAgICAgICAgICAgbXRoID0gZWxlbSBjbGFzczonY2FsZW5kYXJNb250aCcgdGV4dDpbJ0pBTicgJ0ZFQicgJ01BUicgJ0FQUicgJ01BWScgJ0pVTicgJ0pVTCcgJ0FVRycgJ1NFUCcgJ09DVCcgJ05PVicgJ0RFQyddW3RpbWUuZ2V0TW9udGgoKV1cbiAgICAgICAgICAgIEBkaXYuYXBwZW5kQ2hpbGQgZWxlbSBjbGFzczonY2FsZW5kYXJJY29uJyBjaGlsZHJlbjogW210aCwgZGF5XVxuICAgICAgICAgICAgICAgIFxuICAgIHNldEljb246IChpY29uUGF0aCkgPT5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZiBub3QgaWNvblBhdGhcbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHVwZGF0ZURvdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbm1vZHVsZS5leHBvcnRzID0gQXBwbFxuIl19
//# sourceURL=../coffee/appl.coffee