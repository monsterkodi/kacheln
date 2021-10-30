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
        this.div.onmouseenter = this.onHover;
        this.div.onmouseleave = this.onLeave;
        this.div.onfocus = this.onFocus;
        this.div.onblur = this.onBlur;
        this.main.appendChild(this.div);
        this.div.kachel = this;
        this.div.addEventListener('mousedown', this.onLeftClick);
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

    Kachel.prototype.onLeftClick = function() {};

    Kachel.prototype.onMiddleClick = function() {};

    Kachel.prototype.onRightClick = function() {};

    return Kachel;

})();

module.exports = Kachel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FjaGVsLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsia2FjaGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSw4REFBQTtJQUFBOztBQVFBLE1BQXdELE9BQUEsQ0FBUSxLQUFSLENBQXhELEVBQUUsU0FBRixFQUFLLGFBQUwsRUFBVSxlQUFWLEVBQWdCLHFCQUFoQixFQUF5QixlQUF6QixFQUErQixXQUEvQixFQUFtQyxpQkFBbkMsRUFBMEM7O0FBRXBDO0lBRUMsZ0JBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSw4QkFBRCxXQUFVOzs7Ozs7OztRQUVWLElBQUMsQ0FBQSxJQUFELEdBQU8sQ0FBQSxDQUFFLE9BQUY7UUFDUCxJQUFDLENBQUEsR0FBRCxHQUFRLElBQUEsQ0FBSztZQUFBLENBQUEsS0FBQSxDQUFBLEVBQU0sU0FBQSxHQUFVLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBN0I7U0FBTDtRQUNSLElBQUMsQ0FBQSxHQUFHLENBQUMsWUFBTCxDQUFrQixVQUFsQixFQUE2QixHQUE3QjtRQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUFvQixJQUFDLENBQUE7UUFDckIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxZQUFMLEdBQW9CLElBQUMsQ0FBQTtRQUNyQixJQUFDLENBQUEsR0FBRyxDQUFDLFlBQUwsR0FBb0IsSUFBQyxDQUFBO1FBQ3JCLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxHQUFvQixJQUFDLENBQUE7UUFDckIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQW9CLElBQUMsQ0FBQTtRQUNyQixJQUFDLENBQUEsSUFBSSxDQUFDLFdBQU4sQ0FBa0IsSUFBQyxDQUFBLEdBQW5CO1FBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQWM7UUFDZCxJQUFDLENBQUEsR0FBRyxDQUFDLGdCQUFMLENBQXNCLFdBQXRCLEVBQWtDLElBQUMsQ0FBQSxXQUFuQztJ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R0FBQTs7Ozs7O0FBRW5CLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAgICAwMDAgICAwMDAwMDAwICAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMCAgICAgICAgXG4wMDAgIDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgXG4wMDAwMDAwICAgIDAwMDAwMDAwMCAgMDAwICAgICAgIDAwMDAwMDAwMCAgMDAwMDAwMCAgIDAwMCAgICAgICAgXG4wMDAgIDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMDAwMDAgICAgXG4jIyNcblxueyAkLCBhcHAsIGVsZW0sIGtleWluZm8sIG9wZW4sIG9zLCBzbGFzaCwgc3RvcEV2ZW50IH0gPSByZXF1aXJlICdreGsnXG5cbmNsYXNzIEthY2hlbFxuXG4gICAgQDogKEBrYWNoZWxJZD0na2FjaGVsJykgLT4gXG4gICAgXG4gICAgICAgIEBtYWluID0kICcjbWFpbidcbiAgICAgICAgQGRpdiAgPSBlbGVtIGNsYXNzOlwia2FjaGVsICN7QGNvbnN0cnVjdG9yLm5hbWV9XCIgXG4gICAgICAgIEBkaXYuc2V0QXR0cmlidXRlICd0YWJpbmRleCcgJzAnXG4gICAgICAgIEBkaXYub25rZXlkb3duICAgID0gQG9uS2V5RG93blxuICAgICAgICBAZGl2Lm9ubW91c2VlbnRlciA9IEBvbkhvdmVyXG4gICAgICAgIEBkaXYub25tb3VzZWxlYXZlID0gQG9uTGVhdmVcbiAgICAgICAgQGRpdi5vbmZvY3VzICAgICAgPSBAb25Gb2N1c1xuICAgICAgICBAZGl2Lm9uYmx1ciAgICAgICA9IEBvbkJsdXJcbiAgICAgICAgQG1haW4uYXBwZW5kQ2hpbGQgQGRpdlxuICAgICAgICBAZGl2LmthY2hlbCA9IEBcbiAgICAgICAgQGRpdi5hZGRFdmVudExpc3RlbmVyICdtb3VzZWRvd24nIEBvbkxlZnRDbGlja1xuICAgICAgICAgICAgICAgICAgICBcbiAgICBvbktleURvd246IChldmVudCkgPT4gXG4gICAgXG4gICAgICAgIGtleSA9IGtleWluZm8uZm9yRXZlbnQoZXZlbnQpLmtleVxuICAgICAgICBzd2l0Y2gga2V5XG4gICAgICAgICAgICB3aGVuICdlbnRlcicgIHRoZW4gQG9uTGVmdENsaWNrIGV2ZW50XG4gICAgICAgICAgICB3aGVuICdsZWZ0JyAncmlnaHQnICd1cCcgJ2Rvd24nXG4gICAgICAgICAgICAgICAgQG5laWdoYm9yS2FjaGVsKGtleSk/LmZvY3VzKClcbiAgICAgICAgICAgICAgICBcbiAgICBuZWlnaGJvckthY2hlbDogKGRpcmVjdGlvbikgLT5cbiAgICAgICAgXG4gICAgICAgIGJyID0gQGRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBpZiBici53aWR0aCA8IDEwMFxuICAgICAgICAgICAgc3dpdGNoIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgIHdoZW4gJ2Rvd24nIHRoZW4gcmV0dXJuIEBkaXYubmV4dFNpYmxpbmc/Lm5leHRTaWJsaW5nXG4gICAgICAgICAgICAgICAgd2hlbiAndXAnICAgdGhlbiByZXR1cm4gQGRpdi5wcmV2aW91c1NpYmxpbmc/LnByZXZpb3VzU2libGluZ1xuXG4gICAgICAgIHN3aXRjaCBkaXJlY3Rpb25cbiAgICAgICAgICAgIHdoZW4gJ2xlZnQnICAndXAnICAgIHRoZW4gQGRpdi5wcmV2aW91c1NpYmxpbmdcbiAgICAgICAgICAgIHdoZW4gJ3JpZ2h0JyAnZG93bicgIHRoZW4gQGRpdi5uZXh0U2libGluZ1xuICAgICAgICAgICAgXG4gICAgIyAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAwMDAwMDAwMDBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAgICAgICAgIDAwMCAgIFxuICAgICMgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwIDAwIDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICAwMDAwMDAwICAgICAgMDAwICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgMDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAgICAgMDAwICAgICAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMCAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgMDAwMDAwMCAgICAgIDAwMCAgIFxuICAgIFxuICAgIG9uQ29udGV4dE1lbnU6IChldmVudCkgPT4gc3RvcEV2ZW50IGV2ZW50IFxuICAgIFxuICAgICMgMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIFxuICAgICMgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAwICAwMDAgIFxuICAgICMgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgMCAwMDAgIFxuICAgICMgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgIDAwMDAgIFxuICAgICMgMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIFxuICAgIFxuICAgIHNldEljb246IChpY29uUGF0aCwgY2xzcz0nYXBwbGljb24nKSA9PlxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGlmIG5vdCBpY29uUGF0aFxuICAgICAgICBpbWcgPSBlbGVtICdpbWcnIGNsYXNzOmNsc3MsIHNyYzpzbGFzaC5maWxlVXJsIHNsYXNoLnBhdGggaWNvblBhdGhcbiAgICAgICAgaW1nLm9uZHJhZ3N0YXJ0ID0gLT4gZmFsc2VcbiAgICAgICAgQGRpdi5pbm5lckhUTUwgPSAnJ1xuICAgICAgICBAZGl2LmFwcGVuZENoaWxkIGltZ1xuXG4gICAgIyAgMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMDAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgICAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAwIDAwMCAgMDAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgIDAwMCAgMDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAgXG4gICAgIyAgMDAwMDAwMCAgIDAwMCAgICAgICAgMDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgIDAwMCAgICAgICAgXG4gICAgXG4gICAgb3BlbkFwcDogKGFwcCkgLT5cbiAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgaW5mb3MgPSB3eHcgJ2luZm8nIHNsYXNoLmZpbGUgYXBwXG4gICAgICAgICAgICBpZiBpbmZvcy5sZW5ndGhcbiAgICAgICAgICAgICAgICB3eHcgJ2ZvY3VzJyBzbGFzaC5maWxlIGFwcFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG9wZW4gc2xhc2gudW5zbGFzaCBhcHBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgb3BlbiBhcHBcbiAgICAgICAgXG4gICAgIyAwMDAwMDAwMCAgMDAwICAgMDAwICAwMDAwMDAwMCAgMDAwICAgMDAwICAwMDAwMDAwMDAgIFxuICAgICMgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMDAwMDAgICAgMDAwIDAwMCAgIDAwMDAwMDAgICAwMDAgMCAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgICAgICAgICAgMDAwICAgICAwMDAgICAgICAgMDAwICAwMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwMDAwMDAgICAgICAwICAgICAgMDAwMDAwMDAgIDAwMCAgIDAwMCAgICAgMDAwICAgICBcbiAgICBcbiAgICBvbkhvdmVyOiAoZXZlbnQpID0+IEBkaXYuY2xhc3NMaXN0LmFkZCAna2FjaGVsSG92ZXInXG4gICAgb25MZWF2ZTogKGV2ZW50KSA9PiBAZGl2LmNsYXNzTGlzdC5yZW1vdmUgJ2thY2hlbEhvdmVyJ1xuICAgIG9uRm9jdXM6IChldmVudCkgPT4gQGRpdi5jbGFzc0xpc3QuYWRkICdrYWNoZWxGb2N1cydcbiAgICBvbkJsdXI6ICAoZXZlbnQpID0+IEBkaXYuY2xhc3NMaXN0LnJlbW92ZSAna2FjaGVsRm9jdXMnXG4gICAgICAgIFxuICAgIG9uTGVmdENsaWNrOiAgIC0+ICMgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzXG4gICAgb25NaWRkbGVDbGljazogLT4gIyB0byBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXNcbiAgICBvblJpZ2h0Q2xpY2s6ICAtPiAjIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3Nlc1xuICAgICAgICBcbm1vZHVsZS5leHBvcnRzID0gS2FjaGVsXG4iXX0=
//# sourceURL=../coffee/kachel.coffee