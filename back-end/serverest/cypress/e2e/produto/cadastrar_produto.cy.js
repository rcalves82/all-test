const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

let produto = null
let preco = null
let descricao = null
let quantidade = null
let id = null

let token = null

describe('Testes de cadastro de produto', () => {
    beforeEach(() => {
        nome = faker.name.firstName()
        email = faker.internet.email(nome)
        senha = faker.internet.password()
        administrador = 'false'

        produto = faker.commerce.productName()
        preco = faker.commerce.price()
        descricao = faker.commerce.productMaterial()
        quantidade = 2

        cy.create_user(nome, email, senha, administrador).then(res => {
            expect(res.status).to.eq(201)
        })
    })

    it('Deve fazer uma requisição POST para cadastrar produto com sucesso', () => {
        cy.create_product(email, senha, produto, preco, descricao, quantidade).then(res => {
            expect(res.status).to.eql(200)
        })

        // cy.getToken(email, senha);

    })
})