import OrderItem from "../../src/domain/entity/OrderItem"
import OrderPlaced from "../../src/domain/event/OrderPlaced"
import RabbitMQAdapater from "../../src/infra/queue/RabbitMQAdapater"

test('Should publicate and consume new message', async () => {
    const queue = new RabbitMQAdapater()
    await queue.connect()
    const orderItems = [
        new OrderItem(1, 1000, 3)
    ]
    await queue.publish(new OrderPlaced('202100000001', orderItems))
    await queue.consume('orderPlaced', (orderPlaced: OrderPlaced) => {
        expect(orderPlaced.code).toBe('202100000001')
    })
    setTimeout(async () => {
        await queue.close()
    }, 500)

})