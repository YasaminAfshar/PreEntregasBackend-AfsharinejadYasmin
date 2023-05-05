
import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCart() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJS = JSON.parse(carts);
        return cartsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
        const cart = {
            id: (await this.#newId()) + 1,
            products: []
        };
        const cartFile = await this.getAllCart();
        cartFile.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile));
        return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async #newId() {
    const cartFile = await this.getAllCart();

    let min = 0;
    cartFile.map((cart) => {
      if (cart.id > min) {
        min = cart.id;
      }
    });
    return min;
  }

  async getCartById(cid) {
    try {
        const cartFile = await this.getAllCart();
        const cartFind = cartFile.find((cart) => cart.id === cid);

        if (cartFind) {
          return cartFind;
        } else {
          return false;
        }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
        const findCart = await this.getCartById(cid);
        if (findCart) {
            const productExist = findCart.products.find((product) => product.id === pid)
            if (productExist) {
                productExist.quantity++;
            } else {
                const newProd = {
                    quantity: 1,
                    product: pid
                }
                findCart.products.push(newProd);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(newProd));
            return findCart;
        } else {
            throw new Error("The cart you are searching for does not exist!");
        }
        
    } catch (error) {
      console.log(error);
    }
  }

}