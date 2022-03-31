var nome = ""; 
var result = [];
window.onload=function(){
    var form = document.getElementById('formulario');
    var campo = document.getElementById('campo');

    form.addEventListener('submit', function(e) {
        try {
            nome = campo.value;
            noShowLogin(nome);
        } catch (error) {
            alert("Aconteceu algum erro");
        }

        console.log(nome);

        // impede o envio do form
        e.preventDefault();
    });
}


function showFormulario1 (id) {
    let modal = document.getElementById(id);

    modal.style.display = "flex";
}

function noShowFormulario1 (id){
    let modal = document.getElementById(id);

    modal.style.display = "none";
}


function noShowLogin (nome) {

    document.getElementById("body").innerHTML = `
        <header id="header-projeto">
            <img src="./images/icons/logo.svg" alt="icon"/>
            <h2>${nome}</h2>
            <button onclick="criarMensagem()" id="button-nova-mensagem">nova mensagem</button>
        </header>

        <div id="mensagens">
            <div class="left">
                <div class="title">
                    <button id="enviadas" onClick="loadMensagensEnviadas()">Enviadas</button>
                    <button id="recebidas" onClick="loadMensagens()">Recebidas</button>
                </div> 
                <div class="lista-mensagens" id="mensagens-aqui">
    
                </div>
            </div>
            <div class="right">
                <div class="title" id="remente-mensagem">
                    <h2>nome</h2>
                    <div class="botoes">
                        <button id="enviadas">Responder</button>
                        <button id="recebidas">Encaminhar</button>
                        <button id="recebidas">Apagar</button>
                    </div>
                    
                </div>
                <div id="mensagem-aberta">
                    <div class="dados-mensagem">
                        <h1>Assunto: </h1>
                        <hr/>
                        <p>mensagem... </p>
                    </div>
                </div>
            </div>
        </div>
    `
}


async function loadMensagens(){
    result = await axios.get(`http://localhost:3333/recebidas/${nome}`).then(
        response =>  result = response.data
    );
    
    showResultsRecebidos(result);   
}

async function loadMensagensEnviadas(){
    result = await axios.get(`http://localhost:3333/enviadas/${nome}`).then(
        response =>  result = response.data
    );
    
    showResultsEnviados(result);   
}


function showResultsRecebidos (resultado) {

    let i = 0;

    document.getElementById('mensagens-aqui').innerHTML = ``;
    
    
    for(i = 0; i< resultado.length; i++){
        console.log(resultado[i].assunto);
        console.log(resultado[i].corpo);


        let div = document.createElement("div");
        div.setAttribute("class","mensagem");
        div.setAttribute("onClick",`exibirMensagemUnica(${resultado[i].id})`);
        
        let h2 = document.createElement("h2");
        h2.innerText = resultado[i].remetente;

        let span = document.createElement("span");
        span.innerText = resultado[i].assunto;

        div.appendChild(h2);
        div.appendChild(span);

        document.getElementById('mensagens-aqui').appendChild(div);
        
        
    }
}


function exibirMensagemUnica(id){
    document.getElementById('mensagem-aberta').innerHTML = ``;

    result.forEach( x => {
        if(x.id == id){

            document.getElementById('remente-mensagem').innerHTML = `
                <h2>de: ${x.remetente}</h2>
                <h2>para: ${x.destinatario}</h2>
                <div class="botoes">
                    <button id="Responder" onClick="criarRespodeMensagem(${id})">Responder</button>
                    <button id="Encaminhar" onClick="criarEncaminhaMensagem(${id})">Encaminhar</button>
                    <button id="Apagar" onClick="deletarMensagem(${id})">Apagar</button>
                </div>
            `;


            let div = document.createElement("div");
            div.setAttribute("class","dados-mensagem");

            let h1 = document.createElement("h1");
            h1.innerText = "assunto: " + x.assunto;

            let hr = document.createElement("hr");

            let p = document.createElement("p");
            p.innerText = x.corpo;

            div.appendChild(h1);
            div.appendChild(hr);
            div.appendChild(p);

            document.getElementById('mensagem-aberta').appendChild(div);
        }

    })
}

function showResultsEnviados (resultado) {

    let i = 0;

    document.getElementById('mensagens-aqui').innerHTML = ``;
    
    
    for(i = 0; i< resultado.length; i++){
        console.log(resultado[i].assunto);
        console.log(resultado[i].corpo);


        let div = document.createElement("div");
        div.setAttribute("class","mensagem");
        div.setAttribute("onClick",`exibirMensagemUnicaEnviados(${resultado[i].id})`);
        
        let h2 = document.createElement("h2");
        h2.innerText = resultado[i].remetente;

        let span = document.createElement("span");
        span.innerText = resultado[i].assunto;

        div.appendChild(h2);
        div.appendChild(span);

        document.getElementById('mensagens-aqui').appendChild(div);
        
        
    }
}

function exibirMensagemUnicaEnviados(id){
    document.getElementById('mensagem-aberta').innerHTML = ``;

    result.forEach( x => {
        if(x.id == id){

            document.getElementById('remente-mensagem').innerHTML = `
                <h2>de: ${x.remetente}</h2>
                <h2>para: ${x.destinatario}</h2>
                <div class="botoes">
                    <button id="Encaminhar" onClick="criarEncaminhaMensagem(${id})">Encaminhar</button>
                    <button id="Apagar" onClick="deletarMensagem(${id})">Apagar</button>
                </div>
            `;


            let div = document.createElement("div");
            div.setAttribute("class","dados-mensagem");

            let h1 = document.createElement("h1");
            h1.innerText = "assunto: " + x.assunto;

            let hr = document.createElement("hr");

            let p = document.createElement("p");
            p.innerText = x.corpo;

            div.appendChild(h1);
            div.appendChild(hr);
            div.appendChild(p);

            document.getElementById('mensagem-aberta').appendChild(div);
        }

    })
}

