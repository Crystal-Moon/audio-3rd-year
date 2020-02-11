
const G=id=>document.getElementById(id);
const hiddenAudio=active=>{ G('play').style.height= active? '8em':'0.5em' };
const LOADER=G('loader');

function showMenu(btn){
	let header=btn.parentNode;
	let ul=document.querySelectorAll(`#ul *`);
	let device= getComputedStyle(header).getPropertyValue("--device");
	if(header.dataset.state=='hidden'){
		header.dataset.state='show';
		header.style.height = device!='cel'?'30rem':'20rem';
		header.style.width = device!='cel'?'30rem':'20rem';
		btn.childNodes[0].classList.add('close');
		desplegar(ul,device,true);
	}else{
		header.dataset.state='hidden';
		header.style.height = '6rem';
		header.style.width = '6rem';
		btn.childNodes[0].classList.remove('close');
		desplegar(ul);
	}
}

function desplegar(ul,dev,act){
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
const LIST=G('list');
var x=0;

function createSong(obj){
  if(x<ARRAY_SONG.length){
	let name=' '+obj.seccion+' - '+obj.point
	let div=document.createElement('div');
	div.className='song';
	div.dataset.link=obj.link;
	div.innerHTML=`
	<div class="page">pag.${obj.page}</div>
	<div>Chapter ${obj.seccion} - Ex. ${obj.point}</div>
	<div class="btns">
	  <div class="play" onclick="playAudio(this,'${name}')" data-state="pause"></div>
	  <a class="down" href="${obj.downloadLink}" target="_blank"></a>
	</div>`;
	LIST.append(div);
	LOADER.childNodes[1].innerText=parseFloat(x*100/ARRAY_SONG.length).toFixed(1)+'%';
	x++;
	createSong(ARRAY_SONG[x]);
  }else LOADER.style.display = 'none';
}

/* ****** PLAY AUDIO ****** */

const audio=G('audio');
const nameSong=G('playName');

function playAudio(btnPlay,name){
	let divSong=btnPlay.parentNode.parentNode;
	let linkSong=divSong.dataset.link;
	audio.src=linkSong
	nameSong.innerHTML=name;

	if(btnPlay.dataset.state=='pause'){
		btnPlay.classList.remove('play');
		btnPlay.classList.add('pause');
		btnPlay.dataset.state='play';
		audio.play();
		hiddenAudio('show');
		miniLoader();
	}else{
		btnPlay.classList.add('play');
		btnPlay.classList.remove('pause');
		btnPlay.dataset.state='pause';
		audio.pause();
	}
}

function miniLoader() {
	setTimeout(()=>{ G('miniLoader').style.display = 'block' }, 1);
	setTimeout(()=>{ G('miniLoader').style.display = 'none' }, 2300);
}