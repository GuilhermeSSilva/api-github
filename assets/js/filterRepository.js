function filtrarRepositorio(){
    const input = $("#filtraRepositorio");
    input.on("input",function(){
        const tr=$("tr");
        let conteudo= input.val();
        for(let i=0; i<tr.length; i++){
            let linhas=tr[i];
            let linha=linhas.querySelector(".nome");
            let nomeTd=linha.innerText;
            let expressao=new RegExp(this.value, "i");
            linhas.classList.add("invisivel");
            if(expressao.test(nomeTd)){
                linhas.classList.remove("invisivel");
            }
        }
    });
}