async function deletarMensagem(id){
    
    var deletar = await axios.delete(`http://localhost:3333/deletar/${id}`).then(
        response =>  result = response.data
    );
    
    
}


function criarMensagem(){

    let div = document.createElement("div");
    div.setAttribute("id","modal-nova-mensagem");

    div.style.display = "flex";

    div.innerHTML = `
        <h1>Nova Mensagem</h1>
        <form id="formulario-1" ">
            <div class="assunto">
                <label>Destinatario:</label>
                <input type="text" id="campo3-f1" placeholder="destinatario"></input>
            </div>
            <div class="assunto">
                <label>Assunto:</label>
                <input type="text" id="campo-f1" placeholder="assunto da mensagem"></input>
            </div>
            <textarea type="text" id="campo2-f1" placeholder="Sua mensagem aqui"></textarea>
            <div class="botoes-f1">
               
            </div>
        </form>
        <div id="bottoes-modal">
            <button 
                id="cancelar-f1"
                onclick="fecharcriarMensagem()"
            >
            Cancelar
            </button>
            <button 
                id="enviar-f1"
                onClick="enviardados()"
            >
                Enviar
            </button>
        </div>
    `;

    document.getElementById("body").appendChild(div);
    

}

function fecharcriarMensagem(){
    var div = document.getElementById("modal-nova-mensagem");
    div.innerHTML = `
    
    `;

    document.getElementById("body").removeChild(div);

}


async function enviardados(){
    result = await axios.get(`http://localhost:3333/mensagens`).then(
        response =>  result = response.data
    );

    var cont = 0;
    result.forEach( x => {
        cont = cont + 1;
    });

    let id =  cont + 1;
    let remetente = nome;
    let destinatario = document.getElementById("campo3-f1").value;
    let assunto = document.getElementById("campo-f1").value;
    let corpo = document.getElementById("campo2-f1").value;

    var mensagem = {
        id,
        remetente,
        destinatario,
        assunto,
        corpo
    }

    axios.post(`http://localhost:3333/enviar/${remetente}/${destinatario}`,{
        "id": id,
	    "remetente": remetente,
	    "destinatario": destinatario,
	    "assunto": assunto,
	    "corpo": corpo
    });

    
    console.log(mensagem);
}


async function criarEncaminhaMensagem(id){

    let div = document.createElement("div");
    div.setAttribute("id","modal-nova-mensagem");

    div.style.display = "flex";

    div.innerHTML = `
        <h1>Encaminhar Mensagem</h1>
        <form id="formulario-1" ">
            <div class="assunto">
                <label>Destinatario:</label>
                <input type="text" id="campo3-f1" placeholder="destinatario"></input>
            </div>
        </form>
        <div id="bottoes-modal">
            <button 
                id="cancelar-f1"
                onclick="fecharcriarMensagem()"
            >
            Cancelar
            </button>
            <button 
                id="enviar-f1"
                onClick="encaminharMensagem(${id})"
            >
                Enviar
            </button>
        </div>
    `;

    document.getElementById("body").appendChild(div);
    
}


async function encaminharMensagem(id){
    result = await axios.get(`http://localhost:3333/mensagens`).then(
        response =>  result = response.data
    );
   
    var cont = 0;
    result.forEach( x => {
        cont = cont + 1;
    });

    let newId =  cont + 1;
    let remetente = nome;
    let destinatario = document.getElementById("campo3-f1").value;
    let assunto = "" ;
    let corpo = "";

    result.forEach( x => {
        if(x.id == id){
            assunto = x.assunto;
            corpo = x.corpo;
        }
    });

    var mensagem = {
        newId,
        remetente,
        destinatario,
        assunto,
        corpo
    }

    axios.post(`http://localhost:3333/enviar/${remetente}/${destinatario}`,{
        "id": newId,
	    "remetente": remetente,
	    "destinatario": destinatario,
	    "assunto": assunto,
	    "corpo": corpo
    });

    
    console.log(mensagem);
}

async function criarRespodeMensagem(id){

    let div = document.createElement("div");
    div.setAttribute("id","modal-nova-mensagem");

    div.style.display = "flex";

    div.innerHTML = `
        <h1>Responder Mensagem</h1>
        <form id="formulario-1" ">
            <textarea type="text" id="campo2-f1" placeholder="Sua mensagem aqui"></textarea>
        </form>
        <div id="bottoes-modal">
            <button 
                id="cancelar-f1"
                onclick="fecharcriarMensagem()"
            >
            Cancelar
            </button>
            <button 
                id="enviar-f1"
                onClick="responderMensagem(${id})"
            >
                Enviar
            </button>
        </div>
    `;

    document.getElementById("body").appendChild(div);
}

async function responderMensagem(id){
    result = await axios.get(`http://localhost:3333/mensagens`).then(
        response =>  result = response.data
    );
   
    var cont = 0;
    result.forEach( x => {
        cont = cont + 1;
    });

    let newId =  cont + 1;
    let remetente = nome;
    let destinatario = "";
    let assunto = "" ;
    let corpo =  document.getElementById("campo2-f1").value;

    result.forEach( x => {
        if(x.id == id){
            destinatario = x.remetente;
            assunto = x.assunto;
        }
    });

    var mensagem = {
        newId,
        remetente,
        destinatario,
        assunto,
        corpo
    }

    axios.post(`http://localhost:3333/enviar/${remetente}/${destinatario}`,{
        "id": newId,
	    "remetente": remetente,
	    "destinatario": destinatario,
	    "assunto": assunto,
	    "corpo": corpo
    });

    
    console.log(mensagem);
}