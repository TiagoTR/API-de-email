var nome = ""; 
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


function noShowLogin (nome) {

    document.getElementById("body").innerHTML = `
        <header id="header-projeto">
            <img src="./images/icons/logo.svg" alt="icon"/>
            <h2>${nome}</h2>
        </header>

        <div id="mensagens">
            <div class="left">
                <div class="title">
                    <button id="enviadas">Enviadas</button>
                    <button id="recebidas">Recebidas</button>
                </div> 
                <div class="lista-mensagens">
                    <div class="mensagem">
                        <h2>nome</h2>
                        <span>bora la?</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="title">
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
                        <p>Bora la mano </p>
                    </div>
                </div>
            </div>
        </div>
    `
}