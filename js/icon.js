// monsterkodi/kode 0.199.0

var _k_

var appIcon, fakeIcon, fs, os, slash, wxw

fs = require('kxk').fs
os = require('kxk').os
slash = require('kxk').slash

wxw = require('wxw')

fakeIcon = function (exePath, pngPath)
{
    var base, fakeicon, icon, iconMap, targetfile

    iconMap = {recycle:'recycle',recycledot:'recycledot',mingw32:'terminal',mingw64:'terminal',msys2:'terminaldark',mintty:'terminaldark',procexp64:'procexp',Calculator:'Calculator',Settings:'Settings',Mail:'Mail','Microsoft Store':'Microsoft Store'}
    base = slash.base(exePath)
    if (icon = iconMap[base])
    {
        targetfile = slash.resolve((pngPath != null ? pngPath : base + '.png'))
        fakeicon = slash.join(__dirname,'..','icons',icon + '.png')
        try
        {
            fs.copyFileSync(fakeicon,targetfile)
            return true
        }
        catch (err)
        {
            console.error(err)
        }
    }
    return false
}

appIcon = function (exePath, pngPath)
{
    if (os.platform() === 'win32')
    {
        if (!fakeIcon(exePath,pngPath))
        {
            return wxw('icon',exePath,pngPath)
        }
    }
    else
    {
        return wxw('icon',exePath,pngPath)
    }
}
module.exports = appIcon