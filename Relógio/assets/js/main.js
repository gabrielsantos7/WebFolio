const selectors = {
    time: "#time",
    date: "#date",
  };

const divTime = document.querySelector(selectors.time);
const divDate = document.querySelector(selectors.date);

const daysOfWeek = {
  0: "Domingo",
  1: "Segunda-Feira",
  2: "Terça-Feira",
  3: "Quarta-Feira",
  4: "Quinta-Feira",
  5: "Sexta-Feira",
  6: "Sábado",
};

const months = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  divTime.innerHTML = formatTime(hours, minutes, seconds);
  divDate.innerHTML = `${formatDayOfWeek(dayOfWeek)}, ${formatNumber(dayOfMonth)} de ${formatMonth(month)} de ${year}`;
}

function formatTime(hours, minutes, seconds) {
  const formattedHours = formatNumber(hours);
  const formattedMinutes = formatNumber(minutes);
  const formattedSeconds = formatNumber(seconds);

  if (hours > 12) 
    return `0${hours - 12} : ${formattedMinutes} : ${formattedSeconds} PM`;
   else 
    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} AM`;
  
}

function formatNumber(num) {
  return num.toString().padStart(2, "0");
}

function formatDayOfWeek(dayOfWeek) {
  return daysOfWeek[dayOfWeek] || "";
}

function formatMonth(month) {
  return months[month] || "";
}

setInterval(getCurrentTime, 1000);