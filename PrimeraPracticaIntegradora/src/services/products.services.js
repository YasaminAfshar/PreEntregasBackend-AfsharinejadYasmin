import ProductsDaoMongo from "../daos/mongodb/products.dao.js";
const productsManager = new ProductsDaoMongo();

//import ProductDaoFs from "../daos/filesystem/products.dao.js";
//const productsManager = new ProductDaoFs();


export const getAllProductsService = async (limit) => {
  try {
    const docs = await productsManager.getProducts(limit);
    return docs;
  } catch (error) {
        console.log(error);
  }
};

export const getProductByIdService = async (id) => {
  try {
    const doc = await productsManager.getProductById(id);
    if (!doc)return(`The product you are searching width ID ${id} could not be found!`);
    else return doc;
  } catch (error) {
        console.log(error);
  }
};

export const checkDuplicateCode = async (code) =>{
    try {
        const doc = await productsManager.checkDuplicateCode(code);
        if (doc) {
          throw new Error (`There is already a product with the code ${code}!`);
        }
    } catch (error) {
        console.log(error);
    }
}  

export const addProductService = async (obj) => {
  try {
    const newProduct = await productsManager.addProduct(obj);
    if (!newProduct)
      throw new Error(
        "There is an error created because one of the fields is missing or invalid"
      );
    else return newProduct;
  } catch (error) {
        console.log(error);
  }
};

export const updateProductService = async (
  id, obj ) => {
  try {
    const doc = await productsManager.getProductById(id);
    if (!doc) {
      return (`The product you are searching width ID ${id} could not be found!`);
    } else {
      const prodUpdated = await productsManager.updateProduct(
        id,
        obj
      );
      return prodUpdated;
    }
  } catch (error) {
        console.log(error);
  }
};

export const deletProductService = async (id) => {
  try {
    const doc = await productsManager.getProductById(id);

    if (!doc) {
      return `The product you are searching width ID ${id} could not be found!`;
    } else {
      const deleated = await productsManager.deleteProduct(id);
      return `The product width ID ${id} was deleted successfully!` + deleated;
    }
  } catch (error) {
    console.log(error);
  }
};

