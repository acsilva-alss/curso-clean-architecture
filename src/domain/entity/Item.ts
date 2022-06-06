import Dimension from "./Dimension"

export default class Item {
    constructor( readonly id: number, readonly description: string, readonly price: number, readonly weight?: number, readonly dimension?: Dimension){}

    getVolume() {
        if(this.dimension){
            return this.dimension.getVolume()
        }else return 0
    }
    getDensity () {
        if(this.dimension && this.weight){
            return this.weight/this.dimension.getVolume()
        }else return 0
    }
}