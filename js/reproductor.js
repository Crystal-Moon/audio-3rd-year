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
//let current_track = 0;
let song={}, duration=0;
let AUDIO = new Audio();
let playing = false;
let cover='';

function playSong(elem) {
    G('player').style='';
    LOADER.style.display='block';
    console.log('elem en playSong',elem)
    //song = songs[current_track];
 //   audio = new Audio();
    AUDIO.src = elem.dataset.link;
    title.textContent = elem.dataset.type+' '+elem.dataset.exc;
    artist.textContent = 'Lesson '+elem.dataset.lesson;
   // art.style.backgroundImage = 'url("./img/album_'+elem.dataset.book+'.jpg")';
    console.log('color en playSong',elem.dataset.color)
    art.className='img_cd cover'+(/.*(up).*/.test(art.className)?' up':'');
    console.log(' el color q falla',elem.dataset.color)
    art.classList.add(elem.dataset.color);
    art.classList.add(elem.dataset.book);
    song=JSON.parse(JSON.stringify(elem.dataset))
  //  current_track=elem.dataset.inx;
    saveRecent(JSON.parse(JSON.stringify(elem.dataset)));

}


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

//window.addEventListener('load', init(), false);
/*
function init() {
    //song = songs[current_track];
    audio = new Audio();
   // audio.src = song.url;
   // title.textContent = song.title;
   // artist.textContent = song.artist;
   // art.src = song.art;    // revisar si usar una clase cpara book y wb o si poner numero o imagen en style inline
}
*/
AUDIO.addEventListener('timeupdate', updateTrack, false);
AUDIO.addEventListener('loadedmetadata', function () {
    duration = this.duration;
    totalTime.innerText = msToMin(this.duration);
    this.play();
    LOADER.style.display='none';
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
    playing ? AUDIO.pause() : AUDIO.play();
}
AUDIO.addEventListener("pause", function () {
    play.classList.add('play');
    play.classList.remove('pause');
    playing = false;
}, false);

AUDIO.addEventListener("playing", function () {
    play.classList.add('pause');
    play.classList.remove('play');
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);

function updateTrack() {
    curtime = AUDIO.currentTime;
    percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.marginLeft = percent + '%';
    timeActual.innerText = msToMin(AUDIO.currentTime);
}

function seekTrack(e) {
    event = e || window.event;
    let x = e.pageX - track.offsetParent.offsetLeft - track.offsetLeft;
    percent = Math.round((x * 100) / track.offsetParent.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.marginLeft = percent + '%';
    AUDIO.play();
    AUDIO.currentTime = (percent * duration) / 100;
    timeActual.innerText = msToMin(AUDIO.currentTime);
}
function nextTrack() {
    console.log('song al empezar nexttrack',song)
    let current_track=song.inx
    let audios=song.book=='book'?Json.BOOK_AUDIO:Json.WORKBOOK_AUDIO
    //console.log('aupdios',audios)
    console.log('current_track antes de +', current_track)
    current_track++;
    console.log('operacion match ',current_track % (audios.length))
    current_track = current_track % (audios.length); //sirve para dar la vuelta
    console.log('current_track desp de op',current_track);
   // song = songs[current_track];
   console.log('song elejida',audios[current_track])
    let nsong=audios.find(z=>z.inx==current_track)
    nsong.book=song.book
    song=nsong;
    //AUDIO.src = song.link;
  //  AUDIO.onloadeddata = function() {
      playSong({dataset:nsong});
    //}
}

function prevTrack() {
    let current_track=song.inx
    console.log('current_track antes de --', current_track)
    let audios=song.book=='book'?Json.BOOK_AUDIO:Json.WORKBOOK_AUDIO
    current_track--;
    console.log('operacion match ',current_track % (audios.length))
    current_track = (current_track == -1 ? (audios.length - 1) : current_track);
    console.log('current_track desp de op',current_track);
   let nsong=audios.find(z=>z.inx==current_track)
    nsong.book=song.book
    song=nsong;
    //AUDIO.src = song.link;
  //  AUDIO.onloadeddata = function() {
      playSong({dataset:nsong});
    //}
}
/*
function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    //aqui agregar a recently
    art.onload = function() {
        AUDIO.play();
    }
}
*/
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
    AUDIO.volume = (percent * 1) / 100;
}