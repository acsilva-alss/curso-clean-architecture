
import Dimension from './domain/entity/Dimension'
import ExpressAdapter from './infra/http/ExpressAdapter'
import GetItems from './application/GetItems'
import Item from './domain/entity/Item'
import ItemRepositoryDatabase from './infra/repository/database/ItemRepositoryDatabase'
import ItemRepositoryMemory from './infra/repository/memory/ItemRepositoryMemory'
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter'
import ItemController from './infra/controller/ItemController'
import OrderController from './infra/controller/OrderController'
import OrderRepositoryDatabase from './infra/repository/database/OrderRepositoryDatabase'
import MemoryQueueAdapter from './infra/queue/MemoryQueueAdapter'
import StockController from './infra/controller/StockController'
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'

const http = new ExpressAdapter()

const queue = new MemoryQueueAdapter()
const connection = new PgPromiseConnectionAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryDatabase(connection)
const repositoryFactory = new DatabaseRepositoryFactory(connection)
new ItemController(http, itemRepository)
new OrderController(http, orderRepository, repositoryFactory)
new StockController(queue, repositoryFactory)

http.listen(3000)