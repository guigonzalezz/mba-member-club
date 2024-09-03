const fidelityCard = document.querySelector(".fidelity");
const fidelityCardId = fidelityCard.querySelector("header .user-id-tag h4");
const fidelityStamps = fidelityCard.querySelector(".stamps");

export async function updateFidelityCard({ id, loyaltyCard }) {
  const { totalCuts, cutsRemaining } = loyaltyCard;
  
  fidelityCardId.textContent = `ID: ${id}`;
  fidelityStamps.innerHTML = "";

  const createStampItem = (className, imgSrc, imgAlt) => {
    const item = document.createElement("div");
    item.classList.add("box", className);

    if (imgSrc) {
      const icon = document.createElement("img");
      icon.setAttribute("src", imgSrc);
      icon.setAttribute("alt", imgAlt);
      item.append(icon);
    }

    return item;
  };

  for (let i = 0; i < totalCuts; i++) {
    fidelityStamps.appendChild(createStampItem("stamp-checked", "src/assets/PinCheck.png", "Check"));
  }

  for (let i = 0; i < cutsRemaining; i++) {
    const className = i === cutsRemaining - 1 ? "stamp-gift" : "stamp-empty";
    const imgSrc = i === cutsRemaining - 1 ? "src/assets/icons/Gift-Solid.svg" : null;
    const imgAlt = i === cutsRemaining - 1 ? "Gift" : null;

    fidelityStamps.appendChild(createStampItem(className, imgSrc, imgAlt));
  }
}
