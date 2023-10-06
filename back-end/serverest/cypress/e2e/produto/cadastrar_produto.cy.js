const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

let produto = null
let preco = null
let descricao = null
let quantidade = null

describe('Testes de cadastro de produto', () => {
    
    beforeEach(() => {
        nome = faker.name.firstName()
        email = faker.internet.email(nome)
        senha = faker.internet.password()
        administrador = 'true'

        produto = faker.commerce.productName()
        preco = faker.commerce.price()
        descricao = faker.commerce.productMaterial()
        quantidade = 2

        cy.create_user(nome, email, senha, administrador).then(user => {
            expect(user.status).to.eq(201)
        })
    })

    it('Deve fazer uma requisição POST para cadastrar produto com sucesso', () => {
        cy.create_product(email, senha, produto, preco, descricao, quantidade).then(res => {
            expect(res.status).to.eq(201)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')
            expect(res.body._id).not.be.null
        })
    })

    it('Deve fazer uma requisição POST para cadastrar produto ja cadastrado', () => {
        cy.create_product(email, senha, (produto='Logitech MX Vertical 3'), preco, descricao, quantidade).then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.message).to.eq('Já existe produto com esse nome')
        })
    })

    it('Deve fazer uma requisição POST para cadastrar produto informando nome em branco', () => {
        cy.create_product(email, senha, (produto=""), preco, descricao, quantidade).then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.nome).to.eq('nome não pode ficar em branco')
        })
    })

    it('Deve fazer uma requisição POST para validar o tipo de cada campo do produto', () => {
        cy.create_product(email, senha, (produto = null), (preco = null), (descricao = null), (quantidade = null)).then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.nome).to.eq('nome deve ser uma string')
            expect(res.body.preco).to.eq('preco deve ser um número')
            expect(res.body.descricao).to.eq('descricao deve ser uma string')
            expect(res.body.quantidade).to.eq('quantidade deve ser um número')
        })
    })
})