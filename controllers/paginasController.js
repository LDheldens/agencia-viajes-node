import { Viaje }  from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';


const paginaInicio = async (request, response)=>{
    
    //Creando un arreglo que va a contemnr nuestras dos funciones asincronas
    const promiseDb = []
        
    promiseDb.push(Viaje.findAll({ limit: 3}))
    promiseDb.push(Testimonial.findAll( {limit: 3} ))

    try {
        //de esta forma ejecuntamos las dos funciones al mismo tiempo.
        const resultado = await Promise.all(promiseDb)

        //entre llaves como sintaxis de objeto le pasamos diferentes valores a las vistas.
        response.render('inicio', {
            pagina : 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        
    }

}

const paginaNosotros = (request, response)=>{
    response.render('nosotros', {
        pagina : 'Nosotros'
    });
}

const paginaViajes = async (request, response)=>{
    //Consultar a la BD
    const viajes = await Viaje.findAll()
    console.log(viajes)
    
    response.render('viajes', {
        pagina : 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (request, response)=>{
    try {
        const testimoniales = await Testimonial.findAll();
        
        response.render('testimoniales', {
            pagina : 'Testimoniales',
            testimoniales
    });

    } catch (error) {
        console.error(error);
    }
    
}

//muestra un viaje por su slug
const paginaDetalleViaje = async (request, response)=>{
    console.log(request.params);
    const { slug } = request.params

    try {
        const resultado = await Viaje.findOne({ where : { slug } });
        console.log(resultado);
        response.render('viaje', {
            pagina : 'Información viaje',
            resultado
        });

    } catch (error) {
        console.log(error);
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}