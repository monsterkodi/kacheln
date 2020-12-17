// koffee 1.14.0

/*
000   000  000  000   000  0000000     0000000   000   000  
000 0 000  000  0000  000  000   000  000   000  000 0 000  
000000000  000  000 0 000  000   000  000   000  000000000  
000   000  000  000  0000  000   000  000   000  000   000  
00     00  000  000   000  0000000     0000000   00     00
 */
var w, win;

win = require('kxk').win;

w = new win({
    dir: __dirname,
    pkg: require('../package.json'),
    icon: '../img/menu@2x.png',
    prefsSeperator: '▸'
});

window.onload = function() {
    var Appl, Clock, Data, Dish, Konrad, clock, data, dish;
    Data = require('./data');
    data = new Data;
    Clock = require('./clock');
    clock = new Clock;
    Dish = require('./sysdish');
    dish = new Dish;
    Konrad = require('./konrad');
    new Konrad('/Users/kodi/s/konrad/konrad-darwin-x64/konrad.app');
    Appl = require('./appl');
    new Appl('/Users/kodi/s/clippo/clippo-darwin-x64/clippo.app');
    new Appl('/Users/kodi/s/ko/ko-darwin-x64/ko.app');
    new Appl('/Users/kodi/s/klog/klog-darwin-x64/klog.app');
    new Appl('/Users/kodi/s/knot/knot-darwin-x64/knot.app');
    new Appl('/Users/kodi/s/turtle/password-turtle-darwin-x64/password-turtle.app');
    new Appl('/Users/kodi/s/keks/keks-darwin-x64/keks.app');
    new Appl('/Users/kodi/s/kalk/kalk-darwin-x64/kalk.app');
    new Appl('/Applications/Firefox.app');
    new Appl('/Applications/iTerm2.app');
    return data.start();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LmpzIiwic291cmNlUm9vdCI6Ii4uL2NvZmZlZSIsInNvdXJjZXMiOlsid2luZG93LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBQUEsSUFBQTs7QUFRRSxNQUFRLE9BQUEsQ0FBUSxLQUFSOztBQUVWLENBQUEsR0FBSSxJQUFJLEdBQUosQ0FDQTtJQUFBLEdBQUEsRUFBUSxTQUFSO0lBQ0EsR0FBQSxFQUFRLE9BQUEsQ0FBUSxpQkFBUixDQURSO0lBRUEsSUFBQSxFQUFRLG9CQUZSO0lBR0EsY0FBQSxFQUFnQixHQUhoQjtDQURBOztBQWNKLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFNBQUE7QUFFWixRQUFBO0lBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSO0lBQ1AsSUFBQSxHQUFPLElBQUk7SUFFWCxLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVI7SUFDUixLQUFBLEdBQVEsSUFBSTtJQUVaLElBQUEsR0FBTyxPQUFBLENBQVEsV0FBUjtJQUNQLElBQUEsR0FBTyxJQUFJO0lBRVgsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSO0lBQ1QsSUFBSSxNQUFKLENBQVcsbURBQVg7SUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVI7SUFDUCxJQUFJLElBQUosQ0FBUyxtREFBVDtJQUNBLElBQUksSUFBSixDQUFTLHVDQUFUO0lBQ0EsSUFBSSxJQUFKLENBQVMsNkNBQVQ7SUFDQSxJQUFJLElBQUosQ0FBUyw2Q0FBVDtJQUNBLElBQUksSUFBSixDQUFTLHFFQUFUO0lBQ0EsSUFBSSxJQUFKLENBQVMsNkNBQVQ7SUFDQSxJQUFJLElBQUosQ0FBUyw2Q0FBVDtJQUNBLElBQUksSUFBSixDQUFTLDJCQUFUO0lBQ0EsSUFBSSxJQUFKLENBQVMsMEJBQVQ7V0FFQSxJQUFJLENBQUMsS0FBTCxDQUFBO0FBekJZIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMDAgICAwMDAgIDAwMCAgMDAwICAgMDAwICAwMDAwMDAwICAgICAwMDAwMDAwICAgMDAwICAgMDAwICBcbjAwMCAwIDAwMCAgMDAwICAwMDAwICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgMCAwMDAgIFxuMDAwMDAwMDAwICAwMDAgIDAwMCAwIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAwMCAgXG4wMDAgICAwMDAgIDAwMCAgMDAwICAwMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICBcbjAwICAgICAwMCAgMDAwICAwMDAgICAwMDAgIDAwMDAwMDAgICAgIDAwMDAwMDAgICAwMCAgICAgMDAgIFxuIyMjXG5cbnsgd2luIH0gPSByZXF1aXJlICdreGsnXG5cbncgPSBuZXcgd2luXG4gICAgZGlyOiAgICBfX2Rpcm5hbWVcbiAgICBwa2c6ICAgIHJlcXVpcmUgJy4uL3BhY2thZ2UuanNvbidcbiAgICBpY29uOiAgICcuLi9pbWcvbWVudUAyeC5wbmcnXG4gICAgcHJlZnNTZXBlcmF0b3I6ICfilrgnXG5cbiMgd2luZG93Lndpbi5vbiAncmVzaXplJyAoZXZlbnQpIC0+IGtsb2cgJ3Jlc2l6ZScgZXZlbnQuc2VuZGVyLmdldFNpemUoKVxuXG4jICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMFxuIyAwMDAgICAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuIyAwMDAgICAwMDAgIDAwMCAwIDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAwMDAwMDAgIDAwMCAgIDAwMFxuIyAwMDAgICAwMDAgIDAwMCAgMDAwMCAgMDAwICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuIyAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDBcblxud2luZG93Lm9ubG9hZCA9IC0+XG5cbiAgICBEYXRhID0gcmVxdWlyZSAnLi9kYXRhJ1xuICAgIGRhdGEgPSBuZXcgRGF0YVxuICAgIFxuICAgIENsb2NrID0gcmVxdWlyZSAnLi9jbG9jaydcbiAgICBjbG9jayA9IG5ldyBDbG9ja1xuICAgIFxuICAgIERpc2ggPSByZXF1aXJlICcuL3N5c2Rpc2gnXG4gICAgZGlzaCA9IG5ldyBEaXNoXG4gICAgXG4gICAgS29ucmFkID0gcmVxdWlyZSAnLi9rb25yYWQnXG4gICAgbmV3IEtvbnJhZCAnL1VzZXJzL2tvZGkvcy9rb25yYWQva29ucmFkLWRhcndpbi14NjQva29ucmFkLmFwcCdcbiAgICBcbiAgICBBcHBsID0gcmVxdWlyZSAnLi9hcHBsJ1xuICAgIG5ldyBBcHBsICcvVXNlcnMva29kaS9zL2NsaXBwby9jbGlwcG8tZGFyd2luLXg2NC9jbGlwcG8uYXBwJ1xuICAgIG5ldyBBcHBsICcvVXNlcnMva29kaS9zL2tvL2tvLWRhcndpbi14NjQva28uYXBwJ1xuICAgIG5ldyBBcHBsICcvVXNlcnMva29kaS9zL2tsb2cva2xvZy1kYXJ3aW4teDY0L2tsb2cuYXBwJ1xuICAgIG5ldyBBcHBsICcvVXNlcnMva29kaS9zL2tub3Qva25vdC1kYXJ3aW4teDY0L2tub3QuYXBwJ1xuICAgIG5ldyBBcHBsICcvVXNlcnMva29kaS9zL3R1cnRsZS9wYXNzd29yZC10dXJ0bGUtZGFyd2luLXg2NC9wYXNzd29yZC10dXJ0bGUuYXBwJ1xuICAgIG5ldyBBcHBsICcvVXNlcnMva29kaS9zL2tla3Mva2Vrcy1kYXJ3aW4teDY0L2tla3MuYXBwJ1xuICAgIG5ldyBBcHBsICcvVXNlcnMva29kaS9zL2thbGsva2Fsay1kYXJ3aW4teDY0L2thbGsuYXBwJ1xuICAgIG5ldyBBcHBsICcvQXBwbGljYXRpb25zL0ZpcmVmb3guYXBwJ1xuICAgIG5ldyBBcHBsICcvQXBwbGljYXRpb25zL2lUZXJtMi5hcHAnXG4gICAgXG4gICAgZGF0YS5zdGFydCgpXG4iXX0=
//# sourceURL=../coffee/window.coffee