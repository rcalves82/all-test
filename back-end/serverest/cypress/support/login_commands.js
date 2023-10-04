Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            email: email,
            password: password
        },
    })
})
