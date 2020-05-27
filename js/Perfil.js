var templateFoto    = '<img src="imagens/{{IMAGEMFOTO}}" width="200px" align = "right">';
var templateBio     = '<h3> {{NOME}} </h3> <hr>   <p><strong> RACF:      </strong>{{RACF}}</p> '+
                                                ' <p><strong> FUNCIONAL: </strong>{{FUNCIONAL}}</p>'+
                                                ' <p><strong> CARGO:     </strong>{{CARGO}}</p>'+
                                                ' <p><strong> SETOR:     </strong>{{SETOR}}</p>'+
                                                ' <p><strong> TELEFONE:  </strong>{{TELEFONE}}</p>'+
                                                ' <p><strong> EMAIL:     </strong>{{EMAIL}}</p>';
function carregaperfil(){
    var userSTR = localStorage.getItem("vmuser");

    if (!userSTR){ 
       window.location= "index.html"; 
    }
    usuario = JSON.parse(userSTR);
    pedidos = usuario.pedidos;

    document.getElementById("foto").innerHTML = templateFoto.replace("{{IMAGEMFOTO}}", usuario.linkfoto);
    document.getElementById("personal").innerHTML = templateBio.replace("{{NOME}}",usuario.nome)
                                                               .replace("{{RACF}}",usuario.racf)
                                                               .replace("{{FUNCIONAL}}",usuario.funcional)
                                                               .replace("{{CARGO}}",usuario.cargo)
                                                               .replace("{{SETOR}}",usuario.departamento)
                                                               .replace("{{TELEFONE}}",usuario.telefone)
                                                               .replace("{{EMAIL}}",usuario.email)

    fetch("http://localhost:8080/solicitacao/" + usuario.id)
        .then(res => res.json())
        .then(res => resSolicitacoes(res))
        .catch(err => trataErro(err))
}
function resSolicitacoes(res){
    var solicitacoes = res;
    //console.log(solicitacoes);
    $(document).ready(function () {
    var table = $('#tblSolicitacao').DataTable({
            data: solicitacoes,
            "columns": [
                {
                    "className":      'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": '',
                },
                { "data": "numSolicitacao" },
                { "data": "data" },
                { "data": "observacoes" },
                { "data": "status" },
                { 
                    "data": "valor",
                    render: $.fn.dataTable.render.number( '.', ',', 2, 'R$ ' )
                },
            ],
        "oLanguage": {
            "sLengthMenu": "Mostrar _MENU_ registros por página",
            "sZeroRecords": "Nenhum registro encontrado",
            "sEmptyRecords": "Não há dados para serem mostrados",
            "sLoadingRecords": "Carregando...",
            "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 a 0 de 0 registros",
            "sInfoFiltered": "(filtro aplicado em _MAX_ registros)",
            "sInfoPostFix": "",
            "sThousands": ".",
            "decimal" : ",",
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
        "aaSorting": [[1, "desc"]],
        "lengthMenu": [[5,10, 50, 100, -1], [5,10, 50, 100, "Todos"]]
    });
    $('#tblSolicitacao tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
    $('.dataTables_length').addClass('bs-select');
    });
}
function format ( d ) {
    //console.log(d);
    var childRow =  '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                        '<tr>' +
                            '<th class="th-sm">Itens</th>' +
                            '<th class="th-sm">Quantidade</th>' +
                        '</tr>'
    var unidade = "";
    for(i = 0; i < d.itensSolicitacao.length; i++){
        switch(d.itensSolicitacao[i].componente.nome){
            case 'processador':
                unidade = " vCPU";
                break;
            case 'rede':
                unidade = " Gbits";
                break;
            default:
                if (d.itensSolicitacao[i].componente.tipo != "software"){
                    unidade = " GB";
                }
                else{
                    unidade = " Licença"
                }
        }
        var childRow = childRow + '<tr>'+
                                        '<td>' + d.itensSolicitacao[i].componente.nome + '</td>' +
                                        '<td>' + d.itensSolicitacao[i].quantidade + unidade + '</td>' +
                                    '</tr>';
    }
    childRow = childRow + '</table>';
    return childRow;
}
function logout(){
    localStorage.removeItem("vmuser");
    window.location = "index.html";
}
function novaSolicitacao(){
    window.location = "novopedido.html";
}