
import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

//QUERY TRAER TODAS LAS VENTAS BD
const queryAllSales = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection('sales').find({}).limit(50).toArray(callback);
};

//AGREGAR VENTA DB
const addSale = async (dataSale, callback) => {
  if (
        Object.keys(dataSale).includes('id_product') &&
        Object.keys(dataSale).includes('quantityProduct') &&
        Object.keys(dataSale).includes('priceProduct')&&
        Object.keys(dataSale).includes('saleValue')&&
        Object.keys(dataSale).includes('date')&&
        Object.keys(dataSale).includes('clientName')&&
        Object.keys(dataSale).includes('id_client')&&
        Object.keys(dataSale).includes('seller')&&
        Object.keys(dataSale).includes('state')
  ) {
    const dataBase = getDB();
    // implementar código para crear venta en la BD
    await dataBase.collection('sales').insertOne(dataSale, callback);
  } else {
    return 'error';
  }
};

//TRAER VENTA POR ID
const getSale = async (id, callback) => {
  const dataBase = getDB();
  await dataBase.collection('sales').findOne({ _id: new ObjectId(id) }, callback);
};

//ACTUALIZAR VENTA DB
const saleUpdate = async (id,dataSale,callback) => {
  const saleFilter = { _id: new ObjectId(id) };
  const setDataSale= {
    $set: dataSale,
  };
  const dataBase = getDB();
  await dataBase
    .collection('sales')
    .findOneAndUpdate(saleFilter, setDataSale, { upsert: true, returnOriginal: true }, callback);
};

//ELIMINAR VENTA DB
const saleDelete = async (id, callback) => {
  const saleFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();
  await dataBase.collection('sales').deleteOne(saleFilter, callback);
};

export { queryAllSales, addSale, getSale, saleUpdate, saleDelete };