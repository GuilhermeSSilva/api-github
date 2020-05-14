var buttonBusca = $('#busca');
buttonBusca.click(function(event){
    event.preventDefault();
    limpaSection();
    let usuario = $('#pesquisa').val();
    let verifica = validaClick(usuario);
    if(verifica){
        $('#pesquisa').removeClass('erro ::-webkit-input-placeholder');
        buscaUsuario(usuario)
        .catch(function(reject){
            console.log(`Erro:${reject.status}`);
            let mensagem = criaErro("Usuário não encontrado");
            listaErro(mensagem);
        })
        .then(function(response){
            return response.json();
        })
        .then(json =>{
            criaLista(json);
        });
        
    }else{
        let erro = criaErro("Preencha o campo corretamente!");
        listaErro(erro);
        $('#pesquisa').addClass('erro ::-webkit-input-placeholder').focus();
    }
});

function validaClick(usuario){
    if(usuario==''){
        return false;
    }else{
        return true;
    }
}

function buscaUsuario(usuario){
    return fetch(`https://api.github.com/users/${usuario}`,{
        method:'GET'
    }).then(resolve =>{
        if(resolve.ok){
            return resolve;
        }else{
            return Promise.reject(resolve);
        }
        
    })
}

function criaLista(response){
    let section = $("[data-section]");
    let usuario = response;
    let img = $("<img>").attr("src", usuario.avatar_url).addClass("section__img");
    let nome = $("<p>").text(usuario.login).addClass("section__textos_principais");
    let seguidores = $("<p>").text(`Seguidores:${usuario.followers}`).addClass("section__textos_principais");
    let div = $('<div>').addClass("section__div__header");
    listaUsuario(section,usuario,div,img,nome,seguidores);
}
function listaUsuario(section, usuario, div, img, nome, seguidores){
    let divBio = $('<div>').addClass("section__div__bio");
    let conteudoBio = usuario.bio;
    let divBotoes = $("<div>").addClass("section__div__botoes");
    let botaoRepos = $("<button>").attr("onclick",`listaPortifolio('${usuario.repos_url}')`).text("Repositórios").addClass("section__botoes section__botao__portifolio");
    let botaoStarred = $("<button>").attr("onclick",`listaStarred('https://api.github.com/users/${usuario.login}/starred')`).text("Starred").addClass("section__botoes section__botao__starred");
    div.append(img);
    div.append(nome);
    div.append(seguidores);
    divBio.append(conteudoBio);
    divBotoes.append(botaoRepos);
    divBotoes.append(botaoStarred);
    section.append(div);
    section.append(divBio);
    section.append(divBotoes);
}
function limpaSection(){
    let section = $("[data-section]");
    section.text('');
}

function criaErro(textoMensagem){
    let mensagem = $("<p>").text(textoMensagem).addClass("mensagem__erro");
    return mensagem;
}
function listaErro(mensagem){
    let section = $("[data-section]");
    section.append(mensagem);
}