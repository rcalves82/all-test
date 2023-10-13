const faker = require('faker')

let name = null
let email = null
let password = null
let admin = null

describe('Edit user test', () => {

    it('Must make a PUT request to edit user', () => {
        name = faker.name.firstName()
        email = faker.internet.email(name)
        password = faker.internet.password()
        admin = 'true'

        cy.create_user(name, email, password, admin).then(user => {
            expect(user.status).to.eq(201)
            expect(user.body._id).not.be.null
            const id = user.body['_id']
            const new_name = faker.name.firstName()
            cy.update_user(id, new_name, email, password, admin).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.eq('Registro alterado com sucesso')
            })
        })
    })

})