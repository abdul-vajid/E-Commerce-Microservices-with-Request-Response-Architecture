const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: [process.env.KAFKA_BOOTSRAP_SERVERS],
});

const consumer = kafka.consumer({ groupId: 'my-group' });


const consumeMessage = async (topic, onMessage) => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message on topic ${topic}, partition ${partition}: ${message.value}`);
                // Call the onMessage callback function with the message value
                onMessage(message.value);
            },
        });
    } catch (error) {
        console.error(`Error connecting to Kafka broker: ${error}`);
    }
};

export default consumeMessage;
