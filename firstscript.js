function doSearch(event) {
    event.preventDefault()
    // preparando pra enviar pro servidor
    lugar = ""
    if(document.getElementById("restaurante").checked){
        lugar = "restaurante"
    }else if(document.getElementById("escola").checked){
        lugar = "escola"
    }else if(document.getElementById("parque").checked){
        lugar = "parque"
    } else if (document.getElementById("museu").checked){
        lugar = "museu"
    }
    let url = []
    let responses =[]
    let count = 0
    if(document.getElementById("visual").checked){
        url.push('http://localhost:3000/est?option=visao&tipo='+lugar)
        let deficiencia = "visual"
    }
    
    if(document.getElementById("auditivo").checked){
        url.push('http://localhost:3000/est?option=audicao&tipo='+lugar)
        let deficiencia = "audicao"
    }

    if(document.getElementById("fisico").checked){
        url.push('http://localhost:3000/est?option=cadeirante&tipo='+lugar)
        let deficiencia = "fisico"
    }

    if(document.getElementById("idoso").checked){
        url.push('http://localhost:3000/est?option=idoso&tipo='+lugar)
        let deficiencia = "idoso"
    }

    if (url.length == 0) {
        let urlAux = 'http://localhost:3000/est?tipo='+lugar
        url.push(urlAux)
    }

    console.log("fez uma request para: " + url[0])
    for (i = 0; i < url.length; i++) {
        fetch(url[i], {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then( data =>  {
                count--
                responses.push(data)
                if (count == 0) {
                    localStorage.setItem("responses", JSON.stringify(responses));
                    localStorage.setItem("quantidade", JSON.stringify(responses.length));
                    window.location.href = "results.html";
                }
        });
        count++
    }
}


