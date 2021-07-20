import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario:'',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    
    const [error, actualizarError] = useState(false);

    // Funcion que se ejecuta cada vez que el usuario escribe en el input
    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }
    // Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario envia el formulario
    const submitCita = e => {
        e.preventDefault();

        // validación
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }
        // Elimina el mensaje de error
        actualizarError(false);
    
        // Asignar un ID utilizando uuid
        cita.id = uuidv4();

        // Crear la cita
        crearCita(cita);
        // Reiniciar el formulario
        actualizarCita({
            mascota: '',
            propietario:'',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    } 
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error 
            ? <p className="alerta-error">Todos los campos son necesarios</p>
            
            : null
            }
            <form
                onSubmit={submitCita}
            >
                <label htmlFor="">Nombre de la Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label htmlFor="">Nombre del Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={handleChange}
                    value={propietario}
                />
                <label htmlFor="">Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />
                <label htmlFor="">Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />
                <label htmlFor="">Razón de la Consulta</label>
                <textarea
                    className="u-full-width" 
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Enviar</button>
            </form>
        </Fragment>
    );
}
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
}

export default Formulario;