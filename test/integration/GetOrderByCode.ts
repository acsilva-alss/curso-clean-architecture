import GetOrderByCode from "../../src/application/GetOrderByCode"
import PlaceOrder from "../../src/application/PlaceOrder"
import Coupon from "../../src/domain/entity/Coupon"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import OrderRepository from "../../src/domain/repository/OrderRepository"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"


let connection: Connection
let orderRepository: OrderRepository

beforeEach(async () => {
    connection = new PgPromiseConnectionAdapter()
    orderRepository = new OrderRepositoryDatabase(connection)
    await orderRepository.clear()
})



test('Should return a order by code', async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const couponRepository = new CouponRepositoryMemory()
    couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00')))
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const placeOrderInput = {
        cpf: '026.950.410.98',
        orderItems: [
            {idItem: 1, quantity: 1},
            {idItem: 2, quantity: 1},
            {idItem: 3, quantity: 3},
        ],
        coupon: "VALE20",
		date: new Date("2021-03-01T10:00:00")
    }
   await placeOrder.execute(placeOrderInput)

    // const orderRepository = new OrderRepositoryMemory()
    const getOrderByCodeInput = {
        code: '202100000001'
    }
    const getOrderByCode = new GetOrderByCode(orderRepository)
    const output = await getOrderByCode.execute(getOrderByCodeInput)
    expect(output.total).toBe(5132)
})

afterEach(async () => {
    await connection.close()
})