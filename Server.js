const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        this.cartasPath = '/api/cartas';
        this.infoPath = '/api/info';

        this.configuration();
        this.routes();
    }

    configuration() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {

        this.app.use(this.usuariosPath, require('./routes/usuario.routes'));
        this.app.use(this.cartasPath, require('./routes/carta.routes'));
        this.app.use(this.infoPath, require('./routes/info.routes'));
    }

    listen() {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.puerto}`);
        });
    }
}

module.exports = Server;