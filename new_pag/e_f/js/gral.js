const G=id=>document.getElementById(id);
const BODY=G('body');
let cleck=null;
document.onclick=function(eve) {
 document.querySelectorAll('.desplegable').forEach(z=>{z.classList.add('hidden')});
	cleck=eve.target;
	if(/.*(menu_point).*/.test(eve.target.className)) showDownload(eve)
	else if (/.*(arrow_izq).*/.test(eve.target.className)) back(eve)

	

	
};

function upp(yes){
	let arr=document.querySelectorAll('#player *');
	if(yes){
	G('player').classList.add('up')
	arr.forEach(x=>{x.classList.add('up')});
	}else{
		G('player').classList.remove('up')
	arr.forEach(x=>{x.classList.remove('up')});
	}
}


function changeTab(tab,subTarea,...params){
	console.log(tab)
	//console.log('la subtarea en changeTab',subTarea)
	let arr=document.querySelectorAll('#ul li');
	//console.log('el arr',arr)
	arr.forEach(li=>{
		li.className='';
		if(li.title==tab.title) li.className='active';
	})

	loadHtml(tab.dataset.tab,null,subTarea,...params);
}


function changeSubTab(...args){
//	console.log('los arguments en subTab',args)
	let params=[...args]
	let inxTab=params[0], name=params[1]
	//console.log('inxTab en cahgeSub',inxTab);
	//console.log('name en changeSub',name);
	let margin=inxTab * 5.5;
	G('selector_tab').style.marginLeft= margin+'em';
	let tabSelected=G('tab'+name);
	//console.log('tabSelected',tabSelected)
	let sib=tabSelected.parentNode.childNodes;
	sib.forEach(z=>{ if(z.hasChildNodes()) z.style.zIndex = '5'; });
	tabSelected.style.zIndex = '100';
}

function loadHtml(name,action,subTarea,...params) {
//	console.log('params en loadHtml: ',params)
//	console.log('params en loadHtml CON PUNTOS: ',...params)

	fetch('./'+name+'.html')
	.then(r=>r.text())
	.then(d=>{
	//	console.log(d)
	//aqui un fetch para traer los json y setear en el 'body' de la plantilla, luego el innerhtml
		BODY.innerHTML=d;
		BODY.className='';
		BODY.classList.add('body_'+name);
		if(action) history.replaceState({page:name},'',name+'.html')
		else history.pushState({page:name},'',name+'.html')
	//console.log('la subTrea :/',subTarea)
		if(subTarea) subTarea(...params);
	})
}










//BODY.onscroll = function() {myFunction()};
window.onscroll = function() {myFunction()};



function myFunction() {
	var navbar = document.getElementById("head_sticky");
	var sticky = navbar.parentNode.offsetTop;
//	console.log('wind',window.pageYOffset)
//	console.log('s',sticky)
  if (window.pageYOffset >= sticky) navbar.classList.add("head-top")
  else navbar.classList.remove("head-top");
}

let el_point=null;
let la_lista=null;
let el_a=null;

function showDownload(e) {
	console.log('en downlad')
	console.dir(e)
	el_point=e;
	
	let a = e.target.nextSibling;
	el_a=a;
	if(/.*(hidden).*/.test(a.className)) a.classList.remove('hidden');
	else document.querySelectorAll('.desplegable').forEach(z=>{z.classList.add('hidden')});
//	if(/.*(menu_point).*/.test(e.target.className)) e.target.nextSibling.classList.remove('hidden');
//	else document.querySelectorAll('.desplegable').forEach(z=>{z.classList.add('hidden')});
}

/*
document.querySelectorAll('.desplegable').forEach(z=>{
	z.addEventListener('onclick', showDownload, false);
});

document.querySelectorAll('.arrow_izq').forEach(z=>{
	z.addEventListener('onclick', back, false);
});
*/

function back(eve) {
	console.log('en back')
	console.dir(eve)
	G('pdf_aqui').style.width = '2px';
	setTimeout(()=>{ history.back() },320)
	
}





function getcolorformat(s){
	var rX= /^((#[0-9a-f]{3,6})|([a-z]+)|(rgb\\([^\\)]+\\)))$/i;
	var M= rX.exec(s);
	if(!M) return false;
	switch(M[1]){
		case M[2]: return 'hex code';
		case M[3]: return 'string name';
		case M[4]: return 'rgb code';
		default: return false;
	}
}
// casos de prueba
// getcolorformat ('rgb (255,0,0)');
// getcolorformat (' # ff0000 ')
// getcolorformat ('rojo')