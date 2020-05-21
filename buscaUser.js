const buttonBusca = $('#busca');

buttonBusca.click(function(event){
    event.preventDefault();
    limpaSection();
    const usuario = $('#pesquisa').val();
    const verifica = validaClick(usuario);
    if(verifica){
        $('#pesquisa').removeClass('p-3 mb-2 bg-danger text-white');
        buscaUsuario(usuario)
        .then(function(response){
            return response.json();
        })
        .then(json =>{
            criaLista(json);
        })
        .catch(function(reject){
            console.log(`Erro:${reject.status}`);
            criaErro("Usuário não encontrado");
        });
        
    } else {
        criaErro("Preencha o campo corretamente!");
        $('#pesquisa').addClass('p-3 mb-2 bg-danger text-white').focus();
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