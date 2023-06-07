const form = document.querySelector("#form");
const resultado = document.querySelector("#resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // ?  o target referencia o elemento que acionou o evento
  const inputPeso = e.target.querySelector("#peso");
  const inputAltura = e.target.querySelector("#altura");
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  if (!peso) {
    setResultado("Peso inválido!", false);
    return;
  }

  if (!altura) {
    setResultado("Altura inválida!", false);
    return;
  }

  const imc = getImc(peso, altura);
  const status = getStatusImc(imc);
  const msg = `Seu IMC é: ${imc} (${status}). `;

  setResultado(msg, true);
});

function getImc(peso, altura) {
  const imc = peso / altura ** 2;

  return imc.toFixed(2);
}

function getStatusImc(imc) {
  const status = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau I",
    "Obesidade grau II",
    "Obesidade grau III",
  ];

  if (imc >= 39.9) return status[5];
  if (imc >= 34.9) return status[4];
  if (imc >= 29.9) return status[3];
  if (imc >= 24.9) return status[2];
  if (imc >= 18.5) return status[1];
  if (imc < 18.5) return status[0];
}

function criarParagrafo() {
  const p = document.createElement("p");
  resultado.appendChild(p);

  return p;
}

function setResultado(msg, isValid) {
  resultado.innerHTML = ``;
  const p = criarParagrafo();
  p.innerText = msg;

  if (isValid) p.classList.add("resultado-valido");
  else p.classList.add("resultado-invalido");
}