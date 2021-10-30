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
            fill = "rgb(" + (this.data.cpu.cores[i] * 255) + ", " + (this.data.cpu.cores[i] * 155) + ", 0)";
            this.cores[i].setAttribute('y', -30 + 60 - 60 * this.data.cpu.cores[i]);
            this.cores[i].setAttribute('height', 60 * this.data.cpu.cores[i]);
            results.push(this.cores[i].setAttribute('fill', fill));
        }
        return results;
    };

    return Cores;

})(Kachel);

module.exports = Cores;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXMuanMiLCJzb3VyY2VSb290IjoiLi4vY29mZmVlIiwic291cmNlcyI6WyJjb3Jlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQUFBLElBQUEsc0NBQUE7SUFBQTs7OztBQVFBLE1BQWtCLE9BQUEsQ0FBUSxLQUFSLENBQWxCLEVBQUUsaUJBQUYsRUFBUzs7QUFFVCxLQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVI7O0FBQ1YsTUFBQSxHQUFVLE9BQUEsQ0FBUSxVQUFSOztBQUVKOzs7SUFFQyxlQUFDLFFBQUQ7UUFBQyxJQUFDLENBQUEsOEJBQUQsV0FBVTs7UUFFVix1Q0FBTSxJQUFDLENBQUEsUUFBUDtRQUVBLElBQUksQ0FBQyxFQUFMLENBQVEsU0FBUixFQUFrQixJQUFDLENBQUEsTUFBbkI7UUFFQSxJQUFDLENBQUEsSUFBRCxDQUFBO0lBTkQ7O29CQVFILE1BQUEsR0FBUSxTQUFDLElBQUQ7UUFBQyxJQUFDLENBQUEsT0FBRDtlQUFVLElBQUMsQ0FBQSxJQUFELENBQUE7SUFBWDs7b0JBUVIsSUFBQSxHQUFNLFNBQUE7QUFFRixZQUFBO1FBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLEdBQWlCO1FBQ2pCLEdBQUEsR0FBTSxLQUFLLENBQUMsR0FBTixDQUFVO1lBQUEsS0FBQSxFQUFNLEdBQU47WUFBVSxNQUFBLEVBQU8sR0FBakI7U0FBVjtRQUNOLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixHQUFqQjtRQUVBLElBQUEsR0FBUyxLQUFLLENBQUMsSUFBTixDQUFXO1lBQUEsQ0FBQSxFQUFFLENBQUMsRUFBSDtZQUFNLENBQUEsRUFBRSxDQUFDLEVBQVQ7WUFBWSxDQUFBLEVBQUUsRUFBZDtZQUFpQixDQUFBLEVBQUUsRUFBbkI7WUFBc0IsQ0FBQSxFQUFFLENBQXhCO1lBQTBCLElBQUEsRUFBSyxTQUEvQjtZQUF5QyxHQUFBLEVBQUksR0FBN0M7U0FBWDtRQUVULElBQUMsQ0FBQSxLQUFELEdBQVM7QUFDVDtBQUFBO2FBQUEsc0NBQUE7O1lBQ0ksSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksS0FBSyxDQUFDLElBQU4sQ0FBVztnQkFBQSxDQUFBLEVBQUUsQ0FBQyxJQUFELEdBQU0sQ0FBQSxHQUFFLENBQVY7Z0JBQVksQ0FBQSxFQUFFLENBQUMsRUFBZjtnQkFBa0IsQ0FBQSxFQUFFLENBQXBCO2dCQUFzQixDQUFBLEVBQUUsRUFBeEI7Z0JBQTJCLENBQUEsRUFBRSxDQUE3QjtnQkFBK0IsSUFBQSxFQUFLLFdBQXBDO2dCQUFnRCxHQUFBLEVBQUksR0FBcEQ7YUFBWCxDQUFaO3lCQUNBLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBVixDQUF1QixNQUF2QixFQUE4QixTQUE5QjtBQUZKOztJQVRFOztvQkFtQkwsSUFBQSxHQUFNLFNBQUE7QUFFSCxZQUFBO1FBQUEsSUFBVSxLQUFBLDhEQUFnQixDQUFFLHVCQUFsQixDQUFWO0FBQUEsbUJBQUE7O1FBQ0EsSUFBVSxDQUFJLElBQUMsQ0FBQSxLQUFmO0FBQUEsbUJBQUE7O0FBRUE7QUFBQTthQUFBLHNDQUFBOztZQUNJLElBQUEsR0FBTyxNQUFBLEdBQU0sQ0FBQyxJQUFDLENBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFoQixHQUFtQixHQUFwQixDQUFOLEdBQThCLElBQTlCLEdBQWlDLENBQUMsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBaEIsR0FBbUIsR0FBcEIsQ0FBakMsR0FBeUQ7WUFDaEUsSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUFWLENBQXVCLEdBQXZCLEVBQTJCLENBQUMsRUFBRCxHQUFJLEVBQUosR0FBTyxFQUFBLEdBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBckQ7WUFDQSxJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLFlBQVYsQ0FBdUIsUUFBdkIsRUFBZ0MsRUFBQSxHQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQW5EO3lCQUNBLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBVixDQUF1QixNQUF2QixFQUE4QixJQUE5QjtBQUpKOztJQUxHOzs7O0dBckNTOztBQWdEcEIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbiAwMDAwMDAwICAgMDAwMDAwMCAgIDAwMDAwMDAwICAgMDAwMDAwMDAgICAwMDAwMDAwICAgIFxuMDAwICAgICAgIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAgICAgMDAwICAgICAgICAgXG4wMDAgICAgICAgMDAwICAgMDAwICAwMDAwMDAwICAgIDAwMDAwMDAgICAwMDAwMDAwICAgICBcbjAwMCAgICAgICAwMDAgICAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAgICAgICAgMDAwICAgIFxuIDAwMDAwMDAgICAwMDAwMDAwICAgMDAwICAgMDAwICAwMDAwMDAwMCAgMDAwMDAwMCAgICAgXG4jIyNcblxueyBlbXB0eSwgcG9zdCB9ID0gcmVxdWlyZSAna3hrJ1xuXG51dGlscyAgID0gcmVxdWlyZSAnLi91dGlscydcbkthY2hlbCAgPSByZXF1aXJlICcuL2thY2hlbCdcblxuY2xhc3MgQ29yZXMgZXh0ZW5kcyBLYWNoZWxcbiAgICAgICAgXG4gICAgQDogKEBrYWNoZWxJZD0nY29yZXMnKSAtPiBcbiAgICAgICAgXG4gICAgICAgIHN1cGVyIEBrYWNoZWxJZFxuICAgICAgICBcbiAgICAgICAgcG9zdC5vbiAnc3lzaW5mbycgQG9uRGF0YVxuICAgICAgICBcbiAgICAgICAgQGluaXQoKVxuICAgIFxuICAgIG9uRGF0YTogKEBkYXRhKSA9PiBAZHJhdygpXG4gICAgICAgIFxuICAgICMgMDAwICAwMDAgICAwMDAgIDAwMCAgMDAwMDAwMDAwXG4gICAgIyAwMDAgIDAwMDAgIDAwMCAgMDAwICAgICAwMDAgICBcbiAgICAjIDAwMCAgMDAwIDAgMDAwICAwMDAgICAgIDAwMCAgIFxuICAgICMgMDAwICAwMDAgIDAwMDAgIDAwMCAgICAgMDAwICAgXG4gICAgIyAwMDAgIDAwMCAgIDAwMCAgMDAwICAgICAwMDAgICBcbiAgICBcbiAgICBpbml0OiAtPlxuIFxuICAgICAgICBAZGl2LmlubmVySFRNTCA9ICcnXG4gICAgICAgIHN2ZyA9IHV0aWxzLnN2ZyB3aWR0aDoxMDAgaGVpZ2h0OjEwMFxuICAgICAgICBAZGl2LmFwcGVuZENoaWxkIHN2Z1xuXG4gICAgICAgIGJvZHkgICA9IHV0aWxzLnJlY3QgeDotNDAgeTotNDAgdzo4MCBoOjgwIHI6OCBjbHNzOidjb3JlX2JnJyBzdmc6c3ZnXG4gICAgICAgIFxuICAgICAgICBAY29yZXMgPSBbXVxuICAgICAgICBmb3IgaSBpbiAwLi4uOFxuICAgICAgICAgICAgQGNvcmVzLnB1c2ggdXRpbHMucmVjdCB4Oi0zMS41K2kqOCB5Oi0zMCB3OjcgaDo2MCByOjIgY2xzczonY29yZV9sb2FkJyBzdmc6c3ZnXG4gICAgICAgICAgICBAY29yZXNbaV0uc2V0QXR0cmlidXRlICdmaWxsJyAnIzIyMjIyMidcbiAgICAgICAgICAgIFxuICAgICAjIDAwMDAwMDAgICAgMDAwMDAwMDAgICAgMDAwMDAwMCAgIDAwMCAgIDAwMFxuICAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAwIDAwMFxuICAgICAjIDAwMCAgIDAwMCAgMDAwMDAwMCAgICAwMDAwMDAwMDAgIDAwMDAwMDAwMFxuICAgICAjIDAwMCAgIDAwMCAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwMCAgIDAwMFxuICAgICAjIDAwMDAwMDAgICAgMDAwICAgMDAwICAwMDAgICAwMDAgIDAwICAgICAwMFxuXG4gICAgIGRyYXc6IC0+XG5cbiAgICAgICAgcmV0dXJuIGlmIGVtcHR5IEBkYXRhPy5jcHU/LmNvcmVzXG4gICAgICAgIHJldHVybiBpZiBub3QgQGNvcmVzXG5cbiAgICAgICAgZm9yIGkgaW4gMC4uLjhcbiAgICAgICAgICAgIGZpbGwgPSBcInJnYigje0BkYXRhLmNwdS5jb3Jlc1tpXSoyNTV9LCAje0BkYXRhLmNwdS5jb3Jlc1tpXSoxNTV9LCAwKVwiXG4gICAgICAgICAgICBAY29yZXNbaV0uc2V0QXR0cmlidXRlICd5JyAtMzArNjAtNjAqQGRhdGEuY3B1LmNvcmVzW2ldXG4gICAgICAgICAgICBAY29yZXNbaV0uc2V0QXR0cmlidXRlICdoZWlnaHQnIDYwKkBkYXRhLmNwdS5jb3Jlc1tpXVxuICAgICAgICAgICAgQGNvcmVzW2ldLnNldEF0dHJpYnV0ZSAnZmlsbCcgZmlsbFxuICAgICAgICAgICAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBDb3Jlc1xuIl19
//# sourceURL=../coffee/cores.coffee