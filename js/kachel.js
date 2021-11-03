// koffee 1.14.0

/*
000   000   0000000    0000000  000   000  00000000  000        
000  000   000   000  000       000   000  000       000        
0000000    000000000  000       000000000  0000000   000        
000  000   000   000  000       000   000  000       000        
000   000  000   000   0000000  000   000  00000000  0000000
 */
var $, Kachel, app, elem, keyinfo, open, os, ref, slash, stopEvent,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ref = require('kxk'), $ = ref.$, app = ref.app, elem = ref.elem, keyinfo = ref.keyinfo, open = ref.open, os = ref.os, slash = ref.slash, stopEvent = ref.stopEvent;

Kachel = (function() {
    function Kachel(kachelId) {
        this.kachelId = kachelId != null ? kachelId : 'kachel';
        this.onMouseDown = bind(this.onMouseDown, this);
        this.onBlur = bind(this.onBlur, this);
        this.onFocus = bind(this.onFocus, this);
        this.onLeave = bind(this.onLeave, this);
        this.onHover = bind(this.onHover, this);
        this.setIcon = bind(this.setIcon, this);
        this.onContextMenu = bind(this.onContextMenu, this);
        this.onKeyDown = bind(this.onKeyDown, this);
        this.main = $('#main');
        this.div = elem({
            "class": "kachel " + this.constructor.name
        });
        this.div.setAttribute('tabindex', '0');
        this.div.onkeydown = this.onKeyDown;
        this.div.onmousedown = this.onMouseDown;
        this.div.onmouseenter = this.onHover;
        this.div.onmouseleave = this.onLeave;
        this.div.onfocus = this.onFocus;
        this.div.onblur = this.onBlur;
        this.main.appendChild(this.div);
        this.div.kachel = this;
    }

    Kachel.prototype.onKeyDown = function(event) {
        var key, ref1;
        key = keyinfo.forEvent(event).key;
        switch (key) {
            case 'enter':
                return this.onLeftClick(event);
            case 'left':
            case 'right':
            case 'up':
            case 'down':
                return (ref1 = this.neighborKachel(key)) != null ? ref1.focus() : void 0;
        }
    };

    Kachel.prototype.neighborKachel = function(direction) {
        var br, ref1, ref2;
        br = this.div.getBoundingClientRect();
        if (br.width < 100) {
            switch (direction) {
                case 'down':
                    return (ref1 = this.div.nextSibling) != null ? ref1.nextSibling : void 0;
                case 'up':
                    return (ref2 = this.div.previousSibling) != null ? ref2.previousSibling : void 0;
            }
        }
        switch (direction) {
            case 'left':
            case 'up':
                return this.div.previousSibling;
            case 'right':
            case 'down':
                return this.div.nextSibling;
        }
    };

    Kachel.prototype.onContextMenu = function(event) {
        return stopEvent(event);
    };

    Kachel.prototype.setIcon = function(iconPath, clss) {
        var img;
        if (clss == null) {
            clss = 'applicon';
        }
        if (!iconPath) {
            return;
        }
        img = elem('img', {
            "class": clss,
            src: slash.fileUrl(slash.path(iconPath))
        });
        img.ondragstart = function() {
            return false;
        };
        this.div.innerHTML = '';
        return this.div.appendChild(img);
    };

    Kachel.prototype.openApp = function(app) {
        var infos;
        if (os.platform() === 'win32') {
            infos = wxw('info', slash.file(app));
            if (infos.length) {
                return wxw('focus', slash.file(app));
            } else {
                return open(slash.unslash(app));
            }
        } else {
            return open(app);
        }
    };

    Kachel.prototype.onHover = function(event) {
        return this.div.classList.add('kachelHover');
    };

    Kachel.prototype.onLeave = function(event) {
        return this.div.classList.remove('kachelHover');
    };

    Kachel.prototype.onFocus = function(event) {
        return this.div.classList.add('kachelFocus');
    };

    Kachel.prototype.onBlur = function(event) {
        return this.div.classList.remove('kachelFocus');
    };

    Kachel.prototype.onMouseDown = function(event) {
        switch (event.button) {
            case 0:
                return this.onLeftClick(event);
            case 1:
                return this.onMiddleClick(event);
            case 2:
                return this.onRightClick(event);
        }
    };

    Kachel.prototype.onLeftClick = function() {};

    Kachel.prototype.onMiddleClick = function() {};

    Kachel.prototype.onRightClick = function() {};

    return Kachel;

})();

