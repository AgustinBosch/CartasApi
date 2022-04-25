const { buscarEquipos } = require('../dao/equipo.dao');
const { buscarSeries } = require('../dao/serie.dao');
const { buscarRarezas } = require('../dao/rareza.dao');
const { buscarPosiciones } = require('../dao/posicion.dao');
const { buscarJugadores } = require('../dao/jugador.dao');


const infoGetAll = async (req, res) => {
    let equipos = await buscarEquipos();
    let series = await buscarSeries();
    let rarezas = await buscarRarezas();
    let posiciones = await buscarPosiciones();
    let jugadores = await buscarJugadores();


    let info = {
        equipos: equipos,
        series: series,
        rarezas: rarezas,
        posiciones: posiciones,
        jugadores: jugadores
    }

    res.status(200).json(info);
    return;
}


module.exports = {
    infoGetAll
}