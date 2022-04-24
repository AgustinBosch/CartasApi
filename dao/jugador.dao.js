const { Jugador } = require('../models/index')

const buscarOCrearJugador = async (nombre, apellido, foto = "nada") => {
    let jugador = await Jugador.findOrCreate({
        where: { nombre: nombre, apellido: apellido },
        defaults: { nombre: nombre, apellido: apellido, foto: foto }
    })
    return jugador[0];
}

const buscarJugador = async (id) => {
    let jugador = await Jugador.findOne({
        where: { jugador_id: id }
    })
    return jugador;
}

const buscarJugadores = async () => {
    let jugadores = await Jugador.findAll()
    return jugadores;
}

module.exports = {
    buscarOCrearJugador,
    buscarJugador,
    buscarJugadores
}