const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");

const h2 = document.getElementById("h2");
const message = document.getElementById("message");
const button = document.getElementById("button");

let isStrong = false;
let nameIsValid = false;

let place = "esq";

function move() {
  if (!isStrong || !nameIsValid) {
    button.style.transition = "300ms";
    button.style.cursor = "not-allowed";

    switch (place) {
      case "esq":
        button.style.marginLeft = 200 + "px";
        button.style.marginRight = 0 + "px";
        place = "dir";
        break;

      case "dir":
        button.style.marginLeft = 0 + "px";
        button.style.marginRight = 200 + "px";
        place = "esq";
        break;

      default:
        break;
    }
  } 
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isStrong && nameIsValid && username.value !== '' && password.value !== '') {
    form.style.display = "none";
    h2.innerText = "Conta criada com sucesso!";
    message.style.display = "block";
  } else {
    move();
  }
});

function debugUser() {
  const usernameValue = username.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else if (usernameValue.length < 7){
    setErrorFor(username, "O nome de usuário deve ter mais de 7 caracteres.");
  } else {
    setSucessFor(username, "O nome de usuário é válido.");
    nameIsValid = true;
    if (isStrong) {
      button.style.marginLeft = "100px";
      button.style.cursor = 'pointer'
      }
    }
  
}

function debug() {
  const passwordValue = password.value;

  var capitals = /[A-Z]/;
  var numbers = /[0-9]/;
  var specialCharacters = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

  let haveCapitals = false,
    haveNumbers = false,
    haveSpecialCharacters = false;

  if (capitals.test(passwordValue)) {
    haveCapitals = true;
  }

  if (numbers.test(passwordValue)) {
    haveNumbers = true;
  }

  if (specialCharacters.test(passwordValue)) {
    haveSpecialCharacters = true;
  }

  if (haveCapitals && haveNumbers && haveSpecialCharacters) {
    isStrong = true;
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha é fraca.");
    isStrong = false;
  } else {
    if (isStrong) {
      setSucessFor(password, "Senha forte.");
      if (nameIsValid) {
        button.style.marginLeft = 0 + "px";
        button.style.cursor = 'pointer'
      }
    }
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.className = "form-control error";
}

function setSucessFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.className = "form-control sucess";
}