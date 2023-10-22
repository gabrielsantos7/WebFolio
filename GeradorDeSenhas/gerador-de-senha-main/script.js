let btnGerar = document.querySelector('div#btnGerar')
let divSenha = document.querySelector('div#lugarSenha')
let lugarSenha = document.querySelector('#p')
let img = document.getElementById('imgCopy')

let checkM = document.getElementById('maiusculas')
let checkN = document.getElementById('numeros')
let checkS = document.getElementById('simbolos')
let txtSenha = document.getElementById('tamSenha')

function gerar(){
    img.setAttribute('src', 'Imagens/copy.png')
    let tamSenha = Number(txtSenha.value)
    let senha = 'abcdefghijklmnopqrstuvwxyz'
    let senhaFinal  = ''
    let sorteio = 0

    if(tamSenha == 0){
        tamSenha = 5
        txtSenha.value = 5
    }
    if(tamSenha > 25){
        tamSenha = 25
        txtSenha.value = 25
    }
    
    if(checkM.checked){
        senha += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    
    if(checkN.checked){
        senha += '0123456789'
    }

    if(checkS.checked){
        senha += '!@#$%&*-+=?./'
    }

    for(let i=0; i < tamSenha; i++){
        sorteio = Math.floor(Math.random() * senha.length)
        senhaFinal += senha.charAt(sorteio)
    }

    lugarSenha.innerText = senhaFinal

    divSenha.classList.add('clicavel')

    divSenha.addEventListener('click', function(){
        navigator.clipboard.writeText(senhaFinal)

        let copiado = setInterval(function(){
            img.setAttribute('src', 'Imagens/copy2.png')
            btnGerar.innerHTML = 'Copiado!'
            lugarSenha.style.color = '#8be9fd'
        }, 100)
        
        setTimeout(function(){
            clearInterval(copiado)
            btnGerar.innerHTML = 'Gerar'
            lugarSenha.style.color = '#FF79C6'
            img.setAttribute('src', 'Imagens/copy.png')
        }, 1500)
        
    })
}

btnGerar.addEventListener('click', gerar)