import pika, json

from main import Product, db

params = pika.URLParameters('amqps://qkyaxufh:GFgCv8Kep_rJaxoyd3v8R8UfmS_oq-lZ@shark.rmq.cloudamqp.com/qkyaxufh')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='main')


def callback(ch, method, properties, body):
    print('Received in main')
    data = json.loads(body)
    print(data)

    if properties.content_type == 'product_created':
        product = Product(id=data['id'], title=data['title'], image=data['image'])
        db.session.add(product)
        db.session.commit()
        print('Product created in main', product)

    elif properties.content_type == 'product_updated':
        product = Product.query.get(data['id'])
        if product is None:
            return
        product.title = data['title']
        product.image = data['image']
        db.session.commit()
        print('Product updated in main', product)

    elif properties.content_type == 'product_deleted':
        product = Product.query.get(data)
        if product is None:
            return
        db.session.delete(product)
        db.session.commit()
        print('Product deleted in main', product)


channel.basic_consume(queue='main', on_message_callback=callback, auto_ack=True)


print('Started Consuming')

channel.start_consuming()

channel.close()