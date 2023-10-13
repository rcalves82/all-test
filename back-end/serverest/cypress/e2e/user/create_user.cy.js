const faker = require('faker')

let name = null
let email = null
let password = null
let admin = null

describe('Create User Tests', () => {

  beforeEach(() => {
    name = faker.name.firstName()
    email = faker.internet.email(name)
    password = faker.internet.password()
    admin = 'true'
  })

  it('Must make a POST request to create a user', () => {
    cy.create_user(name, email, password, admin).then(res => {
      expect(res.status).to.eq(201)
      expect(res.statusText).to.eq('Created')
      expect(res.body.message).to.eq('Cadastro realizado com sucesso')
    })
  })

  Cypress._.times(1, () => {
    it('Must make a POST request informing existing email', () => {
      cy.create_user(name, (email = 'beltrano@qa.com.br'), password, admin).then(res => {
        expect(res.status).to.eq(400)
        expect(res.statusText).to.eq('Bad Request')
        expect(res.body.message).to.eq('Este email já está sendo usado')
      })
    })
  })


  it('Must make a POST request with a blank name field', () => {
    cy.create_user((name = ""), email, password, admin).then(res => {
      expect(res.status).to.eq(400)
      expect(res.statusText).to.eq('Bad Request')
      expect(res.body.nome).to.eq('nome não pode ficar em branco')
    })
  })

  it('Must make a POST request with an invalid email address', () => {
    cy.create_user(name, (email = 'teste@'), password, admin).then(res => {
      expect(res.status).to.eq(400)
      expect(res.statusText).to.eq('Bad Request')
      expect(res.body.email).to.eq('email deve ser um email válido')
    })
  })

  it('Must make a POST request stating the password as null', () => {
    cy.create_user(name, email, (password = null), admin).then(res => {
      expect(res.status).to.eq(400)
      expect(res.statusText).to.eq('Bad Request')
      expect(res.body.password).to.eq('password deve ser uma string')
    })
  })

})
