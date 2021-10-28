// koffee 1.14.0

/*
000   000  000  000   000  0000000     0000000   000   000  
000 0 000  000  0000  000  000   000  000   000  000 0 000  
000000000  000  000 0 000  000   000  000   000  000000000  
000   000  000  000  0000  000   000  000   000  000   000  
00     00  000  000   000  0000000     0000000   00     00
 */
var $, drag, dragBounds, post, ref, w, win, winDrag;

ref = require('kxk'), $ = ref.$, drag = ref.drag, post = ref.post, win = ref.win;

w = new win({
    dir: __dirname,
    pkg: require('../package.json'),
    icon: '../img/menu@2x.png',
    prefsSeperator: '▸'
});

dragBounds = null;

winDrag = null;

window.onload = function() {
    var Appl, Clock, Data, Dish, Konrad, clock, data, dish;
    post.setMaxListeners(30);
    Data = require('./data');
    data = new Data;
    Clock = require('./clock');
    clock = new Clock;
    Dish = require('./sysdish');
    dish = new Dish;
    Konrad = require('./konrad');
    new Konrad('/Applications/konrad.app');
    Appl = require('./appl');
    new Appl('/Applications/clippo.app');
    new Appl('/Applications/ko.app');
    new Appl('/Applications/kalk.app');
    new Appl('/Applications/iTerm2.app');
    new Appl('/Applications/klog.app');
    new Appl('/Applications/password-turtle.app');
    new Appl('/System/Applications/Mail.app');
    new Appl('/Applications/Firefox.app');
    main.onfocus = function() {
        var ref1;
        return (ref1 = $('#main').children[4]) != null ? ref1.focus() : void 0;
    };
    data.start();
    return winDrag = new drag({
        target: document.body,
        handle: $('#main'),
        stopEvent: false,
        onStart: function() {
            return dragBounds = window.win.getBounds();
        },
        onMove: function(drag) {
            if (dragBounds) {
                return window.win.setBounds({
                    x: dragBounds.x + drag.deltaSum.x,
                    y: dragBounds.y + drag.deltaSum.y,
                    width: dragBounds.width,
                    height: dragBounds.height
                });
            }
        }
    });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsid2luZG93LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQTs7QUFRQSxNQUF5QixPQUFBLENBQVEsS0FBUixDQUF6QixFQUFFLFNBQUYsRUFBSyxlQUFMLEVBQVcsZUFBWCxFQUFpQjs7QUFFakIsQ0FBQSxHQUFJLElBQUksR0FBSixDQUNBO0lBQUEsR0FBQSxFQUFRLFNBQVI7SUFDQSxHQUFBLEVBQVEsT0FBQSxDQUFRLGlCQUFSLENBRFI7SUFFQSxJQUFBLEVBQVEsb0JBRlI7SUFHQSxjQUFBLEVBQWdCLEdBSGhCO0NBREE7O0FBWUosVUFBQSxHQUFhOztBQUNiLE9BQUEsR0FBVTs7QUFFVixNQUFNLENBQUMsTUFBUCxHQUFnQixTQUFBO0FBRVosUUFBQTtJQUFBLElBQUksQ0FBQyxlQUFMLENBQXFCLEVBQXJCO0lBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSO0lBQ1AsSUFBQSxHQUFPLElBQUk7SUFFWCxLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVI7SUFDUixLQUFBLEdBQVEsSUFBSTtJQUVaLElBQUEsR0FBTyxPQUFBLENBQVEsV0FBUjtJQUNQLElBQUEsR0FBTyxJQUFJO0lBRVgsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSO0lBQ1QsSUFBSSxNQUFKLENBQVcsMEJBQVg7SUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVI7SUFDUCxJQUFJLElBQUosQ0FBUywwQkFBVDtJQUNBLElBQUksSUFBSixDQUFTLHNCQUFUO0lBQ0EsSUFBSSxJQUFKLENBQVMsd0JBQVQ7SUFDQSxJQUFJLElBQUosQ0FBUywwQkFBVDtJQUNBLElBQUksSUFBSixDQUFTLHdCQUFUO0lBRUEsSUFBSSxJQUFKLENBQVMsbUNBQVQ7SUFFQSxJQUFJLElBQUosQ0FBUywrQkFBVDtJQUNBLElBQUksSUFBSixDQUFTLDJCQUFUO0lBRUEsSUFBSSxDQUFDLE9BQUwsR0FBZSxTQUFBO0FBQUcsWUFBQTs2REFBc0IsQ0FBRSxLQUF4QixDQUFBO0lBQUg7SUFFZixJQUFJLENBQUMsS0FBTCxDQUFBO1dBUUEsT0FBQSxHQUFVLElBQUksSUFBSixDQUNOO1FBQUEsTUFBQSxFQUFZLFFBQVEsQ0FBQyxJQUFyQjtRQUNBLE1BQUEsRUFBWSxDQUFBLENBQUUsT0FBRixDQURaO1FBRUEsU0FBQSxFQUFZLEtBRlo7UUFHQSxPQUFBLEVBQVksU0FBQTttQkFBRyxVQUFBLEdBQWEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFYLENBQUE7UUFBaEIsQ0FIWjtRQUlBLE1BQUEsRUFBWSxTQUFDLElBQUQ7WUFDUixJQUFHLFVBQUg7dUJBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFYLENBQ0k7b0JBQUEsQ0FBQSxFQUFRLFVBQVUsQ0FBQyxDQUFYLEdBQWUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFyQztvQkFDQSxDQUFBLEVBQVEsVUFBVSxDQUFDLENBQVgsR0FBZSxJQUFJLENBQUMsUUFBUSxDQUFDLENBRHJDO29CQUVBLEtBQUEsRUFBUSxVQUFVLENBQUMsS0FGbkI7b0JBR0EsTUFBQSxFQUFRLFVBQVUsQ0FBQyxNQUhuQjtpQkFESixFQURKOztRQURRLENBSlo7S0FETTtBQXRDRSIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuMDAwICAgMDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4wMDAgMCAwMDAgIDAwMCAgMDAwMCAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwIDAgMDAwICBcbjAwMDAwMDAwMCAgMDAwICAwMDAgMCAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAwMDAwMDAgIFxuMDAwICAgMDAwICAwMDAgIDAwMCAgMDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgXG4wMCAgICAgMDAgIDAwMCAgMDAwICAgMDAwICAwMDAwMDAwICAgICAwMDAwMDAwICAgMDAgICAgIDAwICBcbiMjI1xuXG57ICQsIGRyYWcsIHBvc3QsIHdpbiB9ID0gcmVxdWlyZSAna3hrJ1xuXG53ID0gbmV3IHdpblxuICAgIGRpcjogICAgX19kaXJuYW1lXG4gICAgcGtnOiAgICByZXF1aXJlICcuLi9wYWNrYWdlLmpzb24nXG4gICAgaWNvbjogICAnLi4vaW1nL21lbnVAMngucG5nJ1xuICAgIHByZWZzU2VwZXJhdG9yOiAn4pa4J1xuXG4jICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMFxuIyAwMDAgICAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuIyAwMDAgICAwMDAgIDAwMCAwIDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAwMDAwMDAgIDAwMCAgIDAwMFxuIyAwMDAgICAwMDAgIDAwMCAgMDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuIyAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDBcblxuZHJhZ0JvdW5kcyA9IG51bGxcbndpbkRyYWcgPSBudWxsXG5cbndpbmRvdy5vbmxvYWQgPSAtPlxuXG4gICAgcG9zdC5zZXRNYXhMaXN0ZW5lcnMgMzBcbiAgICBcbiAgICBEYXRhID0gcmVxdWlyZSAnLi9kYXRhJ1xuICAgIGRhdGEgPSBuZXcgRGF0YVxuICAgIFxuICAgIENsb2NrID0gcmVxdWlyZSAnLi9jbG9jaydcbiAgICBjbG9jayA9IG5ldyBDbG9ja1xuICAgIFxuICAgIERpc2ggPSByZXF1aXJlICcuL3N5c2Rpc2gnXG4gICAgZGlzaCA9IG5ldyBEaXNoXG4gICAgXG4gICAgS29ucmFkID0gcmVxdWlyZSAnLi9rb25yYWQnXG4gICAgbmV3IEtvbnJhZCAnL0FwcGxpY2F0aW9ucy9rb25yYWQuYXBwJ1xuICAgIFxuICAgIEFwcGwgPSByZXF1aXJlICcuL2FwcGwnXG4gICAgbmV3IEFwcGwgJy9BcHBsaWNhdGlvbnMvY2xpcHBvLmFwcCdcbiAgICBuZXcgQXBwbCAnL0FwcGxpY2F0aW9ucy9rby5hcHAnXG4gICAgbmV3IEFwcGwgJy9BcHBsaWNhdGlvbnMva2Fsay5hcHAnXG4gICAgbmV3IEFwcGwgJy9BcHBsaWNhdGlvbnMvaVRlcm0yLmFwcCdcbiAgICBuZXcgQXBwbCAnL0FwcGxpY2F0aW9ucy9rbG9nLmFwcCdcbiAgICAjIG5ldyBBcHBsICcvQXBwbGljYXRpb25zL2tub3QuYXBwJ1xuICAgIG5ldyBBcHBsICcvQXBwbGljYXRpb25zL3Bhc3N3b3JkLXR1cnRsZS5hcHAnXG4gICAgIyBuZXcgQXBwbCAnL1VzZXJzL2tvZGkvcy9rZWtzL2tla3MtZGFyd2luLXg2NC9rZWtzLmFwcCdcbiAgICBuZXcgQXBwbCAnL1N5c3RlbS9BcHBsaWNhdGlvbnMvTWFpbC5hcHAnXG4gICAgbmV3IEFwcGwgJy9BcHBsaWNhdGlvbnMvRmlyZWZveC5hcHAnXG4gICAgXG4gICAgbWFpbi5vbmZvY3VzID0gLT4gJCgnI21haW4nKS5jaGlsZHJlbls0XT8uZm9jdXMoKVxuICAgIFxuICAgIGRhdGEuc3RhcnQoKVxuICAgIFxuICAgICMgMDAwMDAwMCAgICAwMDAwMDAwMCAgICAwMDAwMDAwICAgIDAwMDAwMDAgICBcbiAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgXG4gICAgIyAwMDAgICAwMDAgIDAwMDAwMDAgICAgMDAwMDAwMDAwICAwMDAgIDAwMDAgIFxuICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbiAgICAjIDAwMDAwMDAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgICAwMDAwMDAwICAgXG4gICAgXG4gICAgd2luRHJhZyA9IG5ldyBkcmFnXG4gICAgICAgIHRhcmdldDogICAgIGRvY3VtZW50LmJvZHlcbiAgICAgICAgaGFuZGxlOiAgICAgJCgnI21haW4nKVxuICAgICAgICBzdG9wRXZlbnQ6ICBmYWxzZVxuICAgICAgICBvblN0YXJ0OiAgICAtPiBkcmFnQm91bmRzID0gd2luZG93Lndpbi5nZXRCb3VuZHMoKVxuICAgICAgICBvbk1vdmU6ICAgICAoZHJhZykgLT5cbiAgICAgICAgICAgIGlmIGRyYWdCb3VuZHNcbiAgICAgICAgICAgICAgICB3aW5kb3cud2luLnNldEJvdW5kc1xuICAgICAgICAgICAgICAgICAgICB4OiAgICAgIGRyYWdCb3VuZHMueCArIGRyYWcuZGVsdGFTdW0ueCBcbiAgICAgICAgICAgICAgICAgICAgeTogICAgICBkcmFnQm91bmRzLnkgKyBkcmFnLmRlbHRhU3VtLnkgXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAgZHJhZ0JvdW5kcy53aWR0aCBcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBkcmFnQm91bmRzLmhlaWdodFxuICAgIFxuIl19
//# sourceURL=../coffee/window.coffee