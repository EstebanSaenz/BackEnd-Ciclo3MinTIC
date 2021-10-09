import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

//QUERY TRAER TODOS LOS USUARIOS BD
const queryAllUsers = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection('users').find({}).limit(50).toArray(callback);
};

//AGREGAR USUARIO DB
const addUser = async (dataUser, callback) => {
  if (
        Object.keys(dataUser).includes('name') &&
        Object.keys(dataUser).includes('lastname') &&
        Object.keys(dataUser).includes('identification')&&
        Object.keys(dataUser).includes('rol')&&
        Object.keys(dataUser).includes('state')
  ) {
    const dataBase = getDB();
    // implementar código para crear usuario en la BD
    await dataBase.collection('users').insertOne(dataUser, callback);
  } else {
    return 'error';
  }
};

//TRAER USUARIO POR ID
const getUser = async (id, callback) => {
  const dataBase = getDB();
  await dataBase.collection('users').findOne({ _id: new ObjectId(id) }, callback);
};

//ACTUALIZAR USUARIO DB
const userUpdate = async (id,dataUser,callback) => {
  const userFilter = { _id: new ObjectId(id) };
  const setDataUser = {
    $set: dataUser,
  };
  const dataBase = getDB();
  await dataBase
    .collection('users')
    .findOneAndUpdate(userFilter, setDataUser, { upsert: true, returnOriginal: true }, callback);
};

//ELIMINAR USUARIO DB
const userDelete = async (id, callback) => {
  const userFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();
  await dataBase.collection('users').deleteOne(userFilter, callback);
};

export { queryAllUsers, addUser, getUser, userUpdate, userDelete };