const electron = require('electron');
const settings = require('electron-settings');
var fs = require('fs');

const Store = require('electron-store');


var ffmpeg = require('./ffmpeg');

let helper = require('./helper');
const resolutions = helper.getResolutions();
const bitrates = helper.getBitrate();




// console.log('File used for Persisting Data - ' + settings.file());

function convertVideo(data) {
    console.log(data);
    let resolutionIndex = data.resolution;
    let bitRateIndex = data.bitrate;
    let resolution = resolutions[resolutionIndex];
    let bitrate = bitrates[bitRateIndex];
    const store = new Store();
    const dirLocation = store.get('videoStore');
    const outputFileName = data.outputFileName;
    const output = outputFileName.split('.');
    const folderName = output[0];
    const savePath = `${dirLocation}/${folderName}`;

    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }

    let command = ffmpeg(data.inputFile.path)
        .outputOptions([
            `-vf scale=w=${resolution.width}:h=${resolution.height}:force_original_aspect_ratio=decrease`,
            '-strict -2',
            '-c:v h264',
            '-hls_time 10',
            `-b:v ${bitrate}k`,
            `-maxrate 5350k`,
            `-bufsize 7500k`,
            `-b:a 192k`,
            `-hls_time 4`,
            `-hls_list_size 0`,
            `-hls_segment_filename ${dirLocation}/${folderName}/%03d.ts`,
        ])
        .on('progress', function (progress) {
            // console.log('Processing: ' + progress.percent + '% done');
            $('#outputLogFile').append(JSON.stringify(progress));
        })
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
            // alert(`Error Occured ${err.message}`);
            $('#outputLogFile').append(err.message);
        })
        .on('end', function () {
            console.log('Processing finished !');
            $('#outputLogFile').append('\n');
            $('#outputLogFile').append('Processing finished !');
            $('#outputLogFile').append('\n');
        })
        .save(`${dirLocation}/${folderName}/${data.outputFileName}`);
}

function clearLogs() {
    $('#outputLogFile').val('');
}