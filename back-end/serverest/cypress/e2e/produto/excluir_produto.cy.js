const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

let produto = null
let preco = null
let descricao = null
let quantidade = null

describe('Testes de exclusão de produto', () => {
    
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

    it('Deve fazer uma requisição POST para excluir produto com sucesso', () => {
        cy.create_product(email, senha, produto, preco, descricao, quantidade).then(prod => {
            expect(prod.status).to.eq(201)
            expect(prod.body.message).to.eq('Cadastro realizado com sucesso')
            const id = prod.body['_id']
            cy.delete_product(email, senha, id).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Registro excluído com sucesso')
            })
        })
    })

    it('Deve fazer uma requisição POST para excluir produto inexistente', () => {
        cy.create_product(email, senha, produto, preco, descricao, quantidade).then(prod => {
            expect(prod.status).to.eq(201)
            expect(prod.body.message).to.eq('Cadastro realizado com sucesso')
            const id = prod.body['_id']
            cy.delete_product(email, senha, '1234').then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Nenhum registro excluído')
            })
        })
    })

})