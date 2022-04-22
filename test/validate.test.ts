import { cpfValidator } from "../src/cpfValidator"

test("should be return true if cpf is valid", () => {
    const returnValidate = cpfValidator('02695041098')
    expect(returnValidate).toBe(true)
})
test("should be return true if cpf is valid with dot and dash", () => {
    const returnValidate = cpfValidator('026.950.410-98')
    expect(returnValidate).toBe(true)
})
test("should be return false if cpf is badly formatted", () => {
    const returnValidate = cpfValidator('026 950 410 98')
    expect(returnValidate).toBe(false)
})
test("should be return false if cpf is invalid", () => {
    const returnValidate = cpfValidator('0')
    expect(returnValidate).toBe(false)
})
test("should be return false if cpf is blank", () => {
    const returnValidate = cpfValidator(" ")
    expect(returnValidate).toBe(false)
})
test("should be return undefined if cpf is undefined", () => {
    const returnValidate = cpfValidator(undefined)
    expect(returnValidate).toBe(undefined)
})
test("should be return false if cpf is null", () => {
    const returnValidate = cpfValidator(null)
    expect(returnValidate).toBe(false)
})
test("should be return false if all the digits of the cpf are the same", () => {
    const returnValidate = cpfValidator('99999999999')
    expect(returnValidate).toBe(false)
})
test("should be return false if all the digits of the cpf are the same", () => {
    const returnValidate = cpfValidator('00000000000')
    expect(returnValidate).toBe(false)
})
// test("should be return false if length of cpf is bigger then 14", () => {
//     const returnValidate = validate("026950410985856")
//     expect(returnValidate).toBe(false)
// })
test("should be return false if pass a letter", () => {
    const returnValidate = cpfValidator("abcdfgabcha")
    expect(returnValidate).toBe(false)
})
