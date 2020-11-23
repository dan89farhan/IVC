const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobe = require('@ffprobe-installer/ffprobe');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobe.path);
// console.log(ffmpegInstaller.path, ffmpegInstaller.version);

module.exports = ffmpeg;