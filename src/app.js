const electron = require('electron');
const settings = require('electron-settings');
var ffmpeg = require('./ffmpeg');

let helper = require('./helper');
const resolutions = helper.getResolutions();
const bitrates = helper.getBitrate();
// console.log(helper);
// var command = ffmpeg();


// console.log('File used for Persisting Data - ' + settings.file());

function convertVideo(data) {
    console.log(data);
    let resolutionIndex =  data.resolution;
    let bitRateIndex =  data.bitRate;
    let resolution = resolutions[resolutionIndex];
    let bitrate = bitrates[bitRateIndex];

    return;

    let command = ffmpeg(data.inputFile.path)
        .audioCodec('libopus')
        .audioBitrate(96)
        .outputOptions([
            '-hls_time 10',
            '-hls_playlist_type vod',
            `-hls_segment_filename %03d.ts`,
        ])
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done')
        })
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