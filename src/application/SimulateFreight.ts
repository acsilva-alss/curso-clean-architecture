import Freight from "../domain/entity/Freight";
import ItemRepository from "../domain/repository/ItemRepository";

export default class SimulateFreight {
    constructor(readonly itemRepository: ItemRepository){}

    async execute(input: Input): Promise<Output>{
        const freight = new Freight()
        for(const item of input ){
            const databaseItem = await this.itemRepository.get(item.idItem)
            freight.addItem(databaseItem, item.quantity)
        }

        return {
            total: freight.getTotal()
        }
    }
}

type Input = {
    idItem: number,
    quantity: number
}[]

type Output = {
    total: number
}