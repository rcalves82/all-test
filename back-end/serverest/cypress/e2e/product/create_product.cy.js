const faker = require('faker')

let name = null
let email = null
let password = null
let admin = null

let product = null
let price = null
let description = null
let amount = null

describe('Product create tests', () => {

    beforeEach(() => {
        name = faker.name.firstName()
        email = faker.internet.email(name)
        password = faker.internet.password()
        admin = 'true'

        product = faker.commerce.productName()
        price = faker.commerce.price()
        description = faker.commerce.productMaterial()
        amount = 2

        cy.create_user(name, email, password, admin).then(user => {
            expect(user.status).to.eq(201)
        })
    })

    it('Must make a POST request to successfully create the product', () => {
        cy.create_product(email, password, product, price, description, amount).then(res => {
            expect(res.status).to.eq(201)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')
            expect(res.body._id).not.be.null
        })
    })

    it('Must make a POST request to register an already create product', () => {
        cy.create_product(email, password, (product = 'Logitech MX Vertical 3'), price, description, amount).then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.message).to.eq('Já existe produto com esse nome')
        })
    })



    it('Must make a POST request to create a product by entering a blank name', () => {
        cy.create_product(email, password, (product = ""), price, description, amount).then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.nome).to.eq('nome não pode ficar em branco')
        })
    })

    it('Must make a POST request to validate the type of each product field', () => {
        cy.create_product(email, password, (product = null), (price = null), (description = null), (amount = null)).then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.nome).to.eq('nome deve ser uma string')
            expect(res.body.preco).to.eq('preco deve ser um número')
            expect(res.body.descricao).to.eq('descricao deve ser uma string')
            expect(res.body.quantidade).to.eq('quantidade deve ser um número')
        })
    })
})