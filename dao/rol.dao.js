const { Rol } = require('../models/index')

const buscarOCrearRol = async (nombre) => {
    let rol = await Rol.findOrCreate({
        where: { nombre: nombre },
        defaults: { nombre: nombre }
    })
    return rol[0];
}

const buscarRol = async (id) => {
    let rol = await Rol.findOne({ where: { rol_id: id } });
    return rol;
}


module.exports = {
    buscarOCrearRol,
    buscarRol
}