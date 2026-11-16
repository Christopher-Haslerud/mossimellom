const toast = document.querySelector(".toast");
let toastTimer;
const productCards = [...document.querySelectorAll(".product-card")];
const collectionStatus = document.querySelector("#collection-status");
const collectionReset = document.querySelector("#collection-reset");
const productGrid = document.querySelector("#product-grid");
const carouselHint = document.querySelector("#carousel-hint");

function updateCarouselHint() {
  carouselHint.hidden = productGrid.scrollWidth <= productGrid.clientWidth + 1;
}

function showMagnets(location) {
  const matchingCards = productCards.filter((card) => !location || card.dataset.location === location);
  productCards.forEach((card) => {
    card.hidden = location !== null && card.dataset.location !== location;
  });
  collectionStatus.textContent = location
    ? `Viser ${matchingCards.length} ${matchingCards.length === 1 ? "magnet" : "magneter"} fra ${location}.`
    : "";
  collectionReset.hidden = location === null;
  productGrid.scrollLeft = 0;
  updateCarouselHint();
}

document.querySelectorAll("[data-location-filter]").forEach((link) => {
  link.addEventListener("click", () => showMagnets(link.dataset.locationFilter));
});
collectionReset.addEventListener("click", () => showMagnets(null));
window.addEventListener("resize", updateCarouselHint);
updateCarouselHint();

document.querySelector(".signup").addEventListener("submit", (event) => {
  event.preventDefault();
  toast.textContent = "Dette er en demo – påmelding til nyhetsbrevet er ikke aktiv ennå.";
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
});
