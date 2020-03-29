var cancelTempo;
var cancelTempo2;
var cancel;
var cancel2;
var imgs = [];
var comentarios = ["Me chamo Matheus, tenho 27 anos e desenvolvo projetos web front-end e back-end, utilizando HTML, CSS, JAVASCRIPT(ou jQuery) e PHP. Tenho cerca de 8 anos de experiência no desenvolvimento de projetos web como Freelancer.", "Alguns projetos que realizo:<br> - Institucionais<br> - Gestão de produtos e recursos de uma empresa<br> - portifólios<br>Clique no botão abaixo e encontre seu projeto web perfeito.", "Além de escolher um dos modelos de páginas web prontas no menu <b>projetos</b>, você também pode entrar em contato, aqui pelo nosso site, e solicitar um orçamento para um projeto específico que você esteja necessitando através do botão abaixo."];
var comentariosDes = ["Além de elaborar o design, também realizo a parte por trás do design, que corresponde ao gerenciamento de um banco de dados para gerenciar as informações correntes do seu negócio, por exemplo. Utilizo sempre html5, css3, javascript e quando não for possível utilizar esta última, como linguaguem de servidor, utilizo o PHP. Sempre pensando nas necessidades da sua empresa e prezando por códigos semânticos e organizados com foco na usabilidade, acessibilidade e SEO.", "Também realizo o trabalho de marketing digital, junto com a códificação e implantação da página para poder ser acessada, para direcionar usuários para o site e te trazer mais clientes."];
var comentariosTitulos = ["Desenvolvedor", "Projetos", "Contato"];
var slider;
var startSlider;
var imgAtual;
var maxImg;
var tmp;
var tempoTroca;
var vtempo;
var vbarra;
var estagio;
var estagioAntesClique;
var nodes = [];
var pagHome = {
	executando: 0,
	pausado: 1,
	estagioSubSecoes: function(pagSelecionada){
		if(pagSelecionada == "novPagDes" || pagSelecionada == "novPagPro" || pagSelecionada == "novPagCon"){
			estagio = this.pausado;
			//alert("função estagioSubSeções: "+estagio);
		}
		else if(pagSelecionada = "logomarca")
			estagio = this.executando;
	},
	iniciaEstagio: function(){
		estagio = this.executando;
	}
};
var primeiroCarregamento = true;
var altura;
var texto;
var titulo;
var novPagCon;
var novPagDes;
var novPagPro;
var logo;
var continuaAnimacao = true;

function preCarregamento(){
	var s = 1;
	for(i = 0; i < 3; i++){
		imgs[i] = new Image();
		imgs[i].src = "projeto"+s+".jpg";
		s++;
	}
}

function carregarImg(img){
	slider.style.backgroundImage = "url('"+imgs[img].src+"')";
	slider.style.backgroundRepeat= "no-repeat";
	carregarTexto(img);
}

function carregarTexto(img){
	texto.innerHTML = comentarios[img];
	titulo.innerHTML = comentariosTitulos[img];
}

function inicia(){
	pagHome.iniciaEstagio();
	if(estagio == pagHome.executando){
		logo=document.getElementById("logomarca");
		novPagDes=document.getElementById("novPagDes");
		novPagPro=document.getElementById("novPagPro");
		novPagCon=document.getElementById("novPagCon");
	//}
		texto=document.getElementById("cardText");
		titulo=document.getElementById("cardTitulo");
		slider=document.getElementById("dvslider");
		vbarra=document.getElementById("dvbarra");
		preCarregamento();
		imgAtual = 0;
		maxImg = imgs.length - 1;
		tempoTroca = 0;
		carregarImg(imgAtual);
		anima(estagio);
	}
	logo.addEventListener("click",clique);
	novPagDes.addEventListener("click",clique);
	novPagPro.addEventListener("click",clique);
	novPagCon.addEventListener("click",clique);
}

function troca(dir){
	tempoTroca = 0;
	imgAtual+=dir;
	if(imgAtual > maxImg)
		imgAtual = 0;
	else if(imgAtual < 0)
		imgAtual = maxImg;
	carregarImg(imgAtual);
}

function anima(mudarEstadoAnimacao){
	tempoTroca++;
	if(tempoTroca >= 500){
		tempoTroca = 0;
		troca(1);
	}
	vtempo = tempoTroca/5;
	vbarra.style.width = vtempo+"%";
	if(mudarEstadoAnimacao == pagHome.pausado){
		cancelAnimationFrame(startSlider);
		return;
	}
	startSlider = window.requestAnimationFrame(anima);
}

function clique(evento){
	var tagArticle;
	evento.preventDefault();
	estagioAntesClique = estagio;
	pagHome.estagioSubSecoes(evento.target.id);
	if(estagio == pagHome.executando){
		cancelAnimationFrame(startSlider);
		if(estagioAntesClique == pagHome.pausado){
			reativaArticle();
		}
		// anima(estagio);
		inicia();
	}
	else if(estagio == pagHome.pausado){
		asideMenu(evento.target.id);
		if(estagioAntesClique == pagHome.executando){
			anima(estagio);
		}
		articleConteudo(evento.target.id);
	}
}

