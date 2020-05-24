function limpaSection(){
    let section = $("[data-section]");
    section.text('');
}

function validaClick(usuario){
    if(usuario==''){
        return false;
    } else {
        return true;
    }
}

function criaLista(response){
    salvandoLocalStorage(response);
    const section = $("[data-section]");
    const usuario = response;
    const img = $("<img>").attr("src", usuario.avatar_url).attr("style","width:200px;").addClass("img-thumbnail").attr("alt","Imagem do usuário pesquisado");
    const nome = $("<u>").text(usuario.login).addClass("font-weight-bold align-middle");
    const seguidores = $("<u>").text(`Seguidores:${usuario.followers}`).addClass("font-weight-bold");
    const div = $('<div>').addClass("mx-auto d-flex justify-content-center justify-content-sm-around flex-wrap");
    listaUsuario(section,usuario,div,img,nome,seguidores);
}

function listaUsuario(section, usuario, div, img, nome, seguidores){
    const divBio = $('<div>').addClass("text-center");
    const conteudoBio = usuario.bio;
    const divBotoes = $("<div>").addClass("text-center");
    const botaoRepos = $("<button>").attr("onclick",`buscaPortifolio('${usuario.repos_url}','Repositórios')`).text("Repositórios").addClass("btn btn-outline-primary");
    const botaoStarred = $("<button>").attr("onclick",`buscaPortifolio('https://api.github.com/users/${usuario.login}/starred','Starred')`).text("Starred").addClass("btn btn-outline-success");
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

function listaPortifolio(tbody,nome){
    const section = $("[data-section]");
    limpaDiv($(".repositorio"));
    const div = $("<div>").addClass("repositorio");
    const label= $("<label>").attr("for","filtraRepositorio").text("Filtrar Repositório:");
    const inputText= $("<input>").attr("id","filtraRepositorio").attr("type","text").attr("onfocus","filtrarRepositorio()");
    const table = $("<table>").addClass("table table-striped table-dark");
    const titulo = $("<h2>").text(`${nome}:`);
    div.append(titulo);
    div.append(label);
    div.append(inputText);
    section.append(div);
    table.append(tbody);
    div.append(table);
    removeLoad();
    section.append(div);
}

function buscaPortifolio(url,nome){
    adicionaLoad();
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
        if(json.items!=undefined){
            json=json.items;
        }
        if(json.length==0){
            semResultado();
        } else {
            const tbody=$("<tbody>");
            let i=1;
            json.forEach(element => {
                const linkGit = element.git_url.substr(6);
                const linkFuncional = `https://www.${linkGit}`;
                const tr = $("<tr>");
                const th=$("<th>").text(i).attr("scope","row");
                const td = $("<td>")
                const link = $("<a>").attr("href",`${linkFuncional}`).attr("target","_blank").text(`${element.full_name}`).addClass("nome");
                td.append(link);
                tr.append(th);
                tr.append(td);
                tbody.append(tr);
                i++;
            });
            removeLoad();
            listaPortifolio(tbody,nome);
        }
    })
}

function criaErro(textoMensagem){
    const mensagem = $("<p>").text(textoMensagem).addClass("text-center text-danger font-weight-bold");
    const section = $("[data-section]");
    section.append(mensagem);
}

function semResultado(){
    const section = $("[data-section]");
    removeLoad();
    limpaDiv($(".repositorio"));
    const div=$("<div>").addClass("repositorio");
    const mensagem = $("<p>").text("Erro 404 Nenhum resultado encontrado").addClass("text-danger font-weight-bold");
    div.append(mensagem);
    section.append(div);
    return;
}

function limpaDiv(div){
    div.remove();    
}

function adicionaLoad(){
    const section = $("[data-section]");
    limpaDiv($(".repositorio"));
    const div = $("<div>").addClass("repositorio");
    const loadingIMG=$("<img>").attr("src","../src/img/200.gif").addClass("load");
    div.append(loadingIMG);
    section.append(div);
}

function removeLoad(){
    $(".load").remove();
}