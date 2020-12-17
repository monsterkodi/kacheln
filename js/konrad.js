// koffee 1.14.0

/*
000   000   0000000   000   000  00000000    0000000   0000000    
000  000   000   000  0000  000  000   000  000   000  000   000  
0000000    000   000  000 0 000  0000000    000000000  000   000  
000  000   000   000  000  0000  000   000  000   000  000   000  
000   000   0000000   000   000  000   000  000   000  0000000
 */
var Kachel, Konrad, klog, os, post, ref, slash, udp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ref = require('kxk'), klog = ref.klog, os = ref.os, post = ref.post, slash = ref.slash, udp = ref.udp;

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
        klog('onMsg', msg);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia29ucmFkLmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsia29ucmFkLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQSwrQ0FBQTtJQUFBOzs7O0FBUUEsTUFBaUMsT0FBQSxDQUFRLEtBQVIsQ0FBakMsRUFBRSxlQUFGLEVBQVEsV0FBUixFQUFZLGVBQVosRUFBa0IsaUJBQWxCLEVBQXlCOztBQUV6QixNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0FBRUg7OztJQUVDLGdCQUFDLFFBQUQ7UUFBQyxJQUFDLENBQUEsOEJBQUQsV0FBVTs7Ozs7Ozs7OztRQUVWLElBQUksQ0FBQyxFQUFMLENBQVEsS0FBUixFQUFjLElBQUMsQ0FBQSxLQUFmO1FBRUEsd0NBQU0sSUFBQyxDQUFBLFFBQVA7UUFFQSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxRQUFmO0lBTkQ7O3FCQVFILEtBQUEsR0FBTyxTQUFDLE1BQUQsRUFBUyxHQUFUO1FBQ0gsSUFBQSxDQUFLLE9BQUw7QUFDQSxnQkFBTyxNQUFQO0FBQUEsaUJBQ1MsV0FEVDt1QkFDMEIsSUFBQyxDQUFBLFFBQUQsQ0FBQTtBQUQxQixpQkFFUyxZQUZUO3VCQUUyQixJQUFDLENBQUEsU0FBRCxDQUFBO0FBRjNCO0lBRkc7O3FCQU1QLFdBQUEsR0FBYSxTQUFDLEtBQUQ7ZUFBVyxJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxRQUFWO0lBQVg7O3FCQUViLGFBQUEsR0FBZSxTQUFDLEtBQUQ7QUFFWCxZQUFBO1FBQUEsSUFBRyxFQUFFLENBQUMsUUFBSCxDQUFBLENBQUEsS0FBaUIsT0FBcEI7WUFDSSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVI7bUJBQ04sR0FBQSxDQUFJLFVBQUosRUFBZSxLQUFLLENBQUMsSUFBTixDQUFXLElBQUMsQ0FBQSxRQUFaLENBQWYsRUFGSjs7SUFGVzs7cUJBWWYsWUFBQSxHQUFjLFNBQUMsUUFBRDtRQUFDLElBQUMsQ0FBQSxXQUFEO1FBRVgsSUFBQyxDQUFBLEdBQUQsR0FBTyxJQUFJLEdBQUosQ0FBUTtZQUFBLEtBQUEsRUFBTSxJQUFDLENBQUEsS0FBUDtZQUFjLElBQUEsRUFBSyxJQUFuQjtTQUFSO2VBRVAsSUFBQyxDQUFBLFNBQUQsQ0FBQTtJQUpVOztxQkFNZCxLQUFBLEdBQU8sU0FBQyxHQUFEO0FBRUgsWUFBQTtRQUFBLElBQUEsQ0FBSyxPQUFMLEVBQWEsR0FBYjtRQUNBLE1BQUEsR0FBUyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBZSxDQUFBLENBQUE7QUFFeEIsZ0JBQU8sTUFBUDtBQUFBLGlCQUNTLFNBRFQ7dUJBQ3dCLElBQUMsQ0FBQSxRQUFELENBQUE7QUFEeEIsaUJBRVMsT0FGVDt1QkFFd0IsSUFBQyxDQUFBLFNBQUQsQ0FBQTtBQUZ4QixpQkFHUyxNQUhUO3VCQUd3QixJQUFDLENBQUEsU0FBRCxDQUFBO0FBSHhCLGlCQUlTLFFBSlQ7Z0JBTVEsSUFBQyxDQUFBLFFBQUQsQ0FBQTt1QkFDQSxVQUFBLENBQVcsSUFBQyxDQUFBLFFBQVosRUFBc0IsSUFBdEI7QUFQUjtJQUxHOztxQkFjUCxRQUFBLEdBQVcsU0FBQTtlQUFHLElBQUMsQ0FBQSxPQUFELENBQVksU0FBRCxHQUFXLG9CQUF0QjtJQUFIOztxQkFDWCxRQUFBLEdBQVcsU0FBQTtlQUFHLElBQUMsQ0FBQSxPQUFELENBQVksU0FBRCxHQUFXLHlCQUF0QjtJQUFIOztxQkFDWCxTQUFBLEdBQVcsU0FBQTtlQUFHLElBQUMsQ0FBQSxPQUFELENBQVksU0FBRCxHQUFXLDBCQUF0QjtJQUFIOztxQkFDWCxTQUFBLEdBQVcsU0FBQTtlQUFHLElBQUMsQ0FBQSxPQUFELENBQVksU0FBRCxHQUFXLDBCQUF0QjtJQUFIOzs7O0dBckRNOztBQXVEckIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbjAwMCAgIDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAwICAgIDAwMDAwMDAgICAwMDAwMDAwICAgIFxuMDAwICAwMDAgICAwMDAgICAwMDAgIDAwMDAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgXG4wMDAwMDAwICAgIDAwMCAgIDAwMCAgMDAwIDAgMDAwICAwMDAwMDAwICAgIDAwMDAwMDAwMCAgMDAwICAgMDAwICBcbjAwMCAgMDAwICAgMDAwICAgMDAwICAwMDAgIDAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIFxuMDAwICAgMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICAgXG4jIyNcblxueyBrbG9nLCBvcywgcG9zdCwgc2xhc2gsIHVkcCB9ID0gcmVxdWlyZSAna3hrJ1xuXG5LYWNoZWwgPSByZXF1aXJlICcuL2thY2hlbCdcblxuY2xhc3MgS29ucmFkIGV4dGVuZHMgS2FjaGVsXG4gICAgICAgIFxuICAgIEA6IChAa2FjaGVsSWQ9J2tvbnJhZCcpIC0+XG5cbiAgICAgICAgcG9zdC5vbiAnYXBwJyBAb25BcHBcbiAgICAgICAgXG4gICAgICAgIHN1cGVyIEBrYWNoZWxJZFxuICAgICAgICBcbiAgICAgICAgQG9uSW5pdEthY2hlbCBAa2FjaGVsSWRcbiAgICBcbiAgICBvbkFwcDogKGFjdGlvbiwgYXBwKSA9PlxuICAgICAgICBrbG9nICdvbkFwcCdcbiAgICAgICAgc3dpdGNoIGFjdGlvbiBcbiAgICAgICAgICAgIHdoZW4gJ2FjdGl2YXRlZCcgdGhlbiBAaWRsZUljb24oKVxuICAgICAgICAgICAgd2hlbiAndGVybWluYXRlZCcgdGhlbiBAc2xlZXBJY29uKClcbiAgICAgICAgXG4gICAgb25MZWZ0Q2xpY2s6IChldmVudCkgPT4gQG9wZW5BcHAgQGthY2hlbElkXG4gICAgXG4gICAgb25Db250ZXh0TWVudTogKGV2ZW50KSA9PiBcbiAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgd3h3ID0gcmVxdWlyZSAnd3h3J1xuICAgICAgICAgICAgd3h3ICdtaW5pbWl6ZScgc2xhc2guZmlsZSBAa2FjaGVsSWRcbiAgICAgICAgICAgICAgICBcbiAgICAjIDAwMCAgMDAwICAgMDAwICAwMDAgIDAwMDAwMDAwMCAgXG4gICAgIyAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgICMgMDAwICAwMDAgMCAwMDAgIDAwMCAgICAgMDAwICAgICBcbiAgICAjIDAwMCAgMDAwICAwMDAwICAwMDAgICAgIDAwMCAgICAgXG4gICAgIyAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAwMDAgICAgIFxuICAgIFxuICAgIG9uSW5pdEthY2hlbDogKEBrYWNoZWxJZCkgPT5cbiAgICAgICAgXG4gICAgICAgIEB1ZHAgPSBuZXcgdWRwIG9uTXNnOkBvbk1zZywgcG9ydDo5NTU5XG4gICAgICAgIFxuICAgICAgICBAc2xlZXBJY29uKClcbiAgICAgICAgXG4gICAgb25Nc2c6IChtc2cpID0+XG4gICAgICAgIFxuICAgICAgICBrbG9nICdvbk1zZycgbXNnXG4gICAgICAgIHByZWZpeCA9IG1zZy5zcGxpdCgnOicpWzBdXG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggcHJlZml4XG4gICAgICAgICAgICB3aGVuICd2ZXJzaW9uJyB0aGVuIEBpZGxlSWNvbigpXG4gICAgICAgICAgICB3aGVuICdlcnJvcicgICB0aGVuIEBlcnJvckljb24oKVxuICAgICAgICAgICAgd2hlbiAnZXhpdCcgICAgdGhlbiBAc2xlZXBJY29uKClcbiAgICAgICAgICAgIHdoZW4gJ291dHB1dCdcbiAgICAgICAgICAgICAgICAjIGtsb2cgJ291dHB1dCcgbXNnXG4gICAgICAgICAgICAgICAgQHdvcmtJY29uKClcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0IEBpZGxlSWNvbiwgMjAwMFxuICAgICAgICBcbiAgICB3b3JrSWNvbjogID0+IEBzZXRJY29uIFwiI3tfX2Rpcm5hbWV9Ly4uL2ltZy9rb25yYWQucG5nXCJcbiAgICBpZGxlSWNvbjogID0+IEBzZXRJY29uIFwiI3tfX2Rpcm5hbWV9Ly4uL2ltZy9rb25yYWRfaWRsZS5wbmdcIlxuICAgIGVycm9ySWNvbjogPT4gQHNldEljb24gXCIje19fZGlybmFtZX0vLi4vaW1nL2tvbnJhZF9lcnJvci5wbmdcIlxuICAgIHNsZWVwSWNvbjogPT4gQHNldEljb24gXCIje19fZGlybmFtZX0vLi4vaW1nL2tvbnJhZF9zbGVlcC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbm1vZHVsZS5leHBvcnRzID0gS29ucmFkXG4iXX0=
//# sourceURL=../coffee/konrad.coffee