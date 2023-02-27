import express from 'express';
import { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje } from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js'


//En Express.js, el Router es un objeto que nos permite crear rutas modularizadas y manejarlas de manera separada. En otras palabras, nos permite dividir nuestras rutas en grupos y mantenerlos en diferentes archivos para que sea más fácil de administrar y mantener el código.'
const router = express.Router();

//definiendo las rutas de nuestra aplicacion.
router.get('/', paginaInicio)
router.get('/', paginaInicio)

router.get('/nosotros', paginaNosotros )

router.get('/viajes', paginaViajes)
router.get('/viajes/:slug', paginaDetalleViaje)

router.get('/testimoniales', paginaTestimoniales)
router.post('/testimoniales', guardarTestimonial)
router.get('/testimoniales', guardarTestimonial)


export default router;