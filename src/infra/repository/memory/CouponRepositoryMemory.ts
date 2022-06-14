import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
    coupons: Coupon[]
    constructor(){
        this.coupons = []
    }

    async getByCode(couponCode: string): Promise<Coupon> {
        const couponFound = this.coupons.find(coupon => coupon.code === couponCode)
        if(!couponFound) throw new Error('Coupon not found')
        return couponFound
    }
    async save(coupon: Coupon): Promise<void> {
        this.coupons.push(coupon)
    }

}