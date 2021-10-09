import Express from 'express';
import {
    queryAllProducts,
    addProduct,
    getProduct,
    productUpdate,
    productDelete
} from '../../controllers/products/controller.js';

const productsRoutes = Express.Router();

//CALLBACK GENERICO
const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los productos');
  } else {
    res.json(result);
  }
};

//TRAER TODOS LOS PRODUCTOS
productsRoutes.route('/products').get((req, res) => {
//   console.log('alguien hizo get en la ruta /products');
queryAllProducts(genercCallback(res));
});

//CREAR NUEVO PRODUCTOS
productsRoutes.route('/products').post((req, res) => {
    addProduct(req.body, genercCallback(res));
});

//TRAER PRODUCTO POR ID
productsRoutes.route('/products/:id').get((req, res) => {
//   console.log('alguien hizo get en la ruta /products');
getProduct(req.params.id, genercCallback(res));
});

//EDITAR PRODUCTO
// usersRoutes.route('/users/update').patch((req, res) => {
//     userUpdate(req.body, genercCallback(res));
// });

//EDITAR PRODUCTO
productsRoutes.route('/products/:id').patch((req, res) => {
    productUpdate(req.params.id, req.body, genercCallback(res));
});

//ELIMINAR PRODUCTO
productsRoutes.route('/products/:id').delete((req, res) => {
    productDelete(req.params.id, genercCallback(res));
});

export default productsRoutes;