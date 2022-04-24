const { Equipo } = require('../models/index')

const buscarOCrearEquipo = async (nombre) => {
    let equipo = await Equipo.findOrCreate({
        where: { nombre: nombre },
        defaults: { nombre: nombre }
    })
    return equipo[0];
}

const buscarEquipo = async (id) => {
    let equipo = await Equipo.findOne({
        where: { equipo_id: id }
    })
    return equipo;
}

const buscarEquipos = async () => {
    let equipos = await Equipo.findAll()
    return equipos;
}

module.exports = {
    buscarOCrearEquipo,
    buscarEquipo,
    buscarEquipos
}