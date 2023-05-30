import {
  getAllService,
  getByIdService,
  addService,
  updateService,
  deleteService,
  checkDuplicateCode
} from "../services/products.services.js";

export const getController = async (req, res, next) => {
  try {
    const docs = await getAllService();
    const { limit } = req.query;
    const productsLimit = docs.slice(0, parseInt(limit));
    if (!limit) {
      res.status(200).send(docs);
    } else {
      res.status(200).send(productsLimit);
    }
  } catch (error) {
    next(error);
  }
};

export const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const docs = await getByIdService(id);
    
    res.status(200).send(docs);
  } catch (error) {
    next(error);
  }
};

export const addController = async (req, res, next) => {
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
    
    const newDoc = await addService({
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

export const updateController = async (req, res, next) => {
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

    const prodUpdated = await updateService(id,{
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

export const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productDeleted = await deleteService(id);
    res.status(200).send(productDeleted);
  } catch (error) {
    next(error);
  }
};










