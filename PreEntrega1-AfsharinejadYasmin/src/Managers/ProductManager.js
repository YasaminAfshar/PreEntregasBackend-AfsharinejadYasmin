
import fs from 'fs';

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title,description,price,thumbnail,code,category,stock,status = true) {
    try {
      const productFile = await this.getProducts();
      const existCode = productFile.find((product) => product.code === code);

      if (!existCode) {
        const product = {
          id: (await this.#newId()) + 1,
          title,
          description,
          price,
          thumbnail,
          code,
          category,
          stock,
          status
        };

        productFile.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productFile));
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
      const findProduct = productFile.findIndex(
        (product) => product.id === id
      );
        console.log(findProduct)
      if (findProduct === -1) {
        throw new Error(`¡The requested id ${id} does not exist!`);
      } else {
        const updateData = {
          ...productFile[findProduct],
          ...updateFile,
        };
         productFile[findProduct] = updateData;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(productFile));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productFile = await this.getProducts();
      const findProduct = productFile.findIndex(
        (product) => product.id === id
      );

      if (findProduct !== -1) {
        productFile.splice(findProduct, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        return `¡Removed product with id ${id} successfully!`;
      } else {
        throw new Error(
          `¡El id ${id} del producto solicitado no existe!`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProducts() {
    try {
      if (fs.existsSync(this.path)) {
        await fs.promises.unlink(this.path);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

