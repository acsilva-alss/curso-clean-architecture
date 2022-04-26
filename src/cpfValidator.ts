import ICpfValidator from './ICpfValidator'

export default class CpfValidator implements ICpfValidator {
    DIVIDER_SUM_DIGITS = 11
    ARRAY_NUMBERS_SUM_FIRST_DIGIT = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    ARRAY_NUMBERS_SUM_SECOND_DIGIT = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    
    constructor(){}

    private formatCpfToArray (cpfToBeValidated: string) {
        return cpfToBeValidated.replace('.','').replace('.','').replace('-','').replace(" ","").split("")  
    }
    
    private areAllDigitsTheSame (cpfToBeValidated: string) {
        return this.formatCpfToArray(cpfToBeValidated).every(c => c === cpfToBeValidated[0])
    }
    private isCorrectNumberOfDigits (cpfToBeValidated: string) {
       return cpfToBeValidated.length >= 11 && cpfToBeValidated.length <= 14
    }
    
    private calculateSumOfCpfDigits (arrayOfNumbers: Array<number>, cpfToBeValidate: Array<string>) {
        return  arrayOfNumbers.map((number, index) => number * parseInt(cpfToBeValidate[index])).reduce((accumulator, currentNumber) => accumulator + currentNumber)
    }

    isValid(cpfToBeValidated: string){ 
        if(cpfToBeValidated === undefined) throw new Error("ERROR! CPF is undefined")
        if(cpfToBeValidated === null) throw new Error("ERROR! CPF is null")
        if(!this.isCorrectNumberOfDigits(cpfToBeValidated)) throw new Error("ERROR! CPF is the wrong size ")
        if(this.areAllDigitsTheSame(cpfToBeValidated)) throw new Error("ERROR! All the digits of the cpf are the same")
        const cpfFormatted = this.formatCpfToArray(cpfToBeValidated)
        let quotient = 0     
        const sumOfFirstDigit = this.calculateSumOfCpfDigits(this.ARRAY_NUMBERS_SUM_FIRST_DIGIT, cpfFormatted)
        const sumOfSecondDigit = this.calculateSumOfCpfDigits(this.ARRAY_NUMBERS_SUM_SECOND_DIGIT, cpfFormatted)
        quotient = (sumOfFirstDigit % this.DIVIDER_SUM_DIGITS) 
        const firstCheckDigit = (quotient < 2) ?  0 : this.DIVIDER_SUM_DIGITS - quotient  
        quotient = (sumOfSecondDigit % this.DIVIDER_SUM_DIGITS) 
        const secondCheckDigit = quotient < 2 ? 0 : this.DIVIDER_SUM_DIGITS - quotient 
        const checkDigits = cpfToBeValidated.substring(cpfToBeValidated.length-2, cpfToBeValidated.length) 
        const checkDigitsResult = "" + firstCheckDigit + "" + secondCheckDigit 
        return checkDigits == checkDigitsResult
    }
}