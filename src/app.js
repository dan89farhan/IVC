const electron = require('electron');
const settings = require('electron-settings');
var ffmpeg = require('./ffmpeg');
// var command = ffmpeg();


// console.log('File used for Persisting Data - ' + settings.file());

function convertVideo(data) {
    // var command = new FfmpegCommand();
    // console.log(ffmpeg('360.avi').save('output.mp4'));
    let command = ffmpeg('360.avi')
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .size('320x240')
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Processing finished !');
        })
        .save('output/output.mp4');
    console.log(command);
    console.log(data);
}