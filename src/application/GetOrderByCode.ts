import OrderRepository from "../domain/repository/OrderRepository";

export default class GetOrderByCode {
    constructor(readonly orderRepository: OrderRepository){}
    async execute(input: Input): Promise<Output> {
        const { code } = input
        const order =  await this.orderRepository.getByCode(code)
        if(!order) {
            throw new Error('Order code not found')
        }

        const output = {
            code: order.orderCode.value,
            total: order.getTotalOrder()
        }
        return output

    }
}

type Input = {
    code: string
}

type Output = {
    code: string
    total: number
    // items: Array<{description: string, price: number, quantity: number }>
}