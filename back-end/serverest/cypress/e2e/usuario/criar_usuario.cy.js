const faker = require('faker')

let nome = null
let email = null
let senha = null
let administrador = null

describe('Testes de criação de usuário', () => {

  beforeEach(() => {
    nome = faker.name.firstName()
    email = faker.internet.email(nome)
    senha = faker.internet.password()
    administrador = 'true'
  })

  it('Deve fazer uma requisição POST de cadastro de usuário', () => {
    cy.create_user(nome, email, senha, administrador).then(res => {
      expect(res.status).to.eq(201)
      expect(res.statusText).to.eq('Created')
      expect(res.body.message).to.eq('Cadastro realizado com sucesso')
    })
  })

  it('Deve fazer uma requisição POST informando email existente', () => {
    cy.create_user(nome, (email = 'beltrano@qa.com.br'), senha, administrador).then(res => {
      expect(res.status).to.eq(400)
      expect(res.statusText).to.eq('Bad Request')
      expect(res.body.message).to.eq('Este email já está sendo usado')
    })
  })

  it('Deve fazer uma requisição POST com campo nome em branco', () => {
    cy.create_user((nome = ""), email, senha, administrador).then(res => {
      expect(res.status).to.eq(400)
      expect(res.statusText).to.eq('Bad Request')
      expect(res.body.nome).to.eq('nome não pode ficar em branco')
    })
  })

  it('Deve fazer uma requisição POST com email inválido', () => {
    cy.create_user(nome, (email = 'teste@'), senha, administrador).then(res => {
      expect(res.status).to.eq(400)
      expect(res.statusText).to.eq('Bad Request')
      expect(res.body.email).to.eq('email deve ser um email válido')
    })
  })

  it('Deve fazer uma requisição POST informando senha como nulo', () => {
    cy.create_user(nome, email, (senha=null), administrador).then(res => {
      expect(res.status).to.eq(400)
      expect(res.statusText).to.eq('Bad Request')
      expect(res.body.password).to.eq('password deve ser uma string')
    })
  })

})
