
document.onclick=function(eve) {
  document.querySelectorAll('.desplegable').forEach(z=>{z.classList.add('hidden')});
	if(/.*(menu_point).*/.test(eve.target.className)) showDownload(eve)
	else if (/.*(arrow_izq).*/.test(eve.target.className)) back(eve)
	else if (/.*(to-playspan).*/.test(eve.target.className)) playSong(eve.target.parentNode)
	else if (/.*(to-play).*/.test(eve.target.className)) playSong(eve.target)
	else if (/.*(to-artistspan).*/.test(eve.target.className)) changePage(eve.target.parentNode)
	else if (/.*(to-artist).*/.test(eve.target.className)) changePage(eve.target)
	else if (/.*(to-pdf_viewspan).*/.test(eve.target.className)) changePage(eve.target.parentNode)
	else if (/.*(to-pdf_view).*/.test(eve.target.className)) changePage(eve.target)

};

window.onpopstate = function(e) {
	console.log('=== evento popstate =======')
	console.dir(e)
	if(!e.state) changePage('home')
	else changePage({dataset:e.state.elem_data},null,'replace')
};

function initJson(){
LOADER.style.display = 'block';
	let b_audio=new Promise(done=>{ fetch('./db/book_audio.json').then(r=>r.json()).then(d=>{ done(d) }) });
	let b_pdf=new Promise(done=>{ fetch('./db/book_pdf.json').then(r=>r.json()).then(d=>{ done(d) }) });
	let wb_audio=new Promise(done=>{ fetch('./db/wbook_audio.json').then(r=>r.json()).then(d=>{ done(d) }) });
	let wb_pdf=new Promise(done=>{ fetch('./db/wbook_pdf.json').then(r=>r.json()).then(d=>{ done(d) }) });
	
	Promise.all([b_audio, b_pdf, wb_audio, wb_pdf])
	.then(pp=>{ 
		Json.BOOK_AUDIO=pp[0];
		Json.BOOK_PDF=pp[1];
		Json.WORKBOOK_AUDIO=pp[2];
		Json.WORKBOOK_PDF=pp[3]; //listo json
		LOADER.style.display = 'none';
	})
}

function saveRecent(s) {
	let n=s.type.split(' ');
	s.name= (s.type=='Exercise'?'Lesson':(n[1]?n[0][0]+n[1][0]:s.type))+' '+s.lesson+' - exc.'+s.exc;
    let recent=JSON.parse(localStorage.getItem('recently'));
    if(!recent) recent=[];
    let exist=recent.find(x=>JSON.stringify(x)==JSON.stringify(s));
    if(!exist) recent.unshift(s);
    if(recent.length>=7) recent.splice(0,7);
	localStorage.setItem('recently', JSON.stringify(recent));
}

/*

function hacerJson(){
console.log(JSON.stringify(Json.WORKBOOK_AUDIO,null,4))
}


*/