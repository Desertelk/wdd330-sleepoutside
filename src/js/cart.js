import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="remove-item" data-id="${item.Id}">X</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images?.PrimaryMedium || item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${(item.FinalPrice * (item.Quantity || 1)).toFixed(2)}</p>
</li>`;

  return newItem;
}

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

function removeCartItem(event) {
  const productId = event.target.dataset.id;

  const cartItems = getLocalStorage("so-cart") || [];
  const itemIndex = cartItems.findIndex((item) => item.Id === productId);

  if (itemIndex === -1) {
    return;
  }

  if ((cartItems[itemIndex].Quantity || 1) > 1) {
    cartItems[itemIndex].Quantity -= 1;
  } else {
    cartItems.splice(itemIndex, 1);
  }

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
  updateCartCount();
}

renderCartContents();
updateCartCount();
