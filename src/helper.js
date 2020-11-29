/**
 * 
 * @author Farhan M.Baig
 * 
 * 
 */


//  get Resulations

module.exports.getResolutions = function () {
    return [
        {
            width: 320,
            height: 240,
        },
        {
            width: 640,
            height: 360,
        },
        {
            width: 842,
            height: 640,
        },
        {
            width: 1280,
            height: 720,
        },

        {
            width: 1920,
            height: 1080,
        },


    ]
}
// get Bitrate
module.exports.getBitrate = function () {
    return [
        5000,
        2800,
        1400,
        800
    ]
}
