
//Se realizan las importaciones de archivos:

import express from "express";
import ProductManager from "./Components/ProductManager.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 8080;
const productManager = new ProductManager("./products.json");

//Acá agrego productos para que las rutas puedan funcionar:
async function test (){
     await productManager.addProduct(
       "Pack de 6 unidades Agujas Laneras",
       "Paquete de 6 agujas laneras para tejer",
       "390",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764508/MULTIMEDIA/img/accesorios/aguajs-laneras_ty9vpz.webp",
       "A10BCD"
     );
     await productManager.addProduct(
       "20 Ganchitos de puntos de plástico",
       "Ganchitos de puntos para tejer, utilizarlo como marcador",
       "410",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764509/MULTIMEDIA/img/accesorios/marcadores-normal_aqqkio.webp",
       "A11BCD"
     );
     await productManager.addProduct(
       "Set de 18 agujas, tejido circular",
       "Set de 18 agujas, tejido circular",
       "3950",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764510/MULTIMEDIA/img/accesorios/set-18-agujas-circular_xhm5xg.webp",
       "A12BCD"
     );
     await productManager.addProduct(
       "Protector de punta para agujas pack 4 unidades",
       "Protector de punta para agujas de tejer en forma de cono",
       "555",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764509/MULTIMEDIA/img/accesorios/protector-punta_xjdtqi.webp",
       "A13BCD"
     );
     await productManager.addProduct(
       "Agujas Doble Punta x 5 unidades",
       "Agujas Doble Punta cortas de Acero Inoxidable. Pack de 5 agujas de la misma medida",
       "535",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764508/MULTIMEDIA/img/accesorios/agujas-doblepunta_q5a16o.webp",
       "A14BCD"
     );
     await productManager.addProduct(
       "Set de 13 Agujas de Crochet con mango silicona",
       "Set de 13 Agujas de Crochet con Mango de Silicona",
       "5638",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764511/MULTIMEDIA/img/accesorios/set-13_sqdfgh.webp",
       "A15BCD"
     );
     await productManager.addProduct(
       "Regla SKC medidora de ovillo y agujas",
       "Regla SKC Ideal para medir calibre de lanas hilos y agujas",
       "550",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764509/MULTIMEDIA/img/accesorios/reglaSKC_mv8gi8.webp",
       "A16BCD"
     );
     await productManager.addProduct(
       "Kit de 4 Telares Rectos de plástico",
       "Kit de 4 Telares rectos de diferentes tamaños",
       "8745",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764511/MULTIMEDIA/img/accesorios/telar-recto_vxhrql.webp",
       "A17BCD"
     );
     await productManager.addProduct(
       "Aguja Latch Hook de Crochet, Curva P/ Lana",
       "Aguja Curva de Metal con Mango de Madera, ideal para hacer tapices y alfombras",
       "490",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764508/MULTIMEDIA/img/accesorios/aguja-Latch_h6rqtq.webp",
       "A18BCD"
     );
     await productManager.addProduct(
       "Ovillador devanador madejero",
       "Excelente ovillador devanador para lanas e hilos",
       "12270",
       "https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676764510/MULTIMEDIA/img/accesorios/ovillero_rpdyen.webp",
       "A19BCD"
     );
}

test();


app.get('/products', async (req, res) => {
try {
    const products = await productManager.getProducts();
    const {limit} = req.query;
    const productsLimit = products.slice(0, parseInt(limit));
    if (!limit) {
      res.status(200).json(products);
    } else {
      res.status(200).json(productsLimit);
    }

} catch (error) {
    res.status(404).json({ message: error.message });
    console.error(error);
}
})


app.get('/products/:pid', async (req, res) => {
  try {
    const {pid}= req.params;
    const products = await productManager.getProductById(Number(pid));
    if(products){
        res.status(200).json({message: `Producto cuyo id es ${pid} fue encontrado: `, products});
    } else {
        res.status(404).send(`Producto cuyo id es ${pid} no fue encontrado`)
    } 
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});


app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT} todo OK`);
});

