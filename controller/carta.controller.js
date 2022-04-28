const { request, response } = require('express');
const { buscarCartas, buscarCarta, crearCarta, actualizarCarta, borrarCarta } = require('../dao/carta.dao');

// {
//     "carta_id": 5,
//     "jugador": {
//         "jugador_id": 1,
//         "nombre": "nombre1",
//         "apellido": "apellido1",
//         "foto": "nada"
//     },
//     "posicion": {
//         "posicion_id": 1,
//         "nombre": "posicion1"
//     },
//     "serie": {
//         "serie_id": 1,
//         "fecha_emision": "2001-01-01"
//     },
//     "rareza": {
//         "rareza_id": 1,
//         "nombre": "bronce"
//     },
//     "equipo": {
//         "equipo_id": 1,
//         "nombre": "equipo1"
//     }
// }


const cartasGet = async (req = request, res = response) => {
    let cartas = await buscarCartas();
    if (cartas.length > 0) {
        res.status(200).json(cartas);
        return;
    } else {
        res.status(404).json({ message: 'No se encontraron cartas' });
        return;
    }

}




const cartaGet = async (req = request, res = response) => {
    let carta = await buscarCarta(req.params.id);
    if (carta) {
        console.log(carta);
        res.status(200).json(carta);
        return;
    } else {
        res.status(404).json({ mensaje: 'Carta no encontrada' });
        return;
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
        res.status(200).send(borrado);
        return;
    } else {
        res.status(404).json({ mensaje: 'Carta no encontrada' });
        return;
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