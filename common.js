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
    return;
}

function listaPortifolio(url,nome){
    const section = $("[data-section]");
    limpaDiv($(".repositorio"));
    const div = $("<div>").addClass("repositorio");
    const titulo = $("<h2>").text(`${nome}:`).addClass("section__table__titulo");
    const table = $("<table>").addClass("section__table");
    buscaPortifolio(url, table, titulo, div, section);
}

function buscaPortifolio(url,table, titulo, div, section){
    div.append(titulo);
    section.append(div);
    adicionaLoad(section,div);
    fetch(url)
    .then(resolve =>{
            return resolve.json();
        })

    .catch(resolve =>{
        if(resolve.ok){
            return resolve.json();
        } else {
            return new Promise.reject("Erro de conexão");
        }
    })

    .then(json =>{
        if(json.length==0){
            semResultado(section, div);
            removeLoad();
        } else {
            removeLoad();
            json.forEach(element => {
                const linkGit = element.git_url.substr(6);
                const linkFuncional = `https://www.${linkGit}`;
                const link = $("<a>").attr("href",`${linkFuncional}`).attr("target","_blank").text(`${element.full_name}`);
                const tr = $("<tr>");
                const td = $("<td>");
                td.append(link);
                tr.append(td);
                table.append(tr);
            });
        }
    })
        div.append(table);
        section.append(div);
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

function validaClick(usuario){
    if(usuario==''){
        return false;
    } else {
        return true;
    }
}

function adicionaLoad(section,div){
    const loadingIMG=$("<img>").attr("src","200.gif").addClass("load");
    div.append(loadingIMG);
    section.append(div);
}

function removeLoad(){
    $(".load").remove();
}