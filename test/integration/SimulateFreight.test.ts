import SimulateFreight from "../../src/application/SimulateFreight"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import Order from "../../src/domain/entity/Order"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"

test('Should simulate freight', async () =>{
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000,3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))

    const simulateFreight = new SimulateFreight(itemRepository)
    const input = [
        {idItem: 1, quantity: 1},
        {idItem: 2, quantity: 1},
        {idItem: 3, quantity: 3},
    ]
    const output = await simulateFreight.execute(input)

    expect(output.total).toBe(260)
})