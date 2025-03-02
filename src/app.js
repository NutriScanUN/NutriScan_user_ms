// Importa las dependencias necesarias
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const SwaggerJSDoc = require('swagger-jsdoc');
const SwaggerUI = require('swagger-ui-express');
const promClient = require("prom-client");


// Crear una instancia de la aplicación Express
const app = express();

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// Configurar el middleware para parsear el cuerpo de las solicitudes (JSON)
app.use(bodyParser.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User MicroService',
            version: '1.0.0',
        },
        servers:[
            {
                url: `https://user-ms:${process.env.PORT}/api`,
            }
        ]
    },
    apis: ['./src/routes/apiRoutes.js']
}

const swaggerSpec = SwaggerJSDoc(options);
app.use('/docs', SwaggerUI.serve,SwaggerUI.setup(swaggerSpec))

// Rutas de la API
app.use('/api', apiRoutes);  // Rutas para interactuar con el otro microservicio

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", promClient.register.contentType);
    res.end(await promClient.register.metrics());
  });

// Ruta de bienvenida o predeterminada (opcional)
app.get('/', (req, res) => {
    res.send('Microservicio en funcionamiento');
});

// Exportar la aplicación para usarla en otros archivos (como server.js)
module.exports = app;
