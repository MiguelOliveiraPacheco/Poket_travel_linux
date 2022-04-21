function init() {
    getOrigem();
    getDestinos();
}


function getOrigem() {
    const origem = document.getElementById('origem')
    fetch('http://localhost:3000/formdataorigens')
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data[0].origem.length; i++) {
                const op =
                    `<option>${data[0].origem[i]}</option>`
                origem.innerHTML += op
            }
        })
        .catch(error => {
            console.log(error)
        })
}


function getDestinos() {
    const destino = document.getElementById('destino')
    fetch('http://localhost:3000/formdatadestinos')
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data[0].destino.length; i++) {
                const op =
                    `<option>${data[0].destino[i]}</option>`
                destino.innerHTML += op
            }
        })
        .catch(error => {
            console.log(error)
        })
}


//----------------------------------------------------

function insertUtilizador() {
    const nome = document.getElementById('nome').value
    const nif = document.getElementById('nif').value
    const numeroT = document.getElementById('numeroT').value
    const origem = document.getElementById('origem').value
    const destino = document.getElementById('destino').value
    const someExpressFiles = document.getElementById('someExpressFiles').files[0]

    if(validaFormData(someExpressFiles,nome,nif,numeroT,origem,destino)==true){
        let fd = new FormData()
        fd.append('image',someExpressFiles)
        fd.append('nome', nome )
        fd.append('nif', nif )
        fd.append('numeroT', numeroT )
        fd.append('origem', origem )
        fd.append('destino', destino )
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'myheader': nif
            },
            body: fd,
        }
        fetch('http://localhost:3000/createutilizador', options)
            .then(res => res.json())
            .then(data => {
                if(data.type=='success')
                    alert(data.msg)
                else alert(data.msg)
            })
            .catch((err) => {
                console.log('Request failed', err.message)
            });
    }
}

function validaFormData(someExpressFiles,nome,nif,numeroT,origem,destino){
    if (nome == '')
        return alert('Tem de preencher o nome.')
    if (nif == '')
        return alert('Tem de indicar o NIF.')
    else {
        let i = 0
        for (i; i < nif.length; i++) {
            let c = nif.charAt(i)
            if (isNaN(c)) {
                return alert('NIF inválido')
            }
        }
        if (i == nif.length) {
            const nifInt = parseInt(nif)
        }
    }
    if (numeroT == '')
        alert('Tem de indicar um telemóvel.')
    else {
        let i = 0
        for (i; i < numeroT.length; i++) {
            let c = numeroT.charAt(i)
            if (isNaN(c)) {
                return alert('Telemóvel com números inválidos')
            }
        }
        if (i == numeroT.length) {
            const numeroTInt = parseInt(numeroT)
        }
    }
    if (origem == '')
        return alert('Escolher a Origem')
    if (destino == '')
        return alert('Escolher o Destino')
    if(origem==destino)
        return alert('Origem e destino devem ser diferentes')
    if(someExpressFiles==undefined)
        return alert('Deve escolher uma fotografia')
    
    return true
}

function linhasTabela(){
    fetch('http://localhost:3000/utilizadores')
    .then(res=>res.json())
    .then(json=>{
        if(json.type=='success'){
            const tabela = document.getElementById('corpoTabela')
            tabela.innerHTML=''
            for(i in json.msg){
                let linha = 
                `<tr>
                    <td class="text-center">${parseInt(i)+1}</td>
                    <td class="text-center">${json.msg[i].nome}</td>
                    <td class="text-center">${json.msg[i].nif}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-secondary me-1" onclick="editar('${json.msg[i]._id}')">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="eliminar('${json.msg[i]._id}')">Eliminar</button>
                    </td>
                </tr>`
                tabela.innerHTML+=linha
            }
        }

    })
    .catch((error)=>{
        alert(error)
    })
}

function eliminar(_id) {
    console.log(_id)
    var options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }
    fetch('http://localhost:3000/delete/' + _id, options)
    .then(res=>res.json())
    .then(json=>{
        alert(json.msg)
        linhasTabela()
    })
}


function editar(_id) {
    var options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    const origem = document.getElementById('origem')
    const destino = document.getElementById('destino')
    fetch('http://localhost:3000/formdataorigens')
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data[0].origem.length; i++) {
                const op =
                    `<option>${data[0].origem[i]}</option>`
                origem.innerHTML += op
                destino.innerHTML += op
            }
            fetch('http://localhost:3000/editar/' + _id, options)
            .then(res=>res.json())
            .then(json=>{
                alert(json.msg)
                document.getElementById('nome').value= json.utilizador.nome
                document.getElementById('nif').disabled=true
                document.getElementById('nif').value= json.utilizador.nif
                document.getElementById('numeroT').value= json.utilizador.numeroT
                document.getElementById('origem').value= json.utilizador.origem
                document.getElementById('destino').value= json.utilizador.destino
    })
        })
        .catch(error => {
            console.log(error)
        })
 
}

function atualizarUtilizador() {
    const nome = document.getElementById('nome').value
    const nif = document.getElementById('nif').value
    const numeroT = document.getElementById('numeroT').value
    const origem = document.getElementById('origem').value
    const destino = document.getElementById('destino').value

    if(validaEditFormData(nome,nif,numeroT,origem,destino)==true){
        /*const data={'nome':nome, 'nif':nif, 'numeroT':numeroT, 'origem':origem, 'destino':destino}*/
        let fd = new FormData()
        fd.append('nome', nome )
        fd.append('nif', nif )
        fd.append('numeroT', numeroT )
        fd.append('origem', origem )
        fd.append('destino', destino )
        var options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'myheader': nif
            },
            body: fd
        }
        fetch('http://localhost:3000/editar/atualizar', options)
            .then(res => res.json())
            .then(data => {
                alert(data.msg)
            })
            .catch((err) => {
                console.log('Request failed', err.message)
            });
    }
}

function validaEditFormData(nome,nif,numeroT,origem,destino){
    if (nome == '')
        return alert('Tem de preencher o nome.')
    if (nif == '')
        return alert('Tem de indicar o NIF.')
    else {
        let i = 0
        for (i; i < nif.length; i++) {
            let c = nif.charAt(i)
            if (isNaN(c)) {
                return alert('NIF inválido')
            }
        }
        if (i == nif.length) {
            const nifInt = parseInt(nif)
        }
    }
    if (numeroT == '')
        alert('Tem de indicar um telemóvel.')
    else {
        let i = 0
        for (i; i < numeroT.length; i++) {
            let c = numeroT.charAt(i)
            if (isNaN(c)) {
                return alert('Telemóvel com números inválidos')
            }
        }
        if (i == numeroT.length) {
            const numeroTInt = parseInt(numeroT)
        }
    }
    if (origem == '')
        return alert('Escolher a Origem')
    if (destino == '')
        return alert('Escolher o Destino')
    if(origem==destino)
        return alert('Origem e destino devem ser diferentes')
    
    return true
}