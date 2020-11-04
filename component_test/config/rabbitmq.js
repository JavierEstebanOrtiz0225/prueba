require('dotenv').config();
module.exports.config = {
    HOST: process.env.RABBIT_HOST || 'mesfix-rabbitmq-dev',
    PORT: process.env.RABBIT_PORT || 5672,
    USER: process.env.RABBIT_USER || 'rootMesfix',
    PASS: process.env.RABBIT_PASSWORD || '25Mesfix01',
    EXCHANGE: 'mesfix',
    TYPE: 'direct',
    TESTING_SLACK_CHANNEL: 'pruebas'
};