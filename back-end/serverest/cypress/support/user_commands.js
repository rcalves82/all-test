Cypress.Commands.add('create_user', (name, email, password, admin) => {
    cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
            nome: name,
            email: email,
            password: password,
            administrador: admin
        },
        resp: [],
    })
})

Cypress.Commands.add('lits_user', () => {
    cy.request({
        method: 'GET',
        url: '/usuarios',
        failOnStatusCode: false,
    })
})

Cypress.Commands.add('get_user_id', id => {
    cy.request({
        method: 'GET',
        url: `/usuarios/${id}`,
        failOnStatusCode: false,
    })
})

Cypress.Commands.add('update_user', (id, name, email, password, admin) => {
    cy.request({
        method: 'PUT',
        url: `/usuarios/${id}`,
        failOnStatusCode: false,
        body: {
            nome: name,
            email: email,
            password: password,
            administrador: admin
        },
    })
})

Cypress.Commands.add('delete_user', id => {
    cy.request({
        method: 'DELETE',
        url: `/usuarios/${id}`,
        failOnStatusCode: false,
    })
})