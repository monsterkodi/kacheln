// koffee 1.14.0

/*
 0000000   0000000   00000000   00000000   0000000    
000       000   000  000   000  000       000         
000       000   000  0000000    0000000   0000000     
000       000   000  000   000  000            000    
 0000000   0000000   000   000  00000000  0000000
 */
var Cores, Kachel, empty, post, ref, utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ref = require('kxk'), empty = ref.empty, post = ref.post;

utils = require('./utils');

Kachel = require('./kachel');

Cores = (function(superClass) {
    extend(Cores, superClass);

    function Cores(kachelId) {
        this.kachelId = kachelId != null ? kachelId : 'cores';
        this.onData = bind(this.onData, this);
        Cores.__super__.constructor.call(this, this.kachelId);
        post.on('sysinfo', this.onData);
        this.colors = ['#44f', '#88f', '#0a0', '#f80', '#fa0', '#ff0'];
        this.init();
    }

    Cores.prototype.onData = function(data) {
        this.data = data;
        return this.draw();
    };

    Cores.prototype.init = function() {
        var body, i, j, len, ref1, results, svg;
        this.div.innerHTML = '';
        svg = utils.svg({
            width: 100,
            height: 100
        });
        this.div.appendChild(svg);
        body = utils.rect({
            x: -40,
            y: -40,
            w: 80,
            h: 80,
            r: 8,
            clss: 'core_bg',
            svg: svg
        });
        this.cores = [];
        ref1 = [0, 1, 2, 3, 4, 5, 6, 7];
        results = [];
        for (j = 0, len = ref1.length; j < len; j++) {
            i = ref1[j];
            this.cores.push(utils.rect({
                x: -31.5 + i * 8,
                y: -30,
                w: 7,
                h: 60,
                r: 2,
                clss: 'core_load',
                svg: svg
            }));
            results.push(this.cores[i].setAttribute('fill', '#222222'));
        }
        return results;
    };

    Cores.prototype.draw = function() {
        var fill, i, j, len, ref1, ref2, ref3, results;
        if (empty((ref1 = this.data) != null ? (ref2 = ref1.cpu) != null ? ref2.cores : void 0 : void 0)) {
            return;
        }
        if (!this.cores) {
            return;
        }
        ref3 = [0, 1, 2, 3, 4, 5, 6, 7];
        results = [];
        for (j = 0, len = ref3.length; j < len; j++) {
            i = ref3[j];
            fill = this.colors[parseInt(this.data.cpu.cores[i] * 5)];
            this.cores[i].setAttribute('y', -30 + 60 - 60 * this.data.cpu.cores[i]);
            this.cores[i].setAttribute('height', 60 * this.data.cpu.cores[i]);
            results.push(this.cores[i].setAttribute('fill', fill));
        }
        return results;
    };

    return Cores;

})(Kachel);

