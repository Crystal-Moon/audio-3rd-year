let holding = false;
const track = G('track');
const player = G('player');
const handler = G('point_song');
const progress = G('track_play');
const play = G('play');
const next = G('sig');
const prev = G('prev');
const title = G('title_song');
const artist = G('album_cd');
const art = G('img_cd');
const timeActual = G('current_time');
const totalTime = G('total_time');
let current_track = 0;
let song, audio, duration;
let playing = false;

let songs = [{
    title: 'Mother\'s Day',
    artist: 'Offspring Fling',
    url: 'http://abarcarodriguez.com/365/files/offspring.mp3',
    art: 'http://abarcarodriguez.com/365/files/offspring.jpg'
},
    
{
    title: 'Blackout City',
    artist: 'Anamanaguchi',
    url: 'http://abarcarodriguez.com/365/files/anamanaguchi.mp3',
    art: 'http://abarcarodriguez.com/365/files/anamanaguchi.jpg'
},

{
    title: 'The Primordial Booze',
    artist: 'Rainbowdragoneyes',
    url: 'http://abarcarodriguez.com/365/files/rainbow.mp3',
    art: 'http://abarcarodriguez.com/365/files/rainbow.jpg'
}];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    audio.src = song.url;
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;    // revisar si usar una clase cpara book y wb o si poner numero o imagen en style inline
}

audio.addEventListener('timeupdate', updateTrack, false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
    totalTime.innerText = msToMin(this.duration);
}, false);

window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;;
}
track.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.classList.add('play');
    play.classList.remove('pause');
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.classList.add('pause');
    play.classList.remove('play');
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);

function updateTrack() {
    curtime = audio.currentTime;
    percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.marginLeft = percent + '%';
    timeActual.innerText = msToMin(audio.currentTime);
}

function seekTrack(e) {
    event = e || window.event;
    let x = e.pageX - track.offsetParent.offsetLeft - track.offsetLeft;
    percent = Math.round((x * 100) / track.offsetParent.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.marginLeft = percent + '%';
    audio.play();
    audio.currentTime = (percent * duration) / 100;
    timeActual.innerText = msToMin(audio.currentTime);
}
function nextTrack() {
    current_track++;
    current_track = current_track % (songs.length);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    //aqui agregar a recently
    art.onload = function() {
        audio.play();
    }
}

function msToMin(seconds) {
  let minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  let second = Math.trunc(seconds) % 60;
  second = (second < 10)? '0' + second : second;
  return '' + minute + ':' + second;
}

/************* VOLUME ***********************/

const volumeTrack = G('track_volume');
const progressVolume = G('progress_vol');
const handlerVolume = G('point_vol');

window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekVolume(e);
}
window.onmouseup = function (e) {
    holding = false;;
}
volumeTrack.onmousedown = function (e) {
    holding = true;
    seekVolume(e);
}

function seekVolume(e) {
    event = e || window.event;
    let x = e.pageX - volumeTrack.offsetLeft;
    let percent = Math.round((x * 100) / volumeTrack.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progressVolume.style.width = percent + '%';
    handlerVolume.style.marginLeft = percent + '%';
    audio.volume = (percent * 1) / 100;
}