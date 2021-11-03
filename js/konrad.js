// koffee 1.14.0

/*
000   000   0000000   000   000  00000000    0000000   0000000    
000  000   000   000  0000  000  000   000  000   000  000   000  
0000000    000   000  000 0 000  0000000    000000000  000   000  
000  000   000   000  000  0000  000   000  000   000  000   000  
000   000   0000000   000   000  000   000  000   000  0000000
 */
var Kachel, Konrad, childp, klog, os, post, ref, slash, udp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ref = require('kxk'), childp = ref.childp, klog = ref.klog, os = ref.os, post = ref.post, slash = ref.slash, udp = ref.udp;

Kachel = require('./kachel');

Konrad = (function(superClass) {
    extend(Konrad, superClass);

    function Konrad(kachelId) {
        this.kachelId = kachelId != null ? kachelId : 'konrad';
        this.sleepIcon = bind(this.sleepIcon, this);
        this.errorIcon = bind(this.errorIcon, this);
        this.idleIcon = bind(this.idleIcon, this);
        this.workIcon = bind(this.workIcon, this);
        this.onMsg = bind(this.onMsg, this);
        this.onInitKachel = bind(this.onInitKachel, this);
        this.onContextMenu = bind(this.onContextMenu, this);
        this.onRightClick = bind(this.onRightClick, this);
        this.onLeftClick = bind(this.onLeftClick, this);
        this.onApp = bind(this.onApp, this);
        post.on('app', this.onApp);
        Konrad.__super__.constructor.call(this, this.kachelId);
        this.onInitKachel(this.kachelId);
    }

    Konrad.prototype.onApp = function(action, app) {
        klog('onApp');
        switch (action) {
            case 'activated':
                return this.idleIcon();
            case 'terminated':
                return this.sleepIcon();
        }
    };

    Konrad.prototype.onLeftClick = function(event) {
        return this.openApp(this.kachelId);
    };

    Konrad.prototype.onRightClick = function() {
        if (slash.win()) {
            return wxw('minimize', slash.file(this.kachelId));
        } else {
            return childp.spawn('osascript', ['-e', "tell application \"Finder\" to set visible of process \"" + (slash.base(this.kachelId)) + "\" to false"]);
        }
    };

    Konrad.prototype.onContextMenu = function(event) {
        var wxw;
        if (os.platform() === 'win32') {
            wxw = require('wxw');
            return wxw('minimize', slash.file(this.kachelId));
        }
    };

    Konrad.prototype.onInitKachel = function(kachelId) {
        this.kachelId = kachelId;
        this.udp = new udp({
            onMsg: this.onMsg,
            port: 9559
        });
        return this.sleepIcon();
    };

    Konrad.prototype.onMsg = function(msg) {
        var prefix;
        prefix = msg.split(':')[0];
        switch (prefix) {
            case 'version':
                return this.idleIcon();
            case 'error':
                return this.errorIcon();
            case 'exit':
                return this.sleepIcon();
            case 'output':
                this.workIcon();
                return setTimeout(this.idleIcon, 2000);
        }
    };

    Konrad.prototype.workIcon = function() {
        return this.setIcon(__dirname + "/../img/konrad.png");
    };

    Konrad.prototype.idleIcon = function() {
        return this.setIcon(__dirname + "/../img/konrad_idle.png");
    };

    Konrad.prototype.errorIcon = function() {
        return this.setIcon(__dirname + "/../img/konrad_error.png");
    };

    Konrad.prototype.sleepIcon = function() {
        return this.setIcon(__dirname + "/../img/konrad_sleep.png");
    };

    return Konrad;

})(Kachel);

