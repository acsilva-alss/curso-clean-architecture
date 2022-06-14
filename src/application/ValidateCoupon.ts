import CouponRepository from "../domain/repository/CouponRepository";

export default class ValidateCoupon {
    constructor(readonly couponRepository: CouponRepository){}

    async execute(input: Input): Promise<Output>{
        const {couponCode, date} = input
        const couponFound = await this.couponRepository.getByCode(couponCode)
        // if(!couponFound) return { isValid: false}
        
        const isExpired = couponFound.isExpired(date)

        return {
            isExpired
        }
    }
}

type Input = {
    couponCode: string,
    date: Date
}

type Output = {
    isExpired: boolean
}