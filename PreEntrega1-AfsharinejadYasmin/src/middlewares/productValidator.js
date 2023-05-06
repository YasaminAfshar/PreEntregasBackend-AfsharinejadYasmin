
export const productValidator = (req,res,next) => {
    const product = req.body;
    if (
      (!product.title || typeof product.title !== 'string' ) ||
      (!product.description || typeof product.description !== 'string') ||
      (product.price === undefined || typeof product.price !== 'number')||
      (!product.code || typeof product.code !== 'string') ||
      (!product.category || typeof product.category !== 'string') ||
      (product.stock === undefined || typeof product.stock !== 'number')
    ) {
      res
        .status(400)
        .send({ status: "error", error: "All fields are required or some of the fields are incorrect, please check them out!" });
    } else {
        next();
    }
}