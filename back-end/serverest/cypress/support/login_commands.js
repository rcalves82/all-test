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

Cypress.Commands.add('getToken', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            email: email,
            password: password
        },
    }).then(async res => {
        expect(res.status).to.eq(200)
        return Cypress.env('authToken', res.body.authorization);
    });
});
