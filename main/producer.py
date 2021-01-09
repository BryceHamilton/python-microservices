import pika, json

params = pika.URLParameters('amqps://qkyaxufh:GFgCv8Kep_rJaxoyd3v8R8UfmS_oq-lZ@shark.rmq.cloudamqp.com/qkyaxufh')

connection = pika.BlockingConnection(params)


channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)

    channel.basic_publish(exchange='', routing_key='admin', body=json.dumps(body), properties=properties)

