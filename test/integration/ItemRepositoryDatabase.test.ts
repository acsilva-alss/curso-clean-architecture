import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"

test('Should return itens of database', async () => {
    const connection = new PgPromiseConnectionAdapter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const items = await itemRepository.list()
    expect(items).toHaveLength(3)
    await connection.close();
})