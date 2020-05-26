function carregaitens(){
    fetch("http://localhost:8080/software/")
      .then(res => res.json())
      .then(res => preencheCheckbox(res))
    
    data = new Date();
    console.log(data);
    document.getElementById('txtData').value = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();
}


function preencheCheckbox(res){

    var templateCh = '<input type="checkbox" name="softwares[]" value="{{ID}}"> {{NOME}} <br/>';

    var txtSoftwares = "";
    for (i=0; i<res.length; i++){

        txtSoftwares = txtSoftwares + templateCh.replace("{{ID}}",res[i].id)
                                                .replace("{{NOME}}", res[i].nome);
    }
    document.getElementById("listaSw").innerHTML = txtSoftwares;
}


function enviarPedido(){
    var txtData = document.getElementById("txtData").value;
    var txtObs  = document.getElementById("txtObs").value;
    
    var userStr = localStorage.getItem("vmuser");
    var user = JSON.parse(userStr);

    var msgSolicitacao = {
        data : txtData,
        observacoes : txtObs,
        solicitante: {
            id: user.id
        },
        itensSolicitacao:[]
    }

    var listaSw = document.getElementsByName("softwares[]");
    var cont=0;
    for (i=0; i<listaSw.length; i++){
        if (listaSw[i].checked){
            var idSoftware = parseInt(listaSw[i].value);
            var itemSoftware = {
               software : { id: idSoftware }
            }
            msgSolicitacao.itensSolicitacao[cont] = itemSoftware;
            cont++;
        }
    }

    var cabecalho = {
        method : 'POST',
        body : JSON.stringify(msgSolicitacao),
        headers : {
            'Content-Type': 'application/json'
        }
    }

    fetch("http://localhost:8080/solicitacao/nova",cabecalho)
      .then(res => alert("foi!!!"))
      .catch(err => alert("deu ruim"));

    console.log(msgSolicitacao);
    window.location = "perfil.html";
}
function cancelar(){
    window.location = "perfil.html";
}