module.exports = Konrad;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29ucmFkLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsia29ucmFkLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSx1REFBQTtJQUFBOzs7O0FBUUEsTUFBeUMsT0FBQSxDQUFRLEtBQVIsQ0FBekMsRUFBRSxtQkFBRixFQUFVLGVBQVYsRUFBZ0IsV0FBaEIsRUFBb0IsZUFBcEIsRUFBMEIsaUJBQTFCLEVBQWlDOztBQUVqQyxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0FBRUg7OztJQUVDLGdCQUFDLFFBQUQ7UUFBQyxJQUFDLENBQUEsOEJBQUQsV0FBVTs7Ozs7Ozs7Ozs7UUFFVixJQUFJLENBQUMsRUFBTCxDQUFRLEtBQVIsRUFBYyxJQUFDLENBQUEsS0FBZjtRQUVBLHdDQUFNLElBQUMsQ0FBQSxRQUFQO1FBRUEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsUUFBZjtJQU5EOztxQkFRSCxLQUFBLEdBQU8sU0FBQyxNQUFELEVBQVMsR0FBVDtRQUNILElBQUEsQ0FBSyxPQUFMO0FBQ0EsZ0JBQU8sTUFBUDtBQUFBLGlCQUNTLFdBRFQ7dUJBQzBCLElBQUMsQ0FBQSxRQUFELENBQUE7QUFEMUIsaUJBRVMsWUFGVDt1QkFFMkIsSUFBQyxDQUFBLFNBQUQsQ0FBQTtBQUYzQjtJQUZHOztxQkFNUCxXQUFBLEdBQWEsU0FBQyxLQUFEO2VBQVcsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsUUFBVjtJQUFYOztxQkFDYixZQUFBLEdBQWMsU0FBQTtRQUNWLElBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBQSxDQUFIO21CQUNJLEdBQUEsQ0FBSSxVQUFKLEVBQWUsS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFDLENBQUEsUUFBWixDQUFmLEVBREo7U0FBQSxNQUFBO21CQUdJLE1BQU0sQ0FBQyxLQUFQLENBQWEsV0FBYixFQUF5QixDQUFDLElBQUQsRUFBTSwwREFBQSxHQUEwRCxDQUFDLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBQyxDQUFBLFFBQVosQ0FBRCxDQUExRCxHQUFnRixhQUF0RixDQUF6QixFQUhKOztJQURVOztxQkFNZCxhQUFBLEdBQWUsU0FBQyxLQUFEO0FBRVgsWUFBQTtRQUFBLElBQUcsRUFBRSxDQUFDLFFBQUgsQ0FBQSxDQUFBLEtBQWlCLE9BQXBCO1lBQ0ksR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSO21CQUNOLEdBQUEsQ0FBSSxVQUFKLEVBQWUsS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFDLENBQUEsUUFBWixDQUFmLEVBRko7O0lBRlc7O3FCQVlmLFlBQUEsR0FBYyxTQUFDLFFBQUQ7UUFBQyxJQUFDLENBQUEsV0FBRDtRQUVYLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBSSxHQUFKLENBQVE7WUFBQSxLQUFBLEVBQU0sSUFBQyxDQUFBLEtBQVA7WUFBYyxJQUFBLEVBQUssSUFBbkI7U0FBUjtlQUVQLElBQUMsQ0FBQSxTQUFELENBQUE7SUFKVTs7cUJBTWQsS0FBQSxHQUFPLFNBQUMsR0FBRDtBQUdILFlBQUE7UUFBQSxNQUFBLEdBQVMsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBQWUsQ0FBQSxDQUFBO0FBRXhCLGdCQUFPLE1BQVA7QUFBQSxpQkFDUyxTQURUO3VCQUN3QixJQUFDLENBQUEsUUFBRCxDQUFBO0FBRHhCLGlCQUVTLE9BRlQ7dUJBRXdCLElBQUMsQ0FBQSxTQUFELENBQUE7QUFGeEIsaUJBR1MsTUFIVDt1QkFHd0IsSUFBQyxDQUFBLFNBQUQsQ0FBQTtBQUh4QixpQkFJUyxRQUpUO2dCQU1RLElBQUMsQ0FBQSxRQUFELENBQUE7dUJBQ0EsVUFBQSxDQUFXLElBQUMsQ0FBQSxRQUFaLEVBQXNCLElBQXRCO0FBUFI7SUFMRzs7cUJBY1AsUUFBQSxHQUFXLFNBQUE7ZUFBRyxJQUFDLENBQUEsT0FBRCxDQUFZLFNBQUQsR0FBVyxvQkFBdEI7SUFBSDs7cUJBQ1gsUUFBQSxHQUFXLFNBQUE7ZUFBRyxJQUFDLENBQUEsT0FBRCxDQUFZLFNBQUQsR0FBVyx5QkFBdEI7SUFBSDs7cUJBQ1gsU0FBQSxHQUFXLFNBQUE7ZUFBRyxJQUFDLENBQUEsT0FBRCxDQUFZLFNBQUQsR0FBVywwQkFBdEI7SUFBSDs7cUJBQ1gsU0FBQSxHQUFXLFNBQUE7ZUFBRyxJQUFDLENBQUEsT0FBRCxDQUFZLFNBQUQsR0FBVywwQkFBdEI7SUFBSDs7OztHQTFETTs7QUE0RHJCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAgICAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMCAgICBcbjAwMCAgMDAwICAgMDAwICAgMDAwICAwMDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIFxuMDAwMDAwMCAgICAwMDAgICAwMDAgIDAwMCAwIDAwMCAgMDAwMDAwMCAgICAwMDAwMDAwMDAgIDAwMCAgIDAwMCAgXG4wMDAgIDAwMCAgIDAwMCAgIDAwMCAgMDAwICAwMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbjAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAwMDAwICAgIFxuIyMjXG5cbnsgY2hpbGRwLCBrbG9nLCBvcywgcG9zdCwgc2xhc2gsIHVkcCB9ID0gcmVxdWlyZSAna3hrJ1xuXG5LYWNoZWwgPSByZXF1aXJlICcuL2thY2hlbCdcblxuY2xhc3MgS29ucmFkIGV4dGVuZHMgS2FjaGVsXG4gICAgICAgIFxuICAgIEA6IChAa2FjaGVsSWQ9J2tvbnJhZCcpIC0+XG5cbiAgICAgICAgcG9zdC5vbiAnYXBwJyBAb25BcHBcbiAgICAgICAgXG4gICAgICAgIHN1cGVyIEBrYWNoZWxJZFxuICAgICAgICBcbiAgICAgICAgQG9uSW5pdEthY2hlbCBAa2FjaGVsSWRcbiAgICBcbiAgICBvbkFwcDogKGFjdGlvbiwgYXBwKSA9PlxuICAgICAgICBrbG9nICdvbkFwcCdcbiAgICAgICAgc3dpdGNoIGFjdGlvbiBcbiAgICAgICAgICAgIHdoZW4gJ2FjdGl2YXRlZCcgdGhlbiBAaWRsZUljb24oKVxuICAgICAgICAgICAgd2hlbiAndGVybWluYXRlZCcgdGhlbiBAc2xlZXBJY29uKClcbiAgICAgICAgXG4gICAgb25MZWZ0Q2xpY2s6IChldmVudCkgPT4gQG9wZW5BcHAgQGthY2hlbElkXG4gICAgb25SaWdodENsaWNrOiA9PiBcbiAgICAgICAgaWYgc2xhc2gud2luKClcbiAgICAgICAgICAgIHd4dyAnbWluaW1pemUnIHNsYXNoLmZpbGUgQGthY2hlbElkXG4gICAgICAgIGVsc2UgICAgICAgICAgICBcbiAgICAgICAgICAgIGNoaWxkcC5zcGF3biAnb3Nhc2NyaXB0JyBbJy1lJyBcInRlbGwgYXBwbGljYXRpb24gXFxcIkZpbmRlclxcXCIgdG8gc2V0IHZpc2libGUgb2YgcHJvY2VzcyBcXFwiI3tzbGFzaC5iYXNlIEBrYWNoZWxJZH1cXFwiIHRvIGZhbHNlXCJdXG4gICAgXG4gICAgb25Db250ZXh0TWVudTogKGV2ZW50KSA9PlxuICAgICAgICBcbiAgICAgICAgaWYgb3MucGxhdGZvcm0oKSA9PSAnd2luMzInXG4gICAgICAgICAgICB3eHcgPSByZXF1aXJlICd3eHcnXG4gICAgICAgICAgICB3eHcgJ21pbmltaXplJyBzbGFzaC5maWxlIEBrYWNoZWxJZFxuICAgICAgICAgICAgICAgIFxuICAgICMgMDAwICAwMDAgICAwMDAgIDAwMCAgMDAwMDAwMDAwICBcbiAgICAjIDAwMCAgMDAwMCAgMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgIDAwMCAwIDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAwMDAgIDAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgMDAwICAgMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgXG4gICAgb25Jbml0S2FjaGVsOiAoQGthY2hlbElkKSA9PlxuICAgICAgICBcbiAgICAgICAgQHVkcCA9IG5ldyB1ZHAgb25Nc2c6QG9uTXNnLCBwb3J0Ojk1NTlcbiAgICAgICAgXG4gICAgICAgIEBzbGVlcEljb24oKVxuICAgICAgICBcbiAgICBvbk1zZzogKG1zZykgPT5cbiAgICAgICAgXG4gICAgICAgICMga2xvZyAnb25Nc2cnIG1zZ1xuICAgICAgICBwcmVmaXggPSBtc2cuc3BsaXQoJzonKVswXVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoIHByZWZpeFxuICAgICAgICAgICAgd2hlbiAndmVyc2lvbicgdGhlbiBAaWRsZUljb24oKVxuICAgICAgICAgICAgd2hlbiAnZXJyb3InICAgdGhlbiBAZXJyb3JJY29uKClcbiAgICAgICAgICAgIHdoZW4gJ2V4aXQnICAgIHRoZW4gQHNsZWVwSWNvbigpXG4gICAgICAgICAgICB3aGVuICdvdXRwdXQnXG4gICAgICAgICAgICAgICAgIyBrbG9nICdvdXRwdXQnIG1zZ1xuICAgICAgICAgICAgICAgIEB3b3JrSWNvbigpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCBAaWRsZUljb24sIDIwMDBcbiAgICAgICAgXG4gICAgd29ya0ljb246ICA9PiBAc2V0SWNvbiBcIiN7X19kaXJuYW1lfS8uLi9pbWcva29ucmFkLnBuZ1wiXG4gICAgaWRsZUljb246ICA9PiBAc2V0SWNvbiBcIiN7X19kaXJuYW1lfS8uLi9pbWcva29ucmFkX2lkbGUucG5nXCJcbiAgICBlcnJvckljb246ID0+IEBzZXRJY29uIFwiI3tfX2Rpcm5hbWV9Ly4uL2ltZy9rb25yYWRfZXJyb3IucG5nXCJcbiAgICBzbGVlcEljb246ID0+IEBzZXRJY29uIFwiI3tfX2Rpcm5hbWV9Ly4uL2ltZy9rb25yYWRfc2xlZXAucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IEtvbnJhZFxuIl19
//# sourceURL=../coffee/konrad.coffee