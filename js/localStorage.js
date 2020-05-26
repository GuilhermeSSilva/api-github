async function salvandoLocalStorage(user){
    let repositorio;
    await fetch(`https://api.github.com/users/${user.login}/repos`)
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
            avatar_url:user.avatar_url,
            login:user.login,
            followers:user.followers,
            bio:user.bio,
            repositorio:repositorio,
            starred:starred
        };
        const usuarioLS=JSON.stringify(usuario);
        localStorage.setItem(usuario.login.toLowerCase(),usuarioLS);
    })
}

window.onbeforeunload=function(){
    localStorage.clear();
};