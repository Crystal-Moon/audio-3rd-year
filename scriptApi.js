
//const MY_SERVER='http://localhost:3000';
/* MY_SERVER viene seteado desde el servidor, se puede encontrar su valor al inicio del html de esta pagina en
una etiqueta <script>, de esta manera se puede alternar entre las distintas plataformas de prueba o produccion */

function loginExpress(btnLogin){
	LOADER.style.display = 'flex';
	//ruta especial para fines de prueba, luego se eliminara
	fetch(MY_SERVER+'/test/user/'+USER77.id)
	.then(response => { return response.json() })
	.then(user =>{
		let divLogin=btnLogin.parentNode;
		for (var i=divLogin.childNodes.length-1; i >= 0; i--) {
			let node=divLogin.childNodes[i];
			if(node.tagName=='INPUT'){
				node.value=user.token;
			}
			if(node.classList && node.classList[0]=='circle'){
				node.innerHTML='ON';
				node.style.backgroundColor = 'green';
				LOADER.style.display = 'none';
			}
		}
	});
}

//esta es la funcion que realiza toda la magia, junto con getFamily
function tryIt(id_article){
	let vars=getFamily(id_article);

	let optionFetch={
		method: vars.req.method,
    	headers: { 
    		'Content-Type': 'application/json' ,
    		'Access-Control-Allow-Origin' : '*'
    	},
    	mode: 'cors'
	}

	if(vars.req.token.value) optionFetch.headers['Authorization']='Bearer '+vars.req.token.value
	if(vars.req.method=='POST')  optionFetch.body= JSON.stringify(vars.req.form);

	LOADER.style.display = 'flex';

	let url = MY_SERVER + vars.req.sectionUrl.title + vars.req.endPoint.value;
	if(id_article=='get_groups_city'|| id_article=='get_matches_city'){
		let encode=vars.req.endPoint.value.split('?');
		//console.log(encode)
		let query=encode[1]
		let search=encode[0].replace('/','')
		//console.log(encodeURIComponent(search))
		url = MY_SERVER + vars.req.sectionUrl.title + '/' + encodeURIComponent(search)+'?'+query;
	}
	let rS=''; 
	fetch(url , optionFetch)
	.then(response =>{
		LOADER.style.display = 'none';
		rS=response.status.toString().substring(0,1)+'xx'
		alertColorCode(vars.res[rS], response.status, vars.res.nroStatus); //mera estetica
		changeTabResponse(id_article, rS)
		return response.json() 
	})
	.then(data =>{
		let info=JSON.stringify(data)
		writeIndentJson(vars.res['r_'+rS], info)
	});
}

function getFamily(id_article){
	let family={ req: {}, res: {} };	
	let article = document.querySelectorAll(`#${id_article} *`); //selecciono TODA la desendencia
	let x = article.length; 
	while (x--) {     //Recorro TODO el arbol de este id.   
		let node=article.item(x);
		if(node.dataset.method) 
			family.req.method = node.dataset.method
		if(node.dataset.fetchVar)	//selecciono los elmentos que tienen datos para el fetch
			family.req[node.dataset.fetchVar] = node;
		if(node.dataset.domVar) 	//selecciono los elementos que manipulare del DOM
			family.res[node.dataset.domVar] = node;
	}

	if(!family.req.token) family.req.token=USER77.token; //solo para q no rompa el index, no es necesario
	
	if(family.req.needArray) 
		family.req.form=family.req.form.toArrayJSON(); //para enviar un array de objetos
	else 
		family.req.form=family.req.form.toJSON(); //para enviar un solo objeto

	//console.log(family)
	return family;
/*  family={	//asi queda family
		req:{
			token: <input>,
			sectionUrl: <span>,
			endPoint: <span>,
			method: "string",
			form: <form>
		},
		res:{
			statusLogin: <div>,
			statusRes: <div>,
			bodyRes: <pre>
			nroStatus: <span>
		}
	}
*/
}

