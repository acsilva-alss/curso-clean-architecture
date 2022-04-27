import Cpf from "./Cpf"
import Item from "./Item"
import OrderItem from "./OrderItem"

export default class Order {
    orderItems: OrderItem[]
    cpf: Cpf
    constructor(userCpf: string){
        this.cpf = new Cpf(userCpf)
        this.orderItems= []
        
    }

    addItem (item: Item, quantity: number){
        const newOrderItem = new OrderItem(item.id, item.price, quantity)
        this.orderItems.push(newOrderItem)
    }

    getTotalOrder (){
        const totalOrder = this.orderItems.reduce((totalAccumulator, currentItem) => {
            totalAccumulator += currentItem.getTotal()
            return totalAccumulator
        },0)

        // if(percentDiscount){
        //     this.totalPrice -= this.totalPrice * percentDiscount
        // }
        return totalOrder
    
    }
}