document.addEventListener("DOMContentLoaded", () => {
  let products = [];
  let currentIndex = 0;
  const itemsPerLoad = 4;
  const loadingIcon = document.createElement("div");
  loadingIcon.className = "loading-icon";
  loadingIcon.innerHTML = "Loading...";

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://fakestoreapiserver.reactbd.com/products"
      );
      products = await response.json();
      renderProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function renderProducts() {
    const container = document.getElementById("list");
    const fragment = document.createDocumentFragment();

    for (
      let i = currentIndex;
      i < currentIndex + itemsPerLoad && i < products.length;
      i++
    ) {
      const product = products[i];
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                  <img class="image" src="${product.image}" alt="${product.title}">
                  <h2 class="title">${product.title}</h2>
              `;
      fragment.appendChild(card);
    }

    container.appendChild(fragment);
    currentIndex += itemsPerLoad;
  }

  function showLoadingIcon() {
    const container = document.getElementById("list");
    container.appendChild(loadingIcon);
  }

  function hideLoadingIcon() {
    loadingIcon.remove();
  }

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (currentIndex >= products.length) {
        hideLoadingIcon();
        return;
      }
      showLoadingIcon();
      setTimeout(() => {
        hideLoadingIcon();
        renderProducts();
      }, 1000);
    }
  });

  fetchProducts();
});
