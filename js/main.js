// koffee 1.14.0

/*
00     00   0000000   000  000   000
000   000  000   000  000  0000  000
000000000  000000000  000  000 0 000
000 0 000  000   000  000  000  0000
000   000  000   000  000  000   000
 */
var KachelApp, _, action, activeApps, app, args, electron, klog, mainMenu, onApps, os, pkg, post, prefs, ref, slash, wxw;

ref = require('kxk'), _ = ref._, app = ref.app, args = ref.args, klog = ref.klog, os = ref.os, post = ref.post, prefs = ref.prefs, slash = ref.slash;

electron = require('electron');

wxw = require('wxw');

pkg = require('../package.json');

mainMenu = electron.Menu.buildFromTemplate([
    {
        label: pkg.name,
        submenu: [
            {
                label: "About " + pkg.name,
                click: function() {
                    return KachelApp.showAbout();
                }
            }, {
                label: "DevTools",
                accelerator: 'CmdOrCtrl+Alt+I',
                click: function() {
                    return electron.BrowserWindow.getFocusedWindow().webContents.openDevTools({
                        mode: 'detach'
                    });
                }
            }, {
                label: "Reload",
                accelerator: 'CmdOrCtrl+Alt+L',
                click: function() {
                    return electron.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
                }
            }, {
                label: "Quit",
                accelerator: 'CmdOrCtrl+Q',
                click: function() {
                    return KachelApp.quitApp();
                }
            }
        ]
    }
]);

KachelApp = new app({
    pkg: pkg,
    dir: __dirname,
    shortcut: slash.win() && 'Ctrl+F2' || 'F2',
    index: './index.html',
    icon: '../img/app.ico',
    tray: '../img/menu.png',
    about: '../img/about.png',
    menu: mainMenu,
    width: 168,
    height: 256,
    minWidth: 64,
    maxWidth: 256,
    maximizable: false,
    prefsSeperator: '▸',
    acceptFirstMouse: true,
    onActivate: function() {
        return klog('onActivate');
    },
    onOtherInstance: function() {
        return klog('onOtherInstance');
    },
    onQuit: function() {
        return klog('onQuit');
    },
    onWinReady: (function(_this) {
        return function(w) {
            var a, i, keys, len, mainWin, ref1;
            if (args.devtools) {
                w.webContents.openDevTools({
                    mode: 'detach'
                });
            }
            mainWin = w;
            w.setHasShadow(false);
            if (os.platform() === 'win32') {
                keys = {
                    left: 'alt+ctrl+left',
                    right: 'alt+ctrl+right',
                    up: 'alt+ctrl+up',
                    down: 'alt+ctrl+down',
                    topleft: 'alt+ctrl+1',
                    botleft: 'alt+ctrl+2',
                    topright: 'alt+ctrl+3',
                    botright: 'alt+ctrl+4',
                    top: 'alt+ctrl+5',
                    bot: 'alt+ctrl+6',
                    minimize: 'alt+ctrl+m',
                    maximize: 'alt+ctrl+shift+m',
                    close: 'alt+ctrl+w',
                    taskbar: 'alt+ctrl+t',
                    appswitch: 'ctrl+tab',
                    screenzoom: 'alt+z'
                };
                electron.globalShortcut.register('F13', function() {
                    return action('taskbar');
                });
                keys = prefs.get('keys', keys);
                prefs.set('keys', keys);
                prefs.save();
                ref1 = _.keys(keys);
                for (i = 0, len = ref1.length; i < len; i++) {
                    a = ref1[i];
                    electron.globalShortcut.register(keys[a], (function(a) {
                        return function() {
                            return action(a);
                        };
                    })(a));
                }
            }
            return w.show();
        };
    })(this)
});

