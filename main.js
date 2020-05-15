const buttonBusca = $('#busca');

buttonBusca.click(function(event){
    event.preventDefault();
    limpaSection();
    const usuario = $('#pesquisa').val();
    const verifica = validaClick(usuario);
    if(verifica){
        $('#pesquisa').removeClass('erro ::-webkit-input-placeholder');
        buscaUsuario(usuario)
        .catch(function(reject){
            console.log(`Erro:${reject.status}`);
            criaErro("Usuário não encontrado");
        })
        .then(function(response){
            return response.json();
        })
        .then(json =>{
            criaLista(json);
        });
        
    } else {
        criaErro("Preencha o campo corretamente!");
        $('#pesquisa').addClass('erro ::-webkit-input-placeholder').focus();
    }
});

function validaClick(usuario){
    if(usuario==''){
        return false;
    } else {
        return true;
    }
}

function buscaUsuario(usuario){
    return fetch(`https://api.github.com/users/${usuario}`,{
        method:'GET'
    }).then(resolve =>{
        if(resolve.ok){
            return resolve;
        } else {
            return Promise.reject(resolve);
        }
        
    })
}

function criaLista(response){
    const section = $("[data-section]");
    const usuario = response;
    const img = $("<img>").attr("src", usuario.avatar_url).addClass("section__img");
    const nome = $("<p>").text(usuario.login).addClass("section__textos_principais");
    const seguidores = $("<p>").text(`Seguidores:${usuario.followers}`).addClass("section__textos_principais");
    const div = $('<div>').addClass("section__div__header");
    listaUsuario(section,usuario,div,img,nome,seguidores);
}

function listaUsuario(section, usuario, div, img, nome, seguidores){
    const divBio = $('<div>').addClass("section__div__bio");
    const conteudoBio = usuario.bio;
    const divBotoes = $("<div>").addClass("section__div__botoes");
    const botaoRepos = $("<button>").attr("onclick",`listaPortifolio('${usuario.repos_url}','Repositórios')`).text("Repositórios").addClass("section__botoes section__botao__portifolio");
    const botaoStarred = $("<button>").attr("onclick",`listaPortifolio('https://api.github.com/users/${usuario.login}/starred','Starred')`).text("Starred").addClass("section__botoes section__botao__starred");
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
