// koffee 1.14.0

/*
00     00   0000000   000   000  00000000  000   000  000  000   000
000   000  000   000  000   000  000       000 0 000  000  0000  000
000000000  000   000   000 000   0000000   000000000  000  000 0 000
000 0 000  000   000     000     000       000   000  000  000  0000
000   000   0000000       0      00000000  00     00  000  000   000
 */
var klog, moveWin, os, ref, slash, wxw;

ref = require('kxk'), klog = ref.klog, os = ref.os, slash = ref.slash;

wxw = require('wxw');

moveWin = function(dir) {
    var ar, b, base, d, h, info, infos, ko, ref1, sb, screen, sl, sr, st, w, wr, x, y;
    screen = wxw('screen', 'user');
    ar = {
        w: screen.width,
        h: screen.height
    };
    if (os.platform() === 'win32') {
        infos = wxw('info', 'top');
    } else {
        infos = wxw('info', 'top').filter(function(i) {
            return i.index >= 0;
        });
        infos.sort(function(a, b) {
            return a.index - b.index;
        });
    }
    if (info = infos[0]) {
        base = slash.base(info.path);
        if (base === 'kachel' || base === 'kacheln' || base === 'kappo') {
            return;
        }
        b = 0;
        if (os.platform() === 'win32') {
            if (base === 'electron' || base === 'ko' || base === 'konrad' || base === 'clippo' || base === 'klog' || base === 'kaligraf' || base === 'kalk' || base === 'uniko' || base === 'knot' || base === 'space' || base === 'ruler' || base === 'keks') {
                b = 0;
            } else if (base === 'devenv') {
                b = -1;
            } else {
                b = 10;
            }
        }
        wr = {
            x: info.x,
            y: info.y,
            w: info.width,
            h: info.height
        };
        ko = 216;
        d = 2 * b;
        ref1 = (function() {
            switch (dir) {
                case 'left':
                    return [-b, 0, ar.w / 2 + d, ar.h + b];
                case 'right':
                    return [ar.w / 2 - b, 0, ar.w / 2 + d - ko, ar.h + b];
                case 'down':
                    return [ar.w / 6 - b, 0, 2 / 3 * ar.w + d, ar.h + b];
                case 'up':
                    return [-b, 0, ar.w + d - ko, ar.h + b];
                case 'topleft':
                    return [-b, 0, ar.w / 2 + d, ar.h / 2];
                case 'botleft':
                    return [-b, ar.h / 2 - b, ar.w / 2 + d, ar.h / 2 + d];
                case 'topright':
                    return [ar.w / 2 - b, 0, ar.w / 2 + d - ko, ar.h / 2];
                case 'botright':
                    return [ar.w / 2 - b, ar.h / 2 - b, ar.w / 2 + d - ko, ar.h / 2 + d];
                case 'top':
                    return [ar.w / 6 - b, 0, 2 * ar.w / 3 + d, ar.h / 2];
                case 'bot':
                    return [ar.w / 6 - b, ar.h / 2 - b, 2 * ar.w / 3 + d, ar.h / 2 + d];
            }
        })(), x = ref1[0], y = ref1[1], w = ref1[2], h = ref1[3];
        sl = 30 > Math.abs(wr.x - x);
        sr = 30 > Math.abs(wr.x + wr.w - (x + w));
        st = 30 > Math.abs(wr.y - y);
        sb = 30 > Math.abs(wr.y + wr.h - (y + h));
        if (sl && sr && st && sb) {
            switch (dir) {
                case 'left':
                    w = ar.w / 3 + d;
                    break;
                case 'right':
                    w = ar.w / 2 + d;
                    break;
                case 'down':
                    x = ar.w / 3 - b;
                    w = 2 / 3 * ar.w + d - ko;
                    break;
                case 'up':
                    x = -b;
                    w = ar.w + d;
                    break;
                case 'topleft':
                    w = ar.w / 3 + d;
                    break;
                case 'botleft':
                    w = ar.w / 3 + d;
                    break;
                case 'topright':
                    x = 2 * ar.w / 3 - b;
                    w = ar.w / 3 + d;
                    break;
                case 'botright':
                    x = 2 * ar.w / 3 - b;
                    w = ar.w / 3 + d;
                    break;
                case 'top':
                    x = ar.w / 3 - b;
                    w = ar.w / 3 + d;
                    break;
                case 'bot':
                    x = ar.w / 3 - b;
                    w = ar.w / 3 + d;
            }
        }
        klog('bounds', info.id, parseInt(x), parseInt(y), parseInt(w), parseInt(h));
        return wxw('bounds', info.id, parseInt(x), parseInt(y), parseInt(w), parseInt(h));
    } else {
        return klog('no info!');
    }
};

