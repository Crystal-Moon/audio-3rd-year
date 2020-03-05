


window.onpopstate = function(e) {
//	console.dir(e)
//	console.log("location: " + document.location + ", state: " + e.state.page)
//  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	if(!e.state) loadHtml('home')
	else loadHtml(e.state.page,'replace')
};