import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
const services = new ExternalServices();

checkout.init();

const zip = document.querySelector("#zip");

zip.addEventListener("blur", () => {
  if (zip.value.trim() !== "") {
    checkout.calculateOrderTotal();
  }
});

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await checkout.checkout(form, services);
});
