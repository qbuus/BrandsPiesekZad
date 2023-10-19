const modalX = document.querySelector(".closeX");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");

modalX.addEventListener("click", () => {
  // prosta walidacja
  const isShown = Boolean(
    backdrop.classList.contains("hidden") &&
      modal.classList.contains("hidden")
  );

  // chowanie modalu
  if (!isShown) {
    backdrop.classList.add("hidden");
    modal.classList.add("hidden");
  }
});

backdrop.addEventListener("click", () => {
  const isShown = Boolean(
    backdrop.classList.contains("hidden") &&
      modal.classList.contains("hidden")
  );

  if (!isShown) {
    backdrop.classList.add("hidden");
    modal.classList.add("hidden");
  }
});
