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