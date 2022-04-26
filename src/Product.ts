export default class Product {
    private description: string
    private price: number
    private quantity: number
    constructor( description: string,  price: number,  quantity: number){
        this.description = description
        this.price = price
        this.quantity = quantity
    }
}