const { buscarRol } = require('./rol.dao')
const { toCarta } = require('./carta.dao')
const { Usuario, Rol, Carta, Jugador, Posicion, Serie, Rareza, Equipo } = require('../models/index')

const toUsuario = (usuario_id, nombre_usuario, contrasena, email, rolObjeto, cartas) => {
    return {
        usuario_id: usuario_id,
        nombre_usuario: nombre_usuario,
        contrasena: contrasena,
        email: email,
        rol: rolObjeto,
        cartas: cartas.map(c => toCarta(c.carta_id, c.Jugador, c.Posicion, c.Serie, c.Rareza, c.Equipo))
    }
}

const buscarUsuario = async (id) => {
    let u = await Usuario.findOne({
        where: { usuario_id: id },
        include: [
            { model: Rol },
            { model: Carta, attributes: ["carta_id"], include: [Jugador, Posicion, Serie, Rareza, Equipo] }]
    });
    if (u) {
        u = toUsuario(u.usuario_id, u.nombre_usuario, u.contrasena, u.email, u.Rol, u.Carta);
    }
    return u
}

const crearUsuario = async (nombre_usuario, contrasena, email, rol_id) => {
    let rol = await buscarRol(rol_id);
    let u;

    if (!rol) {
        return u;
    }

    u = await Usuario.create({ nombre_usuario: nombre_usuario, contrasena: contrasena, email: email, rol_id: rol.rol_id });
    return toUsuario(u.usuario_id, u.nombre_usuario, u.contrasena, u.email, rol, u.Carta);

}


const actualizarUsuario = async (id, nombre_usuario, contrasena, email, rol_id) => {
    let usr = await Usuario.findOne({ where: { usuario_id: id } }, { include: [Rol, Carta] });
    let rol = await buscarRol(rol_id);
    let newUsr;

    if (!usr || !rol) {
        return newUsr;
    }

    usr.set({
        nombre_usuario: nombre_usuario,
        contrasena: contrasena,
        email: email,
        rol_id: rol_id
    });

    await usr.save();
    //cartas
    newUsr = toUsuario(usr.usuario_id, usr.nombre_usuario, usr.contrasena, usr.email, rol, usr.Carta);

    return newUsr;
}

const borrarUsuario = async (id) => {
    let borrado = 0;
    let u = await Usuario.findOne({ where: { usuario_id: id } });
    if (u) {
        await Usuario.destroy({ where: { usuario_id: id } });
        borrado = id;
    }
    return borrado;
}


const aniadirCartaAUser = async (usuario_id, carta_id) => {
    let usr = await Usuario.findOne({
        where: { usuario_id: usuario_id }, include: [
            { model: Rol },
            { model: Carta, attributes: ["carta_id"], include: [Jugador, Posicion, Serie, Rareza, Equipo] }]
    });
    let carta = await Carta.findOne({
        where: { carta_id: carta_id },
        include: [Jugador, Posicion, Serie, Rareza, Equipo]
    });


    if (usr && carta) {
        usr.addCarta(carta);
        usr.Carta.push(carta);
        usr = toUsuario(usr.usuario_id, usr.nombre_usuario, usr.contrasena, usr.email, usr.Rol.nombre, usr.Carta);
    }
    return usr
}

const removerCartaAUser = async (usuario_id, carta_id) => {
    let usr = await Usuario.findOne({ where: { usuario_id: usuario_id }, include: [Rol, Carta] });
    let carta = await Carta.findOne({ where: { carta_id: carta_id } });

    if (usr && carta) {
        usr.removeCarta(carta);
        usr = toUsuario(usr.usuario_id, usr.nombre_usuario, usr.contrasena, usr.email, usr.Rol.nombre, usr.Carta);
    }
    return usr
}




module.exports = {
    buscarUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    aniadirCartaAUser,
    removerCartaAUser
}