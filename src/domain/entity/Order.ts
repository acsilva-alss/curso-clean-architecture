import Coupon from "./Coupon"
import Cpf from "./Cpf"
import Freight from "./Freight"
import Item from "./Item"
import OrderCode from "./OrderCode"
import OrderCoupon from "./OrderCoupon"
import OrderItem from "./OrderItem"

export default class Order {
    orderCode: OrderCode
    orderItems: OrderItem[]
    cpf: Cpf
    coupon?: OrderCoupon
    freight = new Freight()
    constructor(userCpf: string, readonly orderDate = new Date(), readonly sequency = 1){
        this.cpf = new Cpf(userCpf)
        this.orderItems= []
        this.orderCode= new OrderCode(orderDate, this.sequency)
    }

    private isDuplicated(item: Item) {
        return this.orderItems.some(orderItem => orderItem.idItem === item.id)
    }

    addItem (item: Item, quantity: number){
        if(this.isDuplicated(item)) throw new Error('Duplicated item')
        const newOrderItem = new OrderItem(item.id, item.price, quantity)
        this.orderItems.push(newOrderItem)
        this.freight.addItem(item, quantity)
    }
    addCoupon (coupon: Coupon){
        if(!coupon.isExpired(this.orderDate))
            this.coupon = new OrderCoupon(coupon.code, coupon.percentage)
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