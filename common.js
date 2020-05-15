function limpaSection(){
    let section = $("[data-section]");
    section.text('');
}

function criaErro(textoMensagem){
    let mensagem = $("<p>").text(textoMensagem).addClass("mensagem__erro");
    let section = $("[data-section]");
    section.append(mensagem);
}

function limpaDiv(div){
    div.remove();    
}

function semResultado(section, div){
    let mensagem = $("<p>").text("Nenhum resultado encontrado").addClass("mensagem__naoEncontrado");
    div.append(mensagem);
    section.append(div);
}
