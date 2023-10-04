const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

describe('Testes de consultar produtos', () => {
    it('Deve fazer uma requisição GET para consultar lista de produtos', () => {
        cy.list_product().then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).not.be.null
            expect(res.body.produtos).not.be.null
        })
    })
})