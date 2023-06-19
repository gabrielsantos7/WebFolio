const selectors = {
  btnYes: "#btnYes",
  btnNo: "#btnNo",
  gif: "#gif",
  container: "#container",
  txt: "#txt",
  audio: "#audio",
};

const btnYes = document.querySelector(selectors.btnYes);
const btnNo = document.querySelector(selectors.btnNo);
const gif = document.querySelector(selectors.gif);
const container = document.querySelector(selectors.container);
const txt = document.querySelector(selectors.txt);
const audio = document.querySelector(selectors.audio);

const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const maxX = pageWidth - btnNo.offsetWidth;
const maxY = pageHeight - btnNo.offsetHeight;

btnYes.addEventListener("click", () => {
  gif.setAttribute("src", "Imagens/accepted.gif");

  container.removeChild(btnYes);
  container.removeChild(btnNo);

  txt.innerText = "Fez a escolha certa!❤";
  audio.play();
});

btnNo.addEventListener("click", changePosition);
btnNo.addEventListener("mouseover", changePosition);
btnNo.addEventListener("touchstart", changePosition);

function changePosition() {
  btnNo.style.position = "absolute";
  btnNo.style.top = getRandomNumber(maxY);
  btnNo.style.left = getRandomNumber(maxX);
}

const getRandomNumber = (n) => Math.floor(Math.random() * n) + "px";
