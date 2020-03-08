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
	let inxTab=params[0], name=params[1], dos=params[2] || '';
	console.log('inx',inxTab, 'name', name, 'dos',dos);
	//console.log('inxTab en cahgeSub',inxTab);
	//console.log('name en changeSub',name);
	let margin=inxTab * 5.5;
	console.log('el id de selec','selector_tab'+dos);
	console.log('span',G('selector_tab'+dos));
	G('selector_tab'+dos).style.marginLeft= margin+'rem';
	let tabSelected=G('tab'+name+dos);
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


let reciente=[
{
		type: "exercise", 
		link: "https://www.dropbox.com/s/h1wjl70ah1zhm8j/ef3e_p-int_01a_1-02.mp3?dl=0",
		exc: "1b",
		num: "1",
		sound_n: 2,
		lesson: "1A",
		pag: 4
	},
	{
		type: "Grammar Bank", 
		link: "https://www.dropbox.com/s/vtfp1klh2kd1i8x/ef3e_p-int_01a_1-03.mp3?dl=0",
		exc: "1A",
		num: "1",
		sound_n: 3,
		lesson: "1A",
		pag: 126
	},
	{
		type: "Grammar Bank", 
		link: "https://www.dropbox.com/s/oa961xi5d0dt7ze/ef3e_p-int_01a_1-04.mp3?dl=0",
		exc: "1A",
		num: "1",
		sound_n: 4,
		lesson: "1A",
		pag: 126
	},
	{
		type: "exercise", 
		link: "https://www.dropbox.com/s/qlofo0wjnmnadt3/ef3e_p-int_01a_1-05.mp3?dl=0",
		exc: "3a",
		num: "1",
		sound_n: 5,
		lesson: "1A",
		pag: 5
	}
]





localStorage.setItem('recently', JSON.stringify(reciente));

function changePage(vista){
	switch(vista){
		case 'artista':


		case 'library':


		case 'pdf_view':

	}
}


function loadHbs(hbs, action, tarea) {
//	console.log('params en loadHtml: ',params)
//	console.log('params en loadHtml CON PUNTOS: ',...params)
let datos={
	recently: JSON.parse(localStorage.getItem('recently'))
}

console.log('data',datos)
	fetch('./pages/'+hbs+'.hbs')
	.then(res=>{
		if(res.status==200) return res.text()
		else loadHbs(hbs);
	})
    .then(data=>{
	  if(data){
    	let template = Handlebars.compile(data);
      //  let a=document.createElement('div')
        BODY.innerHTML=template(datos)//aqui el json
      //  console.log(a)
       // SECCION_ARTICLES.append(a)
     	//cargarSeccion(RutasAPI[countP])
     //	console.log(BODY);

     	if(action) history.replaceState({page:name},'', './pages/'+hbs+'.hbs')
		else history.pushState({page:name},'', './pages/'+hbs+'.hbs')
	//console.log('la subTrea :/',tarea)
		if(tarea) tarea(...params);
      }
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