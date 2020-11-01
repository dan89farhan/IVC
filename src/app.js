const electron = require('electron');
const settings = require('electron-settings');
var ffmpeg = require('./ffmpeg');
// var command = ffmpeg();


// console.log('File used for Persisting Data - ' + settings.file());

function convertVideo(data) {
    let command = ffmpeg(data.inputFile.path)
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .size('320x240')
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Processing finished !');
        })
        .save(data.outputFileName);
    console.log(command);
    console.log(data);
}