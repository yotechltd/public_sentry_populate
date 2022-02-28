require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cluster = require('cluster');
//const requestIp = require('request-ip');
const compression = require("compression");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParser = require('cookie-parser');
//const swaggerUI = require("swagger-ui-express");
const methodOverride = require("method-override");

const {uniqueId} = require("./helper/helper");
console.log(uniqueId());
const global = require('./server/shared/methods');

const { GlobalError } = require('./server/global/Middlewares/GlobarError');
const RouteMiddleware = require('./server/global/Middlewares/RouteMiddleware');
const mongoSanitize = require('express-mongo-sanitize');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "ap",
            description: "app doc",
            version: "1.0.0",
            contact: {
                name: "team"
            },
            host: "baseurl",
            servers: [
                {
                    "url": "http://localhost:3000",
                    "description": "Local server"
                },
                {
                    "url": "http://localhost:3000",
                    "description": "Development server"
                },
                {
                    "url": "https://localhost:3000",
                    "description": "Production server"
                }
            ]
        }
    },
    apis: ["./server/*/Controllers/*/*.js"]
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);

process.on('uncaughtException', (exception) => {
    global.log("system", exception.message, "error");
    console.log(exception);
});

process.on('unhandledRejection', (exception) => {
    global.log("system", exception.message, "error");
    console.log(exception);

});


const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
const getter = (req, res) => {
    if ('_method' in req.query && 'platform' in req.query && req.query.platform == 'android') {
        const method = req.query._method;
        return method
    }
}

if (process.env.NODE_ENV === 'local') {
    const Logtail = require('./server/config/logtail');
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(requestIp.mw());
app.use(express.static("public"));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(mongoSanitize());

app.use(methodOverride(getter));


app.get('/api/osinfo', (req, res, next) => {
    const OS = require('os');
    const operatingSystem = {
        cpus: OS.cpus(),
        arch: OS.arch(),
        totalmem: OS.totalmem(),
        freemem: OS.freemem(),
        platform: OS.platform()
    }
    res.json({osinfo:operatingSystem });
});

app.get('/test/api', (req, res, next) => {
    res.json({ message: "Email sent successfully" });
})
app.use(RouteMiddleware.noRouteFound);
app.use(GlobalError);
const port = process.env.PORT || 3000;

if (process.env.ENVIRONMENT !== 'local' && cluster.isMaster) {
    const Logtail = require('./server/config/logtail');


    const os = require('os');
    const numberOfWorkers = os.cpus().length;
    for (let i = 0; i < numberOfWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        Logtail.info('Worker', {
            data: `${worker.process.pid} is online`
        })
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {

        Logtail.warn('process died', {
            pid: worker.process.pid,
            code,
            signal
        });
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);


        Logtail.info('Starting new worker...');
        
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const server = app.listen(port, () => {
        console.log(`\nExpress server listening on port ${port}\n`);
    });
    try {
        const io = require("./server/utils/socket").init(server)
    } catch (e) { console.log(e) }
}
