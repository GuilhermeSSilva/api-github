function salvandoLocalStorage(user){
    const usuario = {
        img:user.avatar_url,
        nome:user.login,
        seguidores:user.followers,
        bio:user.bio
    }
    const usuarioLS=JSON.stringify(usuario)
    localStorage.setItem("usuario",usuarioLS);
    console.log(JSON.parse(localStorage.getItem("usuario")));
}