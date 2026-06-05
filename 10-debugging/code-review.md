## Code Review Exercise

Write your code review here in markdown format.

### Issue #1: Button Functionality

The issue, why this is an issue, and the solution:

The button issue is the buttons meant for clearing the form or submitting the form are located outside the form. A button that is relevant to a form should be located inside the label as well as be functional. To fix this issue we moved the button div container containing submit and reset button inside of the form and now it correctly works as expected.

Old Code

```
      <form>
        // Form Code
      </form>
      <div
        class="form space-evenly-distributed-row-container form-buttons-container"
      >
        <input class="form-button" type="submit" value="submit" />
        <input class="form-button" type="reset" value="reset" />
      </div>
```

New Code

```
      <form>
        // Form Code
        <div
          class="form space-evenly-distributed-row-container form-buttons-container"
        >
          <input class="form-button" type="submit" value="submit" />
          <input class="form-button" type="reset" value="reset" />
        </div>
      </form>
```

### Issue #2: Button Functionality + Static Facts

The issue, why this is an issue, and the solution:

Primary issue was that the button would simply clear the fact list displayed on the page and fail to load any new facts. It also would load facts in a static way that a user refreshing the page would continously repeat through the same facts until they got through all the old facts they already had read. To fix this we switch the javascript from the old one static request to multiple random fact requests so clicking the button would generate a new fresh set of cat facts from catfact.ninja/facts.

Old Code

```
const fetchCatFacts = async function () {
  const catFactsList = document.getElementById('cat-facts-list');
  catFactsList.replaceChildren();

  createLoadingContainer();

  try {
    const response = await fetch('https://catfact.ninja/facts?limit=10');
    const data = await response.json();

    data.data.forEach((element) => {
      const catFactItem = document.createElement('p');
      catFactItem.setAttribute('class', 'cat-fact-list-item');
      catFactItem.textContent = element.fact;
      catFactsList.append(catFactItem);
    });
  } catch (error) {
    console.error('Error fetching cat facts:', error);
  } finally {
    const loading = document.querySelector('.loading-container');
    loading.setAttribute('class', 'display-none');
  }
};
```

New Code

```
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
```
