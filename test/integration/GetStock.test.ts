import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import StockEntry from "../../src/domain/entity/StockEntry"
import GetStock from "../../src/application/GetStock"

test('Should return stock item', async () => {
    const connection = new PgPromiseConnectionAdapter()
    const repositoryFactory = new DatabaseRepositoryFactory(connection)
    const stockEntryRepository = repositoryFactory.createStockEntryRepository()
    await stockEntryRepository.clear()
    await stockEntryRepository.save(new StockEntry(1, 'in', 10))
    await stockEntryRepository.save(new StockEntry(1, 'in', 10))
    await stockEntryRepository.save(new StockEntry(1, 'out', 5))
    await stockEntryRepository.save(new StockEntry(1, 'out', 5))
    const getStock = new GetStock(repositoryFactory)
    const output = await getStock.execute(1)
    expect(output.total).toBe(10)
    await connection.close()
})