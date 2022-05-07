import Item from "./Item";

export default class Freight {
    private totalFreight = 0
    private DISTANCE = 1000
    private FACTOR = 100

    addItem(item: Item, quantity: number){
        const freight = item.getVolume() * this.DISTANCE * (item.getDensity()/this.FACTOR)
        this.totalFreight += freight * quantity
    }

    getTotal () {
        return (this.totalFreight > 0 && this.totalFreight < 10) ?  10 : this.totalFreight
    }
}