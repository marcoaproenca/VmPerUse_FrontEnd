function autenticar(){
    var user  = document.getElementById("textUser").value;
    var senha = document.getElementById("textSenha").value;
    var flagEmail = user.indexOf("@");
    
    if (flagEmail == -1){
        var jsonBody = {
            racf : user,
            senha : senha
        }
    }
    else{
        var jsonBody = {
            email : user,
            senha : senha
        }
    }

    var jsonHeader = {
        method : 'POST',
        body : JSON.stringify(jsonBody),
        headers : {
            'Content-Type': 'application/json'
        }
    }
    fetch("http://localhost:8080/usuario/login",jsonHeader)
        .then(res => res.json())
        .then(res => logar(res))
        .catch(err => trataErro(err))
}

    function logar(res){
        localStorage.setItem("vmuser", JSON.stringify(res));
        window.location = "perfil.html";
    }
    function trataErro(err){
        console.log(err);
        document.getElementById("msgErroLogin").style = "visibility:visible";
    }
    function limpaErro(){;
        document.getElementById("msgErroLogin").style = "visibility:hidden";
    }