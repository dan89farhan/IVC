const electron = require('electron');
const settings = require('electron-settings');
var fs = require('fs');

const Store = require('electron-store');


var ffmpeg = require('./ffmpeg');

let helper = require('./helper');
const { ipcRenderer } = require('electron');
const resolutions = helper.getResolutions();
const bitrates = helper.getBitrate();


/**
 * 
 * Select folder event 1080
 * 
 */
function selectFolder1080() {
    console.log('i m clicked');
}



// console.log('File used for Persisting Data - ' + settings.file());

function convertVideo(data) {
    console.log(data);
    // return;
    let resolution1080 = data.resolution1080;
    let resolution720 = data.resolution720;
    let resolution640 = data.resolution640;
    let resolution480 = data.resolution480;
    let resolution240 = data.resolution240;
    let gif = data.gif;
    let thumbnail = data.thumbnail;
    const store = new Store();
    const dirLocation = store.get('videoStore');
    // console.log(output);
    let outputLogFile = $('#outputLogFile');


    if (resolution1080) {
        const resolutionIndex = 4;
        const resolution = resolutions[resolutionIndex];
        const bitratemin1080 = data.bitratemin1080;
        const bitratemax1080 = data.bitratemax1080;
        const bitratebuffer1080 = data.bitratebuffer1080;

        let outputFileName = data.outputFileName1080 + '.m3u8';
        let output = outputFileName.split('.');
        let folderName = output[0];
        let savePath = `${dirLocation}/${folderName}`;

        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }

        let command = ffmpeg(data.inputFile.path)
            .outputOptions([
                `-vf scale=w=${resolution.width}:h=${resolution.height}:force_original_aspect_ratio=decrease`,
                '-strict -2',
                '-c:v h264',
                '-hls_time 4',
                `-b:v ${bitratemin1080}k`,
                `-maxrate ${bitratemax1080}k`,
                `-bufsize ${bitratebuffer1080}k`,
                `-b:a 192k`,
                `-hls_time 4`,
                `-hls_list_size 0`,
                `-hls_segment_filename ${dirLocation}/${folderName}/%03d.ts`,
            ])
            .on('progress', function (progress) {
                // console.log('Processing: ' + progress.percent + '% done');
                outputLogFile.append(JSON.stringify(progress));
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
                // alert(`Error Occured ${err.message}`);
                outputLogFile.append(err.message);
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('end', function () {
                console.log('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.append('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .save(`${dirLocation}/${folderName}/${outputFileName}`);
    }
    if (resolution720) {
        const resolutionIndex = 3;
        const resolution = resolutions[resolutionIndex];
        const bitratemin720 = data.bitratemin720;
        const bitratemax720 = data.bitratemax720;
        const bitratebuffer720 = data.bitratebuffer720;

        let outputFileName = data.outputFileName720 + '.m3u8';
        let output = outputFileName.split('.');
        let folderName = output[0];
        let savePath = `${dirLocation}/${folderName}`;

        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }

        let command = ffmpeg(data.inputFile.path)
            .outputOptions([
                `-vf scale=w=${resolution.width}:h=${resolution.height}:force_original_aspect_ratio=decrease`,
                '-strict -2',
                '-c:v h264',
                '-hls_time 4',
                `-b:v ${bitratemin720}k`,
                `-maxrate ${bitratemax720}k`,
                `-bufsize ${bitratebuffer720}k`,
                `-b:a 192k`,
                `-hls_time 4`,
                `-hls_list_size 0`,
                `-hls_segment_filename ${dirLocation}/${folderName}/%03d.ts`,
            ])
            .on('progress', function (progress) {
                // console.log('Processing: ' + progress.percent + '% done');
                outputLogFile.append(JSON.stringify(progress));
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
                // alert(`Error Occured ${err.message}`);
                outputLogFile.append(err.message);
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('end', function () {
                console.log('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.append('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .save(`${dirLocation}/${folderName}/${outputFileName}`);
    }
    if (resolution640) {
        const resolutionIndex = 2;
        const resolution = resolutions[resolutionIndex];
        const bitratemin640 = data.bitratemin640;
        const bitratemax640 = data.bitratemax640;
        const bitratebuffer640 = data.bitratebuffer640;

        let outputFileName = data.outputFileName640 + '.m3u8';
        let output = outputFileName.split('.');
        let folderName = output[0];
        let savePath = `${dirLocation}/${folderName}`;

        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }

        let command = ffmpeg(data.inputFile.path)
            .outputOptions([
                `-vf scale=w=${resolution.width}:h=${resolution.height}:force_original_aspect_ratio=decrease`,
                '-strict -2',
                '-c:v h264',
                '-hls_time 4',
                `-b:v ${bitratemin640}k`,
                `-maxrate ${bitratemax640}k`,
                `-bufsize ${bitratebuffer640}k`,
                `-b:a 192k`,
                `-hls_time 4`,
                `-hls_list_size 0`,
                `-hls_segment_filename ${dirLocation}/${folderName}/%03d.ts`,
            ])
            .on('progress', function (progress) {
                // console.log('Processing: ' + progress.percent + '% done');
                outputLogFile.append(JSON.stringify(progress));
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
                // alert(`Error Occured ${err.message}`);
                outputLogFile.append(err.message);
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('end', function () {
                console.log('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.append('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .save(`${dirLocation}/${folderName}/${outputFileName}`);
    }
    if (resolution480) {
        const resolutionIndex = 1;
        const resolution = resolutions[resolutionIndex];
        const bitratemin480 = data.bitratemin480;
        const bitratemax480 = data.bitratemax480;
        const bitratebuffer480 = data.bitratebuffer480;

        let outputFileName = data.outputFileName480 + '.m3u8';
        let output = outputFileName.split('.');
        let folderName = output[0];
        let savePath = `${dirLocation}/${folderName}`;

        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }

        let command = ffmpeg(data.inputFile.path)
            .outputOptions([
                `-vf scale=w=${resolution.width}:h=${resolution.height}:force_original_aspect_ratio=decrease`,
                '-strict -2',
                '-c:v h264',
                '-hls_time 4',
                `-b:v ${bitratemin480}k`,
                `-maxrate ${bitratemax480}k`,
                `-bufsize ${bitratebuffer480}k`,
                `-b:a 192k`,
                `-hls_time 4`,
                `-hls_list_size 0`,
                `-hls_segment_filename ${dirLocation}/${folderName}/%03d.ts`,
            ])
            .on('progress', function (progress) {
                // console.log('Processing: ' + progress.percent + '% done');
                outputLogFile.append(JSON.stringify(progress));
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
                // alert(`Error Occured ${err.message}`);
                outputLogFile.append(err.message);
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('end', function () {
                console.log('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.append('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .save(`${dirLocation}/${folderName}/${outputFileName}`);
    }
    if (resolution240) {
        const resolutionIndex = 0;
        const resolution = resolutions[resolutionIndex];
        const bitratemin240 = data.bitratemin240;
        const bitratemax240 = data.bitratemax240;
        const bitratebuffer240 = data.bitratebuffer240;

        let outputFileName = data.outputFileName240 + '.m3u8';
        let output = outputFileName.split('.');
        let folderName = output[0];
        let savePath = `${dirLocation}/${folderName}`;

        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }

        let command = ffmpeg(data.inputFile.path)
            .outputOptions([
                `-vf scale=w=${resolution.width}:h=${resolution.height}:force_original_aspect_ratio=decrease`,
                '-strict -2',
                '-c:v h264',
                '-hls_time 4',
                `-b:v ${bitratemin240}k`,
                `-maxrate ${bitratemax240}k`,
                `-bufsize ${bitratebuffer240}k`,
                `-b:a 192k`,
                `-hls_time 4`,
                `-hls_list_size 0`,
                `-hls_segment_filename ${dirLocation}/${folderName}/%03d.ts`,
            ])
            .on('progress', function (progress) {
                // console.log('Processing: ' + progress.percent + '% done');
                outputLogFile.append(JSON.stringify(progress));
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
                // alert(`Error Occured ${err.message}`);
                outputLogFile.append(err.message);
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('end', function () {
                console.log('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.append('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .save(`${dirLocation}/${folderName}/${outputFileName}`);
    }




    if (gif) {
        const startTime = data.starttime;
        const end = data.end;
        let folderName = data.inputFile.name.split('.')[0];
        let fileName = folderName;
        folderName = `${folderName}gif`;
        const gifOutFileName = `${fileName}.gif`;
        let savePath = `${dirLocation}/${folderName}`;
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }
        ffmpeg(data.inputFile.path)
            .outputOptions([
                `-ss ${startTime}`,
                `-t ${end}`,
                '-pix_fmt rgb8',
                '-filter:v scale=-1:320',
            ])
            .on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '% done');
                outputLogFile.append(JSON.stringify(progress));
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
                // alert(`Error Occured ${err.message}`);
                outputLogFile.append(err.message);
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .on('end', function () {
                console.log('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.append('Processing finished !');
                outputLogFile.append('\n');
                outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
            })
            .save(`${dirLocation}/${folderName}/${gifOutFileName}`);
    }

    if (thumbnail) {
        const totalNumberOfFrames = data.totalNumberOfFrames;
        let folderName = data.inputFile.name.split('.')[0];
        folderName = `${folderName}thumbnails`;
        ffmpeg(data.inputFile.path)
            .on('filenames', function (filenames) {
                console.log('Will generate ' + filenames.join(', '));
                outputLogFile.append('\n');
                outputLogFile.append('Will generate ' + filenames.join(', '));
                outputLogFile.append('\n');
            })
            .on('end', function () {
                console.log('Thumbnails Generated');
                outputLogFile.append('\n');
                outputLogFile.append('Thumbnails Generated');
            })
            .on('error', function (err) {
                console.log('error reported', err.message);
                outputLogFile.append('\n');
                outputLogFile.append(`Error: ${err.message}`);
                outputLogFile.append('\n');
            })
            .screenshots({
                // timestamps: ['50%'],
                count: totalNumberOfFrames,
                filename: 'thumbnail-at-%s-seconds.png',
                folder: `${dirLocation}/${folderName}`,
                size: '320x240'
            });
    }


}

function clearLogs() {
    let outputLogFile = $('#outputLogFile');
    outputLogFile.html('');
    outputLogFile.scrollTop(outputLogFile[0].scrollHeight);
}



const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');


ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    message.innerText = 'A new update is available. Downloading now...';
    notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    restartButton.classList.remove('hidden');
    notification.classList.remove('hidden');
});

function closeNotification() {
    notification.classList.add('hidden');
}

function restartApp() {
    ipcRenderer.send('restart_app');
}
