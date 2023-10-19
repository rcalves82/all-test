const faker = require('faker')

let name = null
let email = null
let password = null
let admin = null

describe('Login tests', () => {

    it('Must make a POST request to login successfully', () => {
        name = faker.name.firstName()
        email = faker.internet.email(name)
        password = faker.internet.password()
        admin = 'true'

        cy.api_create_user(name, email, password, admin).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body.message).to.eq('Cadastro realizado com sucesso')
            cy.api_login(email, password).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Login realizado com sucesso')
                expect(res.body.authorization).not.be.null
            })
        })
    })

    it('Must make a POST request informing an unregistered login', () => {
        cy.api_login((email = 'hello@cypress.io'), (password = '123456')).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Email e/ou senha inválidos')
        })
    })

})