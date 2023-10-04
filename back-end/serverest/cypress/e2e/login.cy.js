const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

describe('Teste de Login', () => {

    it('Deve fazer uma requisição POST para realização de login com sucesso', () => {
        nome = faker.name.firstName()
        email = faker.internet.email(nome)
        senha = faker.internet.password()
        administrador = 'true'

        cy.create_user(nome, email, senha, administrador).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body.message).to.eq('Cadastro realizado com sucesso')
            cy.login(email, senha).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Login realizado com sucesso')
                expect(res.body.authorization).not.be.null
            })
        })
    })

    it('Dever fazer uma requisição POST informando um login não cadastrado', () => {
        cy.login((email = 'hello@cypress.io'), (senha = '123456')).then(res => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.eq('Email e/ou senha inválidos')
        })
    })

})