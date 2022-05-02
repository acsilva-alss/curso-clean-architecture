import Coupon from "./Coupon"
import Cpf from "./Cpf"
import Item from "./Item"
import OrderItem from "./OrderItem"

export default class Order {
    orderItems: OrderItem[]
    cpf: Cpf
    coupon?: Coupon
    constructor(userCpf: string){
        this.cpf = new Cpf(userCpf)
        this.orderItems= []
        
    }

    addItem (item: Item, quantity: number){
        const newOrderItem = new OrderItem(item.id, item.price, quantity)
        this.orderItems.push(newOrderItem)
    }
    addCoupon (coupon: Coupon){
        this.coupon = coupon
    }

    getTotalOrder (){
        let totalOrder = this.orderItems.reduce((totalAccumulator, currentItem) => {
            totalAccumulator += currentItem.getTotal()
            return totalAccumulator
        },0)

        if(this.coupon){
            totalOrder -= this.coupon.calculateDiscount(totalOrder)
        }
        return totalOrder
    
    }
}