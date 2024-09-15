const formElement = document.getElementById("form");
const toast = document.getElementById("toast");

const cepElement = document.getElementById("cep");
const ruaElement = document.getElementById("rua");
const numeroElement = document.getElementById("numero");
const bairroElement = document.getElementById("bairro");
const complementoElement = document.getElementById("complemento");
const cidadeElement = document.getElementById("cidade");
const estadoElement = document.getElementById("estado");

const apiUrl = "https://viacep.com.br/ws/{cep}/json";

const applyCEPMask = function (value) {
  return value
    .replace(/\D/g, "") // Remove tudo o que não é dígito
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen entre o 5º e 6º dígito
    .slice(0, 9); // Limita o tamanho do resultado a 9 caracteres
};

const clearForm = function () {
  cepElement.value = "";
  ruaElement.value = "";
  numeroElement.value = "";
  bairroElement.value = "";
  complementoElement.value = "";
  cidadeElement.value = "";
  estadoElement.value = "";
};

const fillForm = function (address) {
  cepElement.value = address.cep;
  ruaElement.value = address.logradouro;
  bairroElement.value = address.bairro;
  complementoElement.value = address.complemento;
  cidadeElement.value = address.localidade;
  estadoElement.value = address.uf;
};

const showToast = function (message, isSuccess = true) {
  const icon = toast.querySelector("i");
  
  if (isSuccess) {
    icon.classList.remove("bi-exclamation-triangle-fill");
    icon.classList.add("bi-check-circle-fill");
    toast.classList.remove("text-bg-danger");
    toast.classList.add("text-bg-success");
  } else {
    icon.classList.remove("bi-check-circle-fill");
    icon.classList.add("bi-exclamation-triangle-fill");
    toast.classList.remove("text-bg-success");
    toast.classList.add("text-bg-danger");
  }

  toast.querySelector(".toast-body").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toast).show();
};

const isValidCEP = function (cep) {
  const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
  return cepRegex.test(cep);
};

const searchCEP = async function () {
  const cep = cepElement.value;

  if (cep.trim() === "") {
    showToast("Informe um CEP!", false);
    return;
  }

  if (!isValidCEP(cep)) {
    showToast("Informe um CEP válido! Formato: xxxxx-xxx", false);
    return;
  }

  try {
    const response = await fetch(`${apiUrl.replace("{cep}", cep)}`);

    if (!response.ok) {
      showToast("O serviço de busca de CEP está temporariamente indisponível.", false);
      return;
    }

    const address = await response.json();
    clearForm();

    if ("erro" in address) {
      showToast("CEP não encontrado! Tente novamente.", false);
      return;
    }

    fillForm(address);

  } catch (error) {
    showToast("Erro ao buscar o CEP. Tente novamente mais tarde.", false);
  }
};

cepElement.addEventListener("input", function (e) {
  e.target.value = applyCEPMask(e.target.value);
});

cepElement.addEventListener("focusout", searchCEP);

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formElement.checkValidity()) {
    showToast("Preencha todos os campos obrigatórios.", false);
    event.stopPropagation();
  } else {
    showToast("Formulário enviado com sucesso!");

    setTimeout(() => {
      formElement.classList.add("submitted");
    }, 2000);
  }

  formElement.classList.add("was-validated");
});
