/* 
 * Root Example : /get/products/category?filter1=Mujer&filter2=Niños
 * si se hace un get en esta ruta se debe obtener los productos 
 * que contengan alguna de los filtros especificados
 * Refactorización necesaria: en lugar de Op 'or' utilizar 'and' y recorrer
 * las diferentes categorías del producto para que se encuentren TODAS las 
 * que se cargan en el query
 * Ver como mapear el query para completar automáticamente los elementos del or del where...
 */

import { Response, Request, Router } from 'express';
import { Op } from 'sequelize';
import { Product } from '../models/Product';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
 
  console.table(req.query);
 
  try {
    //req.query empty!
    if(req.query.filter1 === undefined && req.query.filter2 === undefined) throw new Error()

    //req.query.filter1 ok!, and req.query.filter2 empty
    if(req.query.filter1 !== undefined && req.query.filter2 === undefined ) {
  
      let productFound = await Product.findAll({
        where: {
              category: req.query.filter1 },
        })

        if (productFound) return res.send(productFound);

    } else {

      //req.query.filter1 ok!, and req.query.filter2 ok!

      let productFound = await Product.findAll({
    
        where: {
        [Op.or]: [
          { category: req.query.filter1 },
          { category: req.query.filter2 },
        ]
      }})

      if (productFound) return res.send(productFound);

    }
    
    throw new Error();
  
  } catch (error) {

    res.status(404).send(`Product Categories : ${req.params.category} not found!`);
  }
});

export default router;