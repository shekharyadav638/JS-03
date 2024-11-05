document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let products = [];
  const itemsPerLoad = 4;
  const loadingIcon = document.createElement("div");
  loadingIcon.className = "loading-icon";
  loadingIcon.innerHTML = "Getting more products for you...";

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://fakestoreapiserver.reactbd.com/products"
      );
      products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function renderProducts(filterProducts) {
    const container = document.getElementById("list");
    const fragment = document.createDocumentFragment();

    for (
      let i = currentIndex;
      i < currentIndex + itemsPerLoad && i < filterProducts.length;
      i++
    ) {
      const product = filterProducts[i];
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
        const searchInput = document.getElementById("search");
        if (searchInput.value.length === 0) renderProducts(products);
        else filterPro();
      }, 1000);
    }
  });
  fetchProducts();

  const searchInput = document.getElementById("search");
  function filterPro() {
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue === "") {
      renderProducts(products);
      return;
    }
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
    currentIndex = 0;
    const container = document.getElementById("list");
    container.innerHTML = "";
    renderProducts(filteredProducts);
  }
  searchInput.addEventListener("keypress", () => {
    filterPro();
  });
});
