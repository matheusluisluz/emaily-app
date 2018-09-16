const app = require('./lib/application');
const Logger = require('./lib/config/winston');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, (err) => {
    if (err) {
        Logger.error('Error on listen port. ', err.message);
    }
    Logger.info('Server starting at %s:%s.',
        server.address().address, server.address().port);

    server.on('close', () => {
        Logger.info('Shutdown the application server');
    });
});

module.exports = server;