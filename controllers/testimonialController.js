import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (request, response)=>{
    //validar el formulario
    const { nombre, correo, mensaje} = request.body;

    const regex = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje : 'El campo nombre es obligatorio'});     
    }
    if(correo.trim() === ''){
        errores.push({mensaje : 'El campo correo es obligatorio'});  
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje : 'El campo mensaje es obligatorio'});  
    }

    if(!regex.test(correo)){
        errores.push({mensaje : 'La direccion de correo no es válida'})  
    }

    //comprobar si el arreglo de errores esta vacio
    if(errores.length > 0 ){
        //consultar los testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        console.log(mensaje);
        //mostramos la vista con los errores
        response.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales,
        });

    }else{
        //si no hay erroes entonces alamcenamos los datos en la base de datos.
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            response.redirect('/testimoniales')

        } catch (error) {
            console.error(error);
        }
    }

    console.log(errores)
}

export {
    guardarTestimonial
}
