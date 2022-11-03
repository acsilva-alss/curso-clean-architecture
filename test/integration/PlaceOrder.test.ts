import PlaceOrder from "../../src/application/PlaceOrder"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import OrderRepository from "../../src/domain/repository/OrderRepository"
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"
import GetStock from "../../src/application/GetStock"
import StockEntryRepository from "../../src/domain/repository/StockEntryRepository"
import Queue from "../../src/infra/queue/Queue"
import MemoryQueueAdapter from "../../src/infra/queue/MemoryQueueAdapter"
import OrderPlaced from "../../src/domain/event/OrderPlaced"
import StockEntry from "../../src/domain/entity/StockEntry"
import StockHandler from "../../src/application/handler/StockHandler"
import StockController from "../../src/infra/controller/StockController"
import RabbitMQAdapater from "../../src/infra/queue/RabbitMQAdapater"


let connection: Connection
let orderRepository: OrderRepository
let stockEntryRepository: StockEntryRepository
let repositoryFactory: RepositoryFactory
let queue: Queue

beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    orderRepository = repositoryFactory.createOrderRepository()
    stockEntryRepository = repositoryFactory.createStockEntryRepository()
    await orderRepository.clear()
    await stockEntryRepository.clear()
    //queue = new MemoryQueueAdapter()
    queue = new RabbitMQAdapater()
    await queue.connect()
})

function sleep (ms: number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true)
		}, ms);
	});
}

test.only("Should be a order and call stock", async () => {
    new StockController(queue, repositoryFactory)
    const placeOrder = new PlaceOrder(repositoryFactory, queue)
    const input = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ]
    }
    await placeOrder.execute(input)
    await sleep(200)
    const getStock = new GetStock(repositoryFactory)
    const output = await getStock.execute(3)
    expect(output.total).toBe(-3)
})
test("Should be a order with discount", async () => {
    const placeOrder = new PlaceOrder(repositoryFactory, queue)
    const input = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ],
        coupon: 'VALE20',
        date: new Date("2021-03-01T10:00:00")
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5132)
})

test("Should be a order and generate order code", async () => {
    const placeOrder = new PlaceOrder(repositoryFactory, queue)
    const input = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ],
        date: new Date('2021-03-10T10:00:00')
    }
    const output = await placeOrder.execute(input)
    expect(output.code).toBe('202100000001')
})

afterEach(async () => {
    setTimeout(async () => {
        await queue.close()
        await connection.close()
    }, 500)
})