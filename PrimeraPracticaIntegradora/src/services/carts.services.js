import CartsDaoMongo from "../daos/mongodb/carts.dao.js";
const cartsManager = new CartsDaoMongo();

//import CartDaoFs from "../daos/filesystem/carts.dao.js";
//const cartsManager = new CartDaoFs();

export const getCartsAllService = async () => {
  try {
    const docs = await cartsManager.getAllCart();
    return docs;
  } catch (error) {
        console.log(error);
  }
};

export const getCartByIdService = async (cid) => {
  try {
    const doc = await cartsManager.getCartById(cid);
    if (!doc)
      return `The cart you are searching width ID ${cid} could not be found!`;
    else return doc;
  } catch (error) {
        console.log(error);
  }
};

export const createCartService = async () =>{
    try {
        const doc = await cartsManager.createCart();
        return doc;
    } catch (error) {
        console.log(error);
    }
};

export const addCProductToCartService = async (cid, pid) =>{
    try {
        const doc = await cartsManager.addProductToCart(cid, pid);
        return doc;
    } catch (error) {
        console.log(error);
    }
};