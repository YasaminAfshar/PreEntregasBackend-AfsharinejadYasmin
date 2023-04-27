
const fs = require("fs");

class ProductManager {

  constructor() {
    this.path = "./productos.json";
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
            id: await this.#newId() + 1,
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

      return !productFind
        ? console.error(`¡Id n° ${id} del producto not found!`)
        : console.log(`¡Id n° ${id} del producto encontrado!:`, productFind);
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
        console.log(`¡Se ha eliminado el producto cuyo id es ${productId} exitosamente!`);
      } else {
        console.log(`¡El id ${productId} del producto solicitado no existe!`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//Se genera la instancia de ProductManager:
const instancia = new ProductManager();

async function test () {
  const result1 = await instancia.getProducts();
  console.log("Se realiza la primera consulta del array de productos: ", result1)
  //Se agregar productos al carrito, en caso que ya existan aparecerá el mensaje:
  await instancia.addProduct(
    "Adidas",
    "Zapatillas marca adidas color negro",
    15000,
    "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d641f18ab0144d80b6a9abb10116a6ce_9366/Zapatillas_Breaknet_Negro_FX8708_01_standard.jpg",
    "A625BV"
  );
  await instancia.addProduct(
    "Nike",
    "Zapatillas marca nike color blanco",
    18000,
    "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e777c881-5b62-4250-92a6-362967f54cca/calzado-air-force-1-07-b19lqD.png",
    "A684GY"
  );
  await instancia.addProduct(
    "Puma",
    "Zapatillas marca puma color rojo",
    25000,
    "https://static.dafiti.com.ar/p/puma-2111-734339-1-product.jpg",
    "A762TR"
  );
  //Se agrega un producto pero con campos incompletos para que salte el mensaje de que faltan completar los campos: 
   await instancia.addProduct(
     "Vans",
     "Zapatillas marca vans para hombre color celeste",
     "https://grimoldimediamanager.grimoldi.com/MediaFiles/Grimoldi/2023/2/7/8077306.jpg",
   );

  const result2 = await  instancia.getProducts();
  console.log("Se realiza una segunda consulta tras haber agregado productos al carrito: ", result2);

  //Acá se consulta si existen productos segun el id:
  await instancia.getProductById(1);
  await instancia.getProductById(5);
  await instancia.getProductById(3);

  //Se elige uno de los productos para realizar cambios:
  await instancia.updateProduct(3, {price: 14000, stock: 50})
  const result3 = await instancia.getProducts();
  console.log(
    "Se realiza una tercera consulta tras haber actualizado datos del producto seleccionado: ",
    result3
  );

  //Se elige uno de los productos para eliminar de nuestro array:
  await instancia.deleteProduct(2);
  await instancia.deleteProduct(4);
  const result4 = await instancia.getProducts();
  console.log(
    "Se realiza una cuarta consulta tras haber eliminado el producto seleccionado del array: ",
    result4
  );
}

test();