function reativaArticle(){
	var filhos = document.getElementsByClassName("coluna");
	var novos_filhos;
	var tagPai;
	var textoTag;
	var i;
	tagArticle = document.getElementById("tagArticle");
	// alert(tagArticle.children.length);
	for(i = tagArticle.children.length - 1; i >= 0; i--){
		// alert(": "+i);
		tagArticle.removeChild(filhos[i]);
	}
	// figure criada e inserida
	novos_filhos = document.createElement("figure");
	tagArticle.appendChild(novos_filhos);
	novos_filhos.setAttribute("id","dvslider");
	// 2 button e 1 div criadas e inseridas
	tagPai = document.getElementById("dvslider");
	novos_filhos = document.createElement("button");
	textoTag = document.createTextNode("<");
	novos_filhos.appendChild(textoTag);
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("class","btSlider1");
	novos_filhos.setAttribute("onclick","trocar(-1)");
	novos_filhos = document.createElement("div");
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("id","dvload");
	novos_filhos = document.createElement("button");
	textoTag = document.createTextNode(">");
	novos_filhos.appendChild(textoTag);
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("class","btSlider2");
	novos_filhos.setAttribute("onclick","trocar(1)");
	// idComentário interno a dvload
	tagPai = document.getElementById("dvload");
	novos_filhos = document.createElement("div");
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("id","idComentario");
	// dvbarra interno a dvload
	novos_filhos = document.createElement("div");
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("id","dvbarra");
	// h1, p e button interno a idComentario
	tagPai = document.getElementById("idComentario");
	novos_filhos = document.createElement("h1");
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("id","cardTitulo");
	novos_filhos = document.createElement("p");
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("id","cardText");
	novos_filhos = document.createElement("button");
	tagPai.appendChild(novos_filhos);
	novos_filhos.setAttribute("id","homeMaisInfo");
	textoTag = document.createTextNode("Saiba mais");
	novos_filhos.appendChild(textoTag);
}

function animaColDes(animacaoArticleLocal){
	if(animacaoArticleLocal == -300){
		cancelTempo = animacaoArticleLocal;
	}
	else cancelTempo += 10;
	div = document.getElementsByClassName('coluna');
	div[0].style.marginTop = cancelTempo+"px";
	if(cancelTempo >= 0){
		cancelAnimationFrame(cancel);
		return;
	}
	cancel = window.requestAnimationFrame(animaColDes);
}

function animaColDes2(animacaoArticleLocal2){
	if(animacaoArticleLocal2 == -300) cancelTempo2 = 0;
	else cancelTempo2 += 1;
	div = document.getElementsByClassName('coluna');
	div[1].style.opacity = cancelTempo2+"%";
	if(cancelTempo2 >= 100){
		cancelAnimationFrame(cancel2);
		return;
	}
	cancel2 = window.requestAnimationFrame(animaColDes2);
}

