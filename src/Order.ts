import ICpfValidator from "./ICpfValidator"
import Product from "./Product"

export default class Order {
    items: Product[]
    totalPrice: number
    discount: number
    cpf: string
    constructor(readonly cpfValidator: ICpfValidator){
        this.items = []
        this.cpf = ''
        this.totalPrice = 0
        this.discount = 0
    }

    addItem (description: string, price: number, quantity: number){
        this.items.push(new Product(description, price, quantity))
        this.totalPrice += price
    }

    finishOrder (userCpf: string, percentDiscount?: number){
        if(!this.cpfValidator.isValid(userCpf)) throw new Error("ERROR! cpf is invalid")
        if(percentDiscount){
            this.totalPrice -= this.totalPrice * percentDiscount
        }
        return this.items
    
    }
}