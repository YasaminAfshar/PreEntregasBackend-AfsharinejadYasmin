
class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, stock=1000) {
      const product = {
        id: this.newId() + 1,
        title,
        description,
        price,
        thumbnail,
        stock,
      };

      //Forma de validar que todos los campos son obligatorios
      if ((!title, !description, !price, !thumbnail)) {
        return console.error("¡Todos los campos son obligatorios!");
      } else {
        return this.products.push(product);
      }
    }

    newId(){
        let min = 0;
        this.products.map(product => {
            if (product.id > min) {
                min = product.id;
            } 
        });
        return min;
    }

    getProductById(id){
        const searchId = this.products.find(product => product.id === id);
       
        return !searchId
          ? console.error("¡Id del producto not found!")
          : console.log("¡Id del producto encontrado!: ", searchId);
    }

}

const instancia1 = new ProductManager();

console.log(instancia1.getProducts());

instancia1.addProduct(
  "Adidas",
  "Zapatillas marca adidas color negro",
  15000,
  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d641f18ab0144d80b6a9abb10116a6ce_9366/Zapatillas_Breaknet_Negro_FX8708_01_standard.jpg"
);

instancia1.addProduct(
  "Nike",
  "Zapatillas marca nike color blanco",
  18000,
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e777c881-5b62-4250-92a6-362967f54cca/calzado-air-force-1-07-b19lqD.png"
);


instancia1.addProduct(
  "Puma",
  "Zapatillas marca puma color rojo",
  25000,
  "https://static.dafiti.com.ar/p/puma-2111-734339-1-product.jpg"
);


//Como alguno de los campos esta vacio aparecerá primero el mensaje de que los campos son obligatorios y ese producto no se agregará al carrito 
instancia1.addProduct(
  "Remera simple zara",
  "",
  14800,
  ""
);


console.log(instancia1.getProducts());
instancia1.getProductById(2);
instancia1.getProductById(3);
instancia1.getProductById(5);
instancia1.getProductById(6);