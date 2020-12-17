// koffee 1.14.0

/*
000   000   0000000    0000000  000   000  00000000  000        
000  000   000   000  000       000   000  000       000        
0000000    000000000  000       000000000  0000000   000        
000  000   000   000  000       000   000  000       000        
000   000  000   000   0000000  000   000  00000000  0000000
 */
var $, Kachel, app, drag, elem, klog, open, os, ref, slash, stopEvent,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ref = require('kxk'), $ = ref.$, app = ref.app, drag = ref.drag, elem = ref.elem, klog = ref.klog, open = ref.open, os = ref.os, slash = ref.slash, stopEvent = ref.stopEvent;

Kachel = (function() {
    function Kachel(kachelId) {
        this.kachelId = kachelId != null ? kachelId : 'kachel';
        this.onLeave = bind(this.onLeave, this);
        this.onHover = bind(this.onHover, this);
        this.setIcon = bind(this.setIcon, this);
        this.onDragStop = bind(this.onDragStop, this);
        this.onDragMove = bind(this.onDragMove, this);
        this.onDragStart = bind(this.onDragStart, this);
        this.onContextMenu = bind(this.onContextMenu, this);
        this.main = $('#main');
        this.div = elem({
            "class": "kachel " + this.constructor.name
        });
        this.main.appendChild(this.div);
        this.div.addEventListener('mousedown', this.onLeftClick);
    }

    Kachel.prototype.onContextMenu = function(event) {
        return stopEvent(event);
    };

    Kachel.prototype.onDragStart = function(drag, event) {
        return klog('onDragStart');
    };

    Kachel.prototype.onDragMove = function(drag, event) {
        return klog('onDragMove');
    };

    Kachel.prototype.onDragStop = function(drag, event) {
        return klog('onDragStop');
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

    Kachel.prototype.onLoad = function() {};

    Kachel.prototype.onShow = function() {};

    Kachel.prototype.onMove = function() {};

    Kachel.prototype.onFocus = function() {};

    Kachel.prototype.onBlur = function() {};

    Kachel.prototype.onMove = function() {};

    Kachel.prototype.onClose = function() {};

    Kachel.prototype.onBounds = function() {};

    Kachel.prototype.onLeftClick = function() {};

    Kachel.prototype.onMiddleClick = function() {};

    Kachel.prototype.onRightClick = function() {};

    return Kachel;

})();

module.exports = Kachel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FjaGVsLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsia2FjaGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSxpRUFBQTtJQUFBOztBQVFBLE1BQTJELE9BQUEsQ0FBUSxLQUFSLENBQTNELEVBQUUsU0FBRixFQUFLLGFBQUwsRUFBVSxlQUFWLEVBQWdCLGVBQWhCLEVBQXNCLGVBQXRCLEVBQTRCLGVBQTVCLEVBQWtDLFdBQWxDLEVBQXNDLGlCQUF0QyxFQUE2Qzs7QUFFdkM7SUFFQyxnQkFBQyxRQUFEO1FBQUMsSUFBQyxDQUFBLDhCQUFELFdBQVU7Ozs7Ozs7O1FBRVYsSUFBQyxDQUFBLElBQUQsR0FBTyxDQUFBLENBQUUsT0FBRjtRQUNQLElBQUMsQ0FBQSxHQUFELEdBQVEsSUFBQSxDQUFLO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTSxTQUFBLEdBQVUsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUE3QjtTQUFMO1FBRVIsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFOLENBQWtCLElBQUMsQ0FBQSxHQUFuQjtRQUVBLElBQUMsQ0FBQSxHQUFHLENBQUMsZ0JBQUwsQ0FBc0IsV0FBdEIsRUFBa0MsSUFBQyxDQUFBLFdBQW5DO0lBUEQ7O3FCQXFCSCxhQUFBLEdBQWUsU0FBQyxLQUFEO2VBQVcsU0FBQSxDQUFVLEtBQVY7SUFBWDs7cUJBUWYsV0FBQSxHQUFhLFNBQUMsSUFBRCxFQUFPLEtBQVA7ZUFFVCxJQUFBLENBQUssYUFBTDtJQUZTOztxQkFJYixVQUFBLEdBQVksU0FBQyxJQUFELEVBQU8sS0FBUDtlQUVSLElBQUEsQ0FBSyxZQUFMO0lBRlE7O3FCQUlaLFVBQUEsR0FBWSxTQUFDLElBQUQsRUFBTyxLQUFQO2VBRVIsSUFBQSxDQUFLLFlBQUw7SUFGUTs7cUJBVVosT0FBQSxHQUFTLFNBQUMsUUFBRCxFQUFXLElBQVg7QUFFTCxZQUFBOztZQUZnQixPQUFLOztRQUVyQixJQUFVLENBQUksUUFBZDtBQUFBLG1CQUFBOztRQUNBLEdBQUEsR0FBTSxJQUFBLENBQUssS0FBTCxFQUFXO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTSxJQUFOO1lBQVksR0FBQSxFQUFJLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBSyxDQUFDLElBQU4sQ0FBVyxRQUFYLENBQWQsQ0FBaEI7U0FBWDtRQUNOLEdBQUcsQ0FBQyxXQUFKLEdBQWtCLFNBQUE7bUJBQUc7UUFBSDtRQUNsQixJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsR0FBaUI7ZUFDakIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLENBQWlCLEdBQWpCO0lBTks7O3FCQWNULE9BQUEsR0FBUyxTQUFDLEdBQUQ7QUFFTCxZQUFBO1FBQUEsSUFBRyxFQUFFLENBQUMsUUFBSCxDQUFBLENBQUEsS0FBaUIsT0FBcEI7WUFDSSxLQUFBLEdBQVEsR0FBQSxDQUFJLE1BQUosRUFBVyxLQUFLLENBQUMsSUFBTixDQUFXLEdBQVgsQ0FBWDtZQUNSLElBQUcsS0FBSyxDQUFDLE1BQVQ7dUJBQ0ksR0FBQSxDQUFJLE9BQUosRUFBWSxLQUFLLENBQUMsSUFBTixDQUFXLEdBQVgsQ0FBWixFQURKO2FBQUEsTUFBQTt1QkFHSSxJQUFBLENBQUssS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUFkLENBQUwsRUFISjthQUZKO1NBQUEsTUFBQTttQkFPSSxJQUFBLENBQUssR0FBTCxFQVBKOztJQUZLOztxQkFpQlQsT0FBQSxHQUFTLFNBQUMsS0FBRDtlQUFXLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQWYsQ0FBbUIsYUFBbkI7SUFBWDs7cUJBQ1QsT0FBQSxHQUFTLFNBQUMsS0FBRDtlQUFXLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQWYsQ0FBc0IsYUFBdEI7SUFBWDs7cUJBRVQsTUFBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsTUFBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsTUFBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsT0FBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsTUFBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsTUFBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsT0FBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsUUFBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsV0FBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsYUFBQSxHQUFlLFNBQUEsR0FBQTs7cUJBQ2YsWUFBQSxHQUFlLFNBQUEsR0FBQTs7Ozs7O0FBRW5CLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAgICAwMDAgICAwMDAwMDAwICAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMCAgICAgICAgXG4wMDAgIDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgXG4wMDAwMDAwICAgIDAwMDAwMDAwMCAgMDAwICAgICAgIDAwMDAwMDAwMCAgMDAwMDAwMCAgIDAwMCAgICAgICAgXG4wMDAgIDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgIDAwMDAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMDAwMDAgICAgXG4jIyNcblxueyAkLCBhcHAsIGRyYWcsIGVsZW0sIGtsb2csIG9wZW4sIG9zLCBzbGFzaCwgc3RvcEV2ZW50IH0gPSByZXF1aXJlICdreGsnXG5cbmNsYXNzIEthY2hlbFxuXG4gICAgQDogKEBrYWNoZWxJZD0na2FjaGVsJykgLT4gXG4gICAgXG4gICAgICAgIEBtYWluID0kICcjbWFpbidcbiAgICAgICAgQGRpdiAgPSBlbGVtIGNsYXNzOlwia2FjaGVsICN7QGNvbnN0cnVjdG9yLm5hbWV9XCIgXG4gICAgICAgIFxuICAgICAgICBAbWFpbi5hcHBlbmRDaGlsZCBAZGl2XG4gICAgICAgIFxuICAgICAgICBAZGl2LmFkZEV2ZW50TGlzdGVuZXIgJ21vdXNlZG93bicgQG9uTGVmdENsaWNrXG4gICAgICAgIFxuICAgICAgICAjIEBkcmFnID0gbmV3IGRyYWdcbiAgICAgICAgICAgICMgdGFyZ2V0OiAgIEBkaXZcbiAgICAgICAgICAgICMgb25TdGFydDogIEBvbkRyYWdTdGFydFxuICAgICAgICAgICAgIyBvbk1vdmU6ICAgQG9uRHJhZ01vdmVcbiAgICAgICAgICAgICMgb25TdG9wOiAgIEBvbkRyYWdTdG9wXG4gICAgICAgICAgICAgICAgXG4gICAgIyAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAwMDAwMDAwMDBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAgICAgICAgIDAwMCAgIFxuICAgICMgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwIDAwIDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICAwMDAwMDAwICAgICAgMDAwICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgMDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAgICAgMDAwICAgICAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMCAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgMDAwMDAwMCAgICAgIDAwMCAgIFxuICAgIFxuICAgIG9uQ29udGV4dE1lbnU6IChldmVudCkgPT4gc3RvcEV2ZW50IGV2ZW50IFxuICAgIFxuICAgICMgMDAwMDAwMCAgICAwMDAwMDAwMCAgICAwMDAwMDAwICAgIDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMDAwMDAgICAgMDAwMDAwMDAwICAwMDAgIDAwMDAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMDAwMDAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgICAwMDAwMDAwICAgXG4gICAgXG4gICAgb25EcmFnU3RhcnQ6IChkcmFnLCBldmVudCkgPT5cbiAgICBcbiAgICAgICAga2xvZyAnb25EcmFnU3RhcnQnXG4gICAgICAgIFxuICAgIG9uRHJhZ01vdmU6IChkcmFnLCBldmVudCkgPT5cbiAgICAgICAgXG4gICAgICAgIGtsb2cgJ29uRHJhZ01vdmUnXG5cbiAgICBvbkRyYWdTdG9wOiAoZHJhZywgZXZlbnQpID0+XG5cbiAgICAgICAga2xvZyAnb25EcmFnU3RvcCdcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgIyAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMDAgIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAwIDAwMCAgXG4gICAgIyAwMDAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgMDAwMCAgXG4gICAgIyAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4gICAgXG4gICAgc2V0SWNvbjogKGljb25QYXRoLCBjbHNzPSdhcHBsaWNvbicpID0+XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWYgbm90IGljb25QYXRoXG4gICAgICAgIGltZyA9IGVsZW0gJ2ltZycgY2xhc3M6Y2xzcywgc3JjOnNsYXNoLmZpbGVVcmwgc2xhc2gucGF0aCBpY29uUGF0aFxuICAgICAgICBpbWcub25kcmFnc3RhcnQgPSAtPiBmYWxzZVxuICAgICAgICBAZGl2LmlubmVySFRNTCA9ICcnXG4gICAgICAgIEBkaXYuYXBwZW5kQ2hpbGQgaW1nXG5cbiAgICAjICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwMCAgMDAwICAgMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwMCAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwMDAwMDAgICAwMDAwMDAwICAgMDAwIDAgMDAwICAwMDAwMDAwMDAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgMDAwICAwMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICBcbiAgICAjICAwMDAwMDAwICAgMDAwICAgICAgICAwMDAwMDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICBcbiAgICBcbiAgICBvcGVuQXBwOiAoYXBwKSAtPlxuICAgICAgICBcbiAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnd2luMzInXG4gICAgICAgICAgICBpbmZvcyA9IHd4dyAnaW5mbycgc2xhc2guZmlsZSBhcHBcbiAgICAgICAgICAgIGlmIGluZm9zLmxlbmd0aFxuICAgICAgICAgICAgICAgIHd4dyAnZm9jdXMnIHNsYXNoLmZpbGUgYXBwXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgb3BlbiBzbGFzaC51bnNsYXNoIGFwcFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBvcGVuIGFwcFxuICAgICAgICBcbiAgICAjIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwMCAgXG4gICAgIyAwMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwMDAwMCAgICAwMDAgMDAwICAgMDAwMDAwMCAgIDAwMCAwIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgICAgICAgICAwMDAgICAgIDAwMCAgICAgICAwMDAgIDAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAwMDAwMCAgICAgIDAgICAgICAwMDAwMDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIFxuICAgIFxuICAgIG9uSG92ZXI6IChldmVudCkgPT4gQGRpdi5jbGFzc0xpc3QuYWRkICdrYWNoZWxIb3ZlcidcbiAgICBvbkxlYXZlOiAoZXZlbnQpID0+IEBkaXYuY2xhc3NMaXN0LnJlbW92ZSAna2FjaGVsSG92ZXInXG4gICAgICAgIFxuICAgIG9uTG9hZDogICAgICAgIC0+ICMgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzXG4gICAgb25TaG93OiAgICAgICAgLT4gIyB0byBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXNcbiAgICBvbk1vdmU6ICAgICAgICAtPiAjIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3Nlc1xuICAgIG9uRm9jdXM6ICAgICAgIC0+ICMgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzXG4gICAgb25CbHVyOiAgICAgICAgLT4gIyB0byBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXNcbiAgICBvbk1vdmU6ICAgICAgICAtPiAjIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3Nlc1xuICAgIG9uQ2xvc2U6ICAgICAgIC0+ICMgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzXG4gICAgb25Cb3VuZHM6ICAgICAgLT4gIyB0byBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXNcbiAgICBvbkxlZnRDbGljazogICAtPiAjIHRvIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3Nlc1xuICAgIG9uTWlkZGxlQ2xpY2s6IC0+ICMgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzXG4gICAgb25SaWdodENsaWNrOiAgLT4gIyB0byBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXNcbiAgICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IEthY2hlbFxuIl19
//# sourceURL=../coffee/kachel.coffee