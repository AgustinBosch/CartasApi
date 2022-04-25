const { request, response } = require('express');
const { buscarUsuario, crearUsuario, actualizarUsuario, borrarUsuario, aniadirCartaAUser, removerCartaAUser } = require('../dao/usuario.dao')

// {
//     "usuario_id": 6,
//     "nombre_usuario": "robert",
//     "contrasena": "123",
//     "email": "123",
//     "rol": {
//         "rol_id": 1,
//         "nombre": "administrador"
//     },
//     "cartas": []
// }

const usuarioGet = async (req = request, res = response) => {
    let id = req.params.id;
    let u = await buscarUsuario(id);
    if (u) {
        res.status(200).json(u);
        return;
    } else {
        res.status(404).json({ mensaje: 'No se encontro el usuario' });
        return;
    }
}

const usuarioPost = async (req = request, res = response) => {
    let { nombre_usuario, contrasena, email, rol } = req.body;

    if (!usuarioValido(nombre_usuario, contrasena, email, rol)) {
        res.status(400).json({ mensaje: 'Usuario no valido' });
        return;
    }

    let u = await crearUsuario(nombre_usuario, contrasena, email, rol.rol_id);

    if (!u) {
        res.status(404).json({ mensaje: 'Rol no valido' });
        return;
    }

    res.status(201).json(u);
    return;
}

const usuarioPut = async (req = request, res = response) => {
    let { usuario_id, nombre_usuario, contrasena, email, rol } = req.body;

    if (!usuarioValido(nombre_usuario, contrasena, email, rol)) {
        res.status(400).json({ mensaje: 'Usuario no valido' });
        return;
    }
    let u = await actualizarUsuario(usuario_id, nombre_usuario, contrasena, email, rol.rol_id);

    if (!u) {
        res.status(404).json({ mensaje: 'No se encontro el usuario o el rol' });
        return;
    }

    res.status(200).json(u);
    return;

}

const usuarioDelete = async (req = request, res = response) => {
    let id = req.params.id;
    let borrado = await borrarUsuario(id);
    if (borrado) {
        res.status(200).json({ mensaje: 'Usuario borrado' });
        return;
    } else {
        res.status(404).json({ mensaje: 'No se encontro el usuario' });
        return;
    }
}

const aniadirCarta = async (req = request, res = response) => {
    let { usuario_id, carta_id } = req.body;
    let u = await aniadirCartaAUser(usuario_id, carta_id);
    if (u) {
        res.status(200).json(u);
        return;
    } else {
        res.status(404).json({ mensaje: 'No se encontro el usuario o la carta' });
        return;
    }
}

const removerCarta = async (req = request, res = response) => {
    let { usuario_id, carta_id } = req.body;
    let u = await removerCartaAUser(usuario_id, carta_id);
    if (u) {
        res.status(200).json(u);
        return;
    } else {
        res.status(404).json({ mensaje: 'No se encontro el usuario o la carta' });
        return;
    }
}

const usuarioValido = (nombre_usuario, contrasena, email, rol) => {
    let valido = false;
    try {
        if (nombre_usuario && contrasena && email && rol.rol_id) {
            valido = true;
        }
    } finally {
        return valido;
    }
}


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    aniadirCarta,
    removerCarta
}