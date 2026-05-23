const pokemonColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#eb625d",
  poison: "#ea7ce8",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#907fa7",
  dragon: "#8b61f7",
  dark: "#272727",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// Add your code here
const createNewElement = function (data) {
  const { name: pokemonName } = data;
  const { front_default: pokemonImage } =
    data.sprites.other["official-artwork"];

  const pokemonTypeArr = data.types.map((item) => item.type.name);

  const card = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const typesDiv = document.createElement("div");

  h2.textContent = pokemonName;
  img.src = pokemonImage;
  img.alt = `${pokemonName}`;
  img.width = "240";
  img.height = "240";

  card.setAttribute("class", "poke-card");

  card.append(h2, img);

  pokemonTypeArr.forEach((type) => {
    const typeSpan = document.createElement("span");
    typeSpan.textContent = type;
    typeSpan.style.backgroundColor = pokemonColors[type] || "#777";
    typeSpan.classList.add("pokemon-type");
    typeSpan.classList.add(type);
    typesDiv.appendChild(typeSpan);
  });

  card.append(typesDiv);
  return card;
};

const fetchData = async function () {
  const url = "https://pokeapi.co/api/v2/pokemon/bulbasaur";

  const pokeList = document.querySelector(".poke-list");
  try {
    const response = await fetch(url);
    const bodyData = await response.json();

    console.log(bodyData);

    const elem = createNewElement(bodyData);
    pokeList.append(elem);
  } catch (error) {
    console.error("Error fetching data from PokeAPI:", error);
    const errorElement = document.createElement("p");
    errorElement.textContent =
      "Failed to load Pokémon data. Please try again later.";
    errorElement.setAttribute("class", "error-message");
    pokeList.appendChild(errorElement);
  } finally {
    console.log("Fetch attempt completed.");
    const loading = document.querySelector(".loading-container");
    loading.setAttribute("class", "display-none");
  }
};

// fetchData();

const fetchDataAll = async function () {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=250&offset=0";

  const pokeList = document.querySelector(".poke-list");
  try {
    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = data.results;

    console.log(data.results);

    const promises = pokemonList.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => res.json())
        .catch((error) => {
          console.error(`Error fetching data for ${pokemon.name}:`, error);
          return null;
        }),
    );

    const pokemonData = await Promise.all(promises);
    pokemonData.forEach((pokemon) => {
      const elem = createNewElement(pokemon);
      pokeList.append(elem);
    });

    // const elem = createNewElement(bodyData);
    // pokeList.append(elem);
  } catch (error) {
    console.error("Error fetching data from PokeAPI:", error);
    const errorElement = document.createElement("p");
    errorElement.textContent =
      "Failed to load Pokémon data. Please try again later.";
    errorElement.setAttribute("class", "error-message");
    pokeList.appendChild(errorElement);
  } finally {
    console.log("Fetch attempt completed.");
    const loading = document.querySelector(".loading-container");
    loading.setAttribute("class", "display-none");
  }
};

fetchDataAll();
