var http = require('http');
const port = 3333;
const fs = require('fs');
var mensagens = require('./mensagens.json');
var contas = require('./contas.json');
const { parse } = require('querystring');
const url = require('url');

function getMensagens(req_url){
    console.log(req_url);
    
    var lista = [];
    mensagens.forEach( x => {
        console.log(x);
        if("/"+ x.destinatario == req_url){
            console.log(x);
            lista.push(x);
        }
    })
    
    return lista;
}

function postMensangens(req_url){
    
}


const server = http.createServer((req, res) => {
    
    var categoria = req.url;

    
    if(req.method == 'GET'){
        var result = getMensagens(req.url);
        var resposta = JSON.stringify(result);
        res.end(resposta);
    }else if (req.method == 'POST'){
        postMensangens(req.url,);
    }else{
        res.end(req.vody + " " +req.url + " nenhuma solicitacao");
    }

});

server.listen(port, ()=>{
    console.log("servidor rodando");
    console.log("porta 3333");
    console.log("Clique no index.html para executar o front");
})