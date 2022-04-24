const { request, response } = require('express');
const { buscarCartas, buscarCarta, crearCarta, actualizarCarta, borrarCarta } = require('../dao/carta.dao');

// {
//     "jugador":{
//         "nombre":"pepe",
//         "apellido":"perez"
//     },
//     "posicion":"delantero",
//     "serie":{
//         "fecha_emision":"2020-02-12"
//     },
//     "rareza":"roberto",
//     "equipo":"boca"
// }



const cartasGet = async (req = request, res = response) => {
    let cartas = await buscarCartas();
    if (cartas.length > 0) {
        res.status(200).json(cartas);
    } else {
        res.status(404).json({ message: 'No se encontraron cartas' });
    }

}




const cartaGet = async (req = request, res = response) => {
    let carta = await buscarCarta(req.params.id);
    if (carta) {
        console.log(carta);
        res.status(200).json(carta);
    } else {
        res.status(404).json({ mensaje: 'Carta no encontrada' });
    }
}




const cartaPost = async (req = request, res = response) => {
    let { jugador, posicion, serie, rareza, equipo } = req.body;

    if (!cartaValida(jugador, posicion, serie, rareza, equipo)) {
        res.status(400).json({ mensaje: 'Carta no valida' });
        return;
    }

    let carta = await crearCarta(
        jugador.jugador_id,
        posicion.posicion_id,
        serie.serie_id,
        rareza.rareza_id,
        equipo.equipo_id
    );

    if (!carta) {
        res.status(404).json({ mensaje: 'No existen valores' });
        return;
    }

    res.status(201).json(carta);
    return;

}



const cartaPut = async (req = request, res = response) => {
    let { carta_id = 0, jugador, posicion, serie, rareza, equipo } = req.body;

    if (!cartaValida(jugador, posicion, serie, rareza, equipo)) {
        res.status(400).json({ mensaje: 'Carta no valida' });
        return;
    }

    let carta = await actualizarCarta(
        carta_id,
        jugador.jugador_id,
        posicion.posicion_id,
        serie.serie_id,
        rareza.rareza_id,
        equipo.equipo_id
    );

    if (!carta) {
        res.status(404).json({ mensaje: 'No existe carta con ese id o no existen valores' });
        return;
    }

    res.status(200).json(carta);
    return;

}




const cartaDelete = async (req = request, res = response) => {
    let id = req.params.id;
    let borrado = await borrarCarta(id);
    if (borrado) {
        res.status(200).json({ mensaje: 'Carta borrada' });
    } else {
        res.status(404).json({ mensaje: 'Carta no encontrada' });
    }
}



const cartaValida = (jugador, posicion, serie, rareza, equipo) => {
    let valida = false;
    try {
        if (jugador.jugador_id && posicion.posicion_id && serie.serie_id && rareza.rareza_id && equipo.equipo_id) {
            valida = true;
        }
    } finally {
        return valida;
    }
}


module.exports = {
    cartasGet,
    cartaGet,
    cartaPost,
    cartaPut,
    cartaDelete
}