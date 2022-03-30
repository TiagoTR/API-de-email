var http = require('http');
const port = 3333;
const DEFAULT_HEADER = { 'Content-Type': 'application/json'}
const fs = require('fs');
var mensagens = require('./mensagens.json');
var contas = require('./contas.json');


function getMensagens(route,nome){
    console.log(route, nome);

    if(route == 'mensagens'){
        return mensagens;
    }else if(route == 'enviadas'){
        var lista = [];
        mensagens.forEach( x => {
            console.log(x);
            if( x.remetente == nome){
                console.log(x);
                lista.push(x);
            }
        })
        return lista;
    }else if( route == 'recebidas'){
        var lista = [];
        mensagens.forEach( x => {
            console.log(x);
            if( x.destinatario == nome){
                console.log(x);
                lista.push(x);
            }
        })
        return lista;
    }else{
        return "nada foi encontrado";
    }
    
    
    
}

const handler  = (request, response) =>{
    const {url, method} = request ;
    console.log({
        url, method
    });
    const [first, route, nome] = url.split('/');
    /*console.log("route:", route);
    console.log("nome:", nome);
    request.queryString = {nome}

    console.log(request.queryString);
    */

    response.writeHead(200, DEFAULT_HEADER);

    if(method == 'GET'){
        var result = getMensagens(route,nome);
        var resposta = JSON.stringify(result);
        response.end(resposta);
    }else if (method == 'POST'){
        
    }else{
        response.end(" nenhuma solicitacao");
    }
}

http.createServer(handler)
    .listen(port, ()=> console.log('server running at', port))
