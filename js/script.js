
const G=id=>document.getElementById(id);
const hiddenAudio=active=>{ G('play').style.height= active? '8em':'0.5em' };

function showMenu(btn){
	let header=btn.parentNode;
	let ul=document.querySelectorAll(`#ul *`)
	let device= getComputedStyle(header).getPropertyValue("--device");
	if(header.dataset.state=='hidden'){
		header.dataset.state='show';
		header.style.height = device!='cel'?'30rem':'20rem';
		header.style.width = device!='cel'?'30rem':'20rem';
		desplegarCircular(ul,device,true);
	}else{
		header.dataset.state='hidden';
		header.style.height = '6rem';
		header.style.width = '6rem';
		desplegarCircular(ul);
	}
}

function desplegarCircular(ul,dev,act){
	ul.forEach(e=>{
	  if(e.dataset.deg){
		let deg = e.dataset.deg;
		let far = dev!='cel'? e.dataset.far : e.dataset.far/3*2;
		e.style.transform =act? `rotate(${deg}deg) translate(${far}rem) rotate(-${deg}deg)`:'';
	  }
	});
}


////////////////////////////////////////////////////////
let prueba={
	seccion:"1A",
	page:"4",
	point:"1a",
	link:"https://www.dropbox.com/s/g8nwp5xsyotlgl3/Track%2015.mp3?dl=1",
	downloadLink: "https://www.dropbox.com/home/audio_english?preview=Track+15.mp3"
}

/* ****** obtener json ******/
const ARRAY_SONG=[]
function getAudios(){
	fetch(RUTA_JSON)
	.then(res=>res.json())
	.then(data=>{ 
		ARRAY_SONG=data 
		createSong(ARRAY_SONG[0])
	})
}

/******  carga de pagina ******/
const LIST=G('list')
var x=0;

function createSong(obj){
  if(x<ARRAY_SONG.length){
	let name=' '+obj.seccion+'_'+obj.point
	let div=document.createElement('div');
	div.className='song';
	div.dataset.link=obj.link;
	div.innerHTML=`
	<div class="page">${obj.page}</div>
	<div class="songName">${name}</div>
	<div class="btns">
	  <div class="play" onclick="playAudio(this,'${name}')" data-state="pause"></div>
	  <a href="${obj.downloadLink}" target="_blank" class="download"></a>
	</div>`
	LIST.append(div)
	x++;
	createSong(ARRAY_SONG[x]);
  }
}

/* ****** PLAY AUDIO ****** */

const audio=G('audio');
const nameSong=G('playName')

function playAudio(btnPlay,name){
	let divSong=btnPlay.parentNode.parentNode;
	let linkSong=divSong.dataset.link;
	audio.src=linkSong
	nameSong.innerHTML=name;

	if(btnPlay.dataset.state=='pause'){
		btnPlay.classList.remove('play')
		btnPlay.classList.add('pause')
		btnPlay.dataset.state='play';
		audio.play();
		hiddenAudio('show');
	}else{
		btnPlay.classList.add('play')
		btnPlay.classList.remove('pause')
		btnPlay.dataset.state='pause';
		audio.pause();
	}
}
