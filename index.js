const app = require('./lib/application');
const logger = require('./lib/config/winston');
const database = require('./lib/config/db');
const keys = require('./lib/config/key');

const PORT = process.env.PORT || 5000;

database.connect(keys.mongoURI, (err) => {
    if (err) {
        logger.error('Shutdown the application because an error occurred ' +
            'when connecting to database');
        process.exit(1);
    }
});

const shutdown = () => {
    logger.warn('Server receive signal to shutdown.');
    process.exit(0);
};

process
    .on('SIGTERM', shutdown)
    .on('SIGINT', shutdown)
    .on('SIGHUP', shutdown)
    .on('uncaughtException', (er) => {
        logger.error(`uncaughtException caught the error: ${er.message}`);
        throw er;
    })
    .on('exit', (code) => {
        logger.info('Node process exit with code:', code);
        database.close();
    });

const server = app.listen(PORT, (err) => {
    if (err) {
        logger.error('Error on listen port. ', err.message);
    }
    logger.info('Server starting at %s:%s.',
        server.address().address, server.address().port);

    server.on('close', () => {
        logger.info('Shutdown the application server');
    });
});

module.exports = server;
