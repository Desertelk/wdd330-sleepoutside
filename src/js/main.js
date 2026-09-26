import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ExternalServices("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();
updateCartCount();
