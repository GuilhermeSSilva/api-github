async function salvandoLocalStorage(user){
    let repositorio;
    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(resolve=>{
        return resolve.json();
    })
    .then(json=>{
        repositorio=json;
    });
    let starred;
    await fetch(`https://api.github.com/users/${user.login}/starred`)
    .then(resolve =>{
        return resolve.json();
    })
    .then(json=>{
        starred=json;
        const usuario = {
            img:user.avatar_url,
            nome:user.login,
            seguidores:user.followers,
            bio:user.bio,
            repositorio:repositorio,
            starred:starred
        }
        const usuarioLS=JSON.stringify(usuario);
        localStorage.setItem("usuario",usuarioLS);
        return usuarioLS;

    })
}

async function buscandoLocalStorage(user){
    const usuario =await localStorage.getItem("usuario",user);
    console.log(usuario);
    return usuario;
}