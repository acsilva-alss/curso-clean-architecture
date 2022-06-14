import ValidateCoupon from "../../src/application/ValidateCoupon"
import Coupon from "../../src/domain/entity/Coupon"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"

test('Should validate a expired coupon', async () => {
    const coupon1 = new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00'))
    const couponRepository = new CouponRepositoryMemory()
    await couponRepository.save(coupon1)
    const input = {
        couponCode: 'VALE20',
        date: new Date('2021-03-12T10:00:00')
    }
    const validateCoupon = new ValidateCoupon(couponRepository)
    const output = await validateCoupon.execute(input)

    expect(output.isExpired).toBeTruthy()
})

test('Should validate a valid coupon', async () => {
    const coupon1 = new Coupon('VALE20', 20, new Date('2021-03-12T10:00:00'))
    const couponRepository = new CouponRepositoryMemory()
    await couponRepository.save(coupon1)
    const input = {
        couponCode: 'VALE20',
        date: new Date('2021-03-10T10:00:00')
    }
    const validateCoupon = new ValidateCoupon(couponRepository)
    const output = await validateCoupon.execute(input)

    expect(output.isExpired).toBeFalsy()
})