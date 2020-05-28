const buttonBusca = $('#busca');

buttonBusca.click(function(event){
    event.preventDefault();
    limpaSection();
    const usuario = $('#pesquisa').val();
    const verifica = validaClick(usuario);
    if(verifica){
        $('#pesquisa').removeClass('p-3 mb-2 bg-danger text-white');
        buscaUsuario(usuario)
        .then(json=>{
            const teste=sessionStorage.getItem(json.login.toLowerCase());
            if(teste==null){
                salvandoSessionStorage(json);
            }
            criaLista(json);
        })
        .catch(function(reject){
            buscaPortifolio(`https://api.github.com/search/repositories?q=${usuario}`,"Repositórios","false");
        });
        
    } else {
        criaErro("Preencha o campo corretamente!");
        $('#pesquisa').addClass('bg-danger text-white').focus();
    }
});

function buscaUsuario(usuario){
    const user=JSON.parse(sessionStorage.getItem(usuario.toLowerCase()));
    if(user!=null){
        if(user.login.toLowerCase()==usuario.toLowerCase()){
            return new Promise((resolve,reject) =>{
                resolve(user);
                if(user==null){
                    reject(usuario);
                }
            });
        } else {
            return fetch(`https://api.github.com/users/${usuario}`,{
            method:'GET'
            }).then(resolve =>{
                if(resolve.ok){
                    return resolve.json();
                } else {
                    return Promise.reject(resolve);
                }                 
            })
        }
    } else {
        return fetch(`https://api.github.com/users/${usuario}`,{
                method:'GET'
            }).then(resolve =>{
                if(resolve.ok){
                    return resolve.json();
                } else {
                    return Promise.reject(resolve);
                }                 
            })
    }
}