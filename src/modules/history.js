const historyCard = document.querySelector(".history");
const historyCutCount = historyCard.querySelector("header span");
const appointmentsList = document.getElementById("appointments");

export async function updateHistoryCard({ appointmentHistory }) {
  historyCutCount.textContent = `${appointmentHistory.length} cortes`;

  appointmentsList.innerHTML = "";

  appointmentHistory.forEach(({ date, time }) => {
    const item = document.createElement("li");
    
    const dateTime = document.createElement("div");
    dateTime.innerHTML = `<strong>${date}</strong> <span>${time}</span>`;

    const checkIcon = document.createElement("img");
    checkIcon.classList.add("check-icon");
    checkIcon.src = "./src/assets/icons/SealCheck.svg";
    checkIcon.alt = "Check";

    const checkWrapper = document.createElement("div");
    checkWrapper.classList.add("check-icon-wrapper");
    checkWrapper.append(checkIcon);

    item.append(dateTime, checkWrapper);
    appointmentsList.appendChild(item);
  });
}
