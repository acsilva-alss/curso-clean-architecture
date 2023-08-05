import GetOrderByCode from "../../application/GetOrderByCode";
import GetOrders from "../../application/GetOrders";
import PlaceOrder from "../../application/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderRepository from "../../domain/repository/OrderRepository";
import Http from "../http/Http";
import MemoryQueueAdapter from "../queue/MemoryQueueAdapter";

export default class OrderController {
    constructor(readonly http: Http, readonly orderRepository: OrderRepository, readonly repositoryFactory: RepositoryFactory){
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
        http.on("post", "/orders", async function (params: any, body: any) {
			const placeOrder = new PlaceOrder(repositoryFactory, new MemoryQueueAdapter());
			console.log(body)
            const output = await placeOrder.execute(body);
			return output;
		});
    }
}