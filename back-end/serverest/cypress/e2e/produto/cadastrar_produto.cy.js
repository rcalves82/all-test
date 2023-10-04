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
            cy.login(email, senha).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Login realizado com sucesso')
                expect(res.body.authorization).not.be.null
            })
        })
    })

    it('Deve fazer uma requisição POST para cadastrar produto com sucesso', () => {
        
    })
})