import OrderItem from "../../src/domain/entity/OrderItem"

test('Should return a total order', () => {
   const orderItem = new OrderItem(1, 20, 3)
   expect(orderItem.getTotal()).toBe(60)
})

test('Should return a error if quantity is less than zero', () => {
   expect(() => new OrderItem(1, 20, -2)).toThrow(new Error('Inavlid quantity'))

})