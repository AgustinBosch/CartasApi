const { Rareza } = require('../models/index')

const buscarOCrearRareza = async (nombre) => {
    let rareza = await Rareza.findOrCreate({
        where: { nombre: nombre },
        defaults: { nombre: nombre }
    })
    return rareza[0];
}

const buscarRareza = async (id) => {
    let rareza = await Rareza.findOne({
        where: { rareza_id: id }
    })
    return rareza;
}

const buscarRarezas = async () => {
    let rarezas = await Rareza.findAll()
    return rarezas;
}

module.exports = {
    buscarOCrearRareza,
    buscarRareza,
    buscarRarezas

}