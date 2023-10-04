const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

describe('Testes de consultar usuário', () => {


    it('Deve fazer uma requisição GET para consultar lista de usuários', () => {
        cy.lits_user().then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).not.be.null
            expect(res.body.usuarios).not.be.null
        })
    })

    it('Deve fazer uma requisição GET para consultar um usuário via id', () => {
        nome = faker.name.firstName()
        email = faker.internet.email(nome)
        senha = faker.internet.password()
        administrador = 'true'

        cy.create_user(nome, email, senha, administrador).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body._id).not.be.null
            const id = user.body['_id']
            cy.get_user_id(id).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.nome).to.eq(nome)
                expect(res.body.email).to.eq(email)
                expect(res.body._id).to.eq(id)
            })
        })
    })

    it('Deve fazer uma resquisição GET na consulta informando id inexistente', () => {
        cy.get_user_id('123').then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.message).to.eq('Usuário não encontrado')
        })
    })


}) 