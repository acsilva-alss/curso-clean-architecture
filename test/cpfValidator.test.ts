import CpfValidator from "../src/CpfValidator"


test("should be return true if cpf is valid", () => {
    const returnValidate = new CpfValidator().isValid('02695041098')
    expect(returnValidate).toBe(true)
})
test("should be return true if cpf is valid with dot and dash", () => {
    const returnValidate = new CpfValidator().isValid('026.950.410-98')
    expect(returnValidate).toBe(true)
})
test("should be return false if cpf is badly formatted", () => {
    const returnValidate = new CpfValidator().isValid('026 950 410 98')
    expect(returnValidate).toBe(false)
})
test("should be return false if length of cpf is less then 11", () => {
    expect(() => new CpfValidator().isValid('0')).toThrow(new Error("ERROR! CPF is the wrong size "))
})
test("should be return false if length of cpf is bigger then 14", () => {
    expect(() =>new CpfValidator().isValid("026950410985856")).toThrow(new Error("ERROR! CPF is the wrong size "))
})
test("should be return error if cpf is blank", () => {
    expect(() =>new CpfValidator().isValid(" ")).toThrow(new Error("ERROR! CPF is the wrong size "))
})
// test("should be return error if cpf is undefined", () => {
//     expect(() =>new CpfValidator().isValid(undefined)).toThrow(new Error("ERROR! CPF is undefined"))
// })
// test("should be return error if cpf is null", () => {
//     expect(() =>new CpfValidator().isValid(null)).toThrow(new Error("ERROR! CPF is null"))
// })
test("should be return error if all the digits of the cpf are the same", () => {
    expect(() =>new CpfValidator().isValid('99999999999')).toThrow(new Error("ERROR! All the digits of the cpf are the same"))
})

test("should be return false if pass a letter", () => {
    const returnValidate = new CpfValidator().isValid("abcdfgabcha")
    expect(returnValidate).toBe(false)
})
