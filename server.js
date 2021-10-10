// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { dataBaseConnection } from './db/db.js';
import usersRoutes from './views/users/routes.js';
import productsRoutes from './views/products/routes.js'
import salesRoutes from './views/sales/routes.js';

//VARIABLES DE ENTORNO
dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());

//USE PARA LAS RUTAS
app.use(usersRoutes);
app.use(productsRoutes);
app.use(salesRoutes);


const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Listening at the port ${process.env.PORT}!`);
  });
};

dataBaseConnection(main);