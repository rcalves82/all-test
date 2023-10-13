const faker = require('faker')

let name = null
let email = null
let password = null
let admin = null

describe('User delete test', () => {

    it('Must make a DELETE request to delete the user', () => {
        name = faker.name.firstName()
        email = faker.internet.email(name)
        password = faker.internet.password()
        admin = 'true'

        cy.create_user(name, email, password, admin).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body._id).not.be.null
            const id = user.body['_id']
            cy.delete_user(id).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Registro excluído com sucesso')
            })
        })
    })

    it('Must make a DELETE request for a non-existent id', () => {
        cy.delete_user('123').then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Nenhum registro excluído')
        })
    })

})