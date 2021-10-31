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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FjaGVsLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsia2FjaGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSw4REFBQTtJQUFBOztBQVFBLE1BQXdELE9BQUEsQ0FBUSxLQUFSLENBQXhELEVBQUUsU0FBRixFQUFLLGFBQUwsRUFBVSxlQUFWLEVBQWdCLHFCQUFoQixFQUF5QixlQUF6QixFQUErQixXQUEvQixFQUFtQyxpQkFBbkMsRUFBMEM7O0FBRXBDO0lBRUMsZ0JBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSw4QkFBRCxXQUFVOzs7Ozs7OztRQUVWLElBQUMsQ0FBQSxJQUFELEdBQU8sQ0FBQSxDQUFFLE9BQUY7UUFDUCxJQUFDLENBQUEsR0FBRCxHQUFRLElBQUEsQ0FBSztZQUFBLENBQUEsS0FBQSxDQUFBLEVBQU0sU0FBQSxHQUFVLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBN0I7U0FBTDtRQUNSLElBQUMsQ0FBQSxHQUFHLENBQUMsWUFBTCxDQUFrQixVQUFsQixFQUE2QixHQUE3QjtRQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUFvQixJQUFDLENBQUE7UUFDckIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxZQUFMLEdBQW9CLElBQUMsQ0FBQTtRQUNyQixJQUFDLENBQUEsR0FBRyxDQUFDLFlBQUwsR0FBb0IsSUFBQyxDQUFBO1FBQ3JCLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxHQUFvQixJQUFDLENBQUE7UUFDckIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQW9CLElBQUMsQ0FBQTtRQUNyQixJQUFDLENBQUEsSUFBSSxDQUFDLFdBQU4sQ0FBa0IsSUFBQyxDQUFBLEdBQW5CO1FBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQWM7UUFDZCxJQUFDLENBQUEsR0FBRyxDQUFDLGdCQUFMLENBQXNCLFdBQXRCLEVBQWtDLElBQUMsQ0FBQSxXQUFuQztJ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R0FBQTs7Ozs7O0FBRW5CLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAgICAwMDAgICAwMDAwMDAwICAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMCAgICAgICAgXG4wMDAgIDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgXG4wMDAwMDAwICAgIDAwMDAwMDAwMCAgMDAwICAgICAgIDAwMDAwMDAwMCAgMDAwMDAwMCAgIDAwMCAgICAgICAgXG4wMDAgIDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMDAwMDAgICAgXG4jIyNcblxueyAkLCBhcHAsIGVsZW0sIGtleWluZm8sIG9wZW4sIG9zLCBzbGFzaCwgc3RvcEV2ZW50IH0gPSByZXF1aXJlICdreGsnXG5cbmNsYXNzIEthY2hlbFxuXG4gICAgQDogKEBrYWNoZWxJZD0na2FjaGVsJykgLT5cbiAgICBcbiAgICAgICAgQG1haW4gPSQgJyNtYWluJ1xuICAgICAgICBAZGl2ICA9IGVsZW0gY2xhc3M6XCJrYWNoZWwgI3tAY29uc3RydWN0b3IubmFtZX1cIiBcbiAgICAgICAgQGRpdi5zZXRBdHRyaWJ1dGUgJ3RhYmluZGV4JyAnMCdcbiAgICAgICAgQGRpdi5vbmtleWRvd24gICAgPSBAb25LZXlEb3duXG4gICAgICAgIEBkaXYub25tb3VzZWVudGVyID0gQG9uSG92ZXJcbiAgICAgICAgQGRpdi5vbm1vdXNlbGVhdmUgPSBAb25MZWF2ZVxuICAgICAgICBAZGl2Lm9uZm9jdXMgICAgICA9IEBvbkZvY3VzXG4gICAgICAgIEBkaXYub25ibHVyICAgICAgID0gQG9uQmx1clxuICAgICAgICBAbWFpbi5hcHBlbmRDaGlsZCBAZGl2XG4gICAgICAgIEBkaXYua2FjaGVsID0gQFxuICAgICAgICBAZGl2LmFkZEV2ZW50TGlzdGVuZXIgJ21vdXNlZG93bicgQG9uTGVmdENsaWNrXG4gICAgICAgICAgICAgICAgICAgIFxuICAgIG9uS2V5RG93bjogKGV2ZW50KSA9PiBcbiAgICBcbiAgICAgICAga2V5ID0ga2V5aW5mby5mb3JFdmVudChldmVudCkua2V5XG4gICAgICAgIHN3aXRjaCBrZXlcbiAgICAgICAgICAgIHdoZW4gJ2VudGVyJyAgdGhlbiBAb25MZWZ0Q2xpY2sgZXZlbnRcbiAgICAgICAgICAgIHdoZW4gJ2xlZnQnICdyaWdodCcgJ3VwJyAnZG93bidcbiAgICAgICAgICAgICAgICBAbmVpZ2hib3JLYWNoZWwoa2V5KT8uZm9jdXMoKVxuICAgICAgICAgICAgICAgIFxuICAgIG5laWdoYm9yS2FjaGVsOiAoZGlyZWN0aW9uKSAtPlxuICAgICAgICBcbiAgICAgICAgYnIgPSBAZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGlmIGJyLndpZHRoIDwgMTAwXG4gICAgICAgICAgICBzd2l0Y2ggZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgd2hlbiAnZG93bicgdGhlbiByZXR1cm4gQGRpdi5uZXh0U2libGluZz8ubmV4dFNpYmxpbmdcbiAgICAgICAgICAgICAgICB3aGVuICd1cCcgICB0aGVuIHJldHVybiBAZGl2LnByZXZpb3VzU2libGluZz8ucHJldmlvdXNTaWJsaW5nXG5cbiAgICAgICAgc3dpdGNoIGRpcmVjdGlvblxuICAgICAgICAgICAgd2hlbiAnbGVmdCcgICd1cCcgICAgdGhlbiBAZGl2LnByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgd2hlbiAncmlnaHQnICdkb3duJyAgdGhlbiBAZGl2Lm5leHRTaWJsaW5nXG4gICAgICAgICAgICBcbiAgICAjIDAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAgIDAwMDAwMDAwMFxuICAgICMgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAgICAgICAgMDAwICAgXG4gICAgIyAwMDAwMDAwICAgIDAwMDAwMDAgICAwMDAgMDAgMDAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgIDAwMDAwMDAgICAgICAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAwMDAwICAgMDAwICAgMDAwICAwMDAgICAgICAgICAgICAwMDAgICAgIDAwMCAgIFxuICAgICMgMDAwICAgMDAwICAwMDAwMDAwMCAgIDAwMDAwIDAwICAgMDAwMDAwMCAgIDAwMDAwMDAwICAwMDAwMDAwICAgICAgMDAwICAgXG4gICAgXG4gICAgb25Db250ZXh0TWVudTogKGV2ZW50KSA9PiBzdG9wRXZlbnQgZXZlbnQgXG4gICAgXG4gICAgIyAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMDAgIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAwIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgMDAwMCAgXG4gICAgIyAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4gICAgXG4gICAgc2V0SWNvbjogKGljb25QYXRoLCBjbHNzPSdhcHBsaWNvbicpID0+XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWYgbm90IGljb25QYXRoXG4gICAgICAgIGltZyA9IGVsZW0gJ2ltZycgY2xhc3M6Y2xzcywgc3JjOnNsYXNoLmZpbGVVcmwgc2xhc2gucGF0aCBpY29uUGF0aFxuICAgICAgICBpbWcub25kcmFnc3RhcnQgPSAtPiBmYWxzZVxuICAgICAgICBAZGl2LmlubmVySFRNTCA9ICcnXG4gICAgICAgIEBkaXYuYXBwZW5kQ2hpbGQgaW1nXG5cbiAgICAjICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwMCAgMDAwICAgMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwMCAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAgMDAwIDAgMDAwICAwMDAwMDAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgMDAwICAwMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICBcbiAgICAjICAwMDAwMDAwICAgMDAwICAgICAgICAwMDAwMDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICBcbiAgICBcbiAgICBvcGVuQXBwOiAoYXBwKSAtPlxuICAgICAgICBcbiAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnd2luMzInXG4gICAgICAgICAgICBpbmZvcyA9IHd4dyAnaW5mbycgc2xhc2guZmlsZSBhcHBcbiAgICAgICAgICAgIGlmIGluZm9zLmxlbmd0aFxuICAgICAgICAgICAgICAgIHd4dyAnZm9jdXMnIHNsYXNoLmZpbGUgYXBwXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgb3BlbiBzbGFzaC51bnNsYXNoIGFwcFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBvcGVuIGFwcFxuICAgICAgICBcbiAgICAjIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwMCAgXG4gICAgIyAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwMDAwMCAgICAwMDAgMDAwICAgMDAwMDAwMCAgIDAwMCAwIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgICAgICAgICAwMDAgICAgIDAwMCAgICAgICAwMDAgIDAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAwMDAwMCAgICAgIDAgICAgICAwMDAwMDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIFxuICAgIFxuICAgIG9uSG92ZXI6IChldmVudCkgPT4gQGRpdi5jbGFzc0xpc3QuYWRkICdrYWNoZWxIb3ZlcidcbiAgICBvbkxlYXZlOiAoZXZlbnQpID0+IEBkaXYuY2xhc3NMaXN0LnJlbW92ZSAna2FjaGVsSG92ZXInXG4gICAgb25Gb2N1czogKGV2ZW50KSA9PiBAZGl2LmNsYXNzTGlzdC5hZGQgJ2thY2hlbEZvY3VzJ1xuICAgIG9uQmx1cjogIChldmVudCkgPT4gQGRpdi5jbGFzc0xpc3QucmVtb3ZlICdrYWNoZWxGb2N1cydcbiAgICAgICAgXG4gICAgb25MZWZ0Q2xpY2s6ICAgLT4gIyB0byBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXNcbiAgICBvbk1pZGRsZUNsaWNrOiAtPiAjIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3Nlc1xuICAgIG9uUmlnaHRDbGljazogIC0+ICMgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzXG4gICAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBLYWNoZWxcbiJdfQ==
//# sourceURL=../coffee/kachel.coffee