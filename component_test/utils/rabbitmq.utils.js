const amqp = require('amqplib/callback_api');
const configRabbit = require('../config/rabbitmq').config;

module.exports.rabbitmqPostMessage = (routingKey, message) => {
    const rabbitUrl = 'amqp://' + configRabbit.USER + ':' + configRabbit.PASS + '@' + configRabbit.HOST;

    amqp.connect(rabbitUrl, (error0, connection) => {
        if (error0) {
            // Handle error
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                // Handle error
            }

            channel.assertExchange(configRabbit.EXCHANGE, 'direct', {
                durable: false,
            });

            channel.publish('mesfix', routingKey, Buffer.from(JSON.stringify(message)));
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    });
};

module.exports.sendSlackMessage = message => {
    let msg_slack = {
        text: message,
        channel: configRabbit.TESTING_SLACK_CHANNEL,
    };

    module.exports.rabbitmqPostMessage('slack', msg_slack);
};