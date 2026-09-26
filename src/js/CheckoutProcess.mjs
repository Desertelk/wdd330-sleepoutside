import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];

        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((total, item) => {
            return total + Number(item.FinalPrice);
        }, 0);


        const subtotal = document.querySelector(
            `${this.outputSelector} #subtotal`,
        );

        const itemCount = document.querySelector(
            `${this.outputSelector} #item-count`,
        );

        if(subtotal) {
            subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        }

        if(itemCount) {
            itemCount.innerText = this.list.length;
        }
    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal * .06);
        if (this.list.length > 0) {
            this.shipping = 10 + (this.list.length - 1) * 2;
        } else {
            this.shipping = 0;
        }

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);

        const shipping = document.querySelector(`${this.outputSelector} #shipping`);

        const orderTotal = document.querySelector(`${this.outputSelector} #order-total`)

        if(tax) {
            tax.innerText = `$${this.tax.toFixed(2)}`;
        }

        if(shipping) {
            shipping.innerText = `$${this.shipping.toFixed(2)}`;
        }

        if(orderTotal) {
            orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
        }
    }
}