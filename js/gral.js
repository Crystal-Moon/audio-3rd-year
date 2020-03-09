const G=id=>document.getElementById(id);
const BODY=G('body');

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
	//console.log(tab)
	//console.log('la subtarea en changeTab',subTarea)
	let arr=document.querySelectorAll('#ul li');
	//console.log('el arr',arr)
	arr.forEach(li=>{
		li.className='';
		//if(li.title==tab.title) li.className='active';
	})
	tab.className='active'

	//loadHtml(tab.dataset.tab,null,subTarea,...params);
	//loadHbs(tab)
	changePage(tab,subTarea,...params)
}


function changeSubTab(...args){
	
	let params=[...args]
	console.log('los arguments en subTab',params)
	let inxTab=params[0], name=params[1], dos=params[2] || '';
	//console.log('inx',inxTab, 'name', name, 'dos',dos);
	//console.log('inxTab en cahgeSub',inxTab);
	//console.log('name en changeSub',name);
	let margin=inxTab * (!dos? 5.5 : 10.5);
	//console.log('el id de selec','selector_tab'+dos);
	//console.log('span',G('selector_tab'+dos));
	G('selector_tab'+dos).style.marginLeft= margin+'rem';
	let tabSelected=G('tab'+name+dos);
	//console.log('tabSelected',tabSelected)
	let sib=tabSelected.parentNode.childNodes;
	sib.forEach(z=>{ if(z.hasChildNodes()) z.style.zIndex = '5'; });
	tabSelected.style.zIndex = '100';
}

/*
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
*/

function changePage(elem,tarea,...params){
	console.log('elem en changePage',elem)
	let datos={};
	switch(elem.dataset.vista){
		case 'home':
			datos.recently= JSON.parse(localStorage.getItem('recently'));
			break;
		case 'artist':
		console.log('elem para artist',elem)
			datos.album_cover=elem.dataset.album;
			datos.name='Lesson '+elem.dataset.lesson;
			//datos.book_audio=Json.BOOK_AUDIO.filter(x=>x.lesson==elem.dataset.lesson).sort((a,b)=>a.pag-b.pag)
			datos.audios=(elem.dataset.album=='album_book'?Json.BOOK_AUDIO:Json.WORKBOOK_AUDIO)
				.filter(x=>x.lesson==elem.dataset.lesson)
		//	console.log('audios sin filter',datos.audios)
	//		datos.audios.filter(x=>x.lesson==elem.dataset.lesson)
				.sort((a,b)=>a.pag-b.pag)
			datos.audios.forEach(z=>{z.cover=elem.dataset.album});
			console.log('audio con filtro',datos.audios)
			datos.pdf=Json.BOOK_PDF.find(x=>x.lesson==elem.dataset.lesson)
			break;
		case 'library':
			datos.book_audio=[...new Set(Json.BOOK_AUDIO.sort((a,b)=>a.pag-b.pag)
				.map(x=>({
					type:(x.type=='Exercise'?'Lesson':x.type), 
					lesson:x.lesson, 
					pag: Json.BOOK_PDF.find(z=>z.lesson==x.lesson).pag}))
				.map(JSON.stringify))].map(JSON.parse)
			
			
			datos.book_pdf=Json.BOOK_PDF.sort((a,b)=>a.pag-b.pag);
		

			datos.wbook_audio=[...new Set(Json.WORKBOOK_AUDIO.sort((a,b)=>a.pag-b.pag)
				.map(x=>({lesson:x.lesson, pag: Json.WORKBOOK_PDF.find(z=>z.lesson==x.lesson).pag}))
				.map(JSON.stringify))].map(JSON.parse)


			datos.wbook_pdf=Json.WORKBOOK_PDF.sort((a,b)=>a.order-b.order)
			//datos.wbook_pdf=datos.wbook_audio.forEach(x=>{x.name:x.type+' '+x.lesson})
			//datos.wbook_pdf=[...new Set(datos.book_audio.map(JSON.stringify))].map(JSON.parse)
			break;
		case 'pdf_view':
			datos.link=elem.dataset.link;
			datos.linkDownload=elem.dataset.downlad;
			break;
	}
	//if(tarea) tarea(...params);
	console.log('datos en changePage: ',datos)
	loadHbs(elem.dataset.vista, datos,null,tarea, ...params);
}


function loadHbs(hbs, datos, action, tarea,...params) {
//	console.log('params en loadHtml: ',params)
//	console.log('params en loadHtml CON PUNTOS: ',...params)
/*let datos={
	recently: JSON.parse(localStorage.getItem('recently'))
}*/

//console.log('data',datos)
	fetch('./'+hbs+'.hbs')
	.then(res=>{
		if(res.status==200) return res.text()
		else loadHbs(hbs);
	})
    .then(data=>{
	  if(data){
    	let template = Handlebars.compile(data);
      //  let a=document.createElement('div')

		BODY.className='';
		BODY.classList.add('body_'+hbs);
        BODY.innerHTML=template(datos)//aqui el json
      //  console.log(a)
       // SECCION_ARTICLES.append(a)
     	//cargarSeccion(RutasAPI[countP])
     	console.log(BODY);

     	if(action) history.replaceState({page:hbs},'', './'+hbs+'.hbs')
		else history.pushState({page:hbs},'', './'+hbs+'.hbs')
	//console.log('la subTrea :/',tarea)
		if(tarea) tarea(...params);
      }
	})
}







//BODY.onscroll = function() {myFunction()};
window.onscroll = function() {myFunction()};



function myFunction() {
	if(G('head_sticky')){
	var navbar = G("head_sticky");
	var sticky = navbar.parentNode.offsetTop;
//	console.log('wind',window.pageYOffset)
//	console.log('s',sticky)
  if (window.pageYOffset >= sticky) navbar.classList.add("head-top")
  else navbar.classList.remove("head-top");
}
}

let el_point=null;
let la_lista=null;
let el_a=null;

function showDownload(e) {
	//console.log('en downlad')
	//console.dir(e)
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
	//console.log('en back')
	//console.dir(eve)
	G('pdf_aqui').style.width = '2px';
	setTimeout(()=>{ history.back() },320)
	
}

