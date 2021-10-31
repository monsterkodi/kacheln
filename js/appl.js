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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbC5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbImFwcGwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBLCtGQUFBO0lBQUE7Ozs7QUFRQSxNQUE4RCxPQUFBLENBQVEsS0FBUixDQUE5RCxFQUFFLFNBQUYsRUFBSyxhQUFMLEVBQVUsZUFBVixFQUFnQixpQkFBaEIsRUFBdUIsZUFBdkIsRUFBNkIsZUFBN0IsRUFBbUMsV0FBbkMsRUFBdUMsZUFBdkMsRUFBNkMsaUJBQTdDLEVBQW9EOztBQUVwRCxNQUFBLEdBQVUsT0FBQSxDQUFRLFVBQVI7O0FBQ1YsT0FBQSxHQUFVLE9BQUEsQ0FBUSxRQUFSOztBQUNWLEtBQUEsR0FBVSxPQUFBLENBQVEsU0FBUjs7QUFDVixHQUFBLEdBQVUsT0FBQSxDQUFRLEtBQVI7O0FBRUo7OztJQUVDLGNBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSw4QkFBRCxXQUFVOzs7Ozs7Ozs7O1FBRVYsSUFBSSxDQUFDLEVBQUwsQ0FBUSxLQUFSLEVBQWMsSUFBQyxDQUFBLEtBQWY7UUFDQSxJQUFJLENBQUMsRUFBTCxDQUFRLEtBQVIsRUFBYyxJQUFDLENBQUEsS0FBZjtRQUVBLElBQUMsQ0FBQSxTQUFELEdBQWE7UUFDYixJQUFDLENBQUEsTUFBRCxHQUFhO1FBRWIsc0NBQU0sSUFBQyxDQUFBLFFBQVA7UUFFQSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxRQUFmO0lBVkQ7O21CQVlILEtBQUEsR0FBTyxTQUFDLE1BQUQsRUFBUyxHQUFUO1FBRUgsSUFBQSxDQUFLLE9BQUwsRUFBYSxTQUFiLEVBQXdCLEdBQXhCO1FBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxNQUFBLEtBQVU7ZUFDdkIsSUFBQyxDQUFBLFNBQUQsQ0FBQTtJQUpHOzttQkFNUCxLQUFBLEdBQU8sU0FBQyxJQUFEO0FBRUgsWUFBQTtRQUFBLElBQUEsQ0FBSyxPQUFMLEVBQWEsSUFBYjtR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QUFHLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQUssQ0FBQyxPQUF2QixHQUFpQztZQUNqQyxJQUFBLEdBQU8sSUFBSSxJQUFKLENBQUE7WUFDUCxHQUFBLEdBQU0sSUFBQSxDQUFLO2dCQUFBLENBQUEsS0FBQSxDQUFBLEVBQU0sYUFBTjtnQkFBb0IsSUFBQSxFQUFLLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBSSxDQUFDLE9BQUwsQ0FBQSxDQUFWLEVBQTBCLENBQTFCLEVBQTZCLEdBQTdCLENBQXpCO2FBQUw7WUFDTixHQUFBLEdBQU0sSUFBQSxDQUFLO2dCQUFBLENBQUEsS0FBQSxDQUFBLEVBQU0sZUFBTjtnQkFBc0IsSUFBQSxFQUFLLENBQUMsS0FBRCxFQUFPLEtBQVAsRUFBYSxLQUFiLEVBQW1CLEtBQW5CLEVBQXlCLEtBQXpCLEVBQStCLEtBQS9CLEVBQXFDLEtBQXJDLEVBQTJDLEtBQTNDLEVBQWlELEtBQWpELEVBQXVELEtBQXZELEVBQTZELEtBQTdELEVBQW1FLEtBQW5FLENBQTBFLENBQUEsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFBLENBQXJHO2FBQUw7bUJBQ04sSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLENBQWlCLElBQUEsQ0FBSztnQkFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFNLGNBQU47Z0JBQXFCLFFBQUEsRUFBVSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQS9CO2FBQUwsQ0FBakIsRUFMSjs7SUFWUzs7bUJBaUJiLE9BQUEsR0FBUyxTQUFDLFFBQUQ7UUFFTCxJQUFVLENBQUksUUFBZDtBQUFBLG1CQUFBOztRQUNBLG1DQUFBLFNBQUE7ZUFDQSxJQUFDLENBQUEsU0FBRCxDQUFBO0lBSks7Ozs7R0FuSU07O0FBeUluQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwICAgICAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICBcbjAwMDAwMDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMCAgICAgIFxuMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAgMDAwICAgICAgXG4wMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICAwMDAwMDAwICBcbiMjI1xuXG57ICQsIGFwcCwgZWxlbSwgZW1wdHksIGtsb2csIGtzdHIsIG9zLCBwb3N0LCBzbGFzaCwgdmFsaWQgfSA9IHJlcXVpcmUgJ2t4aydcblxuS2FjaGVsICA9IHJlcXVpcmUgJy4va2FjaGVsJ1xuYXBwSWNvbiA9IHJlcXVpcmUgJy4vaWNvbidcbnV0aWxzICAgPSByZXF1aXJlICcuL3V0aWxzJ1xud3h3ICAgICA9IHJlcXVpcmUgJ3d4dydcblxuY2xhc3MgQXBwbCBleHRlbmRzIEthY2hlbFxuICAgICAgICBcbiAgICBAOiAoQGthY2hlbElkPSdhcHBsJykgLT5cblxuICAgICAgICBwb3N0Lm9uICdhcHAnIEBvbkFwcFxuICAgICAgICBwb3N0Lm9uICd3aW4nIEBvbldpblxuICAgICAgICBcbiAgICAgICAgQGFjdGl2YXRlZCA9IGZhbHNlXG4gICAgICAgIEBzdGF0dXMgICAgPSAnJ1xuICAgICAgICBcbiAgICAgICAgc3VwZXIgQGthY2hlbElkXG4gICAgICAgIFxuICAgICAgICBAb25Jbml0S2FjaGVsIEBrYWNoZWxJZFxuICAgICAgICAgICAgICAgIFxuICAgIG9uQXBwOiAoYWN0aW9uLCBhcHApID0+XG4gICAgICAgIFxuICAgICAgICBrbG9nICdvbkFwcCcgYWN0aXZhdGVkLCBhcHBcbiAgICAgICAgQGFjdGl2YXRlZCA9IGFjdGlvbiA9PSAnYWN0aXZhdGVkJ1xuICAgICAgICBAdXBkYXRlRG90KClcblxuICAgIG9uV2luOiAod2lucykgPT5cbiAgICAgICAgXG4gICAgICAgIGtsb2cgJ29uV2luJyB3aW5zXG4gICAgICAgIEBzdGF0dXMgPSAnJ1xuICAgICAgICBmb3IgdyBpbiB3aW5zXG4gICAgICAgICAgICBmb3IgYyBpbiBbJ21heGltaXplZCcgJ25vcm1hbCddXG4gICAgICAgICAgICAgICAgaWYgdy5zdGF0dXMuc3RhcnRzV2l0aCBjXG4gICAgICAgICAgICAgICAgICAgIEBzdGF0dXMgPSB3LnN0YXR1c1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgaWYgdmFsaWQgQHN0YXR1c1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIGlmIGVtcHR5IEBzdGF0dXNcbiAgICAgICAgICAgIGZvciB3IGluIHdpbnNcbiAgICAgICAgICAgICAgICBpZiB3LnN0YXR1cyA9PSAnbWluaW1pemVkJ1xuICAgICAgICAgICAgICAgICAgICBAc3RhdHVzID0gJ21pbmltaXplZCdcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgXG4gICAgICAgIEB1cGRhdGVEb3QoKVxuICAgICAgICBcbiAgICBvbkJvdW5kczogPT5cbiAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJyAjIG9uIHdpbmRvd3MsXG4gICAgICAgICAgICBpZiBkb3QgPSQgJy5hcHBsZG90JyAgICAjIGZvciBzb21lIHJlYXNvbiB0aGUgY29udGVudCBcbiAgICAgICAgICAgICAgICBkb3QucmVtb3ZlKCkgICAgICAgICMgZG9lc24ndCBnZXQgdXBkYXRlZCBpbW1lZGlhdGVseSBvbiByZXNpemUgXG4gICAgICAgICAgICAgICAgQHVwZGF0ZURvdCgpICAgICAgICAjIGlmIHRoZXJlIGlzIGEgZG90IHN2ZyBwcmVzZW50XG4gICAgICAgIFxuICAgICMgMDAwMDAwMCAgICAgMDAwMDAwMCAgIDAwMDAwMDAwMCAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAwMDAwICAgICAwMDAwMDAwICAgICAgMDAwICAgICBcbiAgICBcbiAgICB1cGRhdGVEb3Q6IC0+XG4gICAgICAgIFxuICAgICAgICBkb3QgPSQgJy5hcHBsZG90JyBAZGl2XG4gICAgICAgIFxuICAgICAgICBpZiBAYWN0aXZhdGVkIGFuZCBub3QgZG90XG4gICAgICAgICAgICBkb3QgID0gdXRpbHMuc3ZnIHdpZHRoOjE2IGhlaWdodDoxNiBjbHNzOidhcHBsZG90J1xuICAgICAgICAgICAgZ3JwICA9IHV0aWxzLmFwcGVuZCBkb3QsICdnJ1xuICAgICAgICAgICAgY3JjICA9IHV0aWxzLmFwcGVuZCBncnAsICdjaXJjbGUnIGN4OjAgY3k6MCByOjcgY2xhc3M6J2FwcGxjaXJjbGUnXG4gICAgICAgICAgICBAZGl2LmFwcGVuZENoaWxkIGRvdFxuICAgICAgICBlbHNlIGlmIG5vdCBAYWN0aXZhdGVkIGFuZCBkb3RcbiAgICAgICAgICAgIGRvdD8ucmVtb3ZlKClcbiAgICAgICAgICAgIGRvdCA9IG51bGxcbiAgICAgICAgICAgIFxuICAgICAgICBpZiBkb3RcbiAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QucmVtb3ZlICd0b3AnXG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LnJlbW92ZSAnbm9ybWFsJ1xuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5yZW1vdmUgJ21pbmltaXplZCdcbiAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QucmVtb3ZlICdtYXhpbWl6ZWQnXG4gICAgICAgICAgICBpZiB2YWxpZCBAc3RhdHVzXG4gICAgICAgICAgICAgICAgZm9yIHMgaW4gQHN0YXR1cy5zcGxpdCAnICdcbiAgICAgICAgICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5hZGQgc1xuICAgICAgICBcbiAgICAjICAwMDAwMDAwICAwMDAgICAgICAwMDAgICAwMDAwMDAwICAwMDAgICAwMDAgIFxuICAgICMgMDAwICAgICAgIDAwMCAgICAgIDAwMCAgMDAwICAgICAgIDAwMCAgMDAwICAgXG4gICAgIyAwMDAgICAgICAgMDAwICAgICAgMDAwICAwMDAgICAgICAgMDAwMDAwMCAgICBcbiAgICAjIDAwMCAgICAgICAwMDAgICAgICAwMDAgIDAwMCAgICAgICAwMDAgIDAwMCAgIFxuICAgICMgIDAwMDAwMDAgIDAwMDAwMDAgIDAwMCAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgXG4gICAgICAgICAgICAgICAgXG4gICAgb25MZWZ0Q2xpY2s6ID0+IEBvcGVuQXBwIEBrYWNoZWxJZFxuICAgIG9uUmlnaHRDbGljazogPT4gd3h3ICdtaW5pbWl6ZScgc2xhc2guZmlsZSBAa2FjaGVsSWRcbiAgICBvbk1pZGRsZUNsaWNrOiA9PiB3eHcgJ3Rlcm1pbmF0ZScgQGthY2hlbElkXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICMgMDAwICAwMDAgICAwMDAgIDAwMCAgMDAwMDAwMDAwICBcbiAgICAjIDAwMCAgMDAwMCAgMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgIDAwMCAwIDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAwMDAgIDAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgMDAwICAgMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgXG4gICAgb25Jbml0S2FjaGVsOiAoQGthY2hlbElkKSA9PlxuICAgICAgICAgICAgXG4gICAgICAgIGljb25EaXIgPSBzbGFzaC5qb2luIHBvc3QuZ2V0KCd1c2VyRGF0YScpLCAnaWNvbnMnXG4gICAgICAgIGFwcE5hbWUgPSBzbGFzaC5iYXNlIEBrYWNoZWxJZFxuICAgICAgICBpY29uUGF0aCA9IFwiI3tpY29uRGlyfS8je2FwcE5hbWV9LnBuZ1wiXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIGlmIG5vdCBzbGFzaC5pc0ZpbGUgaWNvblBhdGhcbiAgICAgICAgICAgIEByZWZyZXNoSWNvbigpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBzZXRJY29uIGljb25QYXRoXG4gICAgICAgICAgIFxuICAgICAgICBiYXNlID0gc2xhc2guYmFzZSBAa2FjaGVsSWRcbiAgICAgICAgaWYgYmFzZSBpbiBbJ0NhbGVuZGFyJ11cbiAgICAgICAgICAgIG1pbnV0ZXMgPSB7Q2FsZW5kYXI6NjB9W2Jhc2VdXG4gICAgICAgICAgICBAcmVmcmVzaEljb24oKVxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwgQHJlZnJlc2hJY29uLCAxMDAwKjYwKm1pbnV0ZXNcbiAgICAgICAgICAgIFxuICAgICMgMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIFxuICAgICMgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAwICAwMDAgIFxuICAgICMgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgMCAwMDAgIFxuICAgICMgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgIDAwMDAgIFxuICAgICMgMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIFxuICAgICAgICBcbiAgICByZWZyZXNoSWNvbjogPT5cbiAgICAgICAgXG4gICAgICAgIGljb25EaXIgPSBzbGFzaC5qb2luIHBvc3QuZ2V0KCd1c2VyRGF0YScpLCAnaWNvbnMnXG4gICAgICAgIGFwcE5hbWUgPSBzbGFzaC5iYXNlIEBrYWNoZWxJZFxuICAgICAgICBwbmdQYXRoID0gc2xhc2gucmVzb2x2ZSBzbGFzaC5qb2luIGljb25EaXIsIGFwcE5hbWUgKyBcIi5wbmdcIlxuICAgICAgICBcbiAgICAgICAgYXBwSWNvbiBAa2FjaGVsSWQsIHBuZ1BhdGhcbiAgICAgICAgQHNldEljb24gcG5nUGF0aFxuICAgICAgICBcbiAgICAgICAgYmFzZSA9IHNsYXNoLmJhc2UgQGthY2hlbElkXG4gICAgICAgIGlmIGJhc2UgaW4gWydDYWxlbmRhciddXG4gICAgICAgICAgICBAZGl2LmNoaWxkcmVuWzBdLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgICAgICAgICB0aW1lID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgZGF5ID0gZWxlbSBjbGFzczonY2FsZW5kYXJEYXknIHRleHQ6a3N0ci5scGFkIHRpbWUuZ2V0RGF0ZSgpLCAyLCAnMCdcbiAgICAgICAgICAgIG10aCA9IGVsZW0gY2xhc3M6J2NhbGVuZGFyTW9udGgnIHRleHQ6WydKQU4nICdGRUInICdNQVInICdBUFInICdNQVknICdKVU4nICdKVUwnICdBVUcnICdTRVAnICdPQ1QnICdOT1YnICdERUMnXVt0aW1lLmdldE1vbnRoKCldXG4gICAgICAgICAgICBAZGl2LmFwcGVuZENoaWxkIGVsZW0gY2xhc3M6J2NhbGVuZGFySWNvbicgY2hpbGRyZW46IFttdGgsIGRheV1cbiAgICAgICAgICAgICAgICBcbiAgICBzZXRJY29uOiAoaWNvblBhdGgpID0+XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWYgbm90IGljb25QYXRoXG4gICAgICAgIHN1cGVyXG4gICAgICAgIEB1cGRhdGVEb3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxcbiJdfQ==
//# sourceURL=../coffee/appl.coffee