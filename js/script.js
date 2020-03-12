
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
	console.log('=== evento popstate =======')
	console.dir(e)
//	console.log("location: " + document.location + ", state: " + e.state.page)
//  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	
	//if(!e.state) loadHtml('home')
	//else loadHtml(e.state.page,'replace')

	//al hacer para atras tmb necesito el elem o al pushar mandar el lesaon y album, y todo u,u
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

let colorr=['blue','green','red','green','violet','red','blue','green','red','green','violet','red']

function hacerJson(){
//	Json.WORKBOOK_PDF.forEach(x=>{x.linkDownload=x.link.replace('/preview','&export=download').replace('file/d/','uc?id=')})

Json.WORKBOOK_AUDIO.forEach((x,i)=>{
	x.inx=i;
})

//	"https://drive.google.com/file/d/1PuFLRbPjadVvTMg7QtJns1JMTqId5K1Y/preview",
//	"https://drive.google.com/uc?id=1PuFLRbPjadVvTMg7QtJns1JMTqId5K1Y&export=download",
		
	console.log(JSON.stringify(Json.WORKBOOK_AUDIO,null,4))
}

function clearRecently() {
	localStorage.setItem('recently', null)
	history.go();
}

/*


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
*/

function saveRecent(s) {
let n=s.type.split(' ')

s.name= (s.type=='Exercise'?'Lesson':(n[1]?n[0][0]+n[1][0]:s.type))+' '+s.lesson+' - exc.'+s.exc;
//console.log('n',n)
//console.log('escuchado  ',s)
//exc: "2C"
//lesson: "2C"
//link: "https://www.dropbox.com/s/7i3kepst5m1d9az/ef3e_p-int_02c_1-47.mp3?dl=1"
//color: "blue"

    let recent=JSON.parse(localStorage.getItem('recently'));
//console.log('recently de local antesde ṕpush', recent)
    if(!recent) recent=[]
    let exist=recent.find(x=>JSON.stringify(x)==JSON.stringify(s))
//console.log('ya existia s?? ',exist)
//console.log(recent)
    if(!exist) recent.unshift(s)
    if(recent.length>=7) recent.splice(0,7)
localStorage.setItem('recently', JSON.stringify(recent))



}