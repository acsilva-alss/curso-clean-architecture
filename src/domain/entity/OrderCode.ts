export default class OrderCode {
    value: string
    constructor(orderDate: Date, orderSequency: number){
        this.value = this.generateOrderCode(orderDate, orderSequency)
    }

    private generateOrderCode(date: Date, orderSequency: number) {
        const orderYear = date.getFullYear()
        const orderSequencyString = new String(orderSequency).padStart(8, '0')
        return `${orderYear}${orderSequencyString}`
    }
}