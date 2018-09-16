const app = require('./lib/application');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log('Error on listen port. ', err.message);
    }
    console.log('Server starting at %s:%s.',
        server.address().address, server.address().port);

    server.on('close', () => {
        console.log('Shutdown the application server');
    });
});

module.exports = server;