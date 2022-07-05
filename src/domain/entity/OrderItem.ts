export default class OrderItem {
    constructor(readonly idItem: number, readonly price: number, readonly quantity: number){
        if(quantity < 0) throw new Error('Inavlid quantity')
    }

    getTotal(){
        return this.price * this.quantity
    }
}