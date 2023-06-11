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
    //const doc = await cartsManager.getCartById(Number(cid));
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

export const addProductToCartService = async (cid, pid) =>{
    try {
        const doc = await cartsManager.addProductToCart(cid, pid);
        //const doc = await cartsManager.addProductToCart(Number(cid), Number(pid));
        return doc;
    } catch (error) {
        console.log(error);
    }
};


export const deleteProductToCartService = async (cid) => {
  try {
    const doc = await cartsManager.deleteProductToCart(cid);
    //const doc = await cartsManager.deleteProductToCart(Number(cid));
    return doc;
  } catch (error) {
    console.log(error);
  }
};


export const deleteProductFromCartService = async (cid, pid) => {
  try {
    const doc = await cartsManager.deleteProductFromCart(cid, pid);
    //const doc = await cartsManager.deleteProductFromCart(Number(cid), Number(pid));
    return doc;
  } catch (error) {
    console.log(error);
  }
};

