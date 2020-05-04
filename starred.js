function listaStarred(url){
    var section=$("[data-section]");
    limpaDiv($(".portifolio"));
    limpaDiv($(".starred"));
    var div=$("<div>").addClass("starred");
    var titulo=$("<h2>").text("Starred:").addClass("section__table__titulo");
    var table=$("<table>").addClass("section__table");
        fetch(url)
        .then(resolve =>{
            return resolve.json();
        })
        .catch(resolve =>{
            if(resolve.ok){
                return resolve.json();
            }else{
                return new Promise.reject("Erro de conexão");
            }
        })
        .then(json =>{
            if(json.length==0){
                semResultado(section,div);
            }else{
                json.forEach(element => {
                    let linkGit=element.git_url.substr(6);
                    let linkFuncional=`http://www.${linkGit}`;
                    let link=$("<a>").attr("href",`${linkFuncional}`).attr("target","_blank").text(`${element.full_name}`);
                    let tr=$("<tr>");
                    let td=$("<td>");
                    td.append(link);
                    tr.append(td);
                    table.append(tr);
                });
            }
        })
        div.append(titulo);
        div.append(table);
        section.append(div);
        }

function limpaDiv(div){
   div.remove();    
}
function semResultado(section,div){
    let mensagem = $("<p>").text("Nenhum resultado encontrado").addClass("mensagem__naoEncontrado");
    div.append(mensagem);
    section.append(div);
}