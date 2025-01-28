const textareaElement = document.querySelector('#text');
const resultElement = document.querySelector('#result');

const uppercaseButton = document.querySelector('#uppercase');
const lowercaseButton = document.querySelector('#lowercase');
const capitalizeButton = document.querySelector('#capitalize');
const copyButton = document.querySelector('#copy');
const clearButton = document.querySelector('#clear');
const toastContainer = document.querySelector('#toast-container');

let value = '';

// Desabilita os botões
function disableButtons() {
    document.querySelectorAll('#buttons > *').forEach(button => {
        button.disabled = true;
    });
}

// Habilita os botões
function enableButtons() {
    document.querySelectorAll('#buttons > *').forEach(button => {
        button.disabled = false;
    });
}

// Atualiza os dados do resultado
function updateResults() {
    const textLength = value.length;
    const numWords = value.trim().split(/\s+/).length;
    const numSentences = value.split(/[.!?]/).filter(Boolean).length;

    resultElement.innerHTML = `
        <p>Quantidade de letras: <span class="fw-bold">${textLength}</span></p>
        <p>Quantidade de palavras: <span class="fw-bold">${numWords}</span></p>
        <p>Quantidade de sentenças: <span class="fw-bold">${numSentences}</span></p>
    `;
}

// Converte o texto para maiúsculas
uppercaseButton.addEventListener('click', () => {
    textareaElement.value = textareaElement.value.toUpperCase();
    value = textareaElement.value;
    updateResults();
});

// Converte o texto para minúsculas
lowercaseButton.addEventListener('click', () => {
    textareaElement.value = textareaElement.value.toLowerCase();
    value = textareaElement.value;
    updateResults();
});

// Capitaliza o texto
capitalizeButton.addEventListener('click', () => {
    textareaElement.value = textareaElement.value
        .toLowerCase() // Converte todo o texto para minúsculas
        .replace(/\b\w/g, char => char.toUpperCase()); // Converte a primeira letra de cada palavra para maiúscula
    value = textareaElement.value;
    updateResults();
});


// Copia o conteúdo do resultado
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(value).then(() => {
        toast("Texto copiado para a área de transferência!");
    });
});

// Limpa o texto
clearButton.addEventListener('click', () => {
    textareaElement.value = '';
    value = '';
    resultElement.innerHTML = '';
    disableButtons();
});

// Monitora a entrada de texto
textareaElement.addEventListener('input', () => {
    value = textareaElement.value;
    if (!value) {
        resultElement.innerHTML = '';
        disableButtons();
        return;
    }

    enableButtons();
    updateResults();
});


function toast(message) {
    const toastHTML = `
        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `

    toastContainer.innerHTML += toastHTML;

    // Inicializa o toast e exibe-o
    const toastElement = toastContainer.querySelector('.toast:last-child');
    const toastInstance = new bootstrap.Toast(toastElement);
    toastInstance.show();
}
