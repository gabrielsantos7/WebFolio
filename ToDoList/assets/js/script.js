// ? Seleção de elementos
const changeColor = document.querySelector("#change-color");
const colorPallete = document.querySelector(".color-pallete");
const colorDivs = document.querySelectorAll(".colors");

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// ? Funções
const handleClick = (e) => {
  const clickedEl = e.target;
  const clickedColor = e.target.id;

  colorDivs.forEach((div) => {
    div.innerHTML = "";
  });

  clickedEl.innerHTML = '<i class="fa-solid fa-check"></i>';
  const primaryColors = [
    "#102f5e", 
    "#4f2bb4", 
    "#d75413", 
    "#c833ad", 
    "#159287"
  ];

  const secondaryColors = [
    "#395169",
    "#7b67b2",
    "#cd7f47",
    "#e671e0",
    "#42c5b2",
  ];

  const colorIndex = Array.from(colorDivs).findIndex(
    (div) => div.id === clickedColor
  );

  if (colorIndex !== -1) {
    const primaryColor = primaryColors[colorIndex];
    const secondaryColor = secondaryColors[colorIndex];

    // Salva as cores no local Storage
    const selectedColors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
    };

    setColorPallete(selectedColors);
    saveColorsLocalStorage(selectedColors);
  }

  colorPallete.classList.add("hide");
};

const setColorPallete = (colors) => {
  document.documentElement.style.setProperty(
    "--primary-color",
    colors.primaryColor
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    colors.secondaryColor
  );
};

const putIconInColor = (selectedColor) => {
  colorDivs.forEach((div) => {
    const computedStyle = getComputedStyle(div);
    const backgroundColor = rgbToHex(computedStyle.backgroundColor);

    if (backgroundColor === selectedColor) {
      div.innerHTML = '<i class="fa-solid fa-check"></i>';
    }
  });
};

const saveTodo = (text, done = 0, save = 1) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  doneBtn.title = "Concluído";
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editBtn.title = "Editar";
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  deleteBtn.title = "Apagar";
  todo.appendChild(deleteBtn);

  if (done) {
    todo.classList.add("done");
  }

  // Utilizando dados da localStorage
  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }

  todoList.appendChild(todo);

  todoInput.value = "";
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      // Utilizando dados da localStorage
      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    console.log(todoTitle);

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));

      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    default:
      break;
  }
};

// Eventos
changeColor.addEventListener("click", () => {
  colorPallete.classList.toggle("hide");
});

colorDivs.forEach((div) => {
  div.addEventListener("click", handleClick);
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");

    updateTodoStatusLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();

    // Utilizando dados da localStorage
    removeTodoLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text != todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const saveColorsLocalStorage = (colors) => {
  localStorage.setItem("selectedColors", JSON.stringify(colors));
};

const loadColors = () => {
  // Recupera as cores salvas no Local Storage
  const selectedColors = localStorage.getItem("selectedColors");

  if (selectedColors !== null) {
    const { primaryColor, secondaryColor } = JSON.parse(selectedColors);

    const colors = {
      primaryColor,
      secondaryColor,
    };

    setColorPallete(colors);
    putIconInColor(primaryColor);
  }
};

const rgbToHex = (rgb) => {
  // Verifica o formato de entrada RGB
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  // Se o formato for inválido, retorna o valor original
  if (!match) {
    return rgb;
  }

  // Converte os valores de 0-255 para hexadecimal
  const hex =
    "#" +
    match
      .slice(1)
      .map((component) => parseInt(component).toString(16).padStart(2, "0"))
      .join("");

  // Retorna o valor hexadecimal
  return hex;
};

loadTodos();
loadColors();
