import Cpf from "../../src/domain/entity/Cpf"

const wrongSizeCpf = [
    '026 950 410 985',
    '0',
    '026950410985856',
]

const wrongSameDigitCpf = [
	'111.111.111-11',
	'222.222.222-22',
	'333.333.333-33'
];

test("should be return true if cpf is valid", () => {
    const cpf = new Cpf('02695041098')
    expect(cpf.value).toBe('02695041098')
})

test("should be return true if cpf is valid with dot and dash", () => {
    const cpf = new Cpf('026.950.410-98')
    expect(cpf.value).toBe('026.950.410-98')
})

test.each(wrongSizeCpf)("should be return false if length of cpf is wrong", (invalidCpf) => {
    expect(() =>new Cpf(invalidCpf)).toThrow(new Error("ERROR! Invalid CPF"))
})

test("should be return error if cpf is blank", () => {
    expect(() =>new Cpf(" ")).toThrow(new Error("ERROR! Invalid CPF"))
})

test.each(wrongSameDigitCpf)("should be return error if all the digits are the same", (cpf) => {
    expect(() =>new Cpf(cpf)).toThrow(new Error("ERROR! Invalid CPF"))
})

test("should be return error if pass a letter", () => {
    expect(() =>new Cpf("abcdfgabcha")).toThrow(new Error("ERROR! Invalid CPF"))

})
