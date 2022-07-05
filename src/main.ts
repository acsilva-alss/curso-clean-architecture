
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

const http = new ExpressAdapter()

const connection = new PgPromiseConnectionAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)
new ItemController(http, itemRepository)
const orderRepository = new OrderRepositoryDatabase(connection)
new OrderController(http, orderRepository)
http.listen(3000)