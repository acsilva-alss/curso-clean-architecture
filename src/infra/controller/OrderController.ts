import GetOrderByCode from "../../application/GetOrderByCode";
import GetOrders from "../../application/GetOrders";
import OrderRepository from "../../domain/repository/OrderRepository";
import Http from "../http/Http";

export default class OrderController {
    constructor(readonly http: Http, readonly orderRepository: OrderRepository){
        http.on('get', '/orders', async (params: any, body: any)=> {
            const getOrders = new GetOrders(orderRepository)
            const output = await getOrders.execute()
            return output
    
        })

        http.on('get', '/orders/:code', async (params: any, body: any)=> {
            const getOrder = new GetOrderByCode(orderRepository)
            const input = {
                code: params.code
            }
            const output = await getOrder.execute(input)
            return output
    
        })
    }
}