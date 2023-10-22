const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

const h2 = document.getElementById("h2");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else {
    setSucessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "O e-mail é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um e-mail válido.");
  } else {
    setSucessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
  } else {
    StrongPassword(passwordValue);
  }

  if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.");
  } else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "As senhas não conferem.");
  } else {
    setSucessFor(passwordConfirmation);
  }

  const formControls = form.querySelectorAll(".form-control"); // Seleciona todos os form-controls

  const formIsValid = [...formControls].every((formControl) => {
    // Transforma a variável form-controls em um array para usar o método every
    return formControl.className === "form-control sucess"; // Verifica se cada elemento possui a classe sucess
  });

  if (formIsValid) {
    form.style.display = "none";
    h2.innerText = "Conta criada com sucesso!";
    message.style.display = "block";
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; // Mostra quem é o elemento pai
  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.className = "form-control error";
}

function setSucessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control sucess"; // Adiciona a classe sucesso alterando o atributo className
}

function StrongPassword(passwordValue) {
  var capitals = /[A-Z]/;
  var numbers = /[0-9]/;
  var specialCharacters = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

  let haveCapitals = false,
    haveNumbers = false,
    haveSpecialCharacters = false;

  if (capitals.test(passwordValue)) {
    haveCapitals = true;
  } else {
    setErrorFor(password, "Insira maiúsculas, números e símbolos.");
  }

  if (numbers.test(passwordValue)) {
    haveNumbers = true;
  } else {
    setErrorFor(password, "Insira maiúsculas, números e símbolos.");
  }

  if (specialCharacters.test(passwordValue)) {
    haveSpecialCharacters = true;
  } else {
    setErrorFor(password, "Insira maiúsculas, números e símbolos.");
  }

  if (haveCapitals && haveNumbers && haveSpecialCharacters) {
    setSucessFor(password);
  }
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
