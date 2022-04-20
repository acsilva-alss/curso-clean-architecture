import { validate } from "../src/validate"

test("should be return true if cpf is valid", () => {
    const returnValidate = validate('02695041098')
    expect(returnValidate).toBe(true)
})
test("should be return true if cpf is valid with dot and dash", () => {
    const returnValidate = validate('026.950.410-98')
    expect(returnValidate).toBe(true)
})
test("should be return false if cpf is badly formatted", () => {
    const returnValidate = validate('026 950 410 98')
    expect(returnValidate).toBe(false)
})
test("should be return false if cpf is invalid", () => {
    const returnValidate = validate('0')
    expect(returnValidate).toBe(false)
})
test("should be return false if cpf is blank", () => {
    const returnValidate = validate(" ")
    expect(returnValidate).toBe(false)
})
test("should be return undefined if cpf is undefined", () => {
    const returnValidate = validate(undefined)
    expect(returnValidate).toBe(undefined)
})
test("should be return false if cpf is null", () => {
    const returnValidate = validate(null)
    expect(returnValidate).toBe(false)
})
test("should be return false if all the digits of the cpf are the same", () => {
    const returnValidate = validate('99999999999')
    expect(returnValidate).toBe(false)
})
test("should be return false if all the digits of the cpf are the same", () => {
    const returnValidate = validate('00000000000')
    expect(returnValidate).toBe(false)
})
// test("should be return false if length of cpf is bigger then 14", () => {
//     const returnValidate = validate("026950410985856")
//     expect(returnValidate).toBe(false)
// })
// test("should be return false if length of cpf is less than 11", () => {
//     const returnValidate = validate("0269504")
//     expect(returnValidate).toBe(false)
// })
