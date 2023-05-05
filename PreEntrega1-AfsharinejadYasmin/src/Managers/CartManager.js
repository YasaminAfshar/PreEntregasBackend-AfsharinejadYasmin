
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

  async getCartById(id) {
    try {
        const cartFile = await this.getAllCart();
        const cartFind = cartFile.find((cart) => cart.id === id);

        if (cartFind) {
          return cartFind.products;
        } else {
          return false;
        }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, id) {
    try {
        const findCart = await this.getCartByID(cid);
        if (findCart) {
            const productExist = findCart.products.find((product) => product.id === id)
            if (productExist) {
                productExist.quantity++;
            } else {
                const newCart = {
                    quantity: 1,
                    product: id
                }
                findCart.products.push(newCart);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(newCart));
            return findCart;
        } else {
            throw Error("The cart you are searching for does not exist!");
        }
        
    } catch (error) {
      console.log(error);
    }
  }

}