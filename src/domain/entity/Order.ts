import Coupon from "./Coupon"
import Cpf from "./Cpf"
import Freight from "./Freight"
import Item from "./Item"
import OrderItem from "./OrderItem"

export default class Order {
    orderItems: OrderItem[]
    cpf: Cpf
    coupon?: Coupon
    freight = new Freight()
    constructor(userCpf: string, readonly orderDate = new Date()){
        this.cpf = new Cpf(userCpf)
        this.orderItems= []
        
    }

    addItem (item: Item, quantity: number){
        const newOrderItem = new OrderItem(item.id, item.price, quantity)
        this.orderItems.push(newOrderItem)
        this.freight.addItem(item, quantity)
    }
    addCoupon (coupon: Coupon){
        if(!coupon.isExpired(this.orderDate))
            this.coupon = coupon
    }

    getFreight () {
        return this.freight.getTotal()
    }

    getTotalOrder (){
        let totalOrder = this.orderItems.reduce((totalAccumulator, currentItem) => {
            totalAccumulator += currentItem.getTotal()
            return totalAccumulator
        },0)

        if(this.coupon){
            totalOrder -= this.coupon.calculateDiscount(totalOrder)
        }
        totalOrder += this.freight.getTotal()
        return totalOrder
    
    }
}