action = function(act) {
    klog('action', act);
    switch (act) {
        case 'maximize':
            return console.log(wxw('maximize', 'top'));
        case 'minimize':
            return console.log(wxw('minimize', 'top'));
        case 'close':
            return console.log(wxw('close', 'top'));
        case 'taskbar':
            wxw('taskbar', 'toggle');
            return post.toMain('screensize');
        case 'screenzoom':
            return require('./zoom').start({
                debug: false
            });
        case 'appswitch':
            return onAppSwitch();
        default:
            return require('./movewin')(act);
    }
};

activeApps = {};

onApps = function(apps) {
    var active;
    active = {};
    if (!_.isEqual(activeApps, active)) {
        return activeApps = active;
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbIm1haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBOztBQVFBLE1BQWlELE9BQUEsQ0FBUSxLQUFSLENBQWpELEVBQUUsU0FBRixFQUFLLGFBQUwsRUFBVSxlQUFWLEVBQWdCLGVBQWhCLEVBQXNCLFdBQXRCLEVBQTBCLGVBQTFCLEVBQWdDLGlCQUFoQyxFQUF1Qzs7QUFFdkMsUUFBQSxHQUFZLE9BQUEsQ0FBUSxVQUFSOztBQUNaLEdBQUEsR0FBWSxPQUFBLENBQVEsS0FBUjs7QUFDWixHQUFBLEdBQVksT0FBQSxDQUFRLGlCQUFSOztBQUVaLFFBQUEsR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFkLENBQWdDO0lBQ25DO1FBQUEsS0FBQSxFQUFPLEdBQUcsQ0FBQyxJQUFYO1FBQ0EsT0FBQSxFQUFTO1lBQ0w7Z0JBQUEsS0FBQSxFQUFPLFFBQUEsR0FBUyxHQUFHLENBQUMsSUFBcEI7Z0JBQ0EsS0FBQSxFQUFPLFNBQUE7MkJBQUcsU0FBUyxDQUFDLFNBQVYsQ0FBQTtnQkFBSCxDQURQO2FBREssRUFJTDtnQkFBQSxLQUFBLEVBQU8sVUFBUDtnQkFDQSxXQUFBLEVBQWEsaUJBRGI7Z0JBRUEsS0FBQSxFQUFPLFNBQUE7MkJBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBdkIsQ0FBQSxDQUF5QyxDQUFDLFdBQVcsQ0FBQyxZQUF0RCxDQUFtRTt3QkFBQSxJQUFBLEVBQUssUUFBTDtxQkFBbkU7Z0JBQUgsQ0FGUDthQUpLLEVBUUw7Z0JBQUEsS0FBQSxFQUFPLFFBQVA7Z0JBQ0EsV0FBQSxFQUFhLGlCQURiO2dCQUVBLEtBQUEsRUFBTyxTQUFBOzJCQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQXZCLENBQUEsQ0FBeUMsQ0FBQyxXQUFXLENBQUMsbUJBQXRELENBQUE7Z0JBQUgsQ0FGUDthQVJLLEVBWUw7Z0JBQUEs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QUwsRUFBYyxHQUFkO0FBQ0EsWUFBTyxHQUFQO0FBQUEsYUFDUyxVQURUO21CQUNrQixPQUFBLENBQVMsR0FBVCxDQUFhLEdBQUEsQ0FBSSxVQUFKLEVBQWUsS0FBZixDQUFiO0FBRGxCLGFBRVMsVUFGVDttQkFFa0IsT0FBQSxDQUFTLEdBQVQsQ0FBYSxHQUFBLENBQUksVUFBSixFQUFlLEtBQWYsQ0FBYjtBQUZsQixhQUdTLE9BSFQ7bUJBR2UsT0FBQSxDQUFZLEdBQVosQ0FBZ0IsR0FBQSxDQUFJLE9BQUosRUFBZSxLQUFmLENBQWhCO0FBSGYsYUFJUyxTQUpUO1lBSTJCLEdBQUEsQ0FBSSxTQUFKLEVBQWMsUUFBZDttQkFBd0IsSUFBSSxDQUFDLE1BQUwsQ0FBWSxZQUFaO0FBSm5ELGFBS1MsWUFMVDttQkFLMkIsT0FBQSxDQUFRLFFBQVIsQ0FBaUIsQ0FBQyxLQUFsQixDQUF3QjtnQkFBQSxLQUFBLEVBQU0sS0FBTjthQUF4QjtBQUwzQixhQU1TLFdBTlQ7bUJBTTJCLFdBQUEsQ0FBQTtBQU4zQjttQkFRUSxPQUFBLENBQVEsV0FBUixDQUFBLENBQXFCLEdBQXJCO0FBUlI7QUFISzs7QUFtQlQsVUFBQSxHQUFhOztBQUNiLE1BQUEsR0FBUyxTQUFDLElBQUQ7QUFHTCxRQUFBO0lBQUEsTUFBQSxHQUFTO0lBS1QsSUFBRyxDQUFJLENBQUMsQ0FBQyxPQUFGLENBQVUsVUFBVixFQUFzQixNQUF0QixDQUFQO2VBTUksVUFBQSxHQUFhLE9BTmpCOztBQVJLIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4wMCAgICAgMDAgICAwMDAwMDAwICAgMDAwICAwMDAgICAwMDBcbjAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgIDAwMDAgIDAwMFxuMDAwMDAwMDAwICAwMDAwMDAwMDAgIDAwMCAgMDAwIDAgMDAwXG4wMDAgMCAwMDAgIDAwMCAgIDAwMCAgMDAwICAwMDAgIDAwMDBcbjAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgIDAwMCAgIDAwMFxuIyMjXG5cbnsgXywgYXBwLCBhcmdzLCBrbG9nLCBvcywgcG9zdCwgcHJlZnMsIHNsYXNoIH0gPSByZXF1aXJlICdreGsnXG5cbmVsZWN0cm9uICA9IHJlcXVpcmUgJ2VsZWN0cm9uJ1xud3h3ICAgICAgID0gcmVxdWlyZSAnd3h3J1xucGtnICAgICAgID0gcmVxdWlyZSAnLi4vcGFja2FnZS5qc29uJ1xuXG5tYWluTWVudSA9IGVsZWN0cm9uLk1lbnUuYnVpbGRGcm9tVGVtcGxhdGUgWyBcbiAgICAgICAgbGFiZWw6IHBrZy5uYW1lXG4gICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICAgIGxhYmVsOiBcIkFib3V0ICN7cGtnLm5hbWV9XCJcbiAgICAgICAgICAgIGNsaWNrOiAtPiBLYWNoZWxBcHAuc2hvd0Fib3V0KClcbiAgICAgICAgLCBcbiAgICAgICAgICAgIGxhYmVsOiBcIkRldlRvb2xzXCJcbiAgICAgICAgICAgIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK0FsdCtJJ1xuICAgICAgICAgICAgY2xpY2s6IC0+IGVsZWN0cm9uLkJyb3dzZXJXaW5kb3cuZ2V0Rm9jdXNlZFdpbmRvdygpLndlYkNvbnRlbnRzLm9wZW5EZXZUb29scyhtb2RlOidkZXRhY2gnKVxuICAgICAgICAsXG4gICAgICAgICAgICBsYWJlbDogXCJSZWxvYWRcIlxuICAgICAgICAgICAgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrQWx0K0wnXG4gICAgICAgICAgICBjbGljazogLT4gZWxlY3Ryb24uQnJvd3NlcldpbmRvdy5nZXRGb2N1c2VkV2luZG93KCkud2ViQ29udGVudHMucmVsb2FkSWdub3JpbmdDYWNoZSgpXG4gICAgICAgICxcbiAgICAgICAgICAgIGxhYmVsOiBcIlF1aXRcIlxuICAgICAgICAgICAgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrUSdcbiAgICAgICAgICAgIGNsaWNrOiAtPiBLYWNoZWxBcHAucXVpdEFwcCgpXG4gICAgICAgIF1cbiAgICBdXG5cbkthY2hlbEFwcCA9IG5ldyBhcHBcbiAgICBwa2c6ICAgICAgICAgICAgICAgIHBrZ1xuICAgIGRpcjogICAgICAgICAgICAgICAgX19kaXJuYW1lXG4gICAgc2hvcnRjdXQ6ICAgICAgICAgICBzbGFzaC53aW4oKSBhbmQgJ0N0cmwrRjInIG9yICdGMidcbiAgICBpbmRleDogICAgICAgICAgICAgICcuL2luZGV4Lmh0bWwnXG4gICAgaWNvbjogICAgICAgICAgICAgICAnLi4vaW1nL2FwcC5pY28nXG4gICAgdHJheTogICAgICAgICAgICAgICAnLi4vaW1nL21lbnUucG5nJ1xuICAgIGFib3V0OiAgICAgICAgICAgICAgJy4uL2ltZy9hYm91dC5wbmcnXG4gICAgbWVudTogICAgICAgICAgICAgICBtYWluTWVudVxuICAgIHdpZHRoOiAgICAgICAgICAgICAgMTY4XG4gICAgaGVpZ2h0OiAgICAgICAgICAgICAyNTZcbiAgICBtaW5XaWR0aDogICAgICAgICAgIDY0XG4gICAgbWF4V2lkdGg6ICAgICAgICAgICAyNTZcbiAgICBtYXhpbWl6YWJsZTogICAgICAgIGZhbHNlXG4gICAgcHJlZnNTZXBlcmF0b3I6ICAgICAn4pa4J1xuICAgIGFjY2VwdEZpcnN0TW91c2U6ICAgdHJ1ZVxuICAgIG9uQWN0aXZhdGU6ICAgICAgICAgLT4ga2xvZyAnb25BY3RpdmF0ZSdcbiAgICBvbk90aGVySW5zdGFuY2U6ICAgIC0+IGtsb2cgJ29uT3RoZXJJbnN0YW5jZSdcbiAgICBvblF1aXQ6ICAgICAgICAgICAgIC0+IGtsb2cgJ29uUXVpdCdcbiAgICBvbldpblJlYWR5OiAodykgPT5cbiAgICAgICAgXG4gICAgICAgIHcud2ViQ29udGVudHMub3BlbkRldlRvb2xzKG1vZGU6J2RldGFjaCcpIGlmIGFyZ3MuZGV2dG9vbHNcbiAgICAgICAgXG4gICAgICAgICMgZWxlY3Ryb24ucG93ZXJTYXZlQmxvY2tlci5zdGFydCAncHJldmVudC1hcHAtc3VzcGVuc2lvbidcbiAgICAgICAgXG4gICAgICAgIG1haW5XaW4gPSB3XG4gICAgICAgIHcuc2V0SGFzU2hhZG93IGZhbHNlXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAga2V5cyA9IFxuICAgICAgICAgICAgICAgIGxlZnQ6ICAgICAgICdhbHQrY3RybCtsZWZ0J1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAgICAgICdhbHQrY3RybCtyaWdodCdcbiAgICAgICAgICAgICAgICB1cDogICAgICAgICAnYWx0K2N0cmwrdXAnXG4gICAgICAgICAgICAgICAgZG93bjogICAgICAgJ2FsdCtjdHJsK2Rvd24nXG4gICAgICAgICAgICAgICAgdG9wbGVmdDogICAgJ2FsdCtjdHJsKzEnXG4gICAgICAgICAgICAgICAgYm90bGVmdDogICAgJ2FsdCtjdHJsKzInXG4gICAgICAgICAgICAgICAgdG9wcmlnaHQ6ICAgJ2FsdCtjdHJsKzMnXG4gICAgICAgICAgICAgICAgYm90cmlnaHQ6ICAgJ2FsdCtjdHJsKzQnXG4gICAgICAgICAgICAgICAgdG9wOiAgICAgICAgJ2FsdCtjdHJsKzUnXG4gICAgICAgICAgICAgICAgYm90OiAgICAgICAgJ2FsdCtjdHJsKzYnXG4gICAgICAgICAgICAgICAgbWluaW1pemU6ICAgJ2FsdCtjdHJsK20nXG4gICAgICAgICAgICAgICAgbWF4aW1pemU6ICAgJ2FsdCtjdHJsK3NoaWZ0K20nXG4gICAgICAgICAgICAgICAgY2xvc2U6ICAgICAgJ2FsdCtjdHJsK3cnXG4gICAgICAgICAgICAgICAgdGFza2JhcjogICAgJ2FsdCtjdHJsK3QnXG4gICAgICAgICAgICAgICAgYXBwc3dpdGNoOiAgJ2N0cmwrdGFiJ1xuICAgICAgICAgICAgICAgIHNjcmVlbnpvb206ICdhbHQreidcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGVsZWN0cm9uLmdsb2JhbFNob3J0Y3V0LnJlZ2lzdGVyICdGMTMnIC0+IGFjdGlvbiAndGFza2JhcidcbiAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5cyA9IHByZWZzLmdldCAna2V5cycga2V5c1xuICAgICAgICAgICAgcHJlZnMuc2V0ICdrZXlzJyBrZXlzXG4gICAgICAgICAgICBwcmVmcy5zYXZlKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIGEgaW4gXy5rZXlzIGtleXNcbiAgICAgICAgICAgICAgICBlbGVjdHJvbi5nbG9iYWxTaG9ydGN1dC5yZWdpc3RlciBrZXlzW2FdLCAoKGEpIC0+IC0+IGFjdGlvbiBhKShhKVxuICAgICAgICBcbiAgICAgICAgIyBwb3N0Lm9uICdtb3VzZScgb25Nb3VzZVxuICAgICAgICBcbiAgICAgICAgdy5zaG93KClcbiAgICAgICAgXG4jICAwMDAwMDAwICAgIDAwMDAwMDAgIDAwMDAwMDAwMCAgMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgICAgICAgIDAwMCAgICAgMDAwICAwMDAgICAwMDAgIDAwMDAgIDAwMCAgXG4jIDAwMDAwMDAwMCAgMDAwICAgICAgICAgIDAwMCAgICAgMDAwICAwMDAgICAwMDAgIDAwMCAwIDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgICAgICAgIDAwMCAgICAgMDAwICAwMDAgICAwMDAgIDAwMCAgMDAwMCAgXG4jIDAwMCAgIDAwMCAgIDAwMDAwMDAgICAgIDAwMCAgICAgMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgXG5cbmFjdGlvbiA9IChhY3QpIC0+XG5cbiAgICBrbG9nICdhY3Rpb24nIGFjdFxuICAgIHN3aXRjaCBhY3RcbiAgICAgICAgd2hlbiAnbWF4aW1pemUnICAgdGhlbiBsb2cgd3h3ICdtYXhpbWl6ZScgJ3RvcCdcbiAgICAgICAgd2hlbiAnbWluaW1pemUnICAgdGhlbiBsb2cgd3h3ICdtaW5pbWl6ZScgJ3RvcCdcbiAgICAgICAgd2hlbiAnY2xvc2UnICAgICAgdGhlbiBsb2cgd3h3ICdjbG9zZScgICAgJ3RvcCdcbiAgICAgICAgd2hlbiAndGFza2JhcicgICAgdGhlbiB3eHcgJ3Rhc2tiYXInICd0b2dnbGUnOyBwb3N0LnRvTWFpbiAnc2NyZWVuc2l6ZSdcbiAgICAgICAgd2hlbiAnc2NyZWVuem9vbScgdGhlbiByZXF1aXJlKCcuL3pvb20nKS5zdGFydCBkZWJ1ZzpmYWxzZVxuICAgICAgICB3aGVuICdhcHBzd2l0Y2gnICB0aGVuIG9uQXBwU3dpdGNoKClcbiAgICAgICAgZWxzZSBcbiAgICAgICAgICAgIHJlcXVpcmUoJy4vbW92ZXdpbicpIGFjdFxuICAgICAgICAgICAgICAgIFxuIyAgMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICAgMDAwMDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICBcbiMgMDAwMDAwMDAwICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMCAgIFxuIyAwMDAgICAwMDAgIDAwMCAgICAgICAgMDAwICAgICAgICAgICAgIDAwMCAgXG4jIDAwMCAgIDAwMCAgMDAwICAgICAgICAwMDAgICAgICAgIDAwMDAwMDAgICBcblxuYWN0aXZlQXBwcyA9IHt9XG5vbkFwcHMgPSAoYXBwcykgLT5cbiAgICAjIGtsb2cgJ2FwcHMgLS0tLS0tLS0tLS0tICcgYXBwcy5sZW5ndGhcbiAgICAjIGtsb2cgYXBwc1xuICAgIGFjdGl2ZSA9IHt9XG4gICAgIyBmb3IgYXBwIGluIGFwcHNcbiAgICAgICAgIyBpZiB3aWQgPSBrYWNoZWxTZXQud2lkc1tzbGFzaC5wYXRoIGFwcF1cbiAgICAgICAgICAgICMgYWN0aXZlW3NsYXNoLnBhdGggYXBwXSA9IHdpZFxuICAgICAgICAgICAgXG4gICAgaWYgbm90IF8uaXNFcXVhbCBhY3RpdmVBcHBzLCBhY3RpdmVcbiAgICAgICAgIyBmb3Iga2lkLHdpZCBvZiBrYWNoZWxTZXQud2lkc1xuICAgICAgICAgICAgIyBpZiBhY3RpdmVba2lkXSBhbmQgbm90IGFjdGl2ZUFwcHNba2lkXVxuICAgICAgICAgICAgICAgICMgcG9zdC50b1dpbiB3aWQsICdhcHAnICdhY3RpdmF0ZWQnIGtpZFxuICAgICAgICAgICAgIyBlbHNlIGlmIG5vdCBhY3RpdmVba2lkXSBhbmQgYWN0aXZlQXBwc1traWRdXG4gICAgICAgICAgICAgICAgIyBwb3N0LnRvV2luIHdpZCwgJ2FwcCcgJ3Rlcm1pbmF0ZWQnIGtpZFxuICAgICAgICBhY3RpdmVBcHBzID0gYWN0aXZlXG4gICAgXG4jIHBvc3Qub24gJ2FwcHMnIG9uQXBwc1xuIyBwb3N0Lm9uR2V0ICd3aW5zJyAtPiBsYXN0V2luc1xuIyBwb3N0Lm9uR2V0ICdtb3VzZScgLT4gbW91c2VQb3NcbiAgICAgICAgXG4jICAwMDAwMDAwICAwMDAgIDAwMDAwMDAgIDAwMDAwMDAwICBcbiMgMDAwICAgICAgIDAwMCAgICAgMDAwICAgMDAwICAgICAgIFxuIyAwMDAwMDAwICAgMDAwICAgIDAwMCAgICAwMDAwMDAwICAgXG4jICAgICAgMDAwICAwMDAgICAwMDAgICAgIDAwMCAgICAgICBcbiMgMDAwMDAwMCAgIDAwMCAgMDAwMDAwMCAgMDAwMDAwMDAgIFxuXG4jIHBvc3Qub24gJ3F1aXQnIEthY2hlbEFwcC5xdWl0QXBwXG4jIHBvc3Qub24gJ2hpZGUnIC0+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIl19
//# sourceURL=../coffee/main.coffee