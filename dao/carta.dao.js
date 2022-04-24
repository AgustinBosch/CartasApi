const { Carta, Jugador, Posicion, Serie, Rareza, Equipo } = require('../models/index');
const { buscarJugador } = require('./jugador.dao');
const { buscarSerie } = require('./serie.dao');
const { buscarRareza } = require('./rareza.dao');
const { buscarEquipo } = require('./equipo.dao');
const { buscarPosicion } = require('./posicion.dao');

const toCarta = (carta_id, jugadorObjeto, posicionObjeto, serieObjeto, rarezaObjeto, equipoObjeto) => {
    return {
        carta_id: carta_id,
        jugador: jugadorObjeto,
        posicion: posicionObjeto,
        serie: serieObjeto,
        rareza: rarezaObjeto,
        equipo: equipoObjeto
    }
}

// carta de ejemplo
//
// {
//     carta_id = 1,
//     jugador = { jugador_id: 1, nombre: 'Juan', apellido: 'Perez' },
//     posicion = {posicion_id: 1, nombre: 'Delantero' },
//     serie = { serie_id: 1, fecha_emision: '01/01/2020' },
//     rareza = { rareza_id: 1, nombre: 'Comun' },
//     equipo = { equipo_id: 1, nombre: 'Equipo 1' }
// }



const buscarCartas = async () => {
    let cartas = await Carta.findAll({ attributes: ['carta_id'], include: [Jugador, Posicion, Serie, Rareza, Equipo] });
    return cartas.map(carta => toCarta(carta.carta_id, carta.Jugador, carta.Posicion, carta.Serie, carta.Rareza, carta.Equipo));
}


const buscarCarta = async (carta_id) => {
    let carta = await Carta.findOne({ where: { carta_id: carta_id }, attributes: ['carta_id'], include: [Jugador, Posicion, Serie, Rareza, Equipo] });
    if (carta) {
        carta = toCarta(carta.carta_id, carta.Jugador, carta.Posicion, carta.Serie, carta.Rareza, carta.Equipo);
    }
    return carta
}


const crearCarta = async (jugador_id, posicion_id, serie_id, rareza_id, equipo_id) => {

    let j = await buscarJugador(jugador_id);
    let p = await buscarPosicion(posicion_id);
    let s = await buscarSerie(serie_id);
    let r = await buscarRareza(rareza_id);
    let e = await buscarEquipo(equipo_id);
    let carta;

    // si no existe alguno de los objetos, devuelve null
    if (j && p && s && r && e) {
        carta = await Carta.create({
            jugador_id: jugador_id,
            posicion_id: posicion_id,
            serie_id: serie_id,
            rareza_id: rareza_id,
            equipo_id: equipo_id
        });

        carta = toCarta(carta.carta_id, j, p, s, r, e);
    }

    return carta
}




const actualizarCarta = async (id, jugador_id, posicion_id, serie_id, rareza_id, equipo_id) => {
    let carta = await Carta.findOne({ where: { carta_id: id } });
    let newCarta;

    // si no existe carta con ese id, devuelve null
    if (!carta) {
        return newCarta;
    }


    // busco si existen los objetos a actualizar
    let j = await buscarJugador(jugador_id);
    let p = await buscarPosicion(posicion_id);
    let s = await buscarSerie(serie_id);
    let r = await buscarRareza(rareza_id);
    let e = await buscarEquipo(equipo_id);

    // si no existe alguno de los objetos, devuelve null
    if (!j || !p || !s || !r || !e) {
        return newCarta;
    }

    // actualizo la carta
    carta.set({
        jugador_id: jugador_id,
        posicion_id: posicion_id,
        serie_id: serie_id,
        rareza_id: rareza_id,
        equipo_id: equipo_id
    });

    await carta.save();

    newCarta = toCarta(carta.carta_id, j, p, s, r, e);

    return newCarta;
}


//si encuentra la carta, la borra y devuelve el id de la carta borrada
const borrarCarta = async (carta_id) => {
    let borrado = 0;
    let carta = await Carta.findOne({ where: { carta_id: carta_id } });
    if (carta) {
        await Carta.destroy({ where: { carta_id: carta_id } });
        borrado = carta_id;
    }
    return borrado;
}


module.exports = {
    toCarta,
    buscarCartas,
    buscarCarta,
    crearCarta,
    actualizarCarta,
    borrarCarta
}