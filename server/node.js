var http = require('http');
const port = 3333;
const DEFAULT_HEADER = { 'Content-Type': 'application/json'}
const fs = require('fs');
var mensagens = require('./mensagens.json');
var contas = require('./contas.json');
const { parse } = require('querystring');


function getMensagens(route,nome){
    var isCadastrado = false;
    console.log(route, nome);

    contas.forEach( x => { //procura se a conta existe
        if(x.nome == nome){
            isCadastrado = true;
        }
    })

    /*if( isCadastrado == false){
        return "Usuário não cadastrado"; 
    }*/

    if(route == 'mensagens'){//retorna todas as mensagens 
        return mensagens;
    }else if(route == 'enviadas'){//retorna as mensagens enviadas para uma pessoa
        var lista = [];
        mensagens.forEach( x => {
            console.log(x);
            if( x.remetente == nome){
                console.log(x);
                lista.push(x);
            }
        })
        return lista;
    }else if( route == 'recebidas'){ //retorna as mensagens recebidas por uma pessoa
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
        return "Nada encontrado"; //caso informe uma rota inválida
    }

}

function AdicionarNosArquivos(body){
    mensagens.push(body);
    fs.writeFile('./mensagens.json',JSON.stringify(mensagens,null,2), ()=>{}); //função que adiciona o body recebido na request no arquivo mensagens.json
}

async function collectRequestData(request, response,remetente,destinatario, cont) {

    let body = '';

    var contString = cont.toString();
    
    request.on('data', chunk => { //recebendo o corpo da função
        body += chunk;
    });
    request.on('end', () => { 
        AdicionarNosArquivos(JSON.parse(body)); //adicionando os valores recebidos no arquivo JSON
        response.end(body); 
    });

}


function postMensagens(req,res,route,remetente,destinatario){

    var cont = 0;
    mensagens.forEach( x => {
        cont = cont + 1;
    });

    var destinatarioExist = false; 
    contas.forEach( x => {
        if(x.nome == destinatario){
            destinatarioExist = true;
        }
    }) //checando se o destinatário existe

    if( destinatarioExist){
        collectRequestData(req, res, remetente, destinatario, cont+1); //chamando a função de coleta do body
    }else{
        res.end("destinaratio ou remetente nao existe"); 
    }

}

function deleteMensagens(route,id, response){
    var cont = 0;
    var indice = 0;

    mensagens = mensagens.filter((x)=>{ //retorna pra lista de mensagens todas as mensagens menos as com o id que deseja deletar
        return x.id != id
    }) 

    console.log(mensagens);
    fs.writeFile('./mensagens.json',JSON.stringify(mensagens,null,2), ()=>{}); //salvando as mensagens no arquivo JSON 
    response.end("deletado");
}

const handler  = (request, response) =>{

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', '*');

    const {url, method} = request ;
    console.log({
        url, method
    });
    const [first, route, remetente, destinatario] = url.split('/');
    /*console.log("route:", route);
    console.log("nome:", nome);
    request.queryString = {nome}

    console.log(request.queryString);
    */

    response.writeHead(200, DEFAULT_HEADER);
    

    if(method == 'GET'){
        var result = getMensagens(route,remetente);
        if (result == "Nada encontrado"){
            response.writeHead(400, DEFAULT_HEADER);
        }

        var resposta = JSON.stringify(result);
        response.end(resposta);

    }else if (method == 'POST'){
        postMensagens(request,response,route,remetente,destinatario);
    }else if (method == 'DELETE'){
        deleteMensagens(route,remetente, response);
    }else{
        response.end(" nenhuma solicitacao");
    }
}

http.createServer(handler)
    .listen(port, ()=> console.log('server running at', port))
