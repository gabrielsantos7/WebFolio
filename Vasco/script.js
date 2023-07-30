const checkTorcer = document.getElementById("torcer");
const checkAssistir = document.getElementById("assistir");
const checkFeliz = document.getElementById("feliz");

checkTorcer.addEventListener("change", function () {
  if (checkAssistir.checked && checkFeliz.checked) checkFeliz.checked = false;
});

checkAssistir.addEventListener("change", function () {
  if (checkTorcer.checked && checkFeliz.checked) checkTorcer.checked = false;
});

checkFeliz.addEventListener("change", function () {
  if (checkTorcer.checked && checkAssistir.checked)
    checkAssistir.checked = false;
});
