// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';

const app = Express();

app.use(Express.json());

app.listen(5000, () => {
  console.log('escuchando puerto 5000');
});