//@ts-nocheck

const DIVIDER_SUM_DIGITS = 11
const QUANTITY_NUMBERS_SUM_FIRST_DIGIT = 11
const QUANTITY_NUMBERS_SUM_SECOND_DIGIT = 12

const formatCpfToArray = (cpf: string) => {
    return cpf.replace('.','').replace('.','').replace('-','').replace(" ","").split("")  
}
const isCpfFormatValid = (cpf) => {
    return  cpf !== null && (cpf.length >= 11 && cpf.length <= 14) && !formatCpfToArray(cpf).every(c => c === cpf[0])
}
export function cpfValidator (cpfToBeValidated) {
    if (cpfToBeValidated !== undefined) {
        if (isCpfFormatValid(cpfToBeValidated)) {
            const cpfFormatted = formatCpfToArray(cpfToBeValidated)
            try{  
                let sumOfFirstDigit = 0, sumOfSecondDigit = 0
                let firstCheckDigit = 0, secondCheckDigit = 0, quotient = 0  
                let cpfDigit, checkDigitsResult  
                    
                for (let cpfDigitPosition = 1; cpfDigitPosition < cpfFormatted.length -1; cpfDigitPosition++) {  
                    cpfDigit = parseInt(cpfFormatted[cpfDigitPosition -1]);  							
                    sumOfFirstDigit = sumOfFirstDigit + ( QUANTITY_NUMBERS_SUM_FIRST_DIGIT - cpfDigitPosition ) * cpfDigit
    
                    sumOfSecondDigit = sumOfSecondDigit + ( QUANTITY_NUMBERS_SUM_SECOND_DIGIT - cpfDigitPosition ) * cpfDigit
                }
                    
                quotient = (sumOfFirstDigit % DIVIDER_SUM_DIGITS) 
                firstCheckDigit = (quotient < 2) ?  0 : DIVIDER_SUM_DIGITS - quotient  
                
                sumOfSecondDigit += 2 * firstCheckDigit  
                quotient = (sumOfSecondDigit % DIVIDER_SUM_DIGITS) 
                secondCheckDigit = quotient < 2 ? 0 : DIVIDER_SUM_DIGITS - quotient 
                
                let checkDigits = cpfToBeValidated.substring(cpfToBeValidated.length-2, cpfToBeValidated.length) 
                checkDigitsResult = "" + firstCheckDigit + "" + secondCheckDigit 
                return checkDigits == checkDigitsResult
            }catch (e){  
                console.error("Erro !"+e)  

                return false
            }  
        } else return false
    }

}