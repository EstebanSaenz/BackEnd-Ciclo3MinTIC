import Express from 'express';
import {
  queryAllSales,
  addSale,
  getSale,
  saleUpdate,
  saleDelete
} from '../../controllers/sales/controller.js';

const salesRoutes = Express.Router();

//CALLBACK GENERICO
const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando las Ventas');
  } else {
    res.json(result);
  }
};

//TRAER TODOS LAS VENTAS
salesRoutes.route('/sales').get((req, res) => {
//   console.log('alguien hizo get en la ruta /sales');
queryAllSales(genercCallback(res));
});

//CREAR NUEVA VENTA
salesRoutes.route('/sales').post((req, res) => {
    addSale(req.body, genercCallback(res));
});

//TRAER PRODUCTO POR ID
salesRoutes.route('/sales/:id').get((req, res) => {
//   console.log('alguien hizo get en la ruta /products');
getSale(req.params.id, genercCallback(res));
});

//EDITAR SALE
// salesRoutes.route('/sales/update').patch((req, res) => {
//     saleUpdate(req.body, genercCallback(res));
// });

//EDITAR PRODUCTO
salesRoutes.route('/sales/:id').patch((req, res) => {
    saleUpdate(req.params.id, req.body, genercCallback(res));
});

//ELIMINAR PRODUCTO
salesRoutes.route('/sales/:id').delete((req, res) => {
    saleDelete(req.params.id, genercCallback(res));
});

export default salesRoutes;