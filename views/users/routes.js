import Express from 'express';
import {
    queryAllUsers,
    addUser,
    getUser,
    userUpdate,
    userDelete
} from '../../controllers/users/controller.js';

const usersRoutes = Express.Router();

//CALLBACK GENERICO
const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los usuarios');
  } else {
    res.json(result);
  }
};

//TRAER TODOS LOS USUARIOS
usersRoutes.route('/users').get((req, res) => {
//   console.log('alguien hizo get en la ruta /vehiculos');
  queryAllUsers(genercCallback(res));
});

//CREAR NUEVO USUARIO
usersRoutes.route('/users').post((req, res) => {
    addUser(req.body, genercCallback(res));
});

//TRAER USUARIO POR ID
usersRoutes.route('/users/:id').get((req, res) => {
//   console.log('alguien hizo get en la ruta /vehiculos');
  getUser(req.params.id, genercCallback(res));
});

//EDITAR USUARIO
// usersRoutes.route('/users/update').patch((req, res) => {
//     userUpdate(req.body, genercCallback(res));
// });

//EDITAR USUARIO
usersRoutes.route('/users/:id').patch((req, res) => {
    userUpdate(req.params.id, req.body, genercCallback(res));
});

//ELIMINAR USUARIO
usersRoutes.route('/users/:id').delete((req, res) => {
    userDelete(req.params.id, genercCallback(res));
});

export default usersRoutes;