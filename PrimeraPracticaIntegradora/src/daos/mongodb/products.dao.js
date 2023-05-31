import { ProductsModel } from "./models/products.model.js";

export default class ProductsDaoMongo {

  async getProducts(limit) {
    try {
      const response = await ProductsModel.find({}).limit(limit);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async checkDuplicateCode (code) {
    try {
      const existingProduct = await ProductsModel.findOne({ code });
      return existingProduct;
    } catch (error) {
      console.log(error);
    }
  };

  async addProduct(obj) {
    try {
      const response = await ProductsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      await ProductsModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

}
