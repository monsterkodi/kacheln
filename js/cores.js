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
        var body, i, j, k, len, len1, r, ref1, ref2, results, svg;
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
        ref1 = [0, 1, 2, 3, 4, 5, 6, 7];
        for (j = 0, len = ref1.length; j < len; j++) {
            i = ref1[j];
            r = utils.rect({
                x: -36 + i * 9,
                y: -36,
                w: 8,
                h: 72,
                r: 3,
                svg: svg,
                clss: 'core_load'
            });
        }
        this.cores = [];
        ref2 = [0, 1, 2, 3, 4, 5, 6, 7];
        results = [];
        for (k = 0, len1 = ref2.length; k < len1; k++) {
            i = ref2[k];
            this.cores.push(utils.rect({
                x: -36 + i * 9,
                y: 30,
                w: 8,
                h: 6,
                r: 3,
                svg: svg
            }));
            results.push(this.cores[i].setAttribute('fill', this.colors[0]));
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
            this.cores[i].setAttribute('y', 36 - 72 * this.data.cpu.cores[i]);
            this.cores[i].setAttribute('height', 72 * this.data.cpu.cores[i]);
            results.push(this.cores[i].setAttribute('fill', fill));
        }
        return results;
    };

    return Cores;

})(Kachel);

module.exports = Cores;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXMuanMiLCJzb3VyY2VSb290IjoiLi4vY29mZmVlIiwic291cmNlcyI6WyJjb3Jlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUEsc0NBQUE7SUFBQTs7OztBQVFBLE1BQWtCLE9BQUEsQ0FBUSxLQUFSLENBQWxCLEVBQUUsaUJBQUYsRUFBUzs7QUFFVCxLQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVI7O0FBQ1YsTUFBQSxHQUFVLE9BQUEsQ0FBUSxVQUFSOztBQUVKOzs7SUFFQyxlQUFDLFFBQUQ7UUFBQyxJQUFDLENBQUEsOEJBQUQsV0FBVTs7UUFFVix1Q0FBTSxJQUFDLENBQUEsUUFBUDtRQUVBLElBQUksQ0FBQyxFQUFMLENBQVEsU0FBUixFQUFrQixJQUFDLENBQUEsTUFBbkI7UUFFQSxJQUFDLENBQUEsTUFBRCxHQUFVLENBQUMsTUFBRCxFQUFRLE1BQVIsRUFBZSxNQUFmLEVBQXNCLE1BQXRCLEVBQTZCLE1BQTdCLEVBQW9DLE1BQXBDO1FBRVYsSUFBQyxDQUFBLElBQUQsQ0FBQTtJQVJEOztvQkFVSCxNQUFBLEdBQVEsU0FBQyxJQUFEO1FBQUMsSUFBQyxDQUFBLE9BQUQ7ZUFBVSxJQUFDLENBQUEsSUFBRCxDQUFBO0lBQVg7O29CQVFSLElBQUEsR0FBTSxTQUFBO0FBRUYsWUFBQTtRQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUFpQjtRQUNqQixHQUFBLEdBQU0sS0FBSyxDQUFDLEdBQU4sQ0FBVTtZQUFBLEtBQUEsRUFBTSxHQUFOO1lBQVUsTUFBQSxFQUFPLEdBQWpCO1NBQVY7UUFDTixJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsR0FBakI7UUFFQSxJQUFBLEdBQU8sS0FBSyxDQUFDLElBQU4sQ0FBVztZQUFBLENBQUEsRUFBRSxDQUFDLEVBQUg7WUFBTSxDQUFBLEVBQUUsQ0FBQyxFQUFUO1lBQVksQ0FBQSxFQUFFLEVBQWQ7WUFBaUIsQ0FBQSxFQUFFLEVBQW5CO1lBQXNCLENBQUEsRUFBRSxDQUF4QjtZQUEwQixJQUFBLEVBQUssU0FBL0I7WUFBeUMsR0FBQSxFQUFJLEdBQTdDO1NBQVg7QUFFUDtBQUFBLGFBQUEsc0NBQUE7O1lBQ0ksQ0FBQSxHQUFJLEtBQUssQ0FBQyxJQUFOLENBQVc7Z0JBQUEsQ0FBQSxFQUFFLENBQUMsRUFBRCxHQUFJLENBQUEsR0FBRSxDQUFSO2dCQUFVLENBQUEsRUFBRSxDQUFDLEVBQWI7Z0JBQWdCLENBQUEsRUFBRSxDQUFsQjtnQkFBb0IsQ0FBQSxFQUFFLEVBQXRCO2dCQUF5QixDQUFBLEVBQUUsQ0FBM0I7Z0JBQTZCLEdBQUEsRUFBSSxHQUFqQztnQkFBc0MsSUFBQSxFQUFLLFdBQTNDO2FBQVg7QUFEUjtRQUdBLElBQUMsQ0FBQSxLQUFELEdBQVM7QUFDVDtBQUFBO2FBQUEsd0NBQUE7O1lBQ0ksSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksS0FBSyxDQUFDLElBQU4sQ0FBVztnQkFBQSxDQUFBLEVBQUUsQ0FBQyxFQUFELEdBQUksQ0FBQSxHQUFFLENBQVI7Z0JBQVUsQ0FBQSxFQUFFLEVBQVo7Z0JBQWUsQ0FBQSxFQUFFLENBQWpCO2dCQUFtQixDQUFBLEVBQUUsQ0FBckI7Z0JBQXVCLENBQUEsRUFBRSxDQUF6QjtnQkFBMkIsR0FBQSxFQUFJLEdBQS9CO2FBQVgsQ0FBWjt5QkFDQSxJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLFlBQVYsQ0FBdUIsTUFBdkIsRUFBOEIsSUFBQyxDQUFBLE1BQU8sQ0FBQSxDQUFBLENBQXRDO0FBRko7O0lBWkU7O29CQXNCTCxJQUFBLEdBQU0sU0FBQTtBQUVILFlBQUE7UUFBQSxJQUFVLEtBQUEsOERBQWdCLENBQUUsdUJBQWxCLENBQVY7QUFBQSxtQkFBQTs7UUFDQSxJQUFVLENBQUksSUFBQyxDQUFBLEtBQWY7QUFBQSxtQkFBQTs7QUFFQTtBQUFBO2FBQUEsc0NBQUE7O1lBQ0ksSUFBQSxHQUFPLElBQUMsQ0FBQSxNQUFPLENBQUEsUUFBQSxDQUFTLElBQUMsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQWhCLEdBQW1CLENBQTVCLENBQUE7WUFDZixJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLFlBQVYsQ0FBdUIsR0FBdkIsRUFBMkIsRUFBQSxHQUFHLEVBQUEsR0FBRyxJQUFDLENBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFqRDtZQUNBLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBVixDQUF1QixRQUF2QixFQUFnQyxFQUFBLEdBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBbkQ7eUJBQ0EsSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUFWLENBQXVCLE1BQXZCLEVBQThCLElBQTlCO0FBSko7O0lBTEc7Ozs7R0ExQ1M7O0FBcURwQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwMCAgIDAwMDAwMDAgICAgXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgICAgICAwMDAgICAgICAgICBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMDAwMDAgICAgIFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgICAgICAwMDAgICAgXG4gMDAwMDAwMCAgIDAwMDAwMDAgICAwMDAgICAwMDAgIDAwMDAwMDAwICAwMDAwMDAwICAgICBcbiMjI1xuXG57IGVtcHR5LCBwb3N0IH0gPSByZXF1aXJlICdreGsnXG5cbnV0aWxzICAgPSByZXF1aXJlICcuL3V0aWxzJ1xuS2FjaGVsICA9IHJlcXVpcmUgJy4va2FjaGVsJ1xuXG5jbGFzcyBDb3JlcyBleHRlbmRzIEthY2hlbFxuICAgICAgICBcbiAgICBAOiAoQGthY2hlbElkPSdjb3JlcycpIC0+IFxuICAgICAgICBcbiAgICAgICAgc3VwZXIgQGthY2hlbElkXG4gICAgICAgIFxuICAgICAgICBwb3N0Lm9uICdzeXNpbmZvJyBAb25EYXRhXG4gICAgICAgIFxuICAgICAgICBAY29sb3JzID0gWycjNDRmJyAnIzg4ZicgJyMwYTAnICcjZjgwJyAnI2ZhMCcgJyNmZjAnXVxuICAgICAgICBcbiAgICAgICAgQGluaXQoKVxuICAgIFxuICAgIG9uRGF0YTogKEBkYXRhKSA9PiBAZHJhdygpXG4gICAgICAgIFxuICAgICMgMDAwICAwMDAgICAwMDAgIDAwMCAgMDAwMDAwMDAwXG4gICAgIyAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAwMDAgICBcbiAgICAjIDAwMCAgMDAwIDAgMDAwICAwMDAgICAgIDAwMCAgIFxuICAgICMgMDAwICAwMDAgIDAwMDAgIDAwMCAgICAgMDAwICAgXG4gICAgIyAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAwMDAgICBcbiAgICBcbiAgICBpbml0OiAtPlxuIFxuICAgICAgICBAZGl2LmlubmVySFRNTCA9ICcnXG4gICAgICAgIHN2ZyA9IHV0aWxzLnN2ZyB3aWR0aDoxMDAgaGVpZ2h0OjEwMFxuICAgICAgICBAZGl2LmFwcGVuZENoaWxkIHN2Z1xuXG4gICAgICAgIGJvZHkgPSB1dGlscy5yZWN0IHg6LTQwIHk6LTQwIHc6ODAgaDo4MCByOjggY2xzczonY29yZV9iZycgc3ZnOnN2Z1xuXG4gICAgICAgIGZvciBpIGluIDAuLi44XG4gICAgICAgICAgICByID0gdXRpbHMucmVjdCB4Oi0zNitpKjkgeTotMzYgdzo4IGg6NzIgcjozIHN2ZzpzdmcsIGNsc3M6J2NvcmVfbG9hZCdcbiAgICAgICAgXG4gICAgICAgIEBjb3JlcyA9IFtdXG4gICAgICAgIGZvciBpIGluIDAuLi44XG4gICAgICAgICAgICBAY29yZXMucHVzaCB1dGlscy5yZWN0IHg6LTM2K2kqOSB5OjMwIHc6OCBoOjYgcjozIHN2ZzpzdmdcbiAgICAgICAgICAgIEBjb3Jlc1tpXS5zZXRBdHRyaWJ1dGUgJ2ZpbGwnIEBjb2xvcnNbMF1cbiAgICAgICAgICAgIFxuICAgICAjIDAwMDAwMDAgICAgMDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMCAgIDAwMFxuICAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAwIDAwMFxuICAgICAjIDAwMCAgIDAwMCAgMDAwMDAwMCAgICAwMDAwMDAwMDAgIDAwMDAwMDAwMFxuICAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuICAgICAjIDAwMDAwMDAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwICAgICAwMFxuXG4gICAgIGRyYXc6IC0+XG5cbiAgICAgICAgcmV0dXJuIGlmIGVtcHR5IEBkYXRhPy5jcHU/LmNvcmVzXG4gICAgICAgIHJldHVybiBpZiBub3QgQGNvcmVzXG5cbiAgICAgICAgZm9yIGkgaW4gMC4uLjhcbiAgICAgICAgICAgIGZpbGwgPSBAY29sb3JzW3BhcnNlSW50IEBkYXRhLmNwdS5jb3Jlc1tpXSo1XVxuICAgICAgICAgICAgQGNvcmVzW2ldLnNldEF0dHJpYnV0ZSAneScgMzYtNzIqQGRhdGEuY3B1LmNvcmVzW2ldXG4gICAgICAgICAgICBAY29yZXNbaV0uc2V0QXR0cmlidXRlICdoZWlnaHQnIDcyKkBkYXRhLmNwdS5jb3Jlc1tpXVxuICAgICAgICAgICAgQGNvcmVzW2ldLnNldEF0dHJpYnV0ZSAnZmlsbCcgZmlsbFxuICAgICAgICAgICAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBDb3Jlc1xuIl19
//# sourceURL=../coffee/cores.coffee