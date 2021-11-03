// koffee 1.14.0

/*
000   000   0000000   000      000   000  00     00  00000000  
000   000  000   000  000      000   000  000   000  000       
 000 000   000   000  000      000   000  000000000  0000000   
   000     000   000  000      000   000  000 0 000  000       
    0       0000000   0000000   0000000   000   000  00000000
 */
var Kachel, Volume, childp, clamp, drag, kpos, ref, utils, wxw,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ref = require('kxk'), childp = ref.childp, clamp = ref.clamp, drag = ref.drag, kpos = ref.kpos;

wxw = require('wxw');

utils = require('./utils');

Kachel = require('./kachel');

Volume = (function(superClass) {
    extend(Volume, superClass);

    function Volume(kachelId) {
        this.kachelId = kachelId != null ? kachelId : 'volume';
        this.onRightClick = bind(this.onRightClick, this);
        this.checkVolume = bind(this.checkVolume, this);
        this.onWheel = bind(this.onWheel, this);
        this.setVolumeAtEvent = bind(this.setVolumeAtEvent, this);
        this.onLeftClick = bind(this.onLeftClick, this);
        Volume.__super__.constructor.call(this, this.kachelId);
        this.mute = false;
        this.div.addEventListener('mousewheel', this.onWheel);
        this.volume = this.getVolume();
        this.folume = this.volume;
        setInterval(this.checkVolume, 1000);
        this.onLoad();
        this.drag = new drag({
            target: this.div,
            handle: this.div,
            stopEvent: false,
            onStart: (function(_this) {
                return function(drag, event) {
                    if (event.button === 0) {
                        return _this.setVolumeAtEvent(event);
                    }
                };
            })(this),
            onMove: (function(_this) {
                return function(drag, event) {
                    if (event.button === 0) {
                        return _this.setVolumeAtEvent(event);
                    }
                };
            })(this)
        });
    }

    Volume.prototype.onLeftClick = function(event) {};

    Volume.prototype.setVolumeAtEvent = function(event) {
        var br, ctr, rot, vec;
        br = this.div.getBoundingClientRect();
        ctr = kpos(br.left, br.top).plus(kpos(br.width, br.height).times(0.5));
        vec = ctr.to(kpos(event));
        rot = vec.normal().rotation(kpos(0, -1));
        return this.setVolume(50 + rot / 3);
    };

    Volume.prototype.onWheel = function(event) {
        if (event.deltaY === 0) {
            return;
        }
        this.folume -= event.deltaY / 100;
        this.folume = clamp(0, 100, this.folume);
        return this.setVolume(this.folume);
    };

    Volume.prototype.getVolume = function() {
        return parseInt(wxw('volume'));
    };

    Volume.prototype.setVolume = function(v) {
        v = parseInt(clamp(0, 100, v));
        if (v !== this.volume) {
            this.volume = v;
            this.mute = false;
            this.updateVolume();
            return childp.exec("osascript -e \"set volume output volume " + this.volume + "\"");
        }
    };

    Volume.prototype.checkVolume = function() {
        var volume;
        volume = this.getVolume();
        if (volume !== this.volume) {
            this.setVolume(volume);
        }
        return this.folume = this.volume;
    };

    Volume.prototype.onRightClick = function(event) {
        if (this.mute) {
            this.mute = false;
            childp.exec('osascript -e "set volume without output muted"');
        } else {
            this.mute = true;
            childp.exec('osascript -e "set volume with output muted"');
        }
        return this.updateVolume();
    };

    Volume.prototype.onLoad = function() {
        var face, i, m, svg;
        svg = utils.svg({
            clss: 'volume'
        });
        this.div.appendChild(svg);
        utils.circle({
            radius: 40,
            clss: 'scala',
            svg: svg
        });
        face = utils.circle({
            radius: 36,
            clss: 'knob',
            svg: svg
        });
        for (m = i = 1; i <= 11; m = ++i) {
            utils.append(face, 'line', {
                "class": 'volmrk',
                y1: 40,
                y2: 47,
                transform: "rotate(" + (30 * m * 5) + ")"
            });
        }
        this.voldot = utils.append(face, 'circle', {
            r: 5,
            cx: 0,
            cy: -25,
            "class": 'voldot'
        });
        return this.updateVolume();
    };

    Volume.prototype.updateVolume = function() {
        var angle;
        angle = 150 * (this.volume - 50) / 50;
        this.voldot.setAttribute('transform', "rotate(" + angle + ")");
        return this.voldot.classList.toggle('mute', this.mute);
    };

    return Volume;

})(Kachel);

