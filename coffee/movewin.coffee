###
00     00   0000000   000   000  00000000  000   000  000  000   000
000   000  000   000  000   000  000       000 0 000  000  0000  000
000000000  000   000   000 000   0000000   000000000  000  000 0 000
000 0 000  000   000     000     000       000   000  000  000  0000
000   000   0000000       0      00000000  00     00  000  000   000
###

{ klog, os, slash } = require 'kxk'

wxw = require 'wxw'

moveWin = (dir) ->
    
    screen = wxw 'screen' 'user'
    ar = w:screen.width, h:screen.height
    
    if os.platform() == 'win32'
        infos = wxw('info' 'top')
    else
        infos = wxw('info' 'top').filter (i) -> i.index >= 0
        infos.sort (a,b) -> a.index - b.index
    
    if info = infos[0]
                
        base = slash.base info.path
        
        return if base in ['kachel' 'kacheln' 'kappo']
        
        b = 0

        if os.platform() == 'win32'
            if base in ['electron' 'ko' 'konrad' 'clippo' 'klog' 'kaligraf' 'kalk' 'uniko' 'knot' 'space' 'ruler' 'keks']
                b = 0  # sane window border
            else if base in ['devenv']
                b = -1  # wtf?
            else
                b = 10 # transparent window border
        
        wr = x:info.x, y:info.y, w:info.width, h:info.height
        ko = 216
        d = 2*b
        [x,y,w,h] = switch dir
            when 'left'     then [-b,         0         ar.w/2+d,     ar.h+b]
            when 'right'    then [ar.w/2-b,   0       ar.w/2+d-ko,    ar.h+b]
            when 'down'     then [ar.w/6-b,   0        2/3*ar.w+d,    ar.h+b]
            when 'up'       then [-b,         0         ar.w+d-ko,    ar.h+b]
            when 'topleft'  then [-b,         0         ar.w/2+d,     ar.h/2]
            when 'botleft'  then [-b,         ar.h/2-b, ar.w/2+d,     ar.h/2+d]
            when 'topright' then [ar.w/2-b,   0         ar.w/2+d-ko,  ar.h/2]
            when 'botright' then [ar.w/2-b,   ar.h/2-b, ar.w/2+d-ko,  ar.h/2+d]
            when 'top'      then [ar.w/6-b,   0         2*ar.w/3+d,   ar.h/2]
            when 'bot'      then [ar.w/6-b,   ar.h/2-b, 2*ar.w/3+d,   ar.h/2+d]
        
        sl = 30 > Math.abs wr.x -  x
        sr = 30 > Math.abs wr.x+wr.w - (x+w)
        st = 30 > Math.abs wr.y -  y
        sb = 30 > Math.abs wr.y+wr.h - (y+h)
        
        if sl and sr and st and sb
            switch dir
                when 'left'     then                 w = ar.w/3+d
                when 'right'    then                 w = ar.w/2+d
                when 'down'     then x = ar.w/3-b;   w = 2/3*ar.w+d-ko
                when 'up'       then x = -b;         w = ar.w+d     
                when 'topleft'  then                 w = ar.w/3+d
                when 'botleft'  then                 w = ar.w/3+d
                when 'topright' then x = 2*ar.w/3-b; w = ar.w/3+d
                when 'botright' then x = 2*ar.w/3-b; w = ar.w/3+d
                when 'top'      then x = ar.w/3-b;   w = ar.w/3+d
                when 'bot'      then x = ar.w/3-b;   w = ar.w/3+d
        
        klog 'bounds' info.id, parseInt(x), parseInt(y), parseInt(w), parseInt(h)
        wxw 'bounds' info.id, parseInt(x), parseInt(y), parseInt(w), parseInt(h)
    else 
        klog 'no info!'

module.exports = moveWin
