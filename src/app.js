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

const register = promClient.register;
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duración de las solicitudes HTTP en segundos",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5] // Intervalos de tiempo en segundos
});
register.registerMetric(httpRequestDurationMicroseconds );

const cacheRequests = new promClient.Counter({
  name: "user_api_cache_total",
  help: "Total de requests al cache",
  labelNames: ["instance", "type"]
});

register.registerMetric(cacheRequests);

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP recibidas',
  labelNames: ['method', 'route', 'status_code'],
});

// Simulación: Incrementar contador cuando se consulta caché
app.get("/cache", (req, res) => {
  cacheRequests.inc({ instance: "user-api", type: "Request" });
  res.json({ message: "Cache request counted" });
});


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
                url: `http://localhost:${process.env.PORT}/api`,
            }
        ]
    },
    apis: ['./src/routes/apiRoutes.js']
}

const swaggerSpec = SwaggerJSDoc(options);

app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
    httpRequestTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
});

app.use('/docs', SwaggerUI.serve,SwaggerUI.setup(swaggerSpec))

// Rutas de la API
app.use('/api', apiRoutes);  // Rutas para interactuar con el otro microservicio

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });

// Ruta de bienvenida o predeterminada (opcional)
app.get('/', (req, res) => {
    res.send('Microservicio en funcionamiento');
});

// Exportar la aplicación para usarla en otros archivos (como server.js)
module.exports = app;
