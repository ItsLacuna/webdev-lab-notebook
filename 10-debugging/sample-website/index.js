const moreInfoButtons = document.querySelectorAll(".more-info-button");

for (const moreInfoButton of moreInfoButtons) {
  moreInfoButton.addEventListener("click", (event) => {
    const popupSection = event.currentTarget.parentElement.nextElementSibling;
    popupSection.style.display = "block";
  });
}

const closePopupButtons = document.querySelectorAll(".close-popup-button");

for (const closePopupButton of closePopupButtons) {
  closePopupButton.addEventListener("click", (event) => {
    console.log(event.target);
    const popupSection =
      event.currentTarget.parentElement.parentElement.parentElement;
    popupSection.style.display = "none";
  });
}

const createLoadingContainer = function () {
  const loadingContainer = document.querySelector(".loading-container");
  loadingContainer.classList.remove("display-none");
  loadingContainer.replaceChildren();
  const loader = document.createElement("img");
  loader.src = "../../images/loader.gif";
  loader.alt = "loader gif while the data loads";
  loader.width = 60;
  loader.height = 60;
  loadingContainer.append(loader);
};

const fetchCatFacts = async function () {
  const catFactsList = document.getElementById("cat-facts-list");
  catFactsList.replaceChildren();

  createLoadingContainer();

  try {
    const responses = await Promise.all(
      Array.from({ length: 10 }, () =>
        fetch("https://catfact.ninja/fact", { cache: "no-store" }),
      ),
    );

    const facts = await Promise.all(
      responses.map((response) => response.json()),
    );

    facts.forEach((element) => {
      const catFactItem = document.createElement("p");
      catFactItem.setAttribute("class", "cat-fact-list-item");
      catFactItem.textContent = element.fact;
      catFactsList.append(catFactItem);
    });
  } catch (error) {
    console.error("Error fetching cat facts:", error);
  } finally {
    const loading = document.querySelector(".loading-container");
    loading.classList.add("display-none");
  }
};

fetchCatFacts();

document
  .querySelector(".reload-cat-facts")
  .addEventListener("click", fetchCatFacts);
