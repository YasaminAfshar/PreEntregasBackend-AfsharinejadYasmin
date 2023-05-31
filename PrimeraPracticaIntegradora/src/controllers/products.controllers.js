import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deletProductService,
  checkDuplicateCode,
} from "../services/products.services.js";

export const getProductController = async (req, res, next) => {
  try {
    /*const docs = await getAllService();
    const { limit } = req.query;
    const productsLimit = docs.slice(0, parseInt(limit));
    if (!limit) {
      res.status(200).send(docs);
    } else {
      res.status(200).send(productsLimit);
    } */
    const { limit } = req.query;
    const docs = await getAllProductsService(limit);
    res.status(200).send(docs);
    
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const docs = await getProductByIdService(id);
    
    res.status(200).send(docs);
  } catch (error) {
    next(error);
  }
};

export const addProductController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      status = true
    } = req.body;

    await checkDuplicateCode(code);
    
    const newDoc = await addProductService({
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      status,
    });
    res.status(201).json(newDoc);
  
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      status,
    } = req.body;
    await getByIdService(id);

    const prodUpdated = await updateProductService(id, {
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      status,
    });
    res.status(200).send(prodUpdated);
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productDeleted = await deletProductService(id);
    res.status(200).send(productDeleted);
  } catch (error) {
    next(error);
  }
};










