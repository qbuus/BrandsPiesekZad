const navBar = document.getElementById("nav");
const btnMenu = document.querySelectorAll(".btn-scroll-into");
const buyButton = document.querySelector(".buy-button");
const navBottomPosition = navBar.getBoundingClientRect().bottom;
const logo = document.getElementById("nav");

buyButton.addEventListener("click", preventBuyButton);

btnMenu.forEach((node) => {
  node.addEventListener("click", handleClickMenuButton);
});

logo.addEventListener("click", (event) => {
  window.scrollTo(0, 0);
});

window.onscroll = function () {
  if (window.scrollY > navBottomPosition) {
    navBar.classList.add("scrolled", "sticky");
  } else {
    navBar.classList.remove("scrolled", "sticky");
  }
};

window.addEventListener("scroll", (event) => {
  const sections = document.querySelectorAll("section[id]");
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectiondId = current.getAttribute("id");
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;

    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      document
        .querySelector(`[data-target=${sectiondId}]`)
        .classList.add("borderBottom");
    } else {
      document
        .querySelector(`[data-target=${sectiondId}]`)
        .classList.remove("borderBottom");
    }
  });
});

function preventBuyButton(event) {
  event.preventDefault();
}

function handleClickMenuButton(e) {
  e.preventDefault();
  const elementToScrollTo = document.getElementById(
    `${e.currentTarget.dataset.target}`
  );
  elementToScrollTo.scrollIntoView();
}

// function StylesOnWidth(maxWidth, minWidth, cb) {
//   window.addEventListener("resize", () => {
//     if (w < maxWidth && w > minWidth) {
//       cb();
//     } else {
//       return;
//     }
//   });
// }

// function scrollToElement(x, y, el = window) {
//   try {
//     el.scrollTo({
//       behavior: "smooth",
//       left: y,
//       top: x,
//     });
//   } catch (error) {
//     el.scrollTo(x, y);
//   }
// }

// function IsInViewport(element) {
//   let rect = element.getBoundingClientRect();
//   let html = document.documentElement;

//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <= (window.innerHeight || html.clientHeight) &&
//     rect.right <= (window.innerWidth || html.clientWidth)
//   );
// }
