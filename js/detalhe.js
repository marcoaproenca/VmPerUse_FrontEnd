function recuperaDetalhe(){
    var parametro = window.location.search;
    console.log(parametro);

    var id = parametro.substr(4);

    console.log("Numero da solicitacao = "+id);

    fetch("http://localhost:8080/solicitacao/"+id)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err=> alert("pedido nao encontrado"));
}