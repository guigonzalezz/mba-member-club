const profileInfoCard = document.querySelector(".profile-info");
const profilePicture = profileInfoCard.querySelector("#profile-pic img");
const profileName = profileInfoCard.querySelector("div h3");
const profileClientSince = profileInfoCard.querySelector("p");

export function updateProfileInfoCard({ name, picture, clientSince }) {
  profilePicture.src = picture;
  profileName.textContent = name;
  profileClientSince.textContent = `Client since ${clientSince}`;
}
