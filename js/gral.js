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
	let arr=document.querySelectorAll('#ul li');
	arr.forEach(li=>{ li.className='' });
	tab.classList.add('active');
	changePage(tab,subTarea,null,...params)
}


function changeSubTab(...args){
	
	let params=[...args]
	console.log('los arguments en subTab',params)
	let elem=params[0], inxTab=params[1], name=params[2], dos=params[3] || '';

	let device= getComputedStyle(elem).getPropertyValue("--device");
	let margin=inxTab * (!dos? 5.5 : 10.5);

	G('selector_tab'+dos).style.marginLeft= device=='pc'? (inxTab*6)+'em' : (inxTab*25) + '%';
	let tabSelected=G('tab'+name);
	let sib=tabSelected.parentNode.childNodes;
	sib.forEach(z=>{ if(z.hasChildNodes()) z.style.zIndex = '5'; });
	tabSelected.style.zIndex = '100';
}

function changePage(elem,tarea=null,act,...params){
  let datos={};
  switch(elem.dataset.vista){
	case 'home':
	  datos.recently= JSON.parse(localStorage.getItem('recently'));
	  break;
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
				  book: k
				}))
				.map(JSON.stringify))].map(JSON.parse),
			pdf: Json[k].pdf.sort((a,b)=>a.inx-b.inx)
		}
		
		datos.datos.push(p)
	  }
	  break;
	case 'artist':
	  datos.album_cover=elem.dataset.album;
	  datos.lesson=elem.dataset.lesson;
	  datos.audios=Json[elem.dataset.album].audios
			.filter(x=>x.lesson==elem.dataset.lesson)
			.sort((a,b)=>a.other?a.other.pag-b.other.pag:a.inx-b.inx)
	  datos.audios.forEach(z=>{z.cover=elem.dataset.album; if(z.type=='Lesson') z.type='Exercise';});
	  datos.pdf=Json[elem.dataset.album].pdf.find(x=>x.lesson==elem.dataset.lesson)
	  datos.type= elem.dataset.album=='workbook'?'Lesson':datos.audios[0].type;
	  break;
	case 'pdf_view':
	  datos.link=elem.dataset.link;
	  datos.download=elem.dataset.download;
	  break;
  }

	if(act) history.replaceState({
			page:elem.dataset.vista,
			elem_data:JSON.parse(JSON.stringify(elem.dataset))
		},'')
	else history.pushState({
			page:elem.dataset.vista,
			elem_data:JSON.parse(JSON.stringify(elem.dataset))
		},'')

	loadHbs(elem.dataset.vista, datos,tarea, ...params);
}

function loadHbs(hbs, datos, tarea,...params) {
	LOADER.style.display = 'block';
	fetch('./pages/'+hbs+'.hbs')
	.then(res=>res.text())
    .then(data=>{
	  if(data){
    	let template = Handlebars.compile(data);
		BODY.className='body_'+hbs;
        BODY.innerHTML=template(datos)

		if(tarea) tarea(...params);
		if(hbs=='library' && !tarea) changeSubTab(G('tabDefault'),0,'book')
		if(hbs!='pdf_view') LOADER.style.display='none';
		setTimeout(()=>{ LOADER.style.display='none' }, 2500); //por las dudas q no funcione el iframe
      }
	})
}

window.onscroll = function (){
  if(G('head_sticky')){
	let navbar = G("head_sticky");
	let sticky = navbar.parentNode.offsetTop;

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

