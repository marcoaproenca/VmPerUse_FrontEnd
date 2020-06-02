function carregaitens(){
    var userSTR = localStorage.getItem("vmuser");

    if (!userSTR){ 
       window.location= "index.html"; 
    }
    fetch("http://localhost:8080/componente/")
      .then(res => res.json())
      .then(res => preencheCheckbox(res))
        
    document.getElementById('txtData').value = formataData(new Date());
}

function preencheCheckbox(res){
    localStorage.setItem("vmitens", JSON.stringify(res));
    var templateCh = '<input type="checkbox" name="softwares[]" value="{{ID}}"> {{NOME}} <br/>';

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
    var txtData  = document.getElementById('txtData').value;
    console.log(txtData);
    var txtObs   = document.getElementById("txtObs").value;
    var vlrTotal = document.getElementById("total").value.toString().replace(",", ".");
    
    var userStr = localStorage.getItem("vmuser");
    var user = JSON.parse(userStr);
    var msgSolicitacao = {
        data : txtData,
        observacoes : txtObs,
        valor : vlrTotal,
        status : "Novo",
        solicitante: {
            id: user.id
        },
        itensSolicitacao:[]
    }
    var itensStr = localStorage.getItem("vmitens");
    var itens    = JSON.parse(itensStr);
    var cont=0;
    var idHardware = -1;
    
    for (i=0; i<itens.length; i++){
        switch(itens[i].nome){
            case 'Processador':
                idHardware = parseInt(itens[i].id);

                break;
            case 'Memoria':
                idHardware = parseInt(itens[i].id);
                break;
            case 'Armazenamento':
                idHardware = parseInt(itens[i].id);
                break;
            case 'Rede':
                idHardware = parseInt(itens[i].id);
                break;
            default:
                idHardware = -1;
        }
        if(idHardware > 0){
            var itemHardware = {
                    componente : { id: idHardware},
                    quantidade: document.getElementById(itens[i].nome).value
                }
            msgSolicitacao.itensSolicitacao[cont] = itemHardware;
            cont++;
        }
    }
    var listaSw = document.getElementsByName("softwares[]");
    
    for (i=0; i<listaSw.length; i++){
        if (listaSw[i].checked){
            var idSoftware = parseInt(listaSw[i].value);
            var itemSoftware = {
               componente : { id: idSoftware},
               quantidade: 1
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

function calculaCusto(){
    var itensStr = localStorage.getItem("vmitens");
    var itens    = JSON.parse(itensStr);
    var qcpu = document.getElementById("Processador").value;
    var qmem = document.getElementById("Memoria").value;
    var qarm = document.getElementById("Armazenamento").value;
    var qrde = document.getElementById("Rede").value;
    var listaSw = document.getElementsByName("softwares[]");
    var custo = 0
    for (i=0; i<itens.length; i++){
        switch(itens[i].nome){
            case 'Processador':
                custo = custo + itens[i].custo * qcpu;
                break;
            case 'Memoria':
                custo = custo + itens[i].custo * qmem;
                break;
            case 'Armazenamento':
                custo = custo + itens[i].custo * qarm;
                break;
            case 'Rede':
                custo = custo + itens[i].custo * qrde;
                break;
        }
    }
    for (i=0; i<listaSw.length; i++){
        if (listaSw[i].checked){
            for (j=0; j<itens.length; j++){
                if(listaSw[i].value == itens[j].id){
                    custo = custo + itens[j].custo;
                    break;
                }
            }
        }
    }
    document.getElementById("total").innerHTML = custo.toLocaleString('pt-br', {minimumFractionDigits: 2});
}
function GravaSolicitacaoOk(res){
    alert("Solicitação gravada com sucesso.");
    console.log(res);    
    window.location = "perfil.html";
}
function GravaSolicitacaoErro(err){
    alert("Não foi possível enviar sua solicitação, tente novamente.");
    console.log(err);
}
function formataData(data){
    let day, month, year;
    day = String(data.getDate());
    month = String(data.getMonth()+1);
    year =String(data.getFullYear());
    if(day.length != 2){
        day = "0" + day;
    }
    if(month.length != 2){
        month = "0" + month;
    }
    return day + "/" + month + "/" + year;
}

function cancelar(){
    window.location = "perfil.html";
}