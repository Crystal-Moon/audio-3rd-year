const G=id=>document.getElementById(id);

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
<<<<<<< HEAD
//	console.log('en hangeTab [tab,subtarea. ...param]',tab,subTarea,[...params])
	//console.log(tab)
	//console.log('la subtarea en changeTab',subTarea)
=======
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
	let arr=document.querySelectorAll('#ul li');
	arr.forEach(li=>{ li.className='' })
	tab.classList.add('active');
	changePage(tab,subTarea,null,...params)
}

function changeSubTab(...args){
	let params=[...args]
<<<<<<< HEAD
	console.log('los arguments en subTab',params)
	let elem=params[0], inxTab=params[1], name=params[2], dos=params[3] || '';

	let device= getComputedStyle(elem).getPropertyValue("--device");
//	console.log('device de elem',device)
//	console.log('inx',inxTab, 'name', name, 'dos',dos);
	//console.log('inxTab en cahgeSub',inxTab);
	//console.log('name en changeSub',name);
	//let margin=inxTab * (!dos? 5.5 : 10.5);
	let margin=inxTab * (!dos? 5.5 : 10.5);
	//console.log('el id de selec','selector_tab'+dos);
	//console.log('span',G('selector_tab'+dos));


//	let device= getComputedStyle(subMenu).getPropertyValue("--device");
  //           menuMovil.style.height = (device=='tablet')?'13em':'19em'; 

	G('selector_tab'+dos).style.marginLeft= device=='pc'? (inxTab*6)+'em' : (inxTab*25) + '%';

	let tabSelected=G('tab'+name);
	//console.log('tabSelected',tabSelected)
//	console.log('tabSelected',tabSelected)
=======
	let inxTab=params[0], name=params[1], dos=params[2] || '';
	let margin=inxTab * (!dos? 5.5 : 10.5);
	G('selector_tab'+dos).style.marginLeft= margin+'rem';
	let tabSelected=G('tab'+name+dos);
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
	let sib=tabSelected.parentNode.childNodes;
	sib.forEach(z=>{ 
		if(z.hasChildNodes()) z.style.zIndex = '5';
		//console.log('z ',z)
	});
	tabSelected.style.zIndex = '100';
}

<<<<<<< HEAD
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

function changePage(elem,tarea=null,act,...params){
//	console.log('en changePage [elem,tarea, act, ...param]',elem,tarea,act,[...params])
	//console.log('elem en changePage',elem)
	//console.log('la data de elem',elem.dataset)
=======
function changePage(elem,tarea,act,...params){
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
	let datos={};
	switch(elem.dataset.vista){
		case 'home':
			datos.recently= JSON.parse(localStorage.getItem('recently'));
			break;
<<<<<<< HEAD
=======
		case 'artist':
		console.log('elem para artist',elem)
			datos.album_cover=elem.dataset.album;
			datos.lesson=elem.dataset.lesson;
			datos.audios=(elem.dataset.album=='book'?Json.BOOK_AUDIO:Json.WORKBOOK_AUDIO)
				.filter(x=>x.lesson==elem.dataset.lesson)
				.sort((a,b)=>a.pag-b.pag);
			datos.audios.forEach(z=>{z.cover=elem.dataset.album});
			datos.pdf=Json.BOOK_PDF.find(x=>x.lesson==elem.dataset.lesson);
			break;
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
		case 'library':
			datos.datos=[]
			for (k in Json) {
				let p={
					letter: Json[k].name[0].toUpperCase(),
					name:k,
					audios: [...new Set(Json[k].audios.sort((a,b)=>a.other?a.other.pag-b.other.pag:a.inx-b.inx)
					  .map(x=>({
						type: k=='workbook'?'Lesson':x.type, 
						lesson:x.lesson,
						other:x.other?{ 
							pags: Json[k].pdf.find(z=>(z.lesson==x.lesson&&x.type=='Lesson')||z.lesson==x.lesson).other.pags //necesito para el tab de reader
						}:undefined,
						color:x.color,
						book: k,
						//linkDownload: x.linkDownload,
						//link: x.link
					}))
					  .map(JSON.stringify))].map(JSON.parse),
					pdf: Json[k].pdf.sort((a,b)=>a.inx-b.inx)
				}

				
			
			//	console.log(p)
				datos.datos.push(p)
			}


			
				


//despues de cargar hacer click en la primera tab



/*

			datos.book_audio=[...new Set(Json.BOOK_AUDIO.sort((a,b)=>a.pag-b.pag)
				.map(x=>({
					type:(x.type=='Exercise'?'Lesson':x.type), 
					lesson:x.lesson, 
					pag: Json.BOOK_PDF.find(z=>z.type==x.type||(z.lesson==x.lesson&&x.type=='Exercise')).pag,
					color:x.color}))
<<<<<<< HEAD
				.map(JSON.stringify))].map(JSON.parse)
			
			
			datos.book_pdf=Json.BOOK_PDF.sort((a,b)=>a.order-b.order);
		

			datos.wbook_audio=[...new Set(Json.WORKBOOK_AUDIO.sort((a,b)=>a.pag-b.pag)
				.map(x=>({
					type: 'Lesson',
					lesson:x.lesson, 
					pag: Json.WORKBOOK_PDF.find(z=>z.lesson==x.lesson).pag,
					color: 'grey'
				}))
				.map(JSON.stringify))].map(JSON.parse)


			datos.wbook_pdf=Json.WORKBOOK_PDF.sort((a,b)=>a.order-b.order)
			//datos.wbook_pdf=datos.wbook_audio.forEach(x=>{x.name:x.type+' '+x.lesson})
			//datos.wbook_pdf=[...new Set(datos.book_audio.map(JSON.stringify))].map(JSON.parse) */
			break;
		case 'artist':
	//	data-vista="artist" data-lesson="1A" data-album="book" data-type="Grammar Bannk"
		console.log('elem para artist',elem)

			datos.album_cover=elem.dataset.album;
			datos.lesson=elem.dataset.lesson;

			datos.audios=Json[elem.dataset.album].audios
				.filter(x=>x.lesson==elem.dataset.lesson)
				.sort((a,b)=>a.other?a.other.pag-b.other.pag:a.inx-b.inx)

			//datos.book_audio=Json.BOOK_AUDIO.filter(x=>x.lesson==elem.dataset.lesson).sort((a,b)=>a.pag-b.pag)
		//	datos.audios=(elem.dataset.album=='book'?Json.BOOK_AUDIO:Json.WORKBOOK_AUDIO)
		//		.filter(x=>x.lesson==elem.dataset.lesson)
		//	console.log('audios sin filter',datos.audios)
	//		datos.audios.filter(x=>x.lesson==elem.dataset.lesson)
		//		.sort((a,b)=>a.pag-b.pag)
			datos.audios.forEach(z=>{z.cover=elem.dataset.album});
			//console.log('audio con filtro',datos.audios)
			datos.pdf=Json[elem.dataset.album].pdf.find(x=>x.lesson==elem.dataset.lesson)





=======
				.map(JSON.stringify))].map(JSON.parse);		
			datos.book_pdf=Json.BOOK_PDF.sort((a,b)=>a.pag-b.pag);
			datos.wbook_audio=[...new Set(Json.WORKBOOK_AUDIO.sort((a,b)=>a.pag-b.pag)
				.map(x=>({lesson:x.lesson, pag: Json.WORKBOOK_PDF.find(z=>z.lesson==x.lesson).pag}))
				.map(JSON.stringify))].map(JSON.parse);
			datos.wbook_pdf=Json.WORKBOOK_PDF.sort((a,b)=>a.order-b.order);
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
			break;
		case 'pdf_view':
			datos.link=elem.dataset.link;
			datos.linkDownload=elem.dataset.download;
			break;
	}

	if(act) history.replaceState({
			page:elem.dataset.vista,
			elem_data:JSON.parse(JSON.stringify(elem.dataset))
		//},'', './'+elem.dataset.vista+'.hbs')
		},'')
	else history.pushState({
			page:elem.dataset.vista,
			elem_data:JSON.parse(JSON.stringify(elem.dataset))
		//},'', './'+elem.dataset.vista+'.hbs')
		},'')

	loadHbs(elem.dataset.vista, datos,tarea, ...params);
}

function loadHbs(hbs, datos, tarea,...params) {
<<<<<<< HEAD
//	console.log('en loadHBS [hbs,datos,tarea, ...param]',hbs, datos, tarea, [...params])
//	console.log('params en loadHtml: ',params)
//	console.log('params en loadHtml CON PUNTOS: ',...params)
/*let datos={
	recently: JSON.parse(localStorage.getItem('recently'))
}*/

//console.log('data',datos)
LOADER.style.display = 'block';
	fetch('./pages/'+hbs+'.hbs')
	.then(res=>{
		if(res.status==200) return res.text()
		else loadHbs(hbs);
	})
=======
	LOADER.style.display = 'block';
	fetch('./'+hbs+'.hbs')
	.then(res=>res.text())
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
    .then(data=>{
	  if(data){
    	let template = Handlebars.compile(data);
		BODY.className='';
		BODY.classList.add('body_'+hbs);
<<<<<<< HEAD
        BODY.innerHTML=template(datos)//aqui el json
      //  console.log(a)
       // SECCION_ARTICLES.append(a)
     	//cargarSeccion(RutasAPI[countP])
     //	console.log(BODY);

    // 	if(action) history.replaceState({page:hbs},'', './'+hbs+'.hbs')
	//	else history.pushState({page:hbs},'', './'+hbs+'.hbs')
//	console.log('la subTrea :/',tarea)
=======
        BODY.innerHTML=template(datos)
    
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
		if(tarea) tarea(...params);
		if(hbs=='library' && !tarea) changeSubTab(G('tabDefault'),0,'book')
		if(hbs!='pdf_view') LOADER.style.display='none';
		setTimeout(()=>{ LOADER.style.display='none' }, 2500); //por las dudas q no funcione el iframe
      }
	})
}

<<<<<<< HEAD





//BODY.onscroll = function() {myFunction()};
window.onscroll = function() {myFunction()};



function myFunction() {
	if(G('head_sticky')){
=======
window.onscroll = ()=>{
  if(G('head_sticky')){
>>>>>>> 5fdf54f7efa4a96e53b4b0849f1c59d2ef2641b9
	var navbar = G("head_sticky");
	var sticky = navbar.parentNode.offsetTop;
  	if (window.pageYOffset >= sticky) navbar.classList.add("head-top")
  	else navbar.classList.remove("head-top");
  }
}

function showDownload(e) {
	let a = e.target.nextSibling;
	if(/.*(hidden).*/.test(a.className)) a.classList.remove('hidden');
	else document.querySelectorAll('.desplegable').forEach(z=>{z.classList.add('hidden')});
}

function back(eve) {
	G('pdf_aqui').style.width = '2px';
	setTimeout(()=>{ history.back() },320)
}

