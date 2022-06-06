import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase"
import PgProimiseConnectionAdapter from "../../src/infra/database/PgProimiseConnectionAdapter"

test.skip('Should return itens of database', async () => {
    const connection = new PgProimiseConnectionAdapter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const items = await itemRepository.list()
    expect(items).toHaveLength(3)
})