module.exports = moveWin;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZXdpbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9jb2ZmZWUiLCJzb3VyY2VzIjpbIm1vdmV3aW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFBQSxJQUFBOztBQVFBLE1BQXNCLE9BQUEsQ0FBUSxLQUFSLENBQXRCLEVBQUUsZUFBRixFQUFRLFdBQVIsRUFBWTs7QUFFWixHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVI7O0FBRU4sT0FBQSxHQUFVLFNBQUMsR0FBRDtBQUVOLFFBQUE7SUFBQSxNQUFBLEdBQVMsR0FBQSxDQUFJLFFBQUosRUFBYSxNQUFiO0lBQ1QsRUFBQSxHQUFLO1FBQUEsQ0FBQSxFQUFFLE1BQU0sQ0FBQyxLQUFUO1FBQWdCLENBQUEsRUFBRSxNQUFNLENBQUMsTUFBekI7O0lBRUwsSUFBRyxFQUFFLENBQUMsUUFBSCxDQUFBLENBQUEsS0FBaUIsT0FBcEI7UUFDSSxLQUFBLEdBQVEsR0FBQSxDQUFJLE1BQUosRUFBVyxLQUFYLEVBRFo7S0FBQSxNQUFBO1FBR0ksS0FBQSxHQUFRLEdBQUEsQ0FBSSxNQUFKLEVBQVcsS0FBWCxDQUFpQixDQUFDLE1BQWxCLENBQXlCLFNBQUMsQ0FBRDttQkFBTyxDQUFDLENBQUMsS0FBRixJQUFXO1FBQWxCLENBQXpCO1FBQ1IsS0FBSyxDQUFDLElBQU4sQ0FBVyxTQUFDLENBQUQsRUFBRyxDQUFIO21CQUFTLENBQUMsQ0FBQyxLQUFGLEdBQVUsQ0FBQyxDQUFDO1FBQXJCLENBQVgsRUFKSjs7SUFNQSxJQUFHLElBQUEsR0FBTyxLQUFNLENBQUEsQ0FBQSxDQUFoQjtRQUVJLElBQUEsR0FBTyxLQUFLLENBQUMsSUFBTixDQUFXLElBQUksQ0FBQyxJQUFoQjtRQUVQLElBQVUsSUFBQSxLQUFTLFFBQVQsSUFBQSxJQUFBLEtBQWtCLFNBQWxCLElBQUEsSUFBQSxLQUE0QixPQUF0QztBQUFBLG1CQUFBOztRQUVBLENBQUEsR0FBSTtRQUVKLElBQUcsRUFBRSxDQUFDLFFBQUgs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QSxJQUFBLENBQUssUUFBTCxFQUFjLElBQUksQ0FBQyxFQUFuQixFQUF1QixRQUFBLENBQVMsQ0FBVCxDQUF2QixFQUFvQyxRQUFBLENBQVMsQ0FBVCxDQUFwQyxFQUFpRCxRQUFBLENBQVMsQ0FBVCxDQUFqRCxFQUE4RCxRQUFBLENBQVMsQ0FBVCxDQUE5RDtlQUNBLEdBQUEsQ0FBSSxRQUFKLEVBQWEsSUFBSSxDQUFDLEVBQWxCLEVBQXNCLFFBQUEsQ0FBUyxDQUFULENBQXRCLEVBQW1DLFFBQUEsQ0FBUyxDQUFULENBQW5DLEVBQWdELFFBQUEsQ0FBUyxDQUFULENBQWhELEVBQTZELFFBQUEsQ0FBUyxDQUFULENBQTdELEVBbERKO0tBQUEsTUFBQTtlQW9ESSxJQUFBLENBQUssVUFBTCxFQXBESjs7QUFYTTs7QUFpRVYsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbjAwICAgICAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAgICAwMDAgIDAwMCAgMDAwICAgMDAwXG4wMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwIDAgMDAwICAwMDAgIDAwMDAgIDAwMFxuMDAwMDAwMDAwICAwMDAgICAwMDAgICAwMDAgMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAwMCAgMDAwICAwMDAgMCAwMDBcbjAwMCAwIDAwMCAgMDAwICAgMDAwICAgICAwMDAgICAgIDAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgMDAwICAwMDAwXG4wMDAgICAwMDAgICAwMDAwMDAwICAgICAgIDAgICAgICAwMDAwMDAwMCAgMDAgICAgIDAwICAwMDAgIDAwMCAgIDAwMFxuIyMjXG5cbnsga2xvZywgb3MsIHNsYXNoIH0gPSByZXF1aXJlICdreGsnXG5cbnd4dyA9IHJlcXVpcmUgJ3d4dydcblxubW92ZVdpbiA9IChkaXIpIC0+XG4gICAgXG4gICAgc2NyZWVuID0gd3h3ICdzY3JlZW4nICd1c2VyJ1xuICAgIGFyID0gdzpzY3JlZW4ud2lkdGgsIGg6c2NyZWVuLmhlaWdodFxuICAgIFxuICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICBpbmZvcyA9IHd4dygnaW5mbycgJ3RvcCcpXG4gICAgZWxzZVxuICAgICAgICBpbmZvcyA9IHd4dygnaW5mbycgJ3RvcCcpLmZpbHRlciAoaSkgLT4gaS5pbmRleCA+PSAwXG4gICAgICAgIGluZm9zLnNvcnQgKGEsYikgLT4gYS5pbmRleCAtIGIuaW5kZXhcbiAgICBcbiAgICBpZiBpbmZvID0gaW5mb3NbMF1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgYmFzZSA9IHNsYXNoLmJhc2UgaW5mby5wYXRoXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWYgYmFzZSBpbiBbJ2thY2hlbCcgJ2thY2hlbG4nICdrYXBwbyddXG4gICAgICAgIFxuICAgICAgICBiID0gMFxuXG4gICAgICAgIGlmIG9zLnBsYXRmb3JtKCkgPT0gJ3dpbjMyJ1xuICAgICAgICAgICAgaWYgYmFzZSBpbiBbJ2VsZWN0cm9uJyAna28nICdrb25yYWQnICdjbGlwcG8nICdrbG9nJyAna2FsaWdyYWYnICdrYWxrJyAndW5pa28nICdrbm90JyAnc3BhY2UnICdydWxlcicgJ2tla3MnXVxuICAgICAgICAgICAgICAgIGIgPSAwICAjIHNhbmUgd2luZG93IGJvcmRlclxuICAgICAgICAgICAgZWxzZSBpZiBiYXNlIGluIFsnZGV2ZW52J11cbiAgICAgICAgICAgICAgICBiID0gLTEgICMgd3RmP1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGIgPSAxMCAjIHRyYW5zcGFyZW50IHdpbmRvdyBib3JkZXJcbiAgICAgICAgXG4gICAgICAgIHdyID0geDppbmZvLngsIHk6aW5mby55LCB3OmluZm8ud2lkdGgsIGg6aW5mby5oZWlnaHRcbiAgICAgICAga28gPSAyMTZcbiAgICAgICAgZCA9IDIqYlxuICAgICAgICBbeCx5LHcsaF0gPSBzd2l0Y2ggZGlyXG4gICAgICAgICAgICB3aGVuICdsZWZ0JyAgICAgdGhlbiBbLWIsICAgICAgICAgMCAgICAgICAgIGFyLncvMitkLCAgICAgYXIuaCtiXVxuICAgICAgICAgICAgd2hlbiAncmlnaHQnICAgIHRoZW4gW2FyLncvMi1iLCAgIDAgICAgICAgYXIudy8yK2Qta28sICAgIGFyLmgrYl1cbiAgICAgICAgICAgIHdoZW4gJ2Rvd24nICAgICB0aGVuIFthci53LzYtYiwgICAwICAgICAgICAyLzMqYXIudytkLCAgICBhci5oK2JdXG4gICAgICAgICAgICB3aGVuICd1cCcgICAgICAgdGhlbiBbLWIsICAgICAgICAgMCAgICAgICAgIGFyLncrZC1rbywgICAgYXIuaCtiXVxuICAgICAgICAgICAgd2hlbiAndG9wbGVmdCcgIHRoZW4gWy1iLCAgICAgICAgIDAgICAgICAgICBhci53LzIrZCwgICAgIGFyLmgvMl1cbiAgICAgICAgICAgIHdoZW4gJ2JvdGxlZnQnICB0aGVuIFstYiwgICAgICAgICBhci5oLzItYiwgYXIudy8yK2QsICAgICBhci5oLzIrZF1cbiAgICAgICAgICAgIHdoZW4gJ3RvcHJpZ2h0JyB0aGVuIFthci53LzItYiwgICAwICAgICAgICAgYXIudy8yK2Qta28sICBhci5oLzJdXG4gICAgICAgICAgICB3aGVuICdib3RyaWdodCcgdGhlbiBbYXIudy8yLWIsICAgYXIuaC8yLWIsIGFyLncvMitkLWtvLCAgYXIuaC8yK2RdXG4gICAgICAgICAgICB3aGVuICd0b3AnICAgICAgdGhlbiBbYXIudy82LWIsICAgMCAgICAgICAgIDIqYXIudy8zK2QsICAgYXIuaC8yXVxuICAgICAgICAgICAgd2hlbiAnYm90JyAgICAgIHRoZW4gW2FyLncvNi1iLCAgIGFyLmgvMi1iLCAyKmFyLncvMytkLCAgIGFyLmgvMitkXVxuICAgICAgICBcbiAgICAgICAgc2wgPSAzMCA+IE1hdGguYWJzIHdyLnggLSAgeFxuICAgICAgICBzciA9IDMwID4gTWF0aC5hYnMgd3IueCt3ci53IC0gKHgrdylcbiAgICAgICAgc3QgPSAzMCA+IE1hdGguYWJzIHdyLnkgLSAgeVxuICAgICAgICBzYiA9IDMwID4gTWF0aC5hYnMgd3IueSt3ci5oIC0gKHkraClcbiAgICAgICAgXG4gICAgICAgIGlmIHNsIGFuZCBzciBhbmQgc3QgYW5kIHNiXG4gICAgICAgICAgICBzd2l0Y2ggZGlyXG4gICAgICAgICAgICAgICAgd2hlbiAnbGVmdCcgICAgIHRoZW4gICAgICAgICAgICAgICAgIHcgPSBhci53LzMrZFxuICAgICAgICAgICAgICAgIHdoZW4gJ3JpZ2h0JyAgICB0aGVuICAgICAgICAgICAgICAgICB3ID0gYXIudy8yK2RcbiAgICAgICAgICAgICAgICB3aGVuICdkb3duJyAgICAgdGhlbiB4ID0gYXIudy8zLWI7ICAgdyA9IDIvMyphci53K2Qta29cbiAgICAgICAgICAgICAgICB3aGVuICd1cCcgICAgICAgdGhlbiB4ID0gLWI7ICAgICAgICAgdyA9IGFyLncrZCAgICAgXG4gICAgICAgICAgICAgICAgd2hlbiAndG9wbGVmdCcgIHRoZW4gICAgICAgICAgICAgICAgIHcgPSBhci53LzMrZFxuICAgICAgICAgICAgICAgIHdoZW4gJ2JvdGxlZnQnICB0aGVuICAgICAgICAgICAgICAgICB3ID0gYXIudy8zK2RcbiAgICAgICAgICAgICAgICB3aGVuICd0b3ByaWdodCcgdGhlbiB4ID0gMiphci53LzMtYjsgdyA9IGFyLncvMytkXG4gICAgICAgICAgICAgICAgd2hlbiAnYm90cmlnaHQnIHRoZW4geCA9IDIqYXIudy8zLWI7IHcgPSBhci53LzMrZFxuICAgICAgICAgICAgICAgIHdoZW4gJ3RvcCcgICAgICB0aGVuIHggPSBhci53LzMtYjsgICB3ID0gYXIudy8zK2RcbiAgICAgICAgICAgICAgICB3aGVuICdib3QnICAgICAgdGhlbiB4ID0gYXIudy8zLWI7ICAgdyA9IGFyLncvMytkXG4gICAgICAgIFxuICAgICAgICBrbG9nICdib3VuZHMnIGluZm8uaWQsIHBhcnNlSW50KHgpLCBwYXJzZUludCh5KSwgcGFyc2VJbnQodyksIHBhcnNlSW50KGgpXG4gICAgICAgIHd4dyAnYm91bmRzJyBpbmZvLmlkLCBwYXJzZUludCh4KSwgcGFyc2VJbnQoeSksIHBhcnNlSW50KHcpLCBwYXJzZUludChoKVxuICAgIGVsc2UgXG4gICAgICAgIGtsb2cgJ25vIGluZm8hJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdmVXaW5cbiJdfQ==
//# sourceURL=../coffee/movewin.coffee