module.exports = Kachel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FjaGVsLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsia2FjaGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSw4REFBQTtJQUFBOztBQVFBLE1BQXdELE9BQUEsQ0FBUSxLQUFSLENBQXhELEVBQUUsU0FBRixFQUFLLGFBQUwsRUFBVSxlQUFWLEVBQWdCLHFCQUFoQixFQUF5QixlQUF6QixFQUErQixXQUEvQixFQUFtQyxpQkFBbkMsRUFBMEM7O0FBRXBDO0lBRUMsZ0JBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSw4QkFBRCxXQUFVOzs7Ozs7Ozs7UUFFVixJQUFDLENBQUEsSUFBRCxHQUFPLENBQUEsQ0FBRSxPQUFGO1FBQ1AsSUFBQyxDQUFBLEdBQUQsR0FBUSxJQUFBLENBQUs7WUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFNLFNBQUEsR0FBVSxJQUFDLENBQUEsV0FBVyxDQUFDLElBQTdCO1NBQUw7UUFDUixJQUFDLENBQUEsR0FBRyxDQUFDLFlBQUwsQ0FBa0IsVUFBbEIsRUFBNkIsR0FBN0I7UUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsR0FBb0IsSUFBQyxDQUFBO1FBQ3JCLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxHQUFvQixJQUFDLENBQUE7UUFDckIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxZQUFMLEdBQW9CLElBQUMsQ0FBQTtRQUNyQixJQUFDLENBQUEsR0FBRyxDQUFDLFlBQUwsR0FBb0IsSUFBQyxDQUFBO1FBQ3JCLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxHQUFvQixJQUFDLENBQUE7UUFDckIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQW9CLElBQUMsQ0FBQTtRQUNyQixJQUFDLENBQUEsSUFBSSxDQUFDLFdBQU4sQ0FBa0IsSUFBQyxDQUFBLEdBQW5CO1FBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQWM7SUFaZjs7cUJBY0gsU0FBQSxH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QWEsS0FBYjtBQURoQixpQkFFUyxDQUZUO3VCQUVnQixJQUFDLENBQUEsYUFBRCxDQUFlLEtBQWY7QUFGaEIsaUJBR1MsQ0FIVDt1QkFHZ0IsSUFBQyxDQUFBLFlBQUQsQ0FBYyxLQUFkO0FBSGhCO0lBRlM7O3FCQU9iLFdBQUEsR0FBZSxTQUFBLEdBQUE7O3FCQUNmLGFBQUEsR0FBZSxTQUFBLEdBQUE7O3FCQUNmLFlBQUEsR0FBZSxTQUFBLEdBQUE7Ozs7OztBQUVuQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuMDAwICAgMDAwICAgMDAwMDAwMCAgICAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAgICAgICAgIFxuMDAwICAwMDAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAgICAgIFxuMDAwMDAwMCAgICAwMDAwMDAwMDAgIDAwMCAgICAgICAwMDAwMDAwMDAgIDAwMDAwMDAgICAwMDAgICAgICAgIFxuMDAwICAwMDAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAgICAgIFxuMDAwICAgMDAwICAwMDAgICAwMDAgICAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAwMDAwICAgIFxuIyMjXG5cbnsgJCwgYXBwLCBlbGVtLCBrZXlpbmZvLCBvcGVuLCBvcywgc2xhc2gsIHN0b3BFdmVudCB9ID0gcmVxdWlyZSAna3hrJ1xuXG5jbGFzcyBLYWNoZWxcblxuICAgIEA6IChAa2FjaGVsSWQ9J2thY2hlbCcpIC0+XG4gICAgXG4gICAgICAgIEBtYWluID0kICcjbWFpbidcbiAgICAgICAgQGRpdiAgPSBlbGVtIGNsYXNzOlwia2FjaGVsICN7QGNvbnN0cnVjdG9yLm5hbWV9XCIgXG4gICAgICAgIEBkaXYuc2V0QXR0cmlidXRlICd0YWJpbmRleCcgJzAnXG4gICAgICAgIEBkaXYub25rZXlkb3duICAgID0gQG9uS2V5RG93blxuICAgICAgICBAZGl2Lm9ubW91c2Vkb3duICA9IEBvbk1vdXNlRG93blxuICAgICAgICBAZGl2Lm9ubW91c2VlbnRlciA9IEBvbkhvdmVyXG4gICAgICAgIEBkaXYub25tb3VzZWxlYXZlID0gQG9uTGVhdmVcbiAgICAgICAgQGRpdi5vbmZvY3VzICAgICAgPSBAb25Gb2N1c1xuICAgICAgICBAZGl2Lm9uYmx1ciAgICAgICA9IEBvbkJsdXJcbiAgICAgICAgQG1haW4uYXBwZW5kQ2hpbGQgQGRpdlxuICAgICAgICBAZGl2LmthY2hlbCA9IEBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgb25LZXlEb3duOiAoZXZlbnQpID0+IFxuICAgIFxuICAgICAgICBrZXkgPSBrZXlpbmZvLmZvckV2ZW50KGV2ZW50KS5rZXlcbiAgICAgICAgc3dpdGNoIGtleVxuICAgICAgICAgICAgd2hlbiAnZW50ZXInICB0aGVuIEBvbkxlZnRDbGljayBldmVudFxuICAgICAgICAgICAgd2hlbiAnbGVmdCcgJ3JpZ2h0JyAndXAnICdkb3duJ1xuICAgICAgICAgICAgICAgIEBuZWlnaGJvckthY2hlbChrZXkpPy5mb2N1cygpXG4gICAgICAgICAgICAgICAgXG4gICAgbmVpZ2hib3JLYWNoZWw6IChkaXJlY3Rpb24pIC0+XG4gICAgICAgIFxuICAgICAgICBiciA9IEBkaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgaWYgYnIud2lkdGggPCAxMDBcbiAgICAgICAgICAgIHN3aXRjaCBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICB3aGVuICdkb3duJyB0aGVuIHJldHVybiBAZGl2Lm5leHRTaWJsaW5nPy5uZXh0U2libGluZ1xuICAgICAgICAgICAgICAgIHdoZW4gJ3VwJyAgIHRoZW4gcmV0dXJuIEBkaXYucHJldmlvdXNTaWJsaW5nPy5wcmV2aW91c1NpYmxpbmdcblxuICAgICAgICBzd2l0Y2ggZGlyZWN0aW9uXG4gICAgICAgICAgICB3aGVuICdsZWZ0JyAgJ3VwJyAgICB0aGVuIEBkaXYucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICB3aGVuICdyaWdodCcgJ2Rvd24nICB0aGVuIEBkaXYubmV4dFNpYmxpbmdcbiAgICAgICAgICAgIFxuICAgICMgMDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMCAgMDAwMDAwMDAwXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgICAwMDAgICBcbiAgICAjIDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMCAwMCAwMCAgMDAwICAgMDAwICAwMDAwMDAwICAgMDAwMDAwMCAgICAgIDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAgICAgMDAwIDAwMDAgICAwMDAgICAwMDAgIDAwMCAgICAgICAgICAgIDAwMCAgICAgMDAwICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMDAwMDAwICAgMDAwMDAgMDAgICAwMDAwMDAwICAgMDAwMDAwMDAgIDAwMDAwMDAgICAgICAwMDAgICBcbiAgICBcbiAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQpID0+IHN0b3BFdmVudCBldmVudCBcbiAgICBcbiAgICAjIDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICBcbiAgICAjIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwMCAgMDAwICBcbiAgICAjIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwIDAgMDAwICBcbiAgICAjIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAwMDAwICBcbiAgICAjIDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICBcbiAgICBcbiAgICBzZXRJY29uOiAoaWNvblBhdGgsIGNsc3M9J2FwcGxpY29uJykgPT5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZiBub3QgaWNvblBhdGhcbiAgICAgICAgaW1nID0gZWxlbSAnaW1nJyBjbGFzczpjbHNzLCBzcmM6c2xhc2guZmlsZVVybCBzbGFzaC5wYXRoIGljb25QYXRoXG4gICAgICAgIGltZy5vbmRyYWdzdGFydCA9IC0+IGZhbHNlXG4gICAgICAgIEBkaXYuaW5uZXJIVE1MID0gJydcbiAgICAgICAgQGRpdi5hcHBlbmRDaGlsZCBpbWdcblxuICAgICMgIDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAwICAwMDAgICAwMDAgICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIFxuICAgICMgMDAwICAgMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgMCAwMDAgIDAwMDAwMDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAwMDAgIDAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgIFxuICAgICMgIDAwMDAwMDAgICAwMDAgICAgICAgIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgIFxuICAgIFxuICAgIG9wZW5BcHA6IChhcHApIC0+XG4gICAgICAgIFxuICAgICAgICBpZiBvcy5wbGF0Zm9ybSgpID09ICd3aW4zMidcbiAgICAgICAgICAgIGluZm9zID0gd3h3ICdpbmZvJyBzbGFzaC5maWxlIGFwcFxuICAgICAgICAgICAgaWYgaW5mb3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgd3h3ICdmb2N1cycgc2xhc2guZmlsZSBhcHBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBvcGVuIHNsYXNoLnVuc2xhc2ggYXBwXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG9wZW4gYXBwXG4gICAgICAgIFxuICAgICMgMDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAwICBcbiAgICAjIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAwMDAwICAgIDAwMCAwMDAgICAwMDAwMDAwICAgMDAwIDAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAgICAgICAgIDAwMCAgICAgMDAwICAgICAgIDAwMCAgMDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMDAwMDAwICAgICAgMCAgICAgIDAwMDAwMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgXG4gICAgXG4gICAgb25Ib3ZlcjogKGV2ZW50KSA9PiBAZGl2LmNsYXNzTGlzdC5hZGQgJ2thY2hlbEhvdmVyJ1xuICAgIG9uTGVhdmU6IChldmVudCkgPT4gQGRpdi5jbGFzc0xpc3QucmVtb3ZlICdrYWNoZWxIb3ZlcidcbiAgICBvbkZvY3VzOiAoZXZlbnQpID0+IEBkaXYuY2xhc3NMaXN0LmFkZCAna2FjaGVsRm9jdXMnXG4gICAgb25CbHVyOiAgKGV2ZW50KSA9PiBAZGl2LmNsYXNzTGlzdC5yZW1vdmUgJ2thY2hlbEZvY3VzJ1xuICAgICAgIFxuICAgIG9uTW91c2VEb3duOiAoZXZlbnQpID0+XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggZXZlbnQuYnV0dG9uXG4gICAgICAgICAgICB3aGVuIDAgdGhlbiBAb25MZWZ0Q2xpY2sgZXZlbnRcbiAgICAgICAgICAgIHdoZW4gMSB0aGVuIEBvbk1pZGRsZUNsaWNrIGV2ZW50XG4gICAgICAgICAgICB3aGVuIDIgdGhlbiBAb25SaWdodENsaWNrIGV2ZW50XG4gICAgXG4gICAgb25MZWZ0Q2xpY2s6ICAgLT4gIyB0byBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXNcbiAgICBvbk1pZGRsZUNsaWNrOiAtPiAjIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3Nlc1xuICAgIG9uUmlnaHRDbGljazogIC0+ICMgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzXG4gICAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBLYWNoZWxcbiJdfQ==
//# sourceURL=../coffee/kachel.coffee