module.exports = Cores;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXMuanMiLCJzb3VyY2VSb290IjoiLi4vY29mZmVlIiwic291cmNlcyI6WyJjb3Jlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUEsc0NBQUE7SUFBQTs7OztBQVFBLE1BQWtCLE9BQUEsQ0FBUSxLQUFSLENBQWxCLEVBQUUsaUJBQUYsRUFBUzs7QUFFVCxLQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVI7O0FBQ1YsTUFBQSxHQUFVLE9BQUEsQ0FBUSxVQUFSOztBQUVKOzs7SUFFQyxlQUFDLFFBQUQ7UUFBQyxJQUFDLENBQUEsOEJBQUQsV0FBVTs7UUFFVix1Q0FBTSxJQUFDLENBQUEsUUFBUDtRQUVBLElBQUksQ0FBQyxFQUFMLENBQVEsU0FBUixFQUFrQixJQUFDLENBQUEsTUFBbkI7UUFFQSxJQUFDLENBQUEsTUFBRCxHQUFVLENBQUMsTUFBRCxFQUFRLE1BQVIsRUFBZSxNQUFmLEVBQXNCLE1BQXRCLEVBQTZCLE1BQTdCLEVBQW9DLE1BQXBDO1FBRVYsSUFBQyxDQUFBLElBQUQsQ0FBQTtJQVJEOztvQkFVSCxNQUFBLEdBQVEsU0FBQyxJQUFEO1FBQUMsSUFBQyxDQUFBLE9BQUQ7ZUFBVSxJQUFDLENBQUEsSUFBRCxDQUFBO0lBQVg7O29CQVFSLElBQUEsR0FBTSxTQUFBO0FBRUYsWUFBQTtRQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUFpQjtRQUNqQixHQUFBLEdBQU0sS0FBSyxDQUFDLEdBQU4sQ0FBVTtZQUFBLEtBQUEsRUFBTSxHQUFOO1lBQVUsTUFBQSxFQUFPLEdBQWpCO1NBQVY7UUFDTixJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsR0FBakI7UUFFQSxJQUFBLEdBQVMsS0FBSyxDQUFDLElBQU4sQ0FBVztZQUFBLENBQUEsRUFBRSxDQUFDLEVBQUg7WUFBTSxDQUFBLEVBQUUsQ0FBQyxFQUFUO1lBQVksQ0FBQSxFQUFFLEVBQWQ7WUFBaUIsQ0FBQSxFQUFFLEVBQW5CO1lBQXNCLENBQUEsRUFBRSxDQUF4QjtZQUEwQixJQUFBLEVBQUssU0FBL0I7WUFBeUMsR0FBQSxFQUFJLEdBQTdDO1NBQVg7UUFFVCxJQUFDLENBQUEsS0FBRCxHQUFTO0FBQ1Q7QUFBQTthQUFBLHNDQUFBOztZQUNJLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLEtBQUssQ0FBQyxJQUFOLENBQVc7Z0JBQUEsQ0FBQSxFQUFFLENBQUMsSUFBRCxHQUFNLENBQUEsR0FBRSxDQUFWO2dCQUFZLENBQUEsRUFBRSxDQUFDLEVBQWY7Z0JBQWtCLENBQUEsRUFBRSxDQUFwQjtnQkFBc0IsQ0FBQSxFQUFFLEVBQXhCO2dCQUEyQixDQUFBLEVBQUUsQ0FBN0I7Z0JBQStCLElBQUEsRUFBSyxXQUFwQztnQkFBZ0QsR0FBQSxFQUFJLEdBQXBEO2FBQVgsQ0FBWjt5QkFDQSxJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLFlBQVYsQ0FBdUIsTUFBdkIsRUFBOEIsU0FBOUI7QUFGSjs7SUFURTs7b0JBbUJMLElBQUEsR0FBTSxTQUFBO0FBRUgsWUFBQTtRQUFBLElBQVUsS0FBQSw4REFBZ0IsQ0FBRSx1QkFBbEIsQ0FBVjtBQUFBLG1CQUFBOztRQUNBLElBQVUsQ0FBSSxJQUFDLENBQUEsS0FBZjtBQUFBLG1CQUFBOztBQUVBO0FBQUE7YUFBQSxzQ0FBQTs7WUFDSSxJQUFBLEdBQU8sSUFBQyxDQUFBLE1BQU8sQ0FBQSxRQUFBLENBQVMsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBaEIsR0FBbUIsQ0FBNUIsQ0FBQTtZQUNmLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBVixDQUF1QixHQUF2QixFQUEyQixDQUFDLEVBQUQsR0FBSSxFQUFKLEdBQU8sRUFBQSxHQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQXJEO1lBQ0EsSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUFWLENBQXVCLFFBQXZCLEVBQWdDLEVBQUEsR0FBRyxJQUFDLENBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFuRDt5QkFDQSxJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLFlBQVYsQ0FBdUIsTUFBdkIsRUFBOEIsSUFBOUI7QUFKSjs7SUFMRzs7OztHQXZDUzs7QUFrRHBCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG4gMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMCAgICBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgIDAwMCAgICAgICAgIFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwMDAwMCAgICAgXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAgICAgIDAwMCAgICBcbiAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMCAgIDAwMCAgMDAwMDAwMDAgIDAwMDAwMDAgICAgIFxuIyMjXG5cbnsgZW1wdHksIHBvc3QgfSA9IHJlcXVpcmUgJ2t4aydcblxudXRpbHMgICA9IHJlcXVpcmUgJy4vdXRpbHMnXG5LYWNoZWwgID0gcmVxdWlyZSAnLi9rYWNoZWwnXG5cbmNsYXNzIENvcmVzIGV4dGVuZHMgS2FjaGVsXG4gICAgICAgIFxuICAgIEA6IChAa2FjaGVsSWQ9J2NvcmVzJykgLT4gXG4gICAgICAgIFxuICAgICAgICBzdXBlciBAa2FjaGVsSWRcbiAgICAgICAgXG4gICAgICAgIHBvc3Qub24gJ3N5c2luZm8nIEBvbkRhdGFcbiAgICAgICAgXG4gICAgICAgIEBjb2xvcnMgPSBbJyM0NGYnICcjODhmJyAnIzBhMCcgJyNmODAnICcjZmEwJyAnI2ZmMCddXG4gICAgICAgIFxuICAgICAgICBAaW5pdCgpXG4gICAgXG4gICAgb25EYXRhOiAoQGRhdGEpID0+IEBkcmF3KClcbiAgICAgICAgXG4gICAgIyAwMDAgIDAwMCAgIDAwMCAgMDAwICAwMDAwMDAwMDBcbiAgICAjIDAwMCAgMDAwMCAgMDAwICAwMDAgICAgIDAwMCAgIFxuICAgICMgMDAwICAwMDAgMCAwMDAgIDAwMCAgICAgMDAwICAgXG4gICAgIyAwMDAgIDAwMCAgMDAwMCAgMDAwICAgICAwMDAgICBcbiAgICAjIDAwMCAgMDAwICAgMDAwICAwMDAgICAgIDAwMCAgIFxuICAgIFxuICAgIGluaXQ6IC0+XG4gXG4gICAgICAgIEBkaXYuaW5uZXJIVE1MID0gJydcbiAgICAgICAgc3ZnID0gdXRpbHMuc3ZnIHdpZHRoOjEwMCBoZWlnaHQ6MTAwXG4gICAgICAgIEBkaXYuYXBwZW5kQ2hpbGQgc3ZnXG5cbiAgICAgICAgYm9keSAgID0gdXRpbHMucmVjdCB4Oi00MCB5Oi00MCB3OjgwIGg6ODAgcjo4IGNsc3M6J2NvcmVfYmcnIHN2ZzpzdmdcbiAgICAgICAgXG4gICAgICAgIEBjb3JlcyA9IFtdXG4gICAgICAgIGZvciBpIGluIDAuLi44XG4gICAgICAgICAgICBAY29yZXMucHVzaCB1dGlscy5yZWN0IHg6LTMxLjUraSo4IHk6LTMwIHc6NyBoOjYwIHI6MiBjbHNzOidjb3JlX2xvYWQnIHN2ZzpzdmdcbiAgICAgICAgICAgIEBjb3Jlc1tpXS5zZXRBdHRyaWJ1dGUgJ2ZpbGwnICcjMjIyMjIyJ1xuICAgICAgICAgICAgXG4gICAgICMgMDAwMDAwMCAgICAwMDAwMDAwMCAgICAwMDAwMDAwICAgMDAwICAgMDAwXG4gICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwIDAgMDAwXG4gICAgICMgMDAwICAgMDAwICAwMDAwMDAwICAgIDAwMDAwMDAwMCAgMDAwMDAwMDAwXG4gICAgICMgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgMDAwXG4gICAgICMgMDAwMDAwMCAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAgICAgIDAwXG5cbiAgICAgZHJhdzogLT5cblxuICAgICAgICByZXR1cm4gaWYgZW1wdHkgQGRhdGE/LmNwdT8uY29yZXNcbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAY29yZXNcblxuICAgICAgICBmb3IgaSBpbiAwLi4uOFxuICAgICAgICAgICAgZmlsbCA9IEBjb2xvcnNbcGFyc2VJbnQgQGRhdGEuY3B1LmNvcmVzW2ldKjVdXG4gICAgICAgICAgICBAY29yZXNbaV0uc2V0QXR0cmlidXRlICd5JyAtMzArNjAtNjAqQGRhdGEuY3B1LmNvcmVzW2ldXG4gICAgICAgICAgICBAY29yZXNbaV0uc2V0QXR0cmlidXRlICdoZWlnaHQnIDYwKkBkYXRhLmNwdS5jb3Jlc1tpXVxuICAgICAgICAgICAgQGNvcmVzW2ldLnNldEF0dHJpYnV0ZSAnZmlsbCcgZmlsbFxuICAgICAgICAgICAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBDb3Jlc1xuIl19
//# sourceURL=../coffee/cores.coffee