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