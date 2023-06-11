import { CartsModel } from "./models/carts.model.js";
import { ProductsModel } from "./models/products.model.js";
export default class CartsDaoMongo {
  async getAllCart() {
    try {
      const response = await CartsModel.find({}).populate("product.product");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      const response = await CartsModel.findById(cid).populate(
        "product.product"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const findCart = await CartsModel.findById(cid);
      const allProducts = await ProductsModel.find();
      const findProduct = allProducts.find((prod) => prod.id === pid);

      if (!findProduct) {
        throw new Error(`¡The requested product id ${pid} does not exist!`);
      } else {
        if (findCart) {
          const productExist = findCart.product.find(
            (product) => product.product === pid
          );
          if (!productExist) {
            const newProd = {
              quantity: 1,
              product: pid,
            };
            findCart.product.push(newProd);
            await findCart.save();
            await CartsModel.findByIdAndUpdate(
              { _id: cid },
              { $set: findCart }
            );
            return findCart;
          } else {
            const indexProduct = findCart.product.findIndex(
              (elemento) => elemento.product === pid
            );
            findCart.product[indexProduct].quantity += 1;
            await findCart.save();
            await CartsModel.findByIdAndUpdate(
              { _id: cid },
              { $set: findCart }
            );
            return findCart;
          }
        } else {
          throw new Error("The cart you are searching for does not exist!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  } 


  async deleteProductFromCart(cid, pid) {
    try {
      const findCart = await CartsModel.findById(cid);

      if (findCart) {
        const productIndex = findCart.product.findIndex(
          (product) => product.product === pid
        );
        if (productIndex !== -1) {
          findCart.product.splice(productIndex, 1);
          await findCart.save();

          await CartsModel.findByIdAndUpdate(cid, {
            $pull: { product: { product: pid } },
          });
          return findCart;
        } else {
          throw new Error(
            "The product you are searching for does not exist in the cart!"
          );
        }
      } else {
        throw new Error("The cart you are searching for does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductToCart(cid) {
    try {
      const findCart = await CartsModel.findById(cid);
      if (findCart) {
        findCart.product = [];
        await findCart.save();
        return findCart;
      } else {
        throw new Error("The cart you are searching for does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}