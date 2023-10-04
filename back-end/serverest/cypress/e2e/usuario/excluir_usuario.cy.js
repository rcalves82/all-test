const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

describe('Teste de exclusão de usuário', () => {

    it('Deve fazer uma requisição DELETE para excluir usuario', () => {
        nome = faker.name.firstName()
        email = faker.internet.email(nome)
        senha = faker.internet.password()
        administrador = 'true'

        cy.create_user(nome, email, senha, administrador).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body._id).not.be.null
            const id = user.body['_id']
            cy.delete_user(id).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Registro excluído com sucesso')
            })
        })
    })

    it('Deve fazer uma requisição DELETE para um id inexistente', () => {
        cy.delete_user('123').then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Nenhum registro excluído')
        })
    })

})