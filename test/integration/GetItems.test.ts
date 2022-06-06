import Dimension from "../../src/domain/entity/Dimension"
import GetItems from "../../src/application/GetItems"
import Item from "../../src/domain/entity/Item"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"

test('Should get itens', async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, "Guitarra", 1000, 3, new Dimension(100, 30, 10)))
    itemRepository.save(new Item(2, "Amplificador", 5000, 20, new Dimension(50, 50, 50)))
    itemRepository.save(new Item(3, "Cabo", 30, 1, new Dimension(10, 10, 10)))
    const getItems = new GetItems(itemRepository)
    const output = await getItems.execute()
    expect(output).toHaveLength(3)
})