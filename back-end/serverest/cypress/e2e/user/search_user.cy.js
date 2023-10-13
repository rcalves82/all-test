const faker = require('faker')

let name = null
let email = null
let password = null
let admin = null

describe('Search User Tests', () => {

    it('Must make a GET request to search for a list of users', () => {
        cy.lits_user().then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).not.be.null
            expect(res.body.usuarios).not.be.null
        })
    })

    it('Must make a GET request to search for a user via id', () => {
        name = faker.name.firstName()
        email = faker.internet.email(name)
        password = faker.internet.password()
        admin = 'true'

        cy.create_user(name, email, password, admin).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body._id).not.be.null
            const id = user.body['_id']
            cy.get_user_id(id).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.nome).to.eq(name)
                expect(res.body.email).to.eq(email)
                expect(res.body._id).to.eq(id)
            })
        })
    })

    it('Must make a GET request in the search reporting non-existent id', () => {
        cy.get_user_id('123').then(res => {
            expect(res.status).to.eq(400)
            expect(res.statusText).to.eq('Bad Request')
            expect(res.body.message).to.eq('Usuário não encontrado')
        })
    })


}) 