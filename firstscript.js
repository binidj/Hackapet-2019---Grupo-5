function doSearch(event) {
    event.preventDefault()
    // preparando pra enviar pro servidor
    lugar = ""
    if(document.getElementById("restaurante").checked){
        lugar = "restaurante"
        console.log("entrou no restaurante")
    }else if(document.getElementById("escola").checked){
        lugar = "escola"
    }else if(document.getElementById("parque").checked){
        lugar = "parque"
    } else if (document.getElementById("museu").checked){
        lugar = "museu"
    }
    let url = []
    let responses =[]
    console.log('testando')
    if(document.getElementById("visual").checked){
        url.push('http:/localhost:3000/est?option=visao&tipo='+lugar)
    }
    
    if(document.getElementById("auditivo").checked){
        url.push('http:/localhost:3000/est?option=audicao&tipo='+lugar)
    }

    if(document.getElementById("fisico").checked){
        url.push('http:/localhost:3000/est?option=cadeirante&tipo='+lugar)
    }

    if(document.getElementById("idoso").checked){
        url.push('http:/localhost:3000/est?option=idoso&tipo='+lugar)
    }

    if (url.length == 0) {
        let urlAux = 'http:/localhost:3000/est?tipo='+lugar
        url.push(urlAux)
    }

    console.log(url[0])

    for (i = 0; i < url.length; i++) {
        fetch('http:/localhost:3000/est?tipo=', {
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