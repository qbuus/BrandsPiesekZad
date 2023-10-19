const productsContainer = document.querySelector(".products");
const mainProductContainer = document.querySelector("#product");
const loader = document.querySelector(".loader");
let page = 1;
let pageNumber = page;
let totalItems;
let pageSize;
let limit = 99;
let maxPage;
let selValue;
let isFetching = false;
let currentPage = 1;
let itemsArray = [];
let allItemsArray = [];

// miało być zbieranie select'a z localStorage (wartości)
// żeby po reloadzie strony zapamiętało
// setter został usunięty w funkcji ze scrollem
const localStorageSelectAmount = localStorage.getItem(
  "default_amount_of_products"
);

const selectValue = document.querySelector("#product-amount");

// const throttle = (callback, time) => {
//   throttleTimer = true;

//   setTimeout(() => {
//     callback();
//     throttleTimer = false;
//   }, time);
// };

// @@ Funkcja fetch'u danych z api @@
const productsFetchHandler = (pageSize) => {
  // private field
  const apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${currentPage}&pageSize=${pageSize}`;

  //   let result = "";

  /* 
  ajax promise async fetch.
  Użyłem fetch api zamiast np xml request lub z jquery albo axios
  */

  isFetching = true;

  fetch(apiUrl)
    .then((response) => response.json())
    .then(function (products) {
      let arrToConcat = [];
      arrToConcat = [...products.data];
      itemsArray = [...arrToConcat];

      if (allItemsArray.length === 0) {
        allItemsArray = [...products.data];
      } else {
        allItemsArray = [...allItemsArray, ...products.data];
      }

      UpdateContainer(itemsArray);
      pageSize = products.pageSize;
      pageNumber = products.pageNumber;
      totalItems = products.totalItems;
      maxPage = Math.ceil(totalItems / pageSize);
      arrToConcat = [];
      itemsArray = [];
      UpdateModalData();
      currentPage++;
      isFetching = false;
    })
    .catch(function (error) {
      result = `<div class="error">Wystąpił błąd</div>`;
    });

  isFetching = false;
};

// fetch after section is present
// window.addEventListener("scroll", () => {
//   if (isFetching) return;

//   const productSection = document.getElementById("product");

//   const sectionHeight = productSection.offsetHeight;
//   const sectionTop = productSection.offsetTop - 50;

//   if (
//     scrollY > sectionTop &&
//     scrollY <= sectionTop + sectionHeight
//   ) {
//     if (selValue) {
//       productsFetchHandler(selValue);
//     } else {
//       productsFetchHandler();
//     }
//   }
//   // brak fetch'a jeśli wcześniej już pokazano produkty
//   // by się nie resetowało do wartośći wejściowej
// });

// pierwsze dane z api schodzą dopiero po osiągnieciu sekcji produktów
// oraz po dobicią do dołu strony tak jak w zadaniu
window.addEventListener("scroll", () => {
  if (isFetching) return;

  const sectionTop =
    document.getElementById("product").offsetTop;

  const endOfPage =
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight;

  const startOfSection = scrollY > sectionTop;

  if (endOfPage && startOfSection) {
    selValue
      ? productsFetchHandler(selValue)
      : productsFetchHandler(20);
  }
});

// fetch na zmiane wartości w selekcie
document
  .querySelector("#product-amount")
  .addEventListener("change", (e) => {
    if (Boolean(parseInt(e.target.value))) {
      selValue = e.target.value;

      // reset produktów po zmianie wartości w select
      currentPage = 1;
      itemsArray = [];
      RemoveAllChildNodes(productsContainer);
      productsFetchHandler(selValue);
      //   localStorage.setItem(
      //     "default_amount_of_products",
      //     e.target.value
      //   );
    } else {
      let invalidInputError = document.createElement("div");
      invalidInputError.classList.add("error");
      invalidInputError.textContent = "Niepoprawna wartość";

      if (
        mainProductContainer.querySelector(".error") !== null
      ) {
        return;
      } else {
        mainProductContainer.prepend(invalidInputError);
      }
    }
  });

// tworzenie osobnego kontenera dla produktu
function UpdateContainer(products) {
  products.map((item) => {
    const itemEl = document.createElement("div");
    itemEl.dataset.modalNum = item.id;
    itemEl.classList.add("product");
    itemEl.innerHTML = `ID: ${item.id}`;
    productsContainer.appendChild(itemEl);
  });
}

// update danych w modalu poprzez index + pokaznie modalu
function UpdateModalData() {
  document.querySelectorAll(".product").forEach((item) => {
    item.addEventListener("click", (e) => {
      const foundItem =
        allItemsArray[e.currentTarget.dataset.modalNum - 1];

      // wstrzykiwanie danych do modalu
      document.querySelector(
        ".modal-container-id"
      ).textContent = `ID: ${foundItem.id}`;
      document.querySelector(
        ".modal-container-name"
      ).textContent = `Nazwa: ${foundItem.name}`;
      document.querySelector(
        ".modal-container-value"
      ).textContent = `Value: ${foundItem.value}`;

      // pokazywanie modalu
      document
        .querySelector(".modal")
        .classList.remove("hidden");
      document
        .querySelector(".backdrop")
        .classList.remove("hidden");
    });
  });
}

// usuwanie child node'a
function RemoveAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/* 
usunięte bo sprawiało problemy z infinite scrollem.
Cała funkcjonalność itemy pojawiające się od sekcji +
doczytanie po dojechaniu do końca strony
ominąłem poprzez zmiejszenie wstępnej wysokości sekcji
produktów na min 85vh
*/

// fetch after section is present
// window.addEventListener("scroll", () => {
//   if (isFetching) return;

//   const productSection = document.getElementById("product");

//   const sectionHeight = productSection.offsetHeight;
//   const sectionTop = productSection.offsetTop - 50;

//   if (
//     scrollY > sectionTop &&
//     scrollY <= sectionTop + sectionHeight
//   ) {
//     if (selValue) {
//       productsFetchHandler(selValue);
//     } else {
//       productsFetchHandler();
//     }
//   }
//   // brak fetch'a jeśli wcześniej już pokazano produkty
//   // by się nie resetowało do wartośći wejściowej
// });
