const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: '../../logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
};

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        verbose: 'white'
    }
}

winston.addColors(logLevels);

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.splat(),
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;