const tv4 = require('tv4');
const userSchema = require('./schema/user-schema.json');

const validation = () => {
  const result = {};

  tv4.addSchema(userSchema);

  result.validate = function validate(json, schema) {
    return tv4.validateMultiple(json, schema, true);
  };

  result.getSchema = function getSchema(schema) {
    return tv4.getSchema(schema);
  };

  return result;
};

module.exports =  validation;
