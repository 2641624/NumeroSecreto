// let titulo = document.querySelector('h1')
// titulo.innerHTML = "Jogo do número secreto"

// let paragrafo = document.querySelector('p')
// paragrafo.innerHTML = "Escolha um numero entre 1 e 10"
let listaSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirMsgInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número de 1 a 10');
}

exibirMsgInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        console.log("Web Speech API OK neste navegador.");
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa',
            mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparChute();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let tamanhoLista = listaSorteados.length;

    if(tamanhoLista == numeroLimite){
        listaSorteados = [];
    }

    if(listaSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaSorteados.push(numeroEscolhido);
        console.log(listaSorteados);
        return numeroEscolhido;
    }
}

function limparChute(){
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    exibirMsgInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparChute();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);

}