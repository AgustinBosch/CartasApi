const { Posicion } = require('../models/index')

const buscarOCrearPosicion = async (nombre) => {
    let posicion = await Posicion.findOrCreate({
        where: { nombre: nombre },
        defaults: { nombre: nombre }
    })
    return posicion[0];
}

const buscarPosicion = async (id) => {
    let posicion = await Posicion.findOne({
        where: { posicion_id: id }
    })
    return posicion;
}

const buscarPosiciones = async () => {
    let posiciones = await Posicion.findAll()
    return posiciones;
}

module.exports = {
    buscarOCrearPosicion,
    buscarPosicion,
    buscarPosiciones
}