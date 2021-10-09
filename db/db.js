import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

//VARIABLES DE ENTORNO
dotenv.config({ path: './.env' });

//STRING DE CONEXION BASE DE DATOS MONGO
const stringConexion = process.env.DATABASE_URL;

//CLIENTE PARA LA PETICION DE CONEXION DB
const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dataBase;

//CONEXION DATABASE MONGO
const dataBaseConnection = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    dataBase = db.db('marketPlace');
    console.log('Database connection successful!');
    return callback();
  });
};

const getDB = () => {
  return dataBase;
};

export { dataBaseConnection, getDB };