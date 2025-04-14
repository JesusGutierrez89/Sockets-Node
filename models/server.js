require('dotenv').config()
const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        

        this.paths = {}

        //midlewares
        this.midlewares();


        //Rutas de mi aplicacion
        this.routes();

        //Sockets
        this.sockets();
    }

    async concectarDB() {
        await dbConnection();
    }
    midlewares() {
        //Directorio publico
        this.app.use(express.static('public'));

        this.app.use(cors());
        //fileupload - carga de archivos

    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth'));



    }
    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

module.exports = Server;