const { EventEmitter } = require('events');
const { pushAsJson } = require('./utilities/utils');

const logger = new EventEmitter();


logger.on('logMessage', (messageValue) => {
    pushAsJson('./logs.json',messageValue);
})


module.exports = { logger }

