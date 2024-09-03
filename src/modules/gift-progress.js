const giftProgressCard = document.querySelector(".gift-progress");
const giftProgressCardTitle = giftProgressCard.querySelector("header h2");
const giftProgressCardLeft = giftProgressCard.querySelector("header div p");
const giftProgressCardInnerBar = giftProgressCard.querySelector("header .inner-bar");

export async function updateGiftProgressCard({ loyaltyCard }) {
  const { totalCuts, cutsRemaining, cutsNeeded } = loyaltyCard;

  giftProgressCardTitle.innerHTML = `${cutsRemaining} <span>left cuts</span>`;
  giftProgressCardLeft.textContent = `${totalCuts} of ${cutsNeeded}`;

  giftProgressCardInnerBar.style.width = `${((totalCuts / cutsNeeded) * 100).toFixed(2)}%`;
}
