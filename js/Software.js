function inicializa() {
    fetch("http://localhost:8080/software/")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
    }