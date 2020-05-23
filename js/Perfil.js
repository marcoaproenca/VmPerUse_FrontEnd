var templateFoto    = '<img src="imagens/{{IMAGEMFOTO}}" width="25%" align = "right">';
var templateBio     = '<h3> {{NOME}} </h3> <hr> <p> RACF: {{RACF}}</p> '+
                                                ' <p> SETOR: {{SETOR}}</p>'+
                                                ' <p> CARGO: {{TELEFONE}}</p>' ;
var templatePedidos = '<div class="row">'+ 
                          '<div class="col-12"> <a href="detalhe.html?id={{NUM}}">{{DATA}} - {{OBSERVACOES}} </a></div>'+
                      '</div>';



function carregaperfil(){
    // qual a lógica disso?
    // primeiro: se o usuário tá logado, as infos dele estão no LocalStorage, certo?
    // e se não tiver? --> mando pro index
    // se estiver, eu só preencho as coisas (o que é bem legal!!!)

    var userSTR = localStorage.getItem("vmuser");
    console.log(userSTR);

    if (!userSTR){ 
       window.location= "index.html";  // se não existir info do usuario, ele não tá logado, logo mando pro index
    }
    usuario = JSON.parse(userSTR);

    document.getElementById("foto").innerHTML = templateFoto.replace("{{IMAGEMFOTO}}", usuario.linkfoto);
    document.getElementById("personal").innerHTML = templateBio.replace("{{NOME}}",usuario.nome)
                                                               .replace("{{RACF}}",usuario.racf)
                                                               .replace("{{SETOR}}",usuario.departamento)
                                                               .replace("{{TELEFONE}}",usuario.cargo);


    var todosPedidos="";
    for (i=0; i<usuario.pedidos.length; i++){
        todosPedidos = todosPedidos+templatePedidos.replace("{{DATA}}",usuario.pedidos[i].data)
                                                   .replace("{{OBSERVACOES}}",usuario.pedidos[i].observacoes)
                                                   .replace("{{NUM}}",usuario.pedidos[i].numSolicitacao);
    }
   
    document.getElementById("pedidos").innerHTML = todosPedidos;
}

function logout(){
    localStorage.removeItem("vmuser");
    window.location = "index.html";
}
$(document).ready(function () {
  $('#dtBasicExample').DataTable({
      "oLanguage": {
          "sLengthMenu": "Mostrar _MENU_ registros por página",
          "sZeroRecords": "Nenhum registro encontrado",
          "sEmptyRecords": "Não há dados para serem mostrados",
          "sLoadingRecords": "Carregando...",
          "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros",
          "sInfoEmpty": "Mostrando 0 a 0 de 0 registros",
          "sInfoFiltered": "(filtro aplicado em _MAX_ registros)",
          "sInfoPostFix": "",
          "sInfoThousands": ".",
          "sSearch": "Pesquisar:",
          "sUrl": "",
              "oPaginate": {
                  "sFirst":    "Primeira",
                  "sPrevious": "Anterior",
                  "sNext":     "Próxima",
                  "sLast":     "Última",
              },
      },
      "pageLength": 5,
      "sScrollX": "100%",
      "sScrollXInner": "100%",
      "aaSorting": [[0, "desc"]],
      "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "Todos"]]
  });
  $('.dataTables_length').addClass('bs-select');
});