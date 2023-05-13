const socketClient = io();

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputCategory = document.getElementById("category");
const inputStock = document.getElementById("stock");
const inputThumbnails = document.getElementById("thumbnails");


form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const code = inputCode.value;
    const category = inputCategory.value;
    const stock = inputStock.value;
    const thumbnails = inputThumbnails.value;

    socketClient.emit("newProduct", { title, description, price, code, category, stock, thumbnails });
    return true;
};

//Aca se recibe el array con los productos agregados y se van enlistando o mostrando en pantalla debajo del formulario:
socketClient.on("getProducts", (products) => {
  let data = "";

  products.forEach((product) => {
    data += `
        <div style="width: 90%; border: 2px solid black; display: flex; justify-content: space-between; align-items: center; margin: 20px auto; background-color: #A3E4D7; box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75)">
           <div style="font-family: 'Exo 2', sans-serif; font-size: 1.5em; margin: 5px 0 5px 30px; padding-left: 10px; letter-spacing:1.3px">
                <p>Nombre del producto: ${product.title}</p>
                <p>Descripción: ${product.description}</p>
                <p>Precio: $ ${product.price}</p>
                <p>Código del producto: ${product.code}</p>
                <p>Categoría del producto: ${product.category}</p>
                <p>Stock del producto: ${product.stock}</p>
                <div style="display: flex; align-self: flex-start">
                    <button style="font-family: 'Exo 2', sans-serif; border: none; padding:5px 10px; margin: 10px; color: white; font-weigth: bolder; font-size: 1.15em; background-color: red" onclick="deleteProduct(${product.id})">Eliminar</button>
                </div>
           </div>
           <div style="margin: 10px 40px 10px 0">
                <img src="${product.thumbnails}" alt="${product.description}" style="width: 14em; height: 12em">
           </div>
        </div>
    `;
  });

  const productList = document.getElementById("products");
  productList.innerHTML = data;
});

socketClient.on("deleteProduct", (id) => {
  const productElement = document.getElementById(id);
  if (productElement) {
    productElement.remove();
  }
});

function deleteProduct(id) {
  socketClient.emit("deleteProduct", id);
}
