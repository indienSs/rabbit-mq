import amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = "test";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (message) {
        const seconds = message.content.toString().split(".").length - 1;

        console.log(" [x] Received %s", message.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
          channel.ack(message);
        }, seconds * 1000);
      },
      {
        noAck: false,
      }
    );
  });
});