function articleConteudo(pagSelecionada){
	var nova_div = [];
	var novos_filhos;
	var tamanhodoArray = 2;
	var i = 0;
	var animacaoArticle = -300;
	tagArticle = document.getElementById("tagArticle");
	tagArticle.style.backgroundImage = "url('programacao2.jpeg')";
	//tagArticle.style.padding = "20px";
	tagArticle.removeChild(slider);
	if(pagSelecionada == "novPagDes"){
		for(i = 0; i < tamanhodoArray; i++){
			nova_div[i] = document.createElement("div");
			tagArticle.appendChild(nova_div[i]);
			nova_div[i].classList.add('coluna');
		}
		nova_div[0].style.marginLeft = "0px";
		nova_div[0].style.marginTop = animacaoArticle+"px";
		novos_filhos = document.createElement("h2");
		textoTag = document.createTextNode("O que utilizo nos projetos?");
		novos_filhos.appendChild(textoTag);
		nova_div[0].appendChild(novos_filhos);
		novos_filhos.style.textAlign = "center";
		novos_filhos.style.color = "black";
		novos_filhos.style.backgroundColor = "#ffffff50";
		novos_filhos.style.marginBottom = "10px";
		for(i = 0; i < 2; i++){
			novos_filhos = document.createElement("p");
			textoTag = document.createTextNode(comentariosDes[i]);
			novos_filhos.appendChild(textoTag);
			nova_div[0].appendChild(novos_filhos);
			novos_filhos.style.textAlign = "justify";
			novos_filhos.style.color = "#000000";
			novos_filhos.style.fontSize = "1em";
			novos_filhos.style.fontWeight = "600";
			novos_filhos.style.backgroundColor = "#eeac9e99";
			novos_filhos.style.padding = "5px";
			if(i == 0)novos_filhos.style.borderRadius = "10px 10px 0 0";
			if(i == 1)novos_filhos.style.borderRadius = "0 0 10px 10px";
		}
		nova_div[1].classList.add('colunaDes');
		// nova_div[1].style.marginTop = "0px";
		// nova_div[1].style.marginRight = animacaoArticle+"px";
		nova_div[1].style.opacity = animacaoArticle+300+"%";
		novos_filhos = document.createElement("h2");
		textoTag = document.createTextNode("Projetos prontos");
		novos_filhos.appendChild(textoTag);
		nova_div[1].appendChild(novos_filhos);
		novos_filhos.style.width = "70%";
		novos_filhos.style.color = "#ccc";
		novos_filhos.style.marginLeft = "15%";
		novos_filhos.style.textAlign = "center";
		novos_filhos.style.paddingBottom = "10px";
		novos_filhos.style.marginBottom = "10px";
		novos_filhos.style.borderBottom = "1px solid #1f238f";
		for(i = 0; i < 3; i++){
			novos_filhos = document.createElement("p");
			if(i == 0) textoTag = document.createTextNode("Institucionais");
			if(i == 1) textoTag = document.createTextNode("Portifólios");
			if(i == 2) textoTag = document.createTextNode("Gerenciador recursos e arquivos");
			novos_filhos.appendChild(textoTag);
			nova_div[1].appendChild(novos_filhos);
			novos_filhos.style.color = "white";
			novos_filhos.style.textAlign = "center";
		}
		novos_filhos = document.createElement("h2");
		textoTag = document.createTextNode("O que geralmente uso na codificação do projeto");
		novos_filhos.appendChild(textoTag);
		nova_div[1].appendChild(novos_filhos);
		novos_filhos.style.color = "#ccc";
		novos_filhos.style.width = "70%";
		novos_filhos.style.marginLeft = "15%";
		novos_filhos.style.textAlign = "center";
		novos_filhos.style.paddingBottom = "10px";
		novos_filhos.style.marginTop = "30px";
		novos_filhos.style.marginBottom = "10px";
		novos_filhos.style.borderBottom = "1px solid #1f238f";
		for(i = 0; i < 4; i++){
			novos_filhos = document.createElement("p");
			if(i == 0) textoTag = document.createTextNode("HTML5");
			if(i == 1) textoTag = document.createTextNode("CSS3");
			if(i == 2) textoTag = document.createTextNode("javascript");
			if(i == 3) textoTag = document.createTextNode("jQuery");
			novos_filhos.appendChild(textoTag);
			nova_div[1].appendChild(novos_filhos);
			novos_filhos.style.color = "white";
			novos_filhos.style.textAlign = "center";
		}
		animaColDes(animacaoArticle);
		animaColDes2(animacaoArticle);
	}
	else if(evento.target.id == "novPagPro"){

	}
	else if(evento.target.id == "novPagCon"){

	}
}

function asideMenu(pagSelecionada){
	//pagHome.carregaNodes(document);
	tagArticle.style.backgroundColor = "#1f238f50";
	if(pagSelecionada == "novPagDes"){
		novPagDes.style.color = "white";
		novPagDes.style.backgroundColor = "#1f238f70";
		novPagDes.style.padding = "10px";
		novPagDes.style.borderRadius = "5px";
		novPagDes.style.fontWeight = "normal";
		novPagPro.style.backgroundColor = "transparent";
		novPagPro.style.padding = "0";
		novPagPro.style.borderRadius = "none";
		novPagPro.style.fontWeight = "500";
		novPagCon.style.backgroundColor = "transparent";
		novPagCon.style.padding = "0";
		novPagCon.style.borderRadius = "none";
		novPagCon.style.fontWeight = "500";
	}
 	else if(pagSelecionada == "novPagPro"){
		novPagDes.style.backgroundColor = "transparent";
		novPagDes.style.padding = "0";
		novPagDes.style.borderRadius = "none";
		novPagDes.style.fontWeight = "500";
		novPagPro.style.color = "white";
		novPagPro.style.backgroundColor = "#1f238f70";
		novPagPro.style.padding = "10px";
		novPagPro.style.borderRadius = "5px";
		novPagPro.style.fontWeight = "normal";
		novPagCon.style.backgroundColor = "transparent";
		novPagCon.style.padding = "0";
		novPagCon.style.borderRadius = "none";
		novPagCon.style.fontWeight = "500";
 	}
	else if(pagSelecionada == "novPagCon"){
		novPagPro.style.backgroundColor = "transparent";
		novPagPro.style.padding = "0";
		novPagPro.style.borderRadius = "none";
		novPagPro.style.fontWeight = "500";
		novPagDes.style.backgroundColor = "transparent";
		novPagDes.style.padding = "0";
		novPagDes.style.borderRadius = "none";
		novPagDes.style.fontWeight = "500";
		novPagCon.style.color = "white";
		novPagCon.style.backgroundColor = "#1f238f70";
		novPagCon.style.padding = "10px";
		novPagCon.style.borderRadius = "5px";
		novPagCon.style.fontWeight = "normal";
	}
}

window.addEventListener("load", inicia);
