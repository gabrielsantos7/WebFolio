
let personagem = document.querySelector("#personagem");
let personagemimg = document.querySelector("#personagem img")
let personagemX = 0;
let personagemY = 0;
let personagemlargura= 50;
let personagemaltura = 70;
let velocidade = 10;

let alturacontainer = 600;
let larguracontainer = 800;

document.addEventListener("keydown", movimento)
document.addEventListener("keyup", parar)

function parar(evento){
evento.preventDefault();

let tecla = evento.key;

switch(tecla){
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
        personagemimg.classList.remove("movimento")
        break;
}
}

function movimento(evento){
    evento.preventDefault();
    let tecla = evento.key;
    switch(tecla){
        case 'ArrowUp':
            personagemimg.classList.add("movimento", "paracima");
            personagemimg.classList.remove("parabaixo");
            personagemimg.classList.remove("paraesquerda");
            personagemimg.classList.remove("paradireita");
            personagemY -=velocidade;
            if(personagemY <=0){
                personagemY = 0;
            }
            personagem.style.top = personagemY +"px";
        break;

        case 'ArrowDown':
            personagemimg.classList.add("movimento", "parabaixo");
            personagemimg.classList.remove("paracima");
            personagemimg.classList.remove("paraesquerda");
            personagemimg.classList.remove("paradireita");
            personagemY +=velocidade;
            if(personagemY >= alturacontainer - personagemaltura){
                personagemY = alturacontainer - personagemaltura;
            }
            personagem.style.top = personagemY +"px";
        break;

        case 'ArrowLeft':
            personagemimg.classList.add("movimento", "paraesquerda");
            personagemimg.classList.remove("parabaixo");
            personagemimg.classList.remove("paracima");
            personagemimg.classList.remove("paradireita");
            personagemX -=velocidade;
           if(personagemX <= 0){
               personagemX = 0;
           }
            personagem.style.left = personagemX +"px";
    
        break;
            
        case 'ArrowRight':
            personagemimg.classList.add("movimento", "paradireita");
            personagemimg.classList.remove("parabaixo");
            personagemimg.classList.remove("paraesquerda");
            personagemimg.classList.remove("paracima");
            personagemX +=velocidade;
            if(personagemX >= larguracontainer - personagemlargura){
                personagemX = larguracontainer - personagemlargura;

            }
            personagem.style.left = personagemX +"px";
        break;
        
    }
}