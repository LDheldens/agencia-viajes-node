import { Sequelize } from "sequelize";
import db from "../config/db.js";

//se definen cada uno de los campos con lo s que cuenta tu base de datos.
export const Testimonial = db.define('testimoniales', {
    nombre:{
        type:Sequelize.STRING
    },
    correo:{
        type:Sequelize.STRING
    },
    mensaje:{
        type:Sequelize.STRING
    }
});

