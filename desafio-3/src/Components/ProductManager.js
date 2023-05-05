
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

  async addProduct(title, description, price, thumbnail, code, stock = 1000) {
    try {
      //Forma de validar que todos los campos son obligatorios
      if (!title || !description || !price || !thumbnail || !code) {
        return console.error("¡Todos los campos son obligatorios!");
      } else {
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
            stock,
          };

          productFile.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        } else {
          console.log(`Ya existe un producto con el código ${code}`);
        }
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

      if(productFind){
        return productFind;
      } else{
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(productId, updateFile) {
    try {
      const productFile = await this.getProducts();
      const findProduct = productFile.findIndex(
        (product) => product.id === productId
      );

      if (findProduct !== -1) {
        const updateData = {
          ...productFile[findProduct],
          ...updateFile,
        };

        productFile[findProduct] = updateData;
        await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        console.log("¡Se ha realizado los cambios exitosamente!: ", updateData);
      } else {
        console.log(`¡El id ${productId} del producto solicitado no existe!`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(productId) {
    try {
      const productFile = await this.getProducts();
      const findProduct = productFile.findIndex(
        (product) => product.id === productId
      );

      if (findProduct !== -1) {
        productFile.splice(findProduct, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        console.log(
          `¡Se ha eliminado el producto cuyo id es ${productId} exitosamente!`
        );
      } else {
        console.log(`¡El id ${productId} del producto solicitado no existe!`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
}

