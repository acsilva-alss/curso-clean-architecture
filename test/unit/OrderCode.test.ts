import OrderCode from "../../src/domain/entity/OrderCode"

test('Should return a order code (AAAAAPPPPPPPP)', ()=>{
    const date = new Date('2021-03-10T10:00:00')
    const orderCode = new OrderCode(date, 1)
    expect(orderCode.value).toBe('202100000001')
})

