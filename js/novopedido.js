function carregaitens(){
    fetch("http://localhost:8080/componente/")
      .then(res => res.json())
      .then(res => preencheCheckbox(res))
    
    
    data = new Date();
    document.getElementById('txtData').value = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();
}


function preencheCheckbox(res){
    localStorage.setItem("vmitens", JSON.stringify(res));
    var templateCh = '<input type="checkbox" name="softwares[]" onchange="calculaCusto(this.name, this.value);" value="{{ID}}"> {{NOME}} <br/>';

    var txtSoftwares = "";
    for (i=0; i<res.length; i++){
        if(res[i].tipo != 'hardware'){
            txtSoftwares = txtSoftwares + templateCh.replace("{{ID}}",res[i].id)
                                                    .replace("{{NOME}}", res[i].nome);
        }
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
               componente : { id: idSoftware }
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
      .then(res => GravaSolicitacaoOk(res))
      .catch(err => GravaSolicitacaoErro(err));
}
function calculaCusto(elemento_id, elemento_type){
   
    console.log("alterei alguma coisa na pagina..." + elemento_id + elemento_type);

    for (i=0; i<listaSw.length; i++){
        if (listaSw[i].checked){
            
        }
    }

}
function GravaSolicitacaoOk(res){
    alert("Solicitação gravada com sucesso.");
    console.log(res);    
    window.location = "perfil.html";
}
function GravaSolicitacaoErro(err){
    alert("deu ruim");
    console.log(err);
}
function cancelar(){
    window.location = "perfil.html";
}