import ItemRepository from "../domain/repository/ItemRepository"
import Order from "../domain/entity/Order"
import OrderRepository from "../domain/repository/OrderRepository"
import CouponRepository from "../domain/repository/CouponRepository"
import RepositoryFactory from "../domain/factory/RepositoryFactory"

export default class PlaceOrder {
    itemRepository: ItemRepository
    orderRepository: OrderRepository
    couponRepository: CouponRepository
    
    constructor (readonly repositoryFactory: RepositoryFactory){
        this.itemRepository = repositoryFactory.createItemRepository()
        this.orderRepository = repositoryFactory.createOrderRepository()
        this.couponRepository = repositoryFactory.createCouponRepository()
    }

    async execute (input: Input): Promise<Output> {
        const sequence = await this.orderRepository.count() + 1
        const order = new Order(input.cpf, input.date, sequence)
        for(const orderItem of input.orderItems){
            const item = await this.itemRepository.get(orderItem.idItem)
            order.addItem(item, orderItem.quantity)
        }
        if(input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon)
            order.addCoupon(coupon)
        }

        await this.orderRepository.save(order)
        const total = order.getTotalOrder()

        return {
            total,
            code: order.orderCode.value
        }
    }
}

type Input = {
    cpf: string,
    orderItems: {idItem: number, quantity: number}[],
    coupon?: string,
    date?: Date
}
type Output = {
    total: number,
    code: string
}