const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

let produto = null
let preco = null
let descricao = null
let quantidade = null

describe('Testes de consultar produtos', () => {

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

    it('Deve fazer uma requisição GET para consultar lista de produtos', () => {
        cy.list_product().then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).not.be.null
            expect(res.body.produtos).not.be.null
        })
    })

    it('Deve fazer uma requisição GET para consultar produto por id', () => {
        cy.create_product(email, senha, produto, preco, descricao, quantidade).then(prod => {
            expect(prod.status).to.eq(201)
            expect(prod.body.message).to.eq('Cadastro realizado com sucesso')
            const id = prod.body['_id']
            cy.id_product(id).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.nome).to.eq(produto)
                expect(res.body.quantidade).to.eq(quantidade)
                expect(res.body._id).to.eq(id)
            })
        })
    })

    it('Deve fazer uma requisição GET para consultar produto por id inexistente', () => {
        cy.create_product(email, senha, produto, preco, descricao, quantidade).then(prod => {
            expect(prod.status).to.eq(201)
            expect(prod.body.message).to.eq('Cadastro realizado com sucesso')
            const id = 'abacaxi'
            cy.id_product(id).then(res => {
                expect(res.status).to.eq(400)
                expect(res.statusText).to.eq('Bad Request')
                expect(res.body.message).to.eq('Produto não encontrado')
                
            })
        })
    })

})