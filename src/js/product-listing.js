import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const search = getParam("search");

const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

let searchTerm = "";

if (search) {
  searchTerm = search.toLowerCase().trim();
  document.querySelector("h2").textContent = `Search Results: ${search}`;
} else {
  searchTerm = category;
  document.querySelector("h2").textContent =
    `Top Products: ${categoryNames[category]}`;
}

const dataSource = new ExternalServices(category);
const listElement = document.querySelector(".product-list");

const productList = new ProductList(searchTerm, dataSource, listElement);
productList.init();
