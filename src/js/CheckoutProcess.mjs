import { getLocalStorage } from "./utils.mjs";

function packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1,
        }));
    }

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

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

    async checkout(form, externalServices) {
        const order = formDataToJSON(form);

        const [year, month] = order.expiration.split("-");
        order.expiration = `${Number(month)}/${year.slice(-2)}`;
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.shipping = this.shipping;
        order.tax = this.tax.toFixed(2);
        order.items = packageItems(this.list);

        return externalServices.checkout(order);
    }
}