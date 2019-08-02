function doSearch(event) {
    event.preventDefault()
    // preparando pra enviar pro servidor

    if(document.getElementById("restaurante").checked){
        console.log("MUSEEEEEU")
    }
    


    lugar = ""

    if(document.getElementById("restaurante").checked){
        lugar = "restaurante"
    }
    else if(document.getElementById("escola").checked){
        lugar = "escola"
    }else if(document.getElementById("parque").checked){
        lugar = "parque"
    }else{
        lugar = "museu"
    }

    let url = []
    let responses =[]

    if(document.getElementById("visual").checked){
        url.push('localhost:3000?option=visao&tipo='+lugar)
    }
    
    if(document.getElementById("auditivo").checked){
        url.push('localhost:3000?option=audicao&tipo='+lugar)
    }

    if(document.getElementById("fisico").checked){
        url.push('localhost:3000?option=cadeirante&tipo='+lugar)
    }

    if(document.getElementById("idoso").checked){
        url.push('localhost:3000?option=idoso&tipo='+lugar)
    }


    for (i = 0; i < url.length; i++) {
        fetch(url[i], {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
            }).then(res=>res.json(url[i]))
            .then(res =>  {
                responses.push(res)
        // quando a resposta chegar do servidor
        });
    }
    
}