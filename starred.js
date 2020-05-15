function listaStarred(url){
  	const section = $("[data-section]");
  	limpaDiv($(".portifolio"));
    limpaDiv($(".starred"));
    const div = $("<div>").addClass("starred");
    const titulo = $("<h2>").text("Starred:").addClass("section__table__titulo");
    const table = $("<table>").addClass("section__table");

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
        } else {
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

    div.append(titulo);
    div.append(table);
    section.append(div);
}