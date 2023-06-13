import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
  checkDuplicateCode
} from "../services/products.services.js";



export const getProductController = async (req, res, next) => {
  try {
    /*const docs = await getAllProductsService();
    const { limit } = req.query;
    const productsLimit = docs.slice(0, parseInt(limit));
    if (!limit) {
      res.status(200).send(docs);
    } else {
      res.status(200).send(productsLimit);
    }  */

    let { page, limit, sort, filter } = req.query;
    page == null ? (page = 1) : (page = page);
    const result = await getAllProductsService(page, limit, sort, filter);
    const prevPageLink = result.hasPrevPage
      ? `http://localhost:8080/api/products?page=${result.prevPage}`
      : null;
    const nextPageLink = result.hasNextPage
      ? `http://localhost:8080/api/products?page=${result.nextPage}`
      : null;
    res.json({
      status: result ? "success" : "error",
      payload: result.docs,
      info: {
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        currPage: Number(page),
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPageLink,
        nextPageLink,
      },
    });
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
    await getProductByIdService(id);

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
    const productDeleted = await deleteProductService(id);
    res.status(200).send(productDeleted);
  } catch (error) {
    next(error);
  }
};










