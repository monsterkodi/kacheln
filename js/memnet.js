// monsterkodi/kode 0.200.0

var _k_

var animTimer, klog, r_max, rx_max, sysinfo, tick, tx_max, w_max

sysinfo = require('systeminformation')
klog = require('kxk').klog

r_max = 100
w_max = 100
rx_max = 100
tx_max = 100

tick = function ()
{
    return sysinfo.getDynamicData((function (d)
    {
        var nd, r_sec, rx_sec, tx_sec, w_sec, _48_20_, _64_20_

        rx_sec = parseInt(d.networkStats[0].rx_sec)
        tx_sec = parseInt(d.networkStats[0].tx_sec)
        if (rx_sec)
        {
            rx_max = Math.max(rx_max,rx_sec)
        }
        if (tx_sec)
        {
            tx_max = Math.max(tx_max,tx_sec)
        }
        nd = {mem:{used:d.mem.used,total:d.mem.total,active:d.mem.active,swap:{total:d.mem.swaptotal,used:d.mem.swapused}},net:{rx_fac:rx_sec / rx_max,tx_fac:tx_sec / tx_max,rx_sec:rx_sec,tx_sec:tx_sec,rx_max:rx_max,tx_max:tx_max},cpu:{sys:d.currentLoad.currentLoad / 100,usr:d.currentLoad.currentLoadUser / 100,cores:d.currentLoad.cpus.map(function (c)
        {
            return c.load / 100
        })}}
        if ((d.disksIO != null))
        {
            r_sec = d.disksIO.rIO_sec
            w_sec = d.disksIO.wIO_sec
            r_max = Math.max(r_max,r_sec)
            w_max = Math.max(w_max,w_sec)
            nd.dsk = {r_fac:r_sec / r_max,w_fac:w_sec / w_max,r_sec:r_sec,w_sec:w_sec,r_max:r_max,w_max:w_max}
        }
        if ((d.battery != null ? d.battery.hasBattery : undefined))
        {
            nd.battery = {loaded:d.battery.currentCapacity / d.battery.maxCapacity,percent:d.battery.percent,time:d.battery.timeRemaining,cycles:d.battery.cycleCount,charging:d.battery.isCharging,plugged:d.battery.acConnected}
        }
        return process.send(JSON.stringify(nd))
    }).bind(this))
}
animTimer = setInterval(tick,4000)