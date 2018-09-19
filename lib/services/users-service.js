const authModels = require('../models/auth-model');
const logger = require('../config/winston');

const createUser = (body, callback) => {
    const query = {};
    query.id = body.id;

    console.log('createUser: ' + query);
    authModels.insert(query, callback);
};

module.exports = { createUser };
