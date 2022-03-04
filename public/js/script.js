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
                else alert('Ocorreu um erro...')
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
        return alert('Origem e destino devem seer diferentes')
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
                    <button type="button" class="btn btn-secondary me-1">Ver Detalhes</button>
                    <button type="button" class="btn btn-light me-1">Editar</button>
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



//--------------------------------------------


/*
function sendFile(){
    const someExpressFiles = document.getElementById('someExpressFiles').files[0]
    let title= document.getElementById('title').value
    console.log(someExpressFiles)
    console.log(title)
    let fd = new FormData()
    fd.append('image',someExpressFiles)
    fd.append('text', title )
    if(someExpressFiles == undefined)
        alert('Não há imagem selecionada!')
    else{
        var options1 = {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'myheader' : title
            },
            body: fd
        }
        console.log(someExpressFiles)
        fetch('http://localhost:3000/foto',options1)
        .then(res => res.json())
        .then(data => alert(data.res))
        .catch((err) => {
            console.log('Request failed', err.message)
        });

    
    }
}


*/