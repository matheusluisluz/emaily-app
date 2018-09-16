const MongoClient = require('mongodb').MongoClient;
const logger = require('./winston');

const Database = {};
let db;

Database.connect = (uri, callback) => {
    logger.info('Database trying to connect.');
    MongoClient.connect(uri, (err, _db) => {
        if (err) {
            logger.error(`Database failed to connect. - ', ${err.message}`);
        } else {
            logger.info('Database connected.');
            db = _db;
        }
        return callback(err, db);
    });
};

Database.close = (callback) => {
    logger.debug('Database trying to disconnect');
    if (db) {
        db.close((err) => {
            if (err) {
                logger.error('Error on closing database');
            } else {
                logger.info('Database disconnected');
            }
            callback(err);
        });
    }
};

module.exports = Database;