module.exports = Volume;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW1lLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsidm9sdW1lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSwwREFBQTtJQUFBOzs7O0FBUUEsTUFBZ0MsT0FBQSxDQUFRLEtBQVIsQ0FBaEMsRUFBRSxtQkFBRixFQUFVLGlCQUFWLEVBQWlCLGVBQWpCLEVBQXVCOztBQUV2QixHQUFBLEdBQVUsT0FBQSxDQUFRLEtBQVI7O0FBQ1YsS0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSOztBQUNWLE1BQUEsR0FBVSxPQUFBLENBQVEsVUFBUjs7QUFFSjs7O0lBRUMsZ0JBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSw4QkFBRCxXQUFVOzs7Ozs7UUFFVix3Q0FBTSxJQUFDLENBQUEsUUFBUDtRQUVBLElBQUMsQ0FBQSxJQUFELEdBQVE7UUFDUixJQUFDLENBQUEsR0FBRyxDQUFDLGdCQUFMLENBQXNCLFlBQXRCLEVBQW1DLElBQUMsQ0FBQSxPQUFwQztRQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLFNBQUQsQ0FBQTtRQUNWLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBO1FBRVgsV0FBQSxDQUFZLElBQUMsQ0FBQSxXQUFiLEVBQTBCLElBQTFCO1FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQTtRQUVBLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBSSxJQUFKLENBQ0o7WUFBQSxNQUFBLEVBQVksSUFBQyxDQUFBLEdBQWI7WUFDQSxNQUFBLEVBQVksSUFBQyxDQUFBLEdBRGI7WUFFQSxTQUFBLEVBQVksS0FGWjtZQUdBLE9BQUEsRUFBWSxDQUFBLFNBQUEsS0FBQTt1QkFBQSxTQUFDLElBQUQsRUFBTyxLQUFQO29CQUFpQixJQUFHLEtBQUssQ0FBQyxNQUFOLEtBQWdCLENBQW5COytCQUEwQixLQUFDLENBQUEsZ0JBQUQsQ0FBa0IsS0FBbEIsRUFBMUI7O2dCQUFqQjtZQUFBLENB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QyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAgICAwMDAgICAwMDAwMDAwICAgMDAwICAgICAgMDAwICAgMDAwICAwMCAgICAgMDAgIDAwMDAwMDAwICBcbjAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIFxuIDAwMCAwMDAgICAwMDAgICAwMDAgIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwMDAwMDAwICAwMDAwMDAwICAgXG4gICAwMDAgICAgIDAwMCAgIDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgMCAwMDAgIDAwMCAgICAgICBcbiAgICAwICAgICAgIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIFxuIyMjXG5cbnsgY2hpbGRwLCBjbGFtcCwgZHJhZywga3BvcyB9ID0gcmVxdWlyZSAna3hrJ1xuXG53eHcgICAgID0gcmVxdWlyZSAnd3h3J1xudXRpbHMgICA9IHJlcXVpcmUgJy4vdXRpbHMnXG5LYWNoZWwgID0gcmVxdWlyZSAnLi9rYWNoZWwnXG5cbmNsYXNzIFZvbHVtZSBleHRlbmRzIEthY2hlbFxuICAgICAgICBcbiAgICBAOiAoQGthY2hlbElkPSd2b2x1bWUnKSAtPlxuICAgICAgICBcbiAgICAgICAgc3VwZXIgQGthY2hlbElkXG4gICAgICAgIFxuICAgICAgICBAbXV0ZSA9IGZhbHNlXG4gICAgICAgIEBkaXYuYWRkRXZlbnRMaXN0ZW5lciAnbW91c2V3aGVlbCcgQG9uV2hlZWxcbiAgIFxuICAgICAgICBAdm9sdW1lID0gQGdldFZvbHVtZSgpXG4gICAgICAgIEBmb2x1bWUgPSBAdm9sdW1lXG4gICAgICAgIFxuICAgICAgICBzZXRJbnRlcnZhbCBAY2hlY2tWb2x1bWUsIDEwMDBcbiAgICAgICAgXG4gICAgICAgIEBvbkxvYWQoKVxuICAgICAgICBcbiAgICAgICAgQGRyYWcgPSBuZXcgZHJhZ1xuICAgICAgICAgICAgdGFyZ2V0OiAgICAgQGRpdlxuICAgICAgICAgICAgaGFuZGxlOiAgICAgQGRpdlxuICAgICAgICAgICAgc3RvcEV2ZW50OiAgZmFsc2VcbiAgICAgICAgICAgIG9uU3RhcnQ6ICAgIChkcmFnLCBldmVudCkgPT4gaWYgZXZlbnQuYnV0dG9uID09IDAgdGhlbiBAc2V0Vm9sdW1lQXRFdmVudCBldmVudFxuICAgICAgICAgICAgb25Nb3ZlOiAgICAgKGRyYWcsIGV2ZW50KSA9PiBpZiBldmVudC5idXR0b24gPT0gMCB0aGVuIEBzZXRWb2x1bWVBdEV2ZW50IGV2ZW50XG4gICAgICAgIFxuICAgIG9uTGVmdENsaWNrOiAoZXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHNldFZvbHVtZUF0RXZlbnQ6IChldmVudCkgPT5cbiAgICAgICAgXG4gICAgICAgIGJyICA9IEBkaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY3RyID0ga3Bvcyhici5sZWZ0LCBici50b3ApLnBsdXMga3Bvcyhici53aWR0aCwgYnIuaGVpZ2h0KS50aW1lcyAwLjVcbiAgICAgICAgdmVjID0gY3RyLnRvIGtwb3MgZXZlbnRcbiAgICAgICAgcm90ID0gdmVjLm5vcm1hbCgpLnJvdGF0aW9uIGtwb3MoMCwtMSlcbiAgICAgICAgQHNldFZvbHVtZSA1MCArIHJvdCAvIDNcbiAgICAgICAgXG4gICAgb25XaGVlbDogKGV2ZW50KSA9PiBcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZiBldmVudC5kZWx0YVkgPT0gMFxuICAgICAgICBAZm9sdW1lIC09IGV2ZW50LmRlbHRhWS8xMDBcbiAgICAgICAgQGZvbHVtZSA9IGNsYW1wIDAgMTAwIEBmb2x1bWVcbiAgICAgICAgQHNldFZvbHVtZSBAZm9sdW1lXG4gICAgXG4gICAgZ2V0Vm9sdW1lOiAtPiBwYXJzZUludCB3eHcgJ3ZvbHVtZSdcbiAgICAgICAgXG4gICAgc2V0Vm9sdW1lOiAodikgLT5cbiAgICAgICAgXG4gICAgICAgIHYgPSBwYXJzZUludCBjbGFtcCAwIDEwMCB2XG4gICAgICAgIFxuICAgICAgICBpZiB2ICE9IEB2b2x1bWVcbiAgICAgICAgICAgIEB2b2x1bWUgPSB2XG4gICAgICAgICAgICBAbXV0ZSA9IGZhbHNlXG4gICAgICAgICAgICBAdXBkYXRlVm9sdW1lKClcbiAgICAgICAgICAgIGNoaWxkcC5leGVjIFwib3Nhc2NyaXB0IC1lIFxcXCJzZXQgdm9sdW1lIG91dHB1dCB2b2x1bWUgI3tAdm9sdW1lfVxcXCJcIlxuICAgICAgICBcbiAgICBjaGVja1ZvbHVtZTogPT5cbiAgICAgICAgXG4gICAgICAgIHZvbHVtZSA9IEBnZXRWb2x1bWUoKVxuICAgICAgICBpZiB2b2x1bWUgIT0gQHZvbHVtZVxuICAgICAgICAgICAgQHNldFZvbHVtZSB2b2x1bWVcbiAgICAgICAgQGZvbHVtZSA9IEB2b2x1bWVcbiAgICAgICAgXG4gICAgb25SaWdodENsaWNrOiAoZXZlbnQpID0+IFxuICAgICAgICBcbiAgICAgICAgaWYgQG11dGVcbiAgICAgICAgICAgIEBtdXRlID0gZmFsc2VcbiAgICAgICAgICAgIGNoaWxkcC5leGVjICdvc2FzY3JpcHQgLWUgXCJzZXQgdm9sdW1lIHdpdGhvdXQgb3V0cHV0IG11dGVkXCInXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBtdXRlID0gdHJ1ZVxuICAgICAgICAgICAgY2hpbGRwLmV4ZWMgJ29zYXNjcmlwdCAtZSBcInNldCB2b2x1bWUgd2l0aCBvdXRwdXQgbXV0ZWRcIidcbiAgICAgICAgICAgIFxuICAgICAgICBAdXBkYXRlVm9sdW1lKClcbiAgICAgICAgICAgICAgICBcbiAgICAjIDAwMCAgICAgICAwMDAwMDAwICAgIDAwMDAwMDAgICAwMDAwMDAwICAgIFxuICAgICMgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgXG4gICAgIyAwMDAgICAgICAwMDAgICAwMDAgIDAwMDAwMDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMCAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIFxuICAgICMgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAgICAgXG4gICAgXG4gICAgb25Mb2FkOiAtPlxuICAgICAgICBcbiAgICAgICAgc3ZnID0gdXRpbHMuc3ZnIGNsc3M6J3ZvbHVtZSdcbiAgICAgICAgQGRpdi5hcHBlbmRDaGlsZCBzdmdcbiAgICAgICAgXG4gICAgICAgIHV0aWxzLmNpcmNsZSByYWRpdXM6NDAgY2xzczonc2NhbGEnIHN2ZzpzdmdcbiAgICAgICAgZmFjZSA9IHV0aWxzLmNpcmNsZSByYWRpdXM6MzYgY2xzczona25vYicgc3ZnOnN2Z1xuICAgICAgICBcbiAgICAgICAgZm9yIG0gaW4gWzEuLjExXVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1dGlscy5hcHBlbmQgZmFjZSwgJ2xpbmUnIGNsYXNzOid2b2xtcmsnIHkxOjQwIHkyOjQ3IHRyYW5zZm9ybTpcInJvdGF0ZSgjezMwKm0qNX0pXCIgXG4gICAgXG4gICAgICAgIEB2b2xkb3QgPSB1dGlscy5hcHBlbmQgZmFjZSwgJ2NpcmNsZScgcjo1IGN4OjAgY3k6LTI1IGNsYXNzOid2b2xkb3QnXG4gICAgICAgIFxuICAgICAgICBAdXBkYXRlVm9sdW1lKClcbiAgICAgICAgXG4gICAgdXBkYXRlVm9sdW1lOiAtPlxuICAgICAgICBcbiAgICAgICAgYW5nbGUgPSAxNTAqKEB2b2x1bWUtNTApLzUwXG4gICAgICAgIEB2b2xkb3Quc2V0QXR0cmlidXRlICd0cmFuc2Zvcm0nIFwicm90YXRlKCN7YW5nbGV9KVwiXG4gICAgICAgIEB2b2xkb3QuY2xhc3NMaXN0LnRvZ2dsZSAnbXV0ZScgQG11dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbm1vZHVsZS5leHBvcnRzID0gVm9sdW1lXG4iXX0=
//# sourceURL=../coffee/volume.coffee