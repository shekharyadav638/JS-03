document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let products = [];
  let toHide = false;
  const itemsPerLoad = 6;
  const loadingIcon = document.createElement("div");
  loadingIcon.className = "loading-icon";
  loadingIcon.innerHTML = `<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="loading">`;
  const category = document.getElementById("category");
  const searchInput = document.getElementById("search");

  async function generateCategories() {
    const url = "https://dummyjson.com/products/category-list";
    const response = await fetch(url);
    let categories = await response.json();

    const option = document.createElement("option");
    option.textContent = "All";
    category.appendChild(option);

    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      category.appendChild(option);
    });
  }

  category.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    fetchProducts(searchInput.value, selectedCategory);
  });

  async function fetchProducts(searchTerm = "", category = "") {
    try {
      let url;
      if (searchTerm) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          searchTerm
        )}`;
      } else if (category) {
        if (category === "All") url = "https://dummyjson.com/products";
        else
          url = `https://dummyjson.com/products/category/${encodeURIComponent(
            category
          )}`;
      } else {
        url = "https://dummyjson.com/products";
      }

      const response = await fetch(url);
      products = await response.json();
      currentIndex = 0;
      document.getElementById("list").innerHTML = "";
      renderProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function renderProducts(filterProducts) {
    filterProducts = filterProducts.products;
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
                      <img class="image" src="${product.thumbnail}" alt="${product.title}">
                      <h2 class="title">${product.title}</h2>
                        <p class="price">$${product.price}</p>
                  `;
      fragment.appendChild(card);
    }
    container.appendChild(fragment);
    currentIndex += itemsPerLoad;
    if (currentIndex >= filterProducts.length) toHide = true;
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
      if (toHide) {
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
  generateCategories();
  function filterPro() {
    const searchValue = searchInput.value.trim().toLowerCase();
    fetchProducts(searchValue);
  }

  let debounceTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      filterPro();
    }, 300);
  });
});
