
let cleck=null;
document.onclick=function(eve) {
	//eve.preventDefault();
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
	console.log('evento popstate')
	console.dir(e)
//	console.log("location: " + document.location + ", state: " + e.state.page)
//  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	
	//if(!e.state) loadHtml('home')
	//else loadHtml(e.state.page,'replace')
	if(!e.state) loadHbs('home')
	else loadHbs(e.state.page,null,'replace')
};

function initJson(){

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
	})
}


function hacerJson(){
//	Json.WORKBOOK_PDF.forEach(x=>{x.linkDownload=x.link.replace('/preview','&export=download').replace('file/d/','uc?id=')})
Json.WORKBOOK_PDF.forEach((x,i)=>{
	x.order=i+1; 
	//x.linkDownload=x.link.replace('/preview','&export=download').replace('file/d/','uc?id=')
})

//	"https://drive.google.com/file/d/1PuFLRbPjadVvTMg7QtJns1JMTqId5K1Y/preview",
//	"https://drive.google.com/uc?id=1PuFLRbPjadVvTMg7QtJns1JMTqId5K1Y&export=download",
		
	console.log(JSON.stringify(Json.WORKBOOK_PDF,null,4))
}