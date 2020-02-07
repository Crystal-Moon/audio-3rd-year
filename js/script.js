
const G=id=>document.getElementById(id);

function showMenu(btn){
	let header=btn.parentNode;

	let device= getComputedStyle(header).getPropertyValue("--device");
	if(header.dataset.state=='hidden'){
		header.dataset.state='show';
		header.style.height = '6em';
		header.style.width = '6em';
	}else{
		header.dataset.state='hidden';
		header.style.height = '15em';
		header.style.width = '60%';
	}
}