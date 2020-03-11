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
	let arr=document.querySelectorAll('#ul li');
	arr.forEach(li=>{ li.className='' })
	tab.classList.add('active');
	changePage(tab,subTarea,null,...params)
}

function changeSubTab(...args){
	let params=[...args]
	let inxTab=params[0], name=params[1], dos=params[2] || '';
	let margin=inxTab * (!dos? 5.5 : 10.5);
	G('selector_tab'+dos).style.marginLeft= margin+'rem';
	let tabSelected=G('tab'+name+dos);
	let sib=tabSelected.parentNode.childNodes;
	sib.forEach(z=>{ if(z.hasChildNodes()) z.style.zIndex = '5'; });
	tabSelected.style.zIndex = '100';
}

function changePage(elem,tarea,act,...params){
	let datos={};
	switch(elem.dataset.vista){
		case 'home':
			datos.recently= JSON.parse(localStorage.getItem('recently'));
			break;
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
		case 'library':
			datos.book_audio=[...new Set(Json.BOOK_AUDIO.sort((a,b)=>a.pag-b.pag)
				.map(x=>({
					type:(x.type=='Exercise'?'Lesson':x.type), 
					lesson:x.lesson, 
					pag: Json.BOOK_PDF.find(z=>z.type==x.type||(z.lesson==x.lesson&&x.type=='Exercise')).pag,
					color:x.color}))
				.map(JSON.stringify))].map(JSON.parse);		
			datos.book_pdf=Json.BOOK_PDF.sort((a,b)=>a.pag-b.pag);
			datos.wbook_audio=[...new Set(Json.WORKBOOK_AUDIO.sort((a,b)=>a.pag-b.pag)
				.map(x=>({lesson:x.lesson, pag: Json.WORKBOOK_PDF.find(z=>z.lesson==x.lesson).pag}))
				.map(JSON.stringify))].map(JSON.parse);
			datos.wbook_pdf=Json.WORKBOOK_PDF.sort((a,b)=>a.order-b.order);
			break;
		case 'pdf_view':
			datos.link=elem.dataset.link;
			datos.linkDownload=elem.dataset.download;
			break;
	}

	if(act) history.replaceState({
			page:elem.dataset.vista,
			elem_data:JSON.parse(JSON.stringify(elem.dataset))
		},'', './'+elem.dataset.vista+'.hbs')
	else history.pushState({
			page:elem.dataset.vista,
			elem_data:JSON.parse(JSON.stringify(elem.dataset))
		},'', './'+elem.dataset.vista+'.hbs')

	loadHbs(elem.dataset.vista, datos,tarea, ...params);
}

function loadHbs(hbs, datos, tarea,...params) {
	LOADER.style.display = 'block';
	fetch('./'+hbs+'.hbs')
	.then(res=>res.text())
    .then(data=>{
	  if(data){
    	let template = Handlebars.compile(data);
		BODY.className='';
		BODY.classList.add('body_'+hbs);
        BODY.innerHTML=template(datos)
    
		if(tarea) tarea(...params);
		if(hbs!='pdf_view') LOADER.style.display='none';
		setTimeout(()=>{ LOADER.style.display='none' }, 2500); //por las dudas q no funcione el iframe
      }
	})
}

window.onscroll = ()=>{
  if(G('head_sticky')){
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

