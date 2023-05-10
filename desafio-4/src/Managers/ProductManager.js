
import fs from 'fs';
import { __dirname } from "../path.js";

export default class ProductManager {
  constructor() {
    this.pathFile = __dirname + "/fs/products.json";
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.pathFile)) {
        const products = await fs.promises.readFile(this.pathFile, "utf-8");
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(
    title,
    description,
    price,
    thumbnails,
    code,
    category,
    stock,
    status = true
  ) {
    try {
      const productFile = await this.getProducts();
      const existCode = productFile.find((product) => product.code === code);

      if (!existCode) {
        const product = {
          id: (await this.#newId()) + 1,
          title,
          description,
          price,
          thumbnails,
          code,
          category,
          stock,
          status,
        };

        productFile.push(product);
        await fs.promises.writeFile(this.pathFile, JSON.stringify(productFile));
        return product;
      } else {
        return `There is already a product with the code ${code}`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #newId() {
    const productFile = await this.getProducts();

    let min = 0;
    productFile.map((product) => {
      if (product.id > min) {
        min = product.id;
      }
    });
    return min;
  }

  async getProductById(id) {
    try {
      const productFile = await this.getProducts();
      const productFind = productFile.find((product) => product.id === id);

      if (productFind) {
        return productFind;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }


  async updateProduct(id, updateFile) {
    try {
      const productFile = await this.getProducts();
      const findProduct = productFile.findIndex((product) => product.id === id);
      console.log(findProduct);

      if (findProduct === -1) {
        throw new Error(`¡The requested id ${id} does not exist!`);
      } else {
        const {code} = updateFile;
        const existCode = productFile.find((product) => product.code === code && product.id !== id);

        if (!existCode) {
           const updateData = {
             ...productFile[findProduct],
             ...updateFile,
           };
           productFile[findProduct] = updateData;
        } else {
          return(`¡The product code ${code} already exists in another product!`);
        }
        await fs.promises.writeFile(
          this.pathFile,
          JSON.stringify(productFile, null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(pid) {
    try {
      const productFile = await this.getProducts();
      const findProduct = productFile.findIndex(
        (product) => product.id === pid
      );

      if (findProduct !== -1) {
        productFile.splice(findProduct, 1);
        await fs.promises.writeFile(this.pathFile, JSON.stringify(productFile));
        return `¡Removed product with id ${pid} successfully!`;
      } else {
        throw new Error(`¡The request id ${pid} does not exist!`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProducts() {
    try {
      if (fs.existsSync(this.pathFile)) {
        await fs.promises.unlink(this.pathFile);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

