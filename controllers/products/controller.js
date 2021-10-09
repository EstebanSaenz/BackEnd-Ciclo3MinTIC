
import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

//QUERY TRAER TODOS LOS USUARIOS BD
const queryAllProducts = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection('products').find({}).limit(50).toArray(callback);
};

//AGREGAR USUARIO DB
const addProduct = async (dataProduct, callback) => {
  if (
        Object.keys(dataProduct).includes('name') &&
        Object.keys(dataProduct).includes('lastname') &&
        Object.keys(dataProduct).includes('identification')&&
        Object.keys(dataProduct).includes('rol')&&
        Object.keys(dataProduct).includes('state')
  ) {
    const dataBase = getDB();
    // implementar código para crear usuario en la BD
    await dataBase.collection('products').insertOne(dataProduct, callback);
  } else {
    return 'error';
  }
};

//TRAER USUARIO POR ID
const getProduct = async (id, callback) => {
  const dataBase = getDB();
  await dataBase.collection('products').findOne({ _id: new ObjectId(id) }, callback);
};

//ACTUALIZAR USUARIO DB
const productUpdate = async (id,dataProduct,callback) => {
  const productFilter = { _id: new ObjectId(id) };
  const setDataProduct = {
    $set: dataProduct,
  };
  const dataBase = getDB();
  await dataBase
    .collection('products')
    .findOneAndUpdate(productFilter, setDataProduct, { upsert: true, returnOriginal: true }, callback);
};

//ELIMINAR USUARIO DB
const productDelete = async (id, callback) => {
  const productFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();
  await dataBase.collection('products').deleteOne(productFilter, callback);
};

export { queryAllProducts, addProduct, getProduct, productUpdate, productDelete };