function loginApi(id_article){	//inicia sesion y actualiza el perfil virtual de la derecha
	let vars=getFamily(id_article);
	let optionFetch={
		method: 'POST',
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify(vars.req.form)
	}

	LOADER.style.display = 'flex';
	
	let rS='', url = MY_SERVER + vars.req.sectionUrl.title + vars.req.endPoint.value;
	fetch(url , optionFetch)
	.then(response =>{
		LOADER.style.display = 'none';
		rS=response.status.toString().substring(0,1)+'xx'
		alertColorCode(vars.res[rS], response.status, vars.res.nroStatus); //mera estetica
		changeTabResponse(id_article, rS)
		return response.json() 
	})
	.then(dataServer =>{		
		let info=JSON.stringify(dataServer)
		writeIndentJson(vars.res['r_'+rS], info)
		//despues de iniciar la secion hago un llamado para obtener todos mis datos para el perfil de la derecha
		let fetchhs={
			method: 'GET',
    		headers: { 
    			'Authorization' : 'Bearer '+dataServer.data.auth.token, 
    			'Content-Type': 'application/json',
    			'Access-Control-Allow-Origin' : '*'
    		}
		}
		fetch(MY_SERVER+'/users/me' , fetchhs)
		.then(response => {
			LOADER.style.display = 'none';
			return response.json() 
		})
		.then(userServer => {
			let u=userServer.data
			u.token=dataServer.data.auth.token;
			loadProfile(u) 
		});
	});
};

/*******************  Utilidades  *************************/


function addOpcion(id_article, btnOption){
	let vars=getFamily(id_article);
	if(!vars.req.endPoint.value.includes('?'))
		vars.req.endPoint.value += '?'+btnOption.title;
	else
		vars.req.endPoint.value += '&'+btnOption.title;
}

function resetRequest(btnReset){
	let divReq=btnReset.parentNode.parentNode;
	for (var i=divReq.childNodes.length-1; i >= 0; i--) {
		let node=divReq.childNodes[i];
		if(node.tagName=='FORM'){
			for (var x = node.length - 1; x >= 0; x--) {
				node[x].value=node[x].placeholder;
			}
		}
	}
}

function resetRute(btnReset){
	let divServer=btnReset.parentNode;
	for (var i=divServer.childNodes.length-1; i >= 0; i--) {
		let node=divServer.childNodes[i];
		if(node.tagName=='INPUT')
			node.value=node.placeholder;
	}
}

let scrollito=0;
function addObject(id_article){
	let vars=getFamily(id_article);
	let formJson=vars.req.needArray;
	scrollito++;
	if(scrollito==4) formJson.classList.add('needArray')
	let idRandom=Math.trunc(Math.random() * (150 - 1) + 1);
	let starRandom=Math.trunc(Math.random()* (6 - 0) + 0);
	let pre=document.createElement('pre')
	pre.className='request';
	pre.innerHTML=`{
  id: <input type="number" name="id" value="${idRandom}" placeholder="${idRandom}" class="type-number" max="1000000">,
  stars: <input type="number" name="stars" value="${starRandom}" placeholder="${starRandom}" class="type-number" max="5">
}
`;
	formJson.append(pre)
}

function delObject(id_article){
	let vars=getFamily(id_article);
	let pres=vars.req.needArray.getElementsByTagName('pre');
	vars.req.needArray.removeChild(pres[pres.length-1])
	scrollito--;
	if(scrollito<=3) vars.req.needArray.classList.remove('needArray');
}


const SECCION_ARTICLES=document.getElementById('articles');
var countP=0;

function cargarSeccion(id_seccion){	
	if(countP==RutasAPI.length){
		setHorarios()
		document.getElementById('loadPage').style.display = 'none'
	}else{
	countP++;
	fetch(MY_SERVER+'/test/apiRecursos?p='+id_seccion)
	.then(res=>{
		if(res.status==200) return res.text()
		else return null;
	})
    .then(data=>{
	if(data){
    	let template = Handlebars.compile(data);
        let a=document.createElement('div')
        a.innerHTML=template()//aqui el json
        SECCION_ARTICLES.append(a)
     	cargarSeccion(RutasAPI[countP])
    }
	})
}
}

