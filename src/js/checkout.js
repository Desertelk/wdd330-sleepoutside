import { getLocalStorage, updateCartCount } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart") || [];
const summaryList = document.querySelector("#order-summary-list");
const totalElement = document.querySelector("#order-total");

function renderOrderSummary() {
    if (cartItems.length === 0) {
        summaryList.innerHTML = "<li>Your cart is empty.</li>";
        totalElement.textContent = "0.00";
        return;
    }

    summaryList.innerHTML = cartItems.map((item) =>
        `<li>${item.Name} - $${Number(item.FinalPrice).toFixed(2)}</li>`
    ).join("");

    const total = cartItems.reduce((sum, item) =>
        sum + Number(item.FinalPrice),
        0,
    );

    totalElement.textContent = total.toFixed(2);
}

renderOrderSummary();
updateCartCount();