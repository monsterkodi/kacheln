###
00     00  00000000  00     00  000   000  00000000  000000000
000   000  000       000   000  0000  000  000          000   
000000000  0000000   000000000  000 0 000  0000000      000   
000 0 000  000       000 0 000  000  0000  000          000   
000   000  00000000  000   000  000   000  00000000     000   
###

sysinfo  = require 'systeminformation'
{ klog } = require 'kxk'

r_max  = 100
w_max  = 100

rx_max = 100
tx_max = 100

tick = ->
    
    sysinfo.getDynamicData (d) =>
            
        rx_sec = parseInt d.networkStats[0].rx_sec
        tx_sec = parseInt d.networkStats[0].tx_sec
        
        rx_max = Math.max rx_max, rx_sec if rx_sec
        tx_max = Math.max tx_max, tx_sec if tx_sec
        
        nd =
            mem: 
                used:   d.mem.used
                total:  d.mem.total
                active: d.mem.active
                swap:   
                        total: d.mem.swaptotal
                        used:  d.mem.swapused
            net:
                rx_fac: rx_sec/rx_max
                tx_fac: tx_sec/tx_max
                rx_sec: rx_sec
                tx_sec: tx_sec
                rx_max: rx_max
                tx_max: tx_max
            cpu:
                sys:   d.currentLoad.currentLoad/100 
                usr:   d.currentLoad.currentLoadUser/100
                cores: d.currentLoad.cpus.map (c) -> c.load/100
         
        if d.disksIO?
            
            r_sec = d.disksIO.rIO_sec
            w_sec = d.disksIO.wIO_sec
            
            r_max = Math.max r_max, r_sec
            w_max = Math.max w_max, w_sec
            
            nd.dsk = 
                r_fac: r_sec/r_max
                w_fac: w_sec/w_max
                r_sec: r_sec
                w_sec: w_sec
                r_max: r_max
                w_max: w_max

        if d.battery?.hasBattery

            nd.battery = 
                loaded:   d.battery.currentCapacity/d.battery.maxCapacity
                percent:  d.battery.percent
                time:     d.battery.timeRemaining
                cycles:   d.battery.cycleCount
                charging: d.battery.isCharging
                plugged:  d.battery.acConnected
                
        # log 'tick' nd.cpu.sys
                
        process.send JSON.stringify nd

animTimer = setInterval tick, 4000
