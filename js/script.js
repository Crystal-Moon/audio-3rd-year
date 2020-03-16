
let cleck=null;
document.onclick=function(eve) {
  document.querySelectorAll('.desplegable').forEach(z=>{z.classList.add('hidden')});
	cleck=eve.target;
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
	if(!e.state) changePage('home')
	else changePage({dataset:e.state.elem_data},null,'replace')
};

function initJson(){
LOADER.style.display = 'block';
	let b_audio=new Promise(done=>{ fetch('./db/book_audio.json').then(r=>r.json()).then(d=>{ done(d) }) });
	let b_pdf=new Promise(done=>{ fetch('./db/book_pdf.json').then(r=>r.json()).then(d=>{ done(d) }) });

	let wb_audio=new Promise(done=>{ fetch('./db/wbook_audio.json').then(r=>r.json()).then(d=>{ done(d) }) });
	let wb_pdf=new Promise(done=>{ fetch('./db/wbook_pdf.json').then(r=>r.json()).then(d=>{ done(d) }) });

	let rb_audio=new Promise(done=>{ fetch('./db/reader_audio.json').then(r=>r.json()).then(d=>{ done(d) }) });
	let rb_pdf=new Promise(done=>{ fetch('./db/reader_pdf.json').then(r=>r.json()).then(d=>{ done(d) }) });

	let sch_audio=new Promise(done=>{ fetch('./db/schoology_audio.json').then(r=>r.json()).then(d=>{ done(d) }) });
	let sch_pdf=new Promise(done=>{ fetch('./db/schoology_pdf.json').then(r=>r.json()).then(d=>{ done(d) }) });
	
	Promise.all([b_audio,b_pdf, wb_audio,wb_pdf, rb_audio,rb_pdf, sch_audio,sch_pdf])
	.then(pp=>{ 
		Json.book={ name:'book', audios: pp[0], pdf: pp[1] };
		Json.workbook={ name:'workbook', audios: pp[2], pdf: pp[3] };
		Json.reader={ name:'reader', audios: pp[4], pdf: pp[5] };
		Json.schoology={ name:'schoology', audios: pp[6], pdf: pp[7] };
		
		LOADER.style.display = 'none';
	})
}

function hacerJson(){
//	Json.WORKBOOK_PDF.forEach(x=>{x.linkDownload=x.link.replace('/preview','&export=download').replace('file/d/','uc?id=')})

Json.reader.pdf.forEach((x,i)=>{
	x.linkDownload=x.link.replace('file/d/','uc?id=').replace('/preview','&export=download')
	x.inx=i;
})
//	"https://drive.google.com/file/d/1PuFLRbPjadVvTMg7QtJns1JMTqId5K1Y/preview",
//	"https://drive.google.com/uc?id=1PuFLRbPjadVvTMg7QtJns1JMTqId5K1Y&export=download",
		
	console.log(JSON.stringify(Json.reader.pdf,null,4))
}

function clearRecently(btn) {
	localStorage.setItem('recently', null);
	G('recently').style.height='max-content';
	G('recently').innerHTML=`<div class="row"><p class="nada">Nothing. Visit the library &#128515;</p></div>`;
	btn.style.display = 'none';
}

function saveRecent(s) {
	let n=s.type.split(' ')
	s.name= (s.type=='Exercise'?'Lesson':(n[1]?n[0][0]+n[1][0]:s.type))+' '+s.lesson+' - '+s.exc;
    let recent=JSON.parse(localStorage.getItem('recently'));
    if(!recent) recent=[]
    let exist=recent.find(x=>JSON.stringify(x)==JSON.stringify(s))
    if(!exist) recent.unshift(s)
    if(recent.length>=7) recent.splice(0,7)
	localStorage.setItem('recently', JSON.stringify(recent))
}