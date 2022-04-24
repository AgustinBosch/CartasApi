const { Serie } = require('../models/index')

const buscarOCrearSerie = async (fecha) => {
    let serie = await Serie.findOrCreate({
        where: { fecha_emision: fecha },
        defaults: { fecha_emision: fecha }
    })
    return serie[0];
}

const buscarSerie = async (id) => {
    let serie = await Serie.findOne({
        where: { serie_id: id }
    })
    return serie;
}

const buscarSeries = async () => {
    let series = await Serie.findAll()
    return series;
}

module.exports = {
    buscarOCrearSerie,
    buscarSerie,
    buscarSeries
}