var holding = false;
var track = G('track');
var player = G('player');
var handler = G('point_song');
var progress = G('track_play');
var play = G('play');
var next = G('sig');
var prev = G('prev');
var title = G('title_song');
var artist = G('album_cd');
var art = G('img_cd');
var timeActual = G('current_time');
var totalTime = G('total_time');
var current_track = 0;
var song, audio, duration;
var playing = false;
var songs = [{
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
    art.src = song.art;
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
    //play.innerHTML = '<img class="pad" src="http://abarcarodriguez.com/lab/play.png" />';
    play.classList.add('play');
    play.classList.remove('pause');
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    //play.innerHTML = '<img src="http://abarcarodriguez.com/lab/pause.png" />';
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
    var x = e.pageX - track.offsetParent.offsetLeft - track.offsetLeft;
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
    art.onload = function() {
        audio.play();
    }
}

function msToMin(seconds) {
  var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = Math.trunc(seconds) % 60;
  second = (second < 10)? '0' + second : second;
  return '' + minute + ':' + second;
}
