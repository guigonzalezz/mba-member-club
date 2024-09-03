import { updateProfileInfoCard } from "./profile-info";
import { updateHistoryCard } from "./history";
import { updateFidelityCard } from "./fidelity";
import { updateGiftProgressCard } from "./gift-progress";

const giftModal = document.getElementById("gift-achieved-modal");
const modalCloseButton = giftModal.querySelector(".close-x");

modalCloseButton.onclick = () => {
  giftModal.style.display = "none";
};

const showGiftModal = () => {
  giftModal.style.display = "flex";
};

document.addEventListener("DOMContentLoaded", () => {
  createDashboard();
});

export async function createDashboard({ cardId } = {}) {
  if (!cardId) {
    generateEmptyUser();
    return;
  }

  const userData = await fetchCardIdInfo({ cardId });
  if (!userData) return;

  const { id, name, picture, clientSince, appointmentHistory, loyaltyCard } = userData;

  updateProfileInfoCard({ name, picture, clientSince });
  updateHistoryCard({ appointmentHistory });
  updateFidelityCard({ id, loyaltyCard });
  updateGiftProgressCard({ loyaltyCard });

  if (loyaltyCard.totalCuts === loyaltyCard.cutsNeeded) showGiftModal();
}

function generateEmptyUser() {
  const defaultUser = {
    id: "000-000-000-000",
    name: "Default User",
    picture: "src/assets/users/default.png",
    clientSince: "04/04/1999",
    appointmentHistory: [{ date: "04/04/1999", time: "10:00" }],
    loyaltyCard: {
      totalCuts: 1,
      cutsNeeded: 10,
      cutsRemaining: 9,
    },
  };

  updateProfileInfoCard(defaultUser);
  updateHistoryCard({ appointmentHistory: defaultUser.appointmentHistory });
  updateFidelityCard({ id: defaultUser.id, loyaltyCard: defaultUser.loyaltyCard });
  updateGiftProgressCard({ loyaltyCard: defaultUser.loyaltyCard });
}

async function fetchCardIdInfo({ cardId }) {
  try {
    if (!cardId) throw new Error("card_id_not_found");

    const response = await fetch(`http://localhost:3333/clients/${cardId}`);
    return await response.json();
  } catch (err) {
    console.error(err);
    alert(`User with ID ${cardId} not found.`);
  }
}

const cardIdInput = document.getElementById("card-id");
const form = document.querySelector("form");

cardIdInput.oninput = () => {
  cardIdInput.value = cardIdInput.value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1-$2-$3-$4");
};

form.onsubmit = (event) => {
  event.preventDefault();

  const cardId = cardIdInput.value;
  if (!/^\d{3}-\d{3}-\d{3}-\d{3}$/.test(cardId)) {
    alert("Invalid ID. Accepted Format: 000-000-000-000");
    return;
  }

  createDashboard({ cardId });

  cardIdInput.value = "";
  cardIdInput.blur();
};
