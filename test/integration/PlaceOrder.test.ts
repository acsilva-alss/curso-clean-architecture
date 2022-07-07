import PlaceOrder from "../../src/application/PlaceOrder"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import OrderRepository from "../../src/domain/repository/OrderRepository"
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"


let connection: Connection
let orderRepository: OrderRepository
let repositoryFactory: RepositoryFactory

beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clear()
})


test("Should be a order", async () => {
    const placeOrder = new PlaceOrder(repositoryFactory)
    const input = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ]
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(6350)
})
test("Should be a order with discount", async () => {
    const placeOrder = new PlaceOrder(repositoryFactory)
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
    const placeOrder = new PlaceOrder(repositoryFactory)
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
    await connection.close()
})