import Connection from "../../database/Connection";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Dimension from "../../../domain/entity/Dimension";

export default class ItemRepositoryDatabase implements ItemRepository {
    
    constructor (readonly connection: Connection) {}
    
    
    async get(idItem: number): Promise<Item> {
        const itemData = await this.connection.query('select * from ccca.item where id_item=$1', [idItem])
        const item = new Item(itemData.id_item, itemData.description, itemData.price, itemData.weigh)
        return item
        
    }
    async save(item: Item): Promise<void> {
       await this.connection.query('insert into ccca.item (description, price, width, height, length, weight) values ($1, $2, $3, $4, $5, $6) returning *', [item.description, item.price, item.dimension?.width, item.dimension?.height, item.dimension?.length, item.weight])
    }
    async list(): Promise<Item[]> {
        const itemsData = await this.connection.query('select * from ccca.item', [])
        const items: Item[] = []
        for(const itemData of itemsData){
            items.push(new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), itemData.weight))
        }
        return items
    }
    
}