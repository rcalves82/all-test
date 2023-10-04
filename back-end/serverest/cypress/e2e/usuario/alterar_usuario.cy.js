const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

describe('Teste de alterar usuário', () => {

    it('Deve fazer uma requisição PUT para alterar usuario', () => {
        nome = faker.name.firstName()
        email = faker.internet.email(nome)
        senha = faker.internet.password()
        administrador = 'true'

        cy.create_user(nome, email, senha, administrador).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body._id).not.be.null
            const id = user.body['_id']
            const novo_nome = faker.name.firstName()
            cy.update_user(id, novo_nome, email, senha, administrador).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Registro alterado com sucesso')
            })
